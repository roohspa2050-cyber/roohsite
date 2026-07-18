import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Clock, Tag, CheckCircle } from 'lucide-react';
import { Service, Language } from '../types';

interface ServiceCardProps {
  key?: string;
  service: Service;
  lang: Language;
  onBook: (serviceId: string) => void;
}

export function ServiceCard({ service, lang, onBook }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState<string>('perspective(1000px) rotateX(0deg) rotateY(0deg)');
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Frame scroll tracking for subtle parallax
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  // Map scroll progress to a slow, elegant image slide. Disabled on mobile for 60fps performance.
  const yParallax = useTransform(scrollYProgress, [0, 1], isMobile ? ["0%", "0%"] : ["-8%", "8%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return; // Disable heavy 3D parallax/tilt on mobile
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate tilt angles based on mouse position relative to card center
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    
    // Max tilt is 6 degrees
    const angleX = -((yc - y) / yc) * 6;
    const angleY = ((x - xc) / xc) * 6;
    
    setTiltStyle(`perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.02)`);
  };

  const handleMouseLeave = () => {
    setTiltStyle('perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)');
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const isRtl = lang === 'ar';

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: tiltStyle,
        transition: 'transform 0.2s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.2s ease',
      }}
      className="group relative overflow-hidden rounded-2xl bg-brand-cream border border-brand-brown/5 shadow-lg hover:shadow-[0_0_35px_rgba(212,175,55,0.25)] hover:border-brand-gold/30 transition-all duration-500 ease-out flex flex-col h-full"
      id={`service-card-${service.id}`}
    >
      {/* Service Image Container */}
      <div className="relative aspect-video overflow-hidden">
        <motion.img
          style={{ 
            y: yParallax,
            scale: isHovered ? 1.12 : 1.05
          }}
          transition={{
            scale: { duration: 0.8, ease: [0.25, 1, 0.5, 1] }
          }}
          src={service.image}
          alt={service.title[lang]}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover origin-center"
        />
        {/* Elegant Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-brown via-brand-brown/40 to-transparent opacity-80" />
        
        {/* Service Title on top of Image */}
        <div className="absolute bottom-4 left-6 right-6">
          <span className="inline-block px-2 py-0.5 text-[10px] uppercase tracking-wider bg-brand-gold text-brand-brown font-semibold rounded mb-2 font-cairo">
            {service.category ? service.category[lang] : (service.id.includes('bath') || service.id.includes('royal') ? (isRtl ? 'باقة النخبة' : 'ELITE PACKAGE') : (isRtl ? 'عناية فاخرة' : 'PREMIUM CARE'))}
          </span>
          <h3 className="text-xl font-bold text-white tracking-wide font-cairo">
            {service.title[lang]}
          </h3>
        </div>
      </div>

      {/* Service Details Body */}
      <div className="p-6 flex flex-col flex-grow justify-between">
        <div>
          {/* Metadata: Duration & Price */}
          <div className="flex items-center justify-between border-b border-brand-brown/10 pb-4 mb-4 text-xs font-medium text-brand-text/70">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-brand-gold" />
              <span>
                {isRtl ? 'المدة:' : 'Duration:'} {service.duration[lang]}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-brand-gold" />
              <span className="font-bold text-brand-text">
                {isRtl ? 'السعر:' : 'Price:'} <span className="text-brand-gold-dark text-sm">{service.price[lang]}</span>
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-brand-text/80 mb-6 leading-relaxed">
            {service.description[lang]}
          </p>

          {/* Benefits/Highlights List */}
          <div className="space-y-2 mb-6">
            {service.benefits[lang].map((benefit, i) => (
              <div key={i} className="flex items-start gap-2.5 text-xs text-brand-text/80">
                <CheckCircle className="w-3.5 h-3.5 text-brand-gold shrink-0 mt-0.5" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button: Slide-up animation adjusting direction based on RTL/LTR */}
        <div className="relative overflow-hidden rounded-xl h-12">
          <button
            onClick={() => onBook(service.id)}
            className="w-full h-full bg-brand-brown text-white font-medium hover:bg-brand-gold hover:text-brand-brown transition-colors duration-300 font-cairo font-montserrat text-sm flex items-center justify-center gap-2 cursor-pointer relative z-10"
          >
            {isRtl ? 'حجز هذه الخدمة' : 'Book This Service'}
          </button>
          
          {/* Premium slide-up dynamic accent layer */}
          <div
            style={{
              transform: isHovered
                ? 'translate(0, 0)'
                : isRtl
                ? 'translate(100%, 0)'
                : 'translate(-100%, 0)',
              transition: 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
            }}
            className="absolute inset-0 bg-brand-gold pointer-events-none"
          />
        </div>
      </div>
    </div>
  );
}

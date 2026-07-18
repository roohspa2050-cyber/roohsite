import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Gem, Tag, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { Language } from '../types';

interface FeaturesAccordionProps {
  lang: Language;
}

export function FeaturesAccordion({ lang }: FeaturesAccordionProps) {
  const isRtl = lang === 'ar';
  const [activeIndex, setActiveIndex] = useState(0);

  const items = [
    {
      id: 'gem',
      icon: Gem,
      titleAr: "مركز سبا متكامل",
      titleEn: "Integrated Spa Center",
      descAr: "عناية متكاملة بالرجل من خدمات مساج وحمام وتنظيف وبديكير وحلاقة وجاكوزي وبخار.",
      descEn: "Comprehensive men's care including massage, bath, cleaning, pedicure, shaving, jacuzzi, and steam.",
      animationType: 'lotus-breathing'
    },
    {
      id: 'sparkles',
      icon: Sparkles,
      titleAr: "خدمة فوق الخيال",
      titleEn: "Beyond Imagination Service",
      descAr: "هدفنا شعورك بالراحة والاسترخاء على مستوى فوق الخيال لأنك تستحق الإعتناء.",
      descEn: "Our goal is to make you feel relaxed and comfortable at an unimaginable level because you deserve to be pampered.",
      animationType: 'star-wave'
    },
    {
      id: 'tag',
      icon: Tag,
      titleAr: "أسعار منافسة",
      titleEn: "Competitive Prices",
      descAr: "جميع أسعارنا مناسبة ومنافسة، نقدم خدمة وجودة وقيمة مقابل المال على أعلى مستوى.",
      descEn: "All our prices are suitable and competitive, offering the highest level of service, quality, and value for money.",
      animationType: 'scale-tilt'
    },
    {
      id: 'users',
      icon: Users,
      titleAr: "كوادر متخصصة",
      titleEn: "Specialized Staff",
      descAr: "فريق من المعالجين المحترفين والمتخصصين في تقديم أفضل تجربة لتحقيق الراحة والاسترخاء.",
      descEn: "A team of professional and specialized therapists dedicated to providing the best experience for ultimate comfort and relaxation.",
      animationType: 'badge-pulse'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, 4500); // cycle every 4.5 seconds
    return () => clearInterval(timer);
  }, [items.length]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const currentItem = items[activeIndex];
  const IconComponent = currentItem.icon;
  const premiumEase = [0.25, 1, 0.5, 1];

  return (
    <div 
      className="max-w-2xl mx-auto px-4" 
      id="features-cards-grid"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentItem.id}
            initial={{ opacity: 0, x: isRtl ? -40 : 40, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: isRtl ? 40 : -40, scale: 0.98 }}
            transition={{
              duration: 0.7,
              ease: premiumEase
            }}
            className="group relative rounded-3xl border border-brand-brown/10 bg-brand-cream/90 p-8 sm:p-10 hover:border-brand-gold/40 transition-all duration-500 shadow-xl flex flex-col h-[280px] sm:h-[240px] overflow-hidden justify-between"
          >
            {/* Background luxury glow element */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-brand-gold/5 rounded-full blur-2xl pointer-events-none -mr-8 -mt-8 group-hover:bg-brand-gold/10 transition-colors duration-500" />
            
            {/* Elegant Arabesque Engraving Pattern on the left */}
            <div className="absolute left-0 top-0 bottom-0 w-24 overflow-hidden pointer-events-none select-none z-0 opacity-15 group-hover:opacity-25 transition-opacity duration-500">
              <svg 
                className="h-full w-full text-brand-gold-dark" 
                viewBox="0 0 100 300" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                {/* Intricate repeated luxury arabesque lattices */}
                <path d="M 50,0 Q 20,25 50,50 Q 80,25 50,0 Z" />
                <path d="M 50,50 Q 20,75 50,100 Q 80,75 50,50 Z" />
                <path d="M 50,100 Q 20,125 50,150 Q 80,125 50,100 Z" />
                <path d="M 50,150 Q 20,175 50,200 Q 80,175 50,150 Z" />
                <path d="M 50,200 Q 20,225 50,250 Q 80,225 50,200 Z" />
                <path d="M 50,250 Q 20,275 50,300 Q 80,275 50,250 Z" />
                
                {/* Concentric inner luxury details */}
                <path d="M 50,12 C 35,25 35,25 50,38 C 65,25 65,25 50,12" />
                <path d="M 50,62 C 35,75 35,75 50,88 C 65,75 65,75 50,62" />
                <path d="M 50,112 C 35,125 35,125 50,138 C 65,125 65,125 50,112" />
                <path d="M 50,162 C 35,175 35,175 50,188 C 65,175 65,175 50,162" />
                <path d="M 50,212 C 35,225 35,225 50,238 C 65,225 65,225 50,212" />
                <path d="M 50,262 C 35,275 35,275 50,288 C 65,275 65,275 50,262" />
                
                {/* Connecting ornamental scrolls */}
                <path d="M -10,25 Q 15,25 15,50" />
                <path d="M 110,25 Q 85,25 85,50" />
                <path d="M -10,75 Q 15,75 15,100" />
                <path d="M 110,75 Q 85,75 85,100" />
                <path d="M -10,125 Q 15,125 15,150" />
                <path d="M 110,125 Q 85,125 85,150" />
                <path d="M -10,175 Q 15,175 15,200" />
                <path d="M 110,175 Q 85,175 85,200" />
                <path d="M -10,225 Q 15,225 15,250" />
                <path d="M 110,225 Q 85,225 85,250" />
                <path d="M -10,275 Q 15,275 15,300" />
                <path d="M 110,275 Q 85,275 85,300" />
              </svg>
            </div>
            
            <div className="flex gap-6 items-start relative z-10">
              {/* Header / Icon Section */}
              <div className="relative z-10 flex-shrink-0">
                <div className="w-16 h-16 rounded-2xl bg-brand-brown/5 text-brand-brown flex items-center justify-center relative overflow-visible group-hover:bg-brand-gold/15 group-hover:text-brand-gold-dark transition-all duration-300">
                  
                  {/* Specific Icon Looping Animations */}
                  {currentItem.animationType === 'lotus-breathing' && (
                    <motion.div
                      animate={{ 
                        scale: [1, 1.12, 1],
                        opacity: [0.9, 1, 0.9]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="flex items-center justify-center"
                    >
                      <IconComponent className="w-7 h-7" />
                    </motion.div>
                  )}

                  {currentItem.animationType === 'star-wave' && (
                    <motion.div
                      animate={{ 
                        rotate: [0, 8, -8, 0],
                        scale: [1, 1.08, 0.96, 1]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="flex items-center justify-center"
                    >
                      <IconComponent className="w-7 h-7" />
                    </motion.div>
                  )}

                  {currentItem.animationType === 'scale-tilt' && (
                    <motion.div
                      animate={{ 
                        rotate: [-5, 5, -5],
                        scale: [1, 1.05, 1]
                      }}
                      transition={{
                        duration: 3.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="flex items-center justify-center"
                    >
                      <IconComponent className="w-7 h-7" />
                    </motion.div>
                  )}

                  {currentItem.animationType === 'badge-pulse' && (
                    <div className="relative flex items-center justify-center">
                      <motion.div
                        animate={{ 
                          scale: [1, 1.4, 1],
                          opacity: [0.25, 0, 0.25]
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          ease: "easeOut"
                        }}
                        className="absolute inset-0 rounded-full bg-brand-gold"
                      />
                      <motion.div
                        animate={{ 
                          y: [0, -2, 0],
                          scale: [1, 1.04, 1]
                        }}
                        transition={{
                          duration: 3.2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="flex items-center justify-center relative z-10"
                      >
                        <IconComponent className="w-7 h-7" />
                      </motion.div>
                    </div>
                  )}
                </div>
              </div>

              {/* Text Content */}
              <div className="flex-grow">
                <h3 className="text-xl sm:text-2xl font-bold text-brand-text font-cairo mb-3 group-hover:text-brand-gold-dark transition-colors duration-300 relative z-10">
                  {isRtl ? currentItem.titleAr : currentItem.titleEn}
                </h3>
                <p className="text-sm sm:text-base text-brand-text/75 leading-relaxed font-light font-cairo mt-1 relative z-10">
                  {isRtl ? currentItem.descAr : currentItem.descEn}
                </p>
              </div>
            </div>

            {/* Premium Animated Auto-play Progress Bar */}
            <div className="absolute bottom-0 left-0 w-full h-[3px] bg-brand-brown/5">
              <motion.div
                key={activeIndex}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 4.5, ease: "linear" }}
                className="h-full bg-brand-gold"
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Next and Previous Premium Floating Buttons */}
        <button
          onClick={handlePrev}
          className="absolute top-1/2 -translate-y-1/2 -left-4 sm:-left-16 w-10 h-10 rounded-full bg-brand-cream border border-brand-brown/10 text-brand-text flex items-center justify-center hover:bg-brand-gold hover:border-brand-gold hover:text-brand-brown shadow-md hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer z-20"
          aria-label="Previous slide"
        >
          {isRtl ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>

        <button
          onClick={handleNext}
          className="absolute top-1/2 -translate-y-1/2 -right-4 sm:-right-16 w-10 h-10 rounded-full bg-brand-cream border border-brand-brown/10 text-brand-text flex items-center justify-center hover:bg-brand-gold hover:border-brand-gold hover:text-brand-brown shadow-md hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer z-20"
          aria-label="Next slide"
        >
          {isRtl ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
        </button>
      </div>

      {/* Pagination indicators / Dot navigation */}
      <div className="flex items-center justify-center gap-2 mt-8">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              i === activeIndex ? 'w-8 bg-brand-gold' : 'w-2 bg-brand-text/25 hover:bg-brand-text/50'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

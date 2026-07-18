import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import Lenis from 'lenis';
import { 
  Star, 
  MapPin, 
  Phone, 
  MessageSquare, 
  Award, 
  ShieldCheck, 
  Sparkles, 
  Calendar, 
  ChevronRight, 
  ArrowUpRight, 
  HeartPulse, 
  Users, 
  Clock, 
  CheckCircle2,
  BookmarkCheck,
  Flower2,
  Gem,
  Tag
} from 'lucide-react';

import { Language } from './types';
import { SERVICES_DATA, TRANSLATIONS } from './data';
import { Navbar } from './components/Navbar';
import { ServiceCard } from './components/ServiceCard';
import { ServiceCarousel } from './components/ServiceCarousel';
import { FeaturesAccordion } from './components/FeaturesAccordion';
import { TestimonialSlider } from './components/TestimonialSlider';
import { AnimatedCounter } from './components/AnimatedCounter';
import { InteractiveQuiz } from './components/InteractiveQuiz';
import { BookingWidget } from './components/BookingWidget';
import { VirtualTourModal } from './components/VirtualTourModal';

const drawPathVariants = {
  hidden: { 
    pathLength: 0, 
    opacity: 0 
  },
  visible: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { 
        delay: i * 0.4, 
        duration: 1.2, 
        ease: "easeInOut" 
      },
      opacity: { 
        delay: i * 0.4, 
        duration: 0.3 
      }
    }
  })
};

export default function App() {
  const [lang, setLang] = useState<Language>('ar');
  const [isIntroLoading, setIsIntroLoading] = useState(true);
  const [selectedServiceId, setSelectedServiceId] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsIntroLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  // Initialize Lenis smooth scroll and responsive mobile checking
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Instantiate Lenis (disabled on mobile for smooth 60fps performance)
    let lenis: Lenis | null = null;
    let rafId: number;

    if (window.innerWidth >= 768) {
      lenis = new Lenis({
        duration: 1.3,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // premium exponential easing
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1.0,
      });

      const raf = (time: number) => {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
      if (lenis) {
        cancelAnimationFrame(rafId);
        lenis.destroy();
      }
    };
  }, []);

  const bannerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress: pageScrollY } = useScroll();
  
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [heroMouse, setHeroMouse] = useState({ x: -100, y: -100 });
  const [isHeroHovered, setIsHeroHovered] = useState(false);

  const { scrollYProgress: heroScrollY } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // Apple-style scroll-bound transforms: scale shrinks, corners round, fades/translates on scroll
  const heroScale = useTransform(heroScrollY, [0, 1], [1, 0.88]);
  const heroY = useTransform(heroScrollY, [0, 1], ["0%", "18%"]);
  const heroRadius = useTransform(heroScrollY, [0, 0.6, 1], ["0px", "24px", "40px"]);
  const heroOpacity = useTransform(heroScrollY, [0, 1], [0.55, 0.15]);

  const { scrollYProgress: bannerScrollY } = useScroll({
    target: bannerRef,
    offset: ["start end", "end start"]
  });

  // Background ambient video/image parallax translation
  const bannerVideoY = useTransform(bannerScrollY, [0, 1], isMobile ? ["0%", "0%"] : ["-10%", "10%"]);

  // Theme state: 'chocolate' (default) or 'oceanic'
  const [theme, setTheme] = useState<'chocolate' | 'oceanic'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('rooh-spa-theme');
      if (saved === 'oceanic' || saved === 'chocolate') {
        return saved;
      }
    }
    return 'chocolate';
  });

  // Dynamically synchronize HTML root element class for premium theme switching
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'oceanic') {
      root.classList.add('theme-oceanic');
    } else {
      root.classList.remove('theme-oceanic');
    }
    localStorage.setItem('rooh-spa-theme', theme);
  }, [theme]);

  const handleThemeToggle = () => {
    setTheme((prev) => (prev === 'chocolate' ? 'oceanic' : 'chocolate'));
  };

  // Lead / Call back contact form states
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactService, setContactService] = useState('');
  const [contactDate, setContactDate] = useState('');
  const [contactNotes, setContactNotes] = useState('');
  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactError, setContactError] = useState('');

  const t = TRANSLATIONS[lang];
  const isRtl = lang === 'ar';

  const handleOpenBooking = (serviceId: string) => {
    // Determine which service was clicked
    const service = SERVICES_DATA.find(srv => srv.id === serviceId);
    const phoneNumber = '966565296149';
    let messageText = '';

    if (service) {
      // Create message for specific service
      // "السلام عليكم، أرغب في حجز خدمة: [اسم الخدمة] - بسعر: [سعر الخدمة] ريال. أرجو تأكيد الموعد المتاح."
      const cleanPrice = service.price.ar.replace(' ريال', '').replace(' SAR', '');
      messageText = `السلام عليكم، أرغب في حجز خدمة: ${service.title.ar} - بسعر: ${cleanPrice} ريال. أرجو تأكيد الموعد المتاح.`;
    } else {
      // General booking text if no service ID was passed
      messageText = `السلام عليكم، أرغب في حجز جلسة استرخاء في مركز روح الاسترخاء. أرجو تأكيد المواعيد المتاحة لديكم.`;
    }

    const encodedText = encodeURIComponent(messageText);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;
    
    // Direct Redirect
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setHeroMouse({ x, y });
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactPhone.trim() || !contactDate.trim()) {
      setContactError(isRtl ? 'يرجى تعبئة كافة الحقول المطلوبة' : 'Please fill all required fields');
      return;
    }
    setContactError('');
    // Simulate API lead dispatch
    setTimeout(() => {
      setContactSuccess(true);
      // reset form
      setContactName('');
      setContactPhone('');
      setContactService('');
      setContactDate('');
      setContactNotes('');
    }, 1200);
  };

  return (
    <div 
      className={`min-h-screen bg-brand-beige text-brand-text antialiased selection:bg-brand-gold/30 selection:text-brand-brown transition-colors duration-500 ${
        isRtl ? 'font-cairo' : 'font-montserrat'
      }`}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Luxury Fullscreen Intro Loader Screen */}
      <AnimatePresence>
        {isIntroLoading && (
          <motion.div
            key="spa-intro-preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[9999] bg-[#1C1412] flex flex-col items-center justify-center p-6 text-white overflow-hidden"
          >
            {/* Elegant Background pattern */}
            <div className="absolute inset-0 opacity-15 pointer-events-none select-none">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none" stroke="#C5A059" strokeWidth="0.05">
                <path d="M 0,0 Q 50,50 100,0 M 0,100 Q 50,50 100,100" />
                <circle cx="50" cy="50" r="42" strokeWidth="0.03" />
                <circle cx="50" cy="50" r="28" strokeWidth="0.02" />
              </svg>
            </div>

            {/* Glowing gold backlighting */}
            <div className="absolute w-[500px] h-[500px] rounded-full bg-brand-gold/10 blur-[130px] pointer-events-none animate-pulse" />

            <div className="relative z-10 flex flex-col items-center max-w-lg">
              {/* Logo block: large, centered, beautifully animated */}
              <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: [0.7, 1.05, 1], opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="w-40 h-40 md:w-56 md:h-56 rounded-3xl bg-white/5 backdrop-blur-md flex items-center justify-center p-6 border border-white/10 shadow-2xl mb-8 relative"
              >
                <img 
                  src="https://pvhgmczyccgkpzxkiolq.supabase.co/storage/v1/object/public/web/Untitled%20-%20June%2020,%202026%20at%2012.55.15-18.png" 
                  alt="Rooh Spa Logo" 
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 rounded-3xl border-2 border-brand-gold/30 animate-pulse" />
              </motion.div>

              {/* Welcoming Greeting Text */}
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-2xl md:text-3xl font-extrabold font-cairo text-white text-center mb-2 tracking-wide leading-snug"
              >
                {isRtl ? 'مرحباً بكم في روح الاسترخاء بمدينة جدة' : 'Welcome to Rooh Spa in Jeddah'}
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="text-brand-gold text-xs md:text-sm tracking-widest uppercase font-cairo font-semibold text-center mb-10 px-4"
              >
                {isRtl ? 'ملاذ الاستشفاء والعناية المتكاملة لرجال النخبة' : 'Premium Men\'s Wellness & Recovery Sanctuary'}
              </motion.p>

              {/* Luxury Progress/Loading Bar */}
              <div className="w-56 h-[3px] bg-white/10 rounded-full overflow-hidden relative mb-4">
                <motion.div
                  initial={{ left: "-100%" }}
                  animate={{ left: "100%" }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  className="absolute top-0 bottom-0 w-1/2 bg-brand-gold rounded-full"
                />
              </div>

              {/* Loading subtext */}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="text-[11px] text-white/60 tracking-widest uppercase font-cairo font-medium"
              >
                {isRtl ? 'جاري تهيئة التجربة الفاخرة...' : 'Preparing your luxury experience...'}
              </motion.span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* High-End Scroll Progress Bar */}
      <motion.div 
        style={{ scaleX: pageScrollY }} 
        className="fixed top-0 left-0 right-0 h-1 bg-brand-gold origin-left z-[100] pointer-events-none" 
      />

      {/* Premium Sticky Navbar */}
      <Navbar 
        lang={lang} 
        onLanguageChange={setLang} 
        onBookNow={() => handleOpenBooking('')} 
        theme={theme}
        onThemeToggle={handleThemeToggle}
      />

      {/* 1. Hero Section (Ken Burns animation and high-end overlay) */}
      <section 
        ref={heroRef} 
        onMouseMove={handleHeroMouseMove}
        onMouseEnter={() => setIsHeroHovered(true)}
        onMouseLeave={() => setIsHeroHovered(false)}
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-brown pt-20"
      >
        
        {/* Premium Custom Cursor - Follows pointer in Hero only */}
        {isHeroHovered && !isMobile && (
          <motion.div
            style={{
              left: heroMouse.x,
              top: heroMouse.y,
            }}
            className="absolute pointer-events-none w-10 h-10 rounded-full border border-brand-gold bg-brand-gold/15 mix-blend-screen z-20 -translate-x-1/2 -translate-y-1/2"
            animate={{
              scale: [1, 1.25, 1],
            }}
            transition={{
              left: { type: "spring", damping: 30, stiffness: 280, mass: 0.8 },
              top: { type: "spring", damping: 30, stiffness: 280, mass: 0.8 },
              scale: { repeat: Infinity, duration: 2, ease: "easeInOut" }
            }}
          />
        )}

        {/* Background Apple-Style Scroll-Animated Container */}
        <motion.div 
          style={{ 
            scale: heroScale,
            y: heroY,
            borderRadius: heroRadius,
            opacity: heroOpacity
          }}
          className="absolute inset-0 z-0 overflow-hidden bg-brand-brown origin-center"
        >
          {/* Main Video Background - Pure and standalone */}
          <video
            src="https://pvhgmczyccgkpzxkiolq.supabase.co/storage/v1/object/public/web/0716.mp4"
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          />

          {/* Minimal overlay for perfect text readability while keeping the video clear */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-brown/85 via-brand-brown/20 to-brand-brown/40" />
        </motion.div>

        {/* Hero Core Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-16 pb-20">
          
          {/* Symmetrical Rating Badge */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.8, ease: [0.25, 1, 0.5, 1] }}
            className="flex items-center justify-center gap-2 mb-8"
          >
            <div className="flex text-brand-gold text-sm tracking-widest">
              ★★★★★
            </div>
            <span className="text-white/70 text-[10px] tracking-widest uppercase font-cairo">
              4.2/5 • {isRtl ? 'تقييم ضيوفنا الكرام' : 'Guest Reviews'}
            </span>
          </motion.div>

          {/* Symmetrical Bilingual Heading Block */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.25, 1, 0.5, 1] }}
            className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 mb-12"
          >
            {/* Arabic Statement */}
            <div className="text-center md:text-right md:flex-1" dir="rtl">
              <h1 
                style={{ textShadow: "0 4px 20px rgba(0,0,0,0.85), 0 0 40px rgba(0,0,0,0.4)" }}
                className="text-4xl sm:text-5xl text-white font-bold font-cairo mb-3 leading-tight tracking-wide"
              >
                استرخِ بعمق، اشفِ بحكمة
              </h1>
              <p className="text-brand-gold-light/80 text-sm italic font-cairo font-light tracking-wide">
                روح الاسترخاء بمدينة جدة: فن العناية الرجالية الفاخرة
              </p>
            </div>

            {/* Symmetrical dividing line */}
            <div className="hidden md:block w-[1px] bg-white/20 h-24 self-center" />
            <div className="block md:hidden w-16 h-[1px] bg-white/20 my-2" />

            {/* English Statement */}
            <div className="text-center md:text-left md:flex-1">
              <h1 
                style={{ textShadow: "0 4px 20px rgba(0,0,0,0.85), 0 0 40px rgba(0,0,0,0.4)" }}
                className="text-4xl sm:text-5xl text-white font-bold font-cairo mb-3 leading-tight tracking-wide"
              >
                Relax Deeply, Heal Wisely
              </h1>
              <p className="text-brand-gold-light/80 text-sm italic font-montserrat font-light tracking-wide">
                Rooh Spa in Jeddah: The Art of Premium Men's Wellness
              </p>
            </div>
          </motion.div>

          {/* Symmetrical Call-to-action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.25, 1, 0.5, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto"
          >
            <button
              onClick={() => handleOpenBooking('')}
              className="w-full sm:w-auto h-12 px-8 bg-brand-gold text-brand-brown hover:scale-105 hover:bg-white hover:text-brand-brown transition-all duration-300 font-bold uppercase text-xs tracking-widest font-cairo font-montserrat flex items-center justify-center gap-2 cursor-pointer shadow-lg active:translate-y-0.5 rounded-xl"
            >
              <Calendar className="w-4 h-4" />
              {isRtl ? 'احجز جلستك الآن' : 'Book Your Session'}
            </button>
            
            <a
              href="#services"
              className="w-full sm:w-auto h-12 px-8 bg-transparent border border-white/30 text-white hover:bg-white/10 transition-all duration-300 font-bold uppercase text-xs tracking-widest font-cairo font-montserrat flex items-center justify-center gap-2 cursor-pointer rounded-xl"
            >
              {isRtl ? 'استكشف خدماتنا' : 'Explore Our Services'}
            </a>
          </motion.div>

        </div>

        {/* Divider 1: Soft Mist/Steam Gradient SVG Blend */}
        <div className="absolute bottom-0 left-0 right-0 h-24 overflow-hidden pointer-events-none z-10">
          <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,32L60,42.7C120,53,240,75,360,74.7C480,75,600,53,720,48C840,43,960,53,1080,58.7C1200,64,1320,64,1380,64L1440,64L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z" fill="#F4F1EA" className="opacity-100 fill-brand-beige transition-colors duration-500" />
            <path d="M0,64L120,74.7C240,85,480,107,720,101.3C960,96,1200,64,1320,48L1440,32L1440,120L1320,120C1200,120,960,120,720,120C480,120,240,120,120,120L0,120Z" fill="#F4F1EA" className="opacity-40 fill-brand-beige blur-[4px] transition-colors duration-500" />
          </svg>
        </div>
      </section>

      {/* 2. Services Section (Bilingual, tilt zoom interactive cards) */}
      <section id="services" className="py-24 sm:py-32 scroll-mt-12 relative overflow-hidden bg-brand-cream/40">
        {/* Background Image with 50% Opacity */}
        <div 
          className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-50 z-0"
          style={{ backgroundImage: 'url("https://pvhgmczyccgkpzxkiolq.supabase.co/storage/v1/object/public/web/download%20(13).jpg")' }}
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Header */}
          <motion.div 
            initial={{ opacity: 0, y: 35, clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
            whileInView={{ opacity: 1, y: 0, clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.1, ease: [0.25, 1, 0.5, 1] }}
            className="text-center max-w-3xl mx-auto mb-16 sm:mb-20"
          >
            <span className="text-xs font-bold text-brand-gold-dark tracking-widest uppercase font-cairo">
              {isRtl ? 'طقوس الاستشفاء الرجالية' : 'MEN\'S RECOVERY RITUALS'}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-text font-cairo mt-3 mb-4 tracking-tight">
              {t.services.title}
            </h2>
            <div className="w-16 h-1 bg-brand-gold mx-auto mb-5 rounded-full" />
            <p className="text-sm sm:text-base text-brand-text/70 leading-relaxed font-light">
              {t.services.subtitle}
            </p>
          </motion.div>

          {/* Grid Layout of Service Cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.0, ease: [0.25, 1, 0.5, 1] }}
          >
            <ServiceCarousel
              services={SERVICES_DATA}
              lang={lang}
              onBook={handleOpenBooking}
            />
          </motion.div>

          {/* Inline Trust Note */}
          <div className="mt-12 text-center bg-brand-cream/40 border border-brand-brown/5 rounded-2xl p-6 max-w-2xl mx-auto">
            <p className="text-sm text-brand-text font-cairo font-medium leading-relaxed">
              {isRtl 
                ? 'يوجد لدينا أفضل الأخصائيات داخل المركز مدربين علي اعلي مستوي من الكفاءه' 
                : 'We have the best specialists in our center, trained to the highest level of competence.'}
            </p>
          </div>

          {/* Virtual Wellness Advisor Quiz */}
          <div className="mt-16 pt-8 border-t border-brand-brown/5 relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="text-xs font-bold text-brand-gold-dark tracking-widest uppercase font-cairo">
                {isRtl ? 'مستشار العناية الافتراضي' : 'WELLNESS ADVISOR'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-text font-cairo mt-2">
                {isRtl ? 'حائر في اختيار الجلسة المناسبة؟' : 'Not sure which ritual to choose?'}
              </h3>
              <p className="text-xs sm:text-sm text-brand-text/60 mt-2 font-light">
                {isRtl 
                  ? 'أجب على 3 أسئلة سريعة وسنرشح لك الطقس الاستشفائي المثالي لاحتياجات جسدك'
                  : 'Answer 3 quick questions and let our expert advisor match you with your perfect therapeutic ritual'}
              </p>
            </div>
            <InteractiveQuiz lang={lang} onBook={handleOpenBooking} />
          </div>

        </div>

        {/* Divider 2: The Golden Thread Curve SVG with central emblem */}
        <div className="absolute bottom-0 left-0 right-0 h-10 overflow-visible pointer-events-none z-20 flex justify-center items-center">
          <svg className="absolute inset-x-0 bottom-0 w-full h-8" viewBox="0 0 1440 24" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,12 C360,-4 1080,-4 1440,12" stroke="url(#goldenThreadGradient)" strokeWidth="1.5" />
            <defs>
              <linearGradient id="goldenThreadGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(212,175,55,0.0)" />
                <stop offset="50%" stopColor="rgba(212,175,55,0.8)" />
                <stop offset="100%" stopColor="rgba(212,175,55,0.0)" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute bottom-1 w-6 h-6 rounded-full bg-brand-beige border border-brand-gold flex items-center justify-center shadow-md shadow-brand-gold/20 transform translate-y-1/2">
            <div className="w-2.5 h-2.5 rounded-full bg-brand-gold animate-pulse" />
          </div>
        </div>
      </section>

      {/* Why Choose Us / Features Section */}
      <section id="features" className="py-24 bg-brand-beige/40 scroll-mt-12 relative overflow-hidden">
        {/* Background Image with 40% Opacity */}
        <div 
          className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-40 z-0"
          style={{ backgroundImage: 'url("https://pvhgmczyccgkpzxkiolq.supabase.co/storage/v1/object/public/web/spa1.jpg")' }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <span className="text-xs font-bold text-brand-gold-dark tracking-widest uppercase font-cairo">
              {isRtl ? 'لماذا روح الاسترخاء؟' : 'WHY ROOH SPA?'}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-text font-cairo mt-3 mb-4 tracking-tight">
              {isRtl ? 'تجربة استثنائية تفوق التوقعات' : 'An Exceptional Experience Beyond Expectations'}
            </h2>
            <div className="w-16 h-1 bg-brand-gold mx-auto mb-5 rounded-full" />
            <p className="text-sm sm:text-base text-brand-text/70 leading-relaxed font-light">
              {isRtl 
                ? 'نجمع بين الأصالة الطبية والراحة العصرية لنمنحك ملاذاً فريداً للاستشفاء وإعادة الحيوية.'
                : 'We blend traditional therapy with modern wellness to give you an unmatched sanctuary for recovery and revitalization.'}
            </p>
          </div>

          {/* Interactive Accordion Layout */}
          <FeaturesAccordion lang={lang} />

        </div>
      </section>

      {/* 3. About Section (Two-column layout, certified badges, live count-up, with Divider 3 Parallax Organic Overlap) */}
      <section id="about" className="-mt-16 sm:-mt-24 py-24 sm:py-32 scroll-mt-24 relative overflow-hidden bg-brand-beige rounded-t-[48px] border-t border-brand-gold/20 shadow-[0_-30px_60px_rgba(0,0,0,0.08)] z-20">
        {/* Elegant Arabesque Side Engraving Ornament on the side */}
        <div className="absolute left-0 top-0 bottom-0 w-32 md:w-52 overflow-hidden pointer-events-none select-none z-0 opacity-15 text-brand-gold-dark">
          <svg 
            className="h-full w-full" 
            viewBox="0 0 100 600" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            {/* Elegant repeated vertical arabesque patterns */}
            <path d="M 50,0 Q 15,35 50,70 Q 85,35 50,0 Z" />
            <path d="M 50,70 Q 15,105 50,140 Q 85,105 50,70 Z" />
            <path d="M 50,140 Q 15,175 50,210 Q 85,175 50,140 Z" />
            <path d="M 50,210 Q 15,245 50,280 Q 85,245 50,210 Z" />
            <path d="M 50,280 Q 15,315 50,350 Q 85,315 50,280 Z" />
            <path d="M 50,350 Q 15,385 50,420 Q 85,385 50,350 Z" />
            <path d="M 50,420 Q 15,455 50,490 Q 85,455 50,420 Z" />
            <path d="M 50,490 Q 15,525 50,560 Q 85,525 50,490 Z" />
            <path d="M 50,560 Q 15,595 50,630 Q 85,595 50,560 Z" />
            
            {/* Nested premium details */}
            <path d="M 50,15 C 30,35 30,35 50,55 C 70,35 70,35 50,15" />
            <path d="M 50,85 C 30,105 30,105 50,125 C 70,105 70,105 50,85" />
            <path d="M 50,155 C 30,175 30,175 50,195 C 70,175 70,175 50,155" />
            <path d="M 50,225 C 30,245 30,245 50,265 C 70,245 70,245 50,225" />
            <path d="M 50,295 C 30,315 30,315 50,335 C 70,315 70,315 50,295" />
            <path d="M 50,365 C 30,385 30,385 50,405 C 70,385 70,385 50,365" />
            <path d="M 50,435 C 30,455 30,455 50,475 C 70,455 70,455 50,435" />
            <path d="M 50,505 C 30,525 30,525 50,545 C 70,525 70,525 50,505" />
            
            {/* Swirling ornamental scroll elements */}
            <path d="M -15,35 Q 20,35 20,70" />
            <path d="M 115,35 Q 80,35 80,70" />
            <path d="M -15,105 Q 20,105 20,140" />
            <path d="M 115,105 Q 80,105 80,140" />
            <path d="M -15,175 Q 20,175 20,210" />
            <path d="M 115,175 Q 80,175 80,210" />
            <path d="M -15,245 Q 20,245 20,280" />
            <path d="M 115,245 Q 80,245 80,280" />
            <path d="M -15,315 Q 20,315 20,350" />
            <path d="M 115,315 Q 80,315 80,350" />
            <path d="M -15,385 Q 20,385 20,420" />
            <path d="M 115,385 Q 80,385 80,420" />
            <path d="M -15,455 Q 20,455 20,490" />
            <path d="M 115,455 Q 80,455 80,490" />
            <path d="M -15,525 Q 20,525 20,560" />
            <path d="M 115,525 Q 80,525 80,560" />
          </svg>
        </div>

        {/* Dynamic Floating Massage-Stroke Blobs (Gold, Primary Brown, White) for About Section */}
        <div className="absolute inset-0 overflow-hidden opacity-30 blur-[120px] pointer-events-none z-0">
          {/* Gold wave stroke */}
          <div className="absolute top-[-10%] right-[10%] w-[50%] h-[50%] rounded-full bg-brand-gold animate-wave-2 opacity-50" />
          {/* Primary Brown wave stroke */}
          <div className="absolute bottom-[10%] left-[5%] w-[45%] h-[45%] rounded-full bg-brand-brown animate-wave-1 opacity-25" />
          {/* White light wave stroke */}
          <div className="absolute top-[30%] left-[30%] w-[40%] h-[40%] rounded-full bg-white animate-wave-3 opacity-60" />
        </div>

        {/* Subtle background decoration */}
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-brand-gold/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-brand-gold/10 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Column 1: Image & Highlight Stats (5 cols) */}
            <div className="lg:col-span-5 relative order-last lg:order-first">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/60">
                <img
                  src="https://pvhgmczyccgkpzxkiolq.supabase.co/storage/v1/object/public/web/Melt%20into%20Relaxation.jpg"
                  alt="High-end sanctuary interiors"
                  referrerPolicy="no-referrer"
                  className="w-full h-[380px] sm:h-[480px] object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-brown/60 via-transparent to-transparent" />
              </div>

              {/* Float Decorative Card with counter */}
              <div className={`absolute bottom-6 bg-brand-brown text-white p-5 rounded-2xl shadow-xl flex items-center gap-4 max-w-xs border border-white/10 ${
                isRtl ? 'right-6' : 'left-6'
              }`}>
                <div className="w-12 h-12 rounded-full bg-brand-gold flex items-center justify-center text-brand-brown shrink-0">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-bold font-mono tracking-tight text-brand-gold">
                    <AnimatedCounter target={200} suffix="+" />
                  </h4>
                  <p className="text-[10px] sm:text-xs text-white/80 font-medium leading-tight mt-0.5 font-cairo">
                    {t.about.sessionsLabel}
                  </p>
                </div>
              </div>
            </div>

            {/* Column 2: Story, Badges, Values (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <span className="text-xs font-bold text-brand-gold-dark tracking-widest uppercase font-cairo">
                {t.about.tagline}
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-text font-cairo mt-3 mb-6 tracking-tight">
                {t.about.title}
              </h2>
              
              <p className="text-sm sm:text-base text-brand-text/80 mb-4 leading-relaxed font-light">
                {t.about.p1}
              </p>
              
              <p className="text-sm sm:text-base text-brand-text/80 mb-8 leading-relaxed font-light">
                {t.about.p2}
              </p>

              {/* Dynamic Badges Block */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-brand-brown/10 pt-8 mb-8">
                
                {/* Badge 1: Certified Staff */}
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-gold/10 text-brand-gold flex items-center justify-center shrink-0">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-brand-text font-cairo">
                      {t.about.certifiedStaff}
                    </h4>
                    <p className="text-xs text-brand-text/60 mt-1 leading-relaxed">
                      {t.about.certifiedStaffDesc}
                    </p>
                  </div>
                </div>

                {/* Badge 2: Safe/Hygienic */}
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-gold/10 text-brand-gold flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-brand-text font-cairo">
                      {t.about.hygiene}
                    </h4>
                    <p className="text-xs text-brand-text/60 mt-1 leading-relaxed">
                      {t.about.hygieneDesc}
                    </p>
                  </div>
                </div>

              </div>

              {/* Quick statistics row */}
              <div className="grid grid-cols-3 gap-4 border-t border-brand-brown/5 pt-6 text-center">
                <div>
                  <h4 className="text-2xl sm:text-3xl font-extrabold text-brand-gold-dark font-mono">
                    <AnimatedCounter target={10} suffix="+" />
                  </h4>
                  <p className="text-[10px] text-brand-text/60 mt-1 font-cairo">
                    {t.about.experienceLabel}
                  </p>
                </div>
                <div>
                  <h4 className="text-2xl sm:text-3xl font-extrabold text-brand-gold-dark font-mono">
                    <AnimatedCounter target={100} suffix="%" />
                  </h4>
                  <p className="text-[10px] text-brand-text/60 mt-1 font-cairo">
                    {t.about.satisfactionLabel}
                  </p>
                </div>
                <div>
                  <h4 className="text-2xl sm:text-3xl font-extrabold text-brand-gold-dark font-mono">
                    <AnimatedCounter target={500} suffix="+" />
                  </h4>
                  <p className="text-[10px] text-brand-text/60 mt-1 font-cairo">
                    {isRtl ? 'مراجعة 5 نجوم' : '5-Star Reviews'}
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Latest Offers Banner Section (Parallax Split-Screen, styled with dark background and Divider 4 Asymmetric Wave) */}
      <section ref={bannerRef} id="special-offers" className="py-24 bg-[#1A110F] relative overflow-hidden scroll-mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px] overflow-hidden rounded-3xl border border-brand-gold/15 shadow-2xl relative bg-[#231816]">
            
            {/* Left Media Column (With vertical parallax scroll effect) */}
            <div className="lg:col-span-6 relative min-h-[300px] lg:min-h-full overflow-hidden">
              <motion.div 
                style={{ y: bannerVideoY }}
                className="absolute inset-0 w-full h-[120%] top-[-10%]"
              >
                <img
                  src="https://pvhgmczyccgkpzxkiolq.supabase.co/storage/v1/object/public/web/spa2.jpg"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover"
                  alt="Premium Spa Experience"
                />
                <video
                  src="https://assets.mixkit.co/videos/preview/mixkit-treatment-of-hot-massage-stones-on-the-back-41804-large.mp4"
                  className="absolute inset-0 w-full h-full object-cover opacity-75"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              </motion.div>
              {/* Luxury dark gold overlay matching identity */}
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-brand-brown via-brand-brown/15 to-transparent z-10" />
            </div>

            {/* Right Text Column (Gracefully slides in from side) with Custom Background Image */}
            <motion.div 
              initial={{ opacity: 0, x: isRtl ? 60 : -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1.1, ease: [0.25, 1, 0.5, 1] }}
              className="lg:col-span-6 p-8 sm:p-12 lg:p-16 flex flex-col justify-center relative overflow-hidden z-20"
              style={{
                backgroundImage: 'url("https://pvhgmczyccgkpzxkiolq.supabase.co/storage/v1/object/public/web/Gemini_Generated_Image_kri1hzkri1hzkri1.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              {/* Ultra luxurious dark glassmorphism overlay */}
              <div className="absolute inset-0 bg-brand-brown/90 backdrop-blur-[3px] z-0" />

              <div className="relative z-10">
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-brand-gold text-brand-brown text-[10px] font-bold uppercase tracking-widest rounded-full font-cairo">
                    {isRtl ? 'عرض لفترة محدودة' : 'LIMITED TIME OFFER'}
                  </span>
                </div>
                
                <h3 className="text-3xl sm:text-4xl font-extrabold text-white font-cairo leading-tight tracking-wide mb-2">
                  {isRtl ? 'الباقة المغربية الملكية المتكاملة' : 'Royal Moroccan Integrated Package'}
                </h3>
                
                <p className="text-brand-gold text-lg sm:text-xl font-medium font-cairo mb-6">
                  {isRtl ? 'مساج مغربي ٦٠ دقيقة + حمام مغربي بالبخار' : 'Moroccan Massage 60 Min + Steam Moroccan Bath'}
                </p>

                <p className="text-sm text-white/70 font-light leading-relaxed mb-8">
                  {isRtl 
                    ? 'دلل حواسك مع باقة الاستشفاء المتكاملة الكبرى لرجال النخبة. تبدأ التجربة بالحمام المغربي الفاخر بالبخار الساخن، الصابون البلدي والتقشير العضوي لإزالة السموم وتجديد خلايا البشرة، تليها جلسة تدليك علاجي ممتدة لمدة ساعة كاملة بالزيوت المغربية الدافئة لتفكيك تشنجات العضلات وتحقيق الاسترخاء المطلق.' 
                    : 'Treat your senses to the grand integrated recovery package for elite gentlemen. The experience begins with a hot steam Moroccan bath, black soap, and organic exfoliation to detoxify and renew skin cells, followed by a full 60-minute therapeutic massage with warm Moroccan oils to dissolve muscle tension and achieve ultimate relaxation.'}
                </p>

                {/* Pricing and Action Block with Animated Wavy Color Background */}
                <div 
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10 border border-brand-gold/20 p-6 rounded-2xl relative overflow-hidden mt-2"
                  style={{
                    background: 'linear-gradient(135deg, #231816, #3D1F1C, #2C1310, #170F0E)',
                    backgroundSize: '400% 400%',
                    animation: 'wavyGradientAnimation 10s ease infinite'
                  }}
                >
                  {/* Dynamic keyframes injected inline */}
                  <style dangerouslySetInnerHTML={{ __html: `
                    @keyframes wavyGradientAnimation {
                      0% { background-position: 0% 50% }
                      50% { background-position: 100% 50% }
                      100% { background-position: 0% 50% }
                    }
                    @keyframes waveMoveEffect {
                      0% { transform: translateX(0) translateZ(0) scaleY(1); }
                      50% { transform: translateX(-25%) translateZ(0) scaleY(0.8); }
                      100% { transform: translateX(-50%) translateZ(0) scaleY(1); }
                    }
                  ` }} />

                  {/* Gentle ambient wave layer */}
                  <div className="absolute inset-0 opacity-15 pointer-events-none mix-blend-overlay">
                    <svg className="absolute w-[200%] h-full top-0 left-0" viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ animation: 'waveMoveEffect 15s linear infinite' }}>
                      <path d="M0,60 C150,100 350,20 500,60 C650,100 850,20 1000,60 C1150,100 1350,20 1500,60 L1500,120 L0,120 Z" fill="#D4AF37" />
                    </svg>
                  </div>

                  <div className="relative z-10">
                    <span className="block text-xs text-white/60 uppercase tracking-wider mb-1 font-cairo font-bold">
                      {isRtl ? 'سعر العرض الخاص' : 'Special Offer Price'}
                    </span>
                    <div className="flex items-baseline gap-3">
                      <span className="text-3xl font-extrabold text-brand-gold font-mono">
                        {isRtl ? '٣٥٠ ر.س' : '350 SAR'}
                      </span>
                      <span className="text-sm text-white/40 line-through font-mono">
                        {isRtl ? '٥٠٠ ر.س' : '500 SAR'}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleOpenBooking('moroccan-bath-60')}
                    className="w-full sm:w-auto h-12 px-8 bg-brand-gold text-brand-brown hover:bg-brand-gold-light hover:scale-105 active:scale-95 transition-all duration-300 font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-2 cursor-pointer shadow-lg rounded-xl relative z-10"
                  >
                    <Calendar className="w-4 h-4" />
                    {isRtl ? 'احجز هذا العرض الآن' : 'Book This Offer Now'}
                  </button>
                </div>
              </div>

            </motion.div>

          </div>

        </div>

        {/* Divider 4: Asymmetric Organic Wave transitioning from dark bg to light testimonials bg */}
        <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden pointer-events-none z-10">
          <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1440 74" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,32 C240,70 480,0 720,40 C960,80 1200,10 1440,48 L1440,74 L0,74 Z" fill="#F4F1EA" className="fill-brand-beige transition-colors duration-500" />
          </svg>
        </div>
      </section>

      {/* 4. Testimonials Slider Section (Translations toggle, auto slider, with Divider 5 Deep Shadow Depth) */}
      <section id="testimonials" className="py-24 sm:py-32 bg-brand-beige scroll-mt-12 relative z-20 shadow-[0_25px_60px_rgba(0,0,0,0.15)] overflow-hidden">
        {/* Background Image with 30% Opacity */}
        <div 
          className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-30 z-0"
          style={{ backgroundImage: 'url("https://pvhgmczyccgkpzxkiolq.supabase.co/storage/v1/object/public/web/spa%203.jpg")' }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold text-brand-gold-dark tracking-widest uppercase font-cairo">
              {isRtl ? 'تجربة ضيوف روح' : 'GUEST SATISFACTION'}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-text font-cairo mt-3 mb-4 tracking-tight">
              {t.testimonials.title}
            </h2>
            <div className="w-16 h-1 bg-brand-gold mx-auto mb-5 rounded-full" />
            <p className="text-sm sm:text-base text-brand-text/70 leading-relaxed font-light">
              {t.testimonials.subtitle}
            </p>
          </div>

          {/* Testimonial slider Carousel */}
          <TestimonialSlider lang={lang} />

        </div>
      </section>

      {/* 5. Footer & Contact Section (Contact cards & interactive lead form) */}
      <section id="contact" className="bg-brand-brown text-white py-24 sm:py-32 scroll-mt-12 relative overflow-hidden">
        {/* Background Image with 50% Opacity */}
        <div 
          className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-50 z-0"
          style={{ backgroundImage: 'url("https://pvhgmczyccgkpzxkiolq.supabase.co/storage/v1/object/public/web/spa%203.jpg")' }}
        />
        {/* Deep luxurious overlay to maintain high-contrast text readability */}
        <div className="absolute inset-0 bg-brand-brown/75 z-0 pointer-events-none" />

        {/* Abstract luxury gold lines/circles behind */}
        <div className="absolute top-0 left-0 w-80 h-80 rounded-full border border-brand-gold/5 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full border border-brand-gold/5 translate-x-1/3 translate-y-1/3 pointer-events-none z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <span className="text-xs font-bold text-brand-gold tracking-widest uppercase font-cairo">
              {isRtl ? 'خطوتك التالية للاستشفاء' : 'CONTACT & BOOKINGS'}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-cairo mt-3 mb-4 tracking-tight">
              {t.contact.title}
            </h2>
            <div className="w-16 h-1 bg-brand-gold mx-auto mb-5 rounded-full" />
            <p className="text-sm sm:text-base text-white/70 leading-relaxed font-light">
              {t.contact.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Compact Icons and Colored Map (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl text-center">
                <p className="text-sm font-cairo text-white/80 mb-6 font-medium">
                  {isRtl ? 'قنوات التواصل المباشر السريعة:' : 'Direct Contact Channels:'}
                </p>
                
                <div className="flex justify-center items-center gap-8 sm:gap-12">
                  {/* WhatsApp Icon Button */}
                  <a
                    href={isRtl 
                      ? "https://wa.me/966565296149?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D8%AD%D8%AC%D8%B2%20%D8%AC%D9%84%D8%B3%D8%A9%20%D8%A7%D8%B3%D8%AA%D8%B1%D8%AE%D8%A7%D8%A1%20%D9%81%D9%8A%20%D9%85%D8%B1%D9%83%D8%B2%20%D8%B1%D9%88%D8%AD%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D8%B1%D8%AE%D8%A7%D8%A1."
                      : "https://wa.me/966565296149?text=Hello%20Rooh%20Spa%2C%20I%20would%20like%20to%20book%20a%20session."
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 group transition-transform duration-300 hover:scale-110"
                    title={t.contact.whatsappTitle}
                  >
                    <div className="w-14 h-14 rounded-full bg-green-500/10 text-green-400 flex items-center justify-center border border-green-500/20 group-hover:bg-green-500 group-hover:text-white group-hover:border-green-500 transition-all duration-300 shadow-lg group-hover:shadow-green-500/20">
                      <MessageSquare className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-cairo font-semibold text-white/70 group-hover:text-brand-gold transition-colors">
                      {isRtl ? 'واتساب' : 'WhatsApp'}
                    </span>
                  </a>

                  {/* Phone Icon Button */}
                  <a
                    href="tel:0565296149"
                    className="flex flex-col items-center gap-2 group transition-transform duration-300 hover:scale-110"
                    title={t.contact.phoneTitle}
                  >
                    <div className="w-14 h-14 rounded-full bg-brand-gold/10 text-brand-gold flex items-center justify-center border border-brand-gold/20 group-hover:bg-brand-gold group-hover:text-[#1C1412] group-hover:border-brand-gold transition-all duration-300 shadow-lg group-hover:shadow-brand-gold/20">
                      <Phone className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-cairo font-semibold text-white/70 group-hover:text-brand-gold transition-colors text-center">
                      <div>{isRtl ? 'اتصال مباشر' : 'Direct Call'}</div>
                      <div className="text-[10px] text-white/40 font-mono mt-0.5">0565296149</div>
                    </span>
                  </a>

                  {/* Location Icon Button */}
                  <a
                    href="https://share.google/y8nCaB64M4h9wsKOb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 group transition-transform duration-300 hover:scale-110"
                    title={t.contact.addressTitle}
                  >
                    <div className="w-14 h-14 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20 group-hover:bg-blue-500 group-hover:text-white group-hover:border-blue-500 transition-all duration-300 shadow-lg group-hover:shadow-blue-500/20">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-cairo font-semibold text-white/70 group-hover:text-brand-gold transition-colors">
                      {isRtl ? 'موقعنا' : 'Location'}
                    </span>
                  </a>
                </div>
              </div>

              {/* Embedded Google Map (Fully Colored and Vibrant) */}
              <div className="bg-white/5 border border-white/10 p-3 rounded-2xl overflow-hidden shadow-inner relative group">
                <iframe
                  title="Rooh Spa Map Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2688.4880668964042!2d39.252337788645!3d21.59336580858344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15c3d34d15408081%3A0xe224c72e90d63bbd!2z2YXYsdmD2LIg2LHZiNitINiz2KjYpyDZhNin2LPYqtis2YXYp9mF!5e0!3m2!1sar!2seg!4v1783842510646!5m2!1sar!2seg"
                  className="w-full h-56 rounded-xl border-0 opacity-100 transition-opacity duration-300"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
                <div className="absolute bottom-5 right-5 z-10">
                  <a
                    href="https://share.google/y8nCaB64M4h9wsKOb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-gold text-brand-brown text-[10px] font-bold uppercase tracking-wider rounded-lg shadow-md hover:scale-105 transition-all duration-300 hover:bg-white hover:text-brand-brown"
                  >
                    <MapPin className="w-3 h-3" />
                    {isRtl ? 'افتح في الخرائط' : 'Open in Maps'}
                  </a>
                </div>
              </div>

            </div>

            {/* Right Column: Direct WhatsApp Booking Selector Panel */}
            <div className="lg:col-span-7 bg-white/5 border border-white/10 p-8 rounded-3xl relative max-w-2xl mx-auto lg:max-w-none w-full">
              
              <div className="space-y-6">
                <div className="border-b border-white/5 pb-4">
                  <h3 className="text-2xl font-bold text-white tracking-wide font-cairo">
                    {isRtl ? 'حجز مباشر وسريع عبر واتساب' : 'Direct WhatsApp Booking'}
                  </h3>
                  <p className="text-sm text-white/60 mt-1 font-cairo leading-relaxed">
                    {isRtl 
                      ? 'اختر خدمتك المفضلة وسيتم تحويلك فوراً للواتساب لتأكيد موعدك مباشرة دون الحاجة لتعبئة نماذج طويلة.' 
                      : 'Choose your desired service and be instantly redirected to WhatsApp for direct booking, no forms required.'}
                  </p>
                </div>

                {/* Service Select Dropdown */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-white/80 uppercase tracking-wider font-cairo">
                    {isRtl ? 'اختر الخدمة المطلوبة:' : 'Select Desired Service:'}
                  </label>
                  <select
                    value={contactService}
                    onChange={(e) => setContactService(e.target.value)}
                    className="w-full h-12 bg-[#231816] border border-white/10 rounded-xl px-4 text-sm text-white focus:outline-none focus:border-brand-gold/60 cursor-pointer font-cairo"
                  >
                    <option value="">{isRtl ? 'اختر جلسة...' : 'Select a service...'}</option>
                    {SERVICES_DATA.map((srv) => (
                      <option key={srv.id} value={srv.id}>
                        {srv.title[lang]} - {srv.price[lang]}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Live Message Preview Box */}
                {contactService && (
                  <div className="p-4 bg-white/5 border border-white/5 rounded-2xl space-y-2 animate-fade-in">
                    <span className="text-[10px] uppercase tracking-wider text-brand-gold font-bold font-cairo block">
                      {isRtl ? 'معاينة رسالتك التلقائية:' : 'Your Automatic Message Preview:'}
                    </span>
                    <div className="p-3 bg-brand-brown/40 rounded-xl border border-white/5 text-xs text-white/80 leading-relaxed font-cairo relative">
                      <div className="absolute right-3 top-3 w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      {(() => {
                        const selectedSrv = SERVICES_DATA.find(s => s.id === contactService);
                        if (selectedSrv) {
                          const cleanPrice = selectedSrv.price.ar.replace(' ريال', '').replace(' SAR', '');
                          return `السلام عليكم، أرغب في حجز خدمة: ${selectedSrv.title.ar} - بسعر: ${cleanPrice} ريال. أرجو تأكيد الموعد المتاح.`;
                        }
                        return '';
                      })()}
                    </div>
                  </div>
                )}

                {/* Simple Steps Indicators */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-center">
                  <div className="p-3 bg-white/5 rounded-xl border border-white/5 flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-brand-gold/15 flex items-center justify-center text-brand-gold font-bold text-xs mb-2">1</div>
                    <span className="text-xs font-bold text-white/90 font-cairo">{isRtl ? 'اختر الخدمة' : 'Choose Service'}</span>
                  </div>
                  <div className="p-3 bg-white/5 rounded-xl border border-white/5 flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-brand-gold/15 flex items-center justify-center text-brand-gold font-bold text-xs mb-2">2</div>
                    <span className="text-xs font-bold text-white/90 font-cairo">{isRtl ? 'اضغط احجز الآن' : 'Click Book Now'}</span>
                  </div>
                  <div className="p-3 bg-white/5 rounded-xl border border-white/5 flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-brand-gold/15 flex items-center justify-center text-brand-gold font-bold text-xs mb-2">3</div>
                    <span className="text-xs font-bold text-white/90 font-cairo">{isRtl ? 'تأكيد بالواتساب' : 'Confirm on WhatsApp'}</span>
                  </div>
                </div>

                {/* Direct Redirect Button */}
                <button
                  onClick={() => handleOpenBooking(contactService)}
                  className="w-full h-14 bg-brand-gold text-brand-brown hover:bg-brand-beige font-bold rounded-xl text-sm font-cairo flex items-center justify-center gap-2.5 cursor-pointer shadow-lg hover:shadow-brand-gold/10 transition-all duration-300 transform active:scale-95"
                >
                  <MessageSquare className="w-5 h-5 text-brand-brown" />
                  {isRtl ? 'احجز جلستك الآن عبر واتساب' : 'Book Your Session Now via WhatsApp'}
                </button>
              </div>

            </div>

          </div>

          {/* Footer Social Media Bar */}
          <div className="flex flex-col items-center gap-3 mt-12">
            <span className="text-xs uppercase tracking-widest text-brand-gold font-bold font-cairo">
              {isRtl ? 'تواصل معنا عبر شبكاتنا الاجتماعية' : 'CONNECT WITH US ON SOCIALS'}
            </span>
            <div className="flex items-center gap-4 mt-2">
              {/* TikTok */}
              <a 
                href="https://www.tiktok.com/@rooh.spaa" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-black hover:border-black transition-all duration-300 transform hover:scale-110 shadow-lg group"
                title="TikTok"
              >
                <svg className="w-5 h-5 transition-transform duration-300 group-hover:rotate-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .8.11v-3.5a6.34 6.34 0 0 0-1.5-.18 6.39 6.39 0 0 0-6.39 6.39 6.39 6.39 0 0 0 6.39 6.39 6.4 6.4 0 0 0 6.39-6.39V7.51a8.2 8.2 0 0 0 4.22 1.22V5.28a8.11 8.11 0 0 1-3.77-1.41z" />
                </svg>
              </a>

              {/* Instagram */}
              <a 
                href="https://www.instagram.com/roohspaa" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7] hover:border-transparent transition-all duration-300 transform hover:scale-110 shadow-lg group"
                title="Instagram"
              >
                <svg className="w-5 h-5 transition-transform duration-300 group-hover:rotate-6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>

              {/* Snapchat */}
              <a 
                href="https://www.snapchat.com/@roohspa3?share_id=bpMuMPJgOPo&locale=ar-EG" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:text-black hover:bg-[#FFFC00] hover:border-[#FFFC00] transition-all duration-300 transform hover:scale-110 shadow-lg group"
                title="Snapchat"
              >
                <svg className="w-5 h-5 transition-transform duration-300 group-hover:rotate-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2c-3.953 0-5.5 2.5-5.5 5 0 .814.28 1.48.51 2.03.11.26.15.42-.03.6-.28.28-.96.86-1.56 1.37-.52.44-.61.76-.23.99.36.22 1.58.4 2.38.54.21.03.35.12.35.34 0 .33-.3 1.54-.36 1.83-.17.81.4 1.33.99 1.33.39 0 .84-.18 1.25-.45.34-.23.51-.23.83 0 .74.52 1.63.95 2.65.95 1.02 0 1.91-.43 2.65-.95.32-.23.49-.23.83 0 .41.27.86.45 1.25.45.59 0 1.16-.52.99-1.33-.06-.29-.36-1.5-.36-1.83 0-.22.14-.31.35-.34.8-.14 2.02-.32 2.38-.54.38-.23.29-.55-.23-.99-.6-.51-1.28-1.09-1.56-1.37-.18-.18-.14-.34-.03-.6.23-.55.51-1.216.51-2.03 0-2.5-1.547-5-5-5z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Footer Bottom Credentials Block */}
          <div className="mt-12 pt-8 border-t border-white/5 text-center text-xs text-white/40 leading-relaxed font-cairo flex flex-col items-center justify-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-white/5 backdrop-blur-sm flex items-center justify-center p-2 border border-white/10 shadow-lg">
              <img 
                src="https://pvhgmczyccgkpzxkiolq.supabase.co/storage/v1/object/public/web/Untitled%20-%20June%2020,%202026%20at%2012.55.15-18.png" 
                alt="Rooh Spa Logo" 
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <p className="font-cairo">
                &copy; {new Date().getFullYear()} {t.navbar.logo}. {isRtl ? 'جميع الحقوق محفوظة.' : 'All Rights Reserved.'}
              </p>
              <p className="mt-1 text-[10px] uppercase tracking-widest text-brand-gold/40 font-cairo">
                {isRtl ? 'علاج طبي متكامل ونظافة فندقية' : 'Medical Grade Sterility & Hospitality'} | JEDDAH, AL-SAMER
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 7. High-End 360° Virtual Tour Modal */}
      <VirtualTourModal
        isOpen={isTourOpen}
        onClose={() => setIsTourOpen(false)}
        lang={lang}
      />

      {/* Immersive Floating Side Rails */}
      <div className="hidden xl:flex fixed left-6 top-1/2 -translate-y-1/2 flex-col gap-14 opacity-25 z-30 pointer-events-none">
        <div className="rotate-90 text-[8px] uppercase tracking-[0.4em] font-black text-brand-brown">Wellness</div>
        <div className="rotate-90 text-[8px] uppercase tracking-[0.4em] font-black text-brand-brown">Health</div>
        <div className="rotate-90 text-[8px] uppercase tracking-[0.4em] font-black text-brand-brown">Soul</div>
      </div>
      <div className="hidden xl:flex fixed right-6 top-1/2 -translate-y-1/2 flex-col gap-14 opacity-25 z-30 pointer-events-none">
        <div className="-rotate-90 text-[8px] uppercase tracking-[0.4em] font-black text-brand-brown">عناية</div>
        <div className="-rotate-90 text-[8px] uppercase tracking-[0.4em] font-black text-brand-brown">استشفاء</div>
        <div className="-rotate-90 text-[8px] uppercase tracking-[0.4em] font-black text-brand-brown">هدوء</div>
      </div>
    </div>
  );
}

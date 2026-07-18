import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ChevronLeft, ChevronRight, Quote, Sparkles } from 'lucide-react';
import { Testimonial, Language } from '../types';
import { TESTIMONIALS_DATA } from '../data';

interface TestimonialSliderProps {
  lang: Language;
}

export function TestimonialSlider({ lang }: TestimonialSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const isRtl = lang === 'ar';

  const nextSlide = () => {
    setDirection(isRtl ? 'prev' : 'next'); // Invert relative slide feeling for RTL
    setCurrentIndex((prevIndex) => (prevIndex + 1) % TESTIMONIALS_DATA.length);
  };

  const prevSlide = () => {
    setDirection(isRtl ? 'next' : 'prev');
    setCurrentIndex((prevIndex) => (prevIndex - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length);
  };

  useEffect(() => {
    if (isAutoPlaying) {
      timerRef.current = setInterval(() => {
        nextSlide();
      }, 6000);
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isAutoPlaying, lang]); // re-trigger on lang change to align direction

  const currentTestimonial = TESTIMONIALS_DATA[currentIndex];

  // Motion animation variables
  const slideVariants = {
    enter: (dir: 'next' | 'prev') => ({
      x: dir === 'next' ? (isRtl ? -100 : 100) : (isRtl ? 100 : -100),
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1], // premium ease-out cubic
      },
    },
    exit: (dir: 'next' | 'prev') => ({
      x: dir === 'next' ? (isRtl ? 100 : -100) : (isRtl ? -100 : 100),
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.4,
        ease: 'easeIn',
      },
    }),
  };

  return (
    <div 
      className="relative max-w-4xl mx-auto px-4 py-8"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
      id="testimonial-slider-container"
    >
      {/* Decorative Top Sparkle and Quote Icons */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 flex items-center justify-center gap-1 opacity-25">
        <Sparkles className="w-5 h-5 text-brand-gold animate-pulse" />
      </div>

      {/* Main Slider Display Card */}
      <div className="relative min-h-[320px] sm:min-h-[260px] bg-brand-cream border border-brand-brown/5 rounded-3xl p-8 sm:p-12 shadow-xl overflow-hidden mt-6 flex flex-col justify-between">
        {/* Subtle Luxury Corner Accents */}
        <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-brand-gold/30 rounded-tl" />
        <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-brand-gold/30 rounded-tr" />
        <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-brand-gold/30 rounded-bl" />
        <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-brand-gold/30 rounded-br" />

        <div className="absolute top-8 right-8 text-brand-gold/10 pointer-events-none">
          <Quote className="w-24 h-24 rotate-180" />
        </div>

        <AnimatePresence initial={false} mode="wait" custom={direction}>
          <motion.div
            key={`${currentIndex}-${lang}`}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="flex flex-col h-full z-10"
          >
            {/* Rating Stars */}
            <div className="flex gap-1 mb-5">
              {[...Array(currentTestimonial.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-brand-gold text-brand-gold" />
              ))}
            </div>

            {/* Testimonial Core Text */}
            <p className="text-base sm:text-lg text-brand-text/90 italic leading-relaxed mb-6 font-playfair font-amiri tracking-wide">
              "{currentTestimonial.text[lang]}"
            </p>

            {/* Author Profile Information */}
            <div className="mt-auto flex items-center justify-between pt-6 border-t border-brand-brown/10">
              <div>
                <h4 className="text-base font-bold text-brand-text font-cairo">
                  {currentTestimonial.name[lang]}
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="inline-block px-2 py-0.5 text-[10px] tracking-wider bg-brand-gold/10 text-brand-gold font-semibold rounded">
                    {currentTestimonial.role[lang]}
                  </span>
                  <span className="text-[11px] text-brand-text/50">
                    {currentTestimonial.date[lang]}
                  </span>
                </div>
              </div>

              {/* Verified Badge */}
              <div className="hidden sm:flex items-center gap-1.5 text-xs text-green-700 bg-green-50 px-3 py-1 rounded-full border border-green-200/50 font-medium font-cairo">
                <span className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse" />
                {isRtl ? 'رأي موثق' : 'Verified Review'}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows & Dot Indicators Container */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 px-2">
        {/* Pagination Dots */}
        <div className="flex gap-2 Order-last sm:order-first">
          {TESTIMONIALS_DATA.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > currentIndex ? (isRtl ? 'prev' : 'next') : (isRtl ? 'next' : 'prev'));
                setCurrentIndex(i);
              }}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                i === currentIndex ? 'w-8 bg-brand-gold' : 'w-2 bg-brand-text/20 hover:bg-brand-text/40'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Action Arrows */}
        <div className="flex gap-3">
          <button
            onClick={prevSlide}
            className="w-11 h-11 rounded-full bg-brand-brown text-white hover:bg-brand-gold hover:text-brand-brown transition-all duration-300 flex items-center justify-center border border-brand-brown/10 shadow-md cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
            aria-label="Previous testimonial"
          >
            {isRtl ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
          <button
            onClick={nextSlide}
            className="w-11 h-11 rounded-full bg-brand-brown text-white hover:bg-brand-gold hover:text-brand-brown transition-all duration-300 flex items-center justify-center border border-brand-brown/10 shadow-md cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
            aria-label="Next testimonial"
          >
            {isRtl ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
}

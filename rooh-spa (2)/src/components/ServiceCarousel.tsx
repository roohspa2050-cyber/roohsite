import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { Service, Language } from '../types';
import { ServiceCard } from './ServiceCard';

interface ServiceCarouselProps {
  services: Service[];
  lang: Language;
  onBook: (serviceId: string) => void;
}

export function ServiceCarousel({ services, lang, onBook }: ServiceCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(4);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const isRtl = lang === 'ar';

  // Determine number of visible cards based on screen size
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setVisibleCards(1);
      } else if (width < 1024) {
        setVisibleCards(2);
      } else if (width < 1280) {
        setVisibleCards(3);
      } else {
        setVisibleCards(4);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, services.length - visibleCards);

  // Auto scroll effect
  useEffect(() => {
    if (!isPlaying || isDragging || maxIndex === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4500);

    return () => clearInterval(interval);
  }, [isPlaying, isDragging, maxIndex]);

  // Adjust current index if visible cards changes and index becomes out of bounds
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [visibleCards, maxIndex, currentIndex]);

  const handleNext = () => {
    if (maxIndex === 0) return;
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const handlePrev = () => {
    if (maxIndex === 0) return;
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleDragEnd = (event: any, info: any) => {
    setIsDragging(false);
    const swipeThreshold = 50; // pixels
    const { offset } = info;

    // In RTL, the drag direction is mirrored compared to LTR
    // LTR: Dragging left (negative offset) goes to next. Dragging right (positive offset) goes to prev.
    // RTL: Dragging left (negative offset) goes to next. Dragging right (positive offset) goes to prev.
    // Wait, since we translate with multiplier, if we swipe left we still want the next card to appear.
    if (offset.x < -swipeThreshold) {
      handleNext();
    } else if (offset.x > swipeThreshold) {
      handlePrev();
    }
  };

  const multiplier = -1;
  const xOffset = currentIndex * (100 / visibleCards) * multiplier;

  return (
    <div 
      className="relative w-full select-none"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
      onTouchStart={() => setIsPlaying(false)}
      onTouchEnd={() => setIsPlaying(true)}
      id="services-carousel-container"
    >
      {/* Upper Navigation Indicator (Premium minimalist label) */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2 text-xs font-cairo text-brand-gold-dark font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span>
            {isRtl 
              ? `${currentIndex + 1} - ${Math.min(currentIndex + visibleCards, services.length)} من أصل ${services.length}`
              : `${currentIndex + 1} - ${Math.min(currentIndex + visibleCards, services.length)} of ${services.length}`}
          </span>
        </div>

        {/* Carousel Arrow Navigation */}
        {maxIndex > 0 && (
          <div className="flex gap-2" dir="ltr">
            <button
              onClick={() => {
                handlePrev();
                setIsPlaying(false);
              }}
              className="w-10 h-10 rounded-full border border-brand-brown/10 hover:border-brand-gold bg-white hover:bg-[#D4AF37]/5 text-brand-brown hover:text-brand-gold-dark transition-all duration-300 flex items-center justify-center cursor-pointer shadow-sm hover:scale-105 active:scale-95"
              aria-label="Previous service"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => {
                handleNext();
                setIsPlaying(false);
              }}
              className="w-10 h-10 rounded-full border border-brand-brown/10 hover:border-brand-gold bg-white hover:bg-[#D4AF37]/5 text-brand-brown hover:text-brand-gold-dark transition-all duration-300 flex items-center justify-center cursor-pointer shadow-sm hover:scale-105 active:scale-95"
              aria-label="Next service"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {/* Main Slider Track Viewport */}
      <div 
        ref={sliderRef}
        className="overflow-hidden py-4 px-1 rounded-2xl cursor-grab active:cursor-grabbing"
        dir="ltr"
      >
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.1}
          onDragStart={() => {
            setIsDragging(true);
            setIsPlaying(false);
          }}
          onDragEnd={handleDragEnd}
          animate={{ x: `${xOffset}%` }}
          transition={{
            type: "tween",
            ease: "easeInOut",
            duration: 0.8
          }}
          className="flex flex-row w-full"
        >
          {services.map((service, index) => {
            // Calculate if this card is currently visible
            const isVisible = index >= currentIndex && index < currentIndex + visibleCards;
            
            return (
              <div
                key={service.id}
                style={{ width: `${100 / visibleCards}%` }}
                className="px-3 shrink-0 transition-opacity duration-500"
              >
                <motion.div
                  animate={{
                    scale: isVisible ? 1 : 0.95,
                    opacity: isVisible ? 1 : 0.5,
                  }}
                  transition={{ duration: 0.4 }}
                  className="h-full"
                >
                  <ServiceCard
                    service={service}
                    lang={lang}
                    onBook={onBook}
                  />
                </motion.div>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Bottom Pagination Dots */}
      {maxIndex > 0 && (
        <div className="flex justify-center items-center gap-2.5 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-2 transition-all duration-500 rounded-full cursor-pointer ${
                currentIndex === i 
                  ? 'w-8 bg-brand-gold shadow-md shadow-[#D4AF37]/30' 
                  : 'w-2 bg-brand-brown/20 hover:bg-brand-brown/40'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, RotateCw, Sparkles, MapPin, Award, CheckCircle } from 'lucide-react';
import { Language } from '../types';

interface VirtualTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export function VirtualTourModal({ isOpen, onClose, lang }: VirtualTourModalProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const isRtl = lang === 'ar';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-brown/85 backdrop-blur-md"
        >
          {/* Modal Card */}
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="bg-[#1C1412] border border-brand-gold/30 rounded-3xl w-full max-w-4xl overflow-hidden shadow-2xl relative flex flex-col"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-30 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="p-6 border-b border-white/5 bg-black/20 flex items-center justify-between">
              <div className={isRtl ? 'text-right' : 'text-left'}>
                <span className="text-[10px] tracking-widest uppercase font-bold text-brand-gold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  {isRtl ? 'تجربة تفاعلية ثلاثية الأبعاد' : 'INTERACTIVE 360° EXPERIENCE'}
                </span>
                <h3 className="text-xl font-bold text-white mt-1 font-cairo">
                  {isRtl ? 'جولة افتراضية في أروقة روح الاسترخاء' : 'Virtual Walkthrough of Rooh Spa'}
                </h3>
              </div>
            </div>

            {/* Tour Frame Container */}
            <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden group">
              {!isPlaying ? (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 text-center text-white">
                  {/* Backdrop Background image */}
                  <img 
                    src="https://pvhgmczyccgkpzxkiolq.supabase.co/storage/v1/object/public/web/spa1.jpg" 
                    alt="Spa Interior" 
                    className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-multiply transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Glowing Play Circle */}
                  <button 
                    onClick={() => setIsPlaying(true)}
                    className="w-20 h-20 rounded-full bg-brand-gold text-brand-brown flex items-center justify-center shadow-lg shadow-brand-gold/20 hover:scale-110 active:scale-95 transition-all duration-300 relative z-20 cursor-pointer"
                  >
                    <Play className="w-8 h-8 fill-brand-brown translate-x-0.5" />
                    <span className="absolute inset-0 rounded-full border-2 border-brand-gold animate-ping opacity-75" />
                  </button>

                  <h4 className="text-xl font-bold font-cairo mt-6 relative z-20">
                    {isRtl ? 'ابدأ الجولة الافتراضية عالية الدقة' : 'Start High-Definition Virtual Tour'}
                  </h4>
                  <p className="text-xs text-white/60 mt-1.5 max-w-md relative z-20 leading-relaxed font-light">
                    {isRtl 
                      ? 'استكشف غرف المساج الفردية والمشتركة، الحمام المغربي، ومنطقة الاستقبال من هاتفك أو حاسوبك'
                      : 'Explore private therapy rooms, the royal Moroccan bath suite, and our luxury reception directly from your screen'}
                  </p>
                </div>
              ) : (
                <iframe
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1" // Premium VR embed or similar video placeholder
                  title="Rooh Spa 360 VR"
                  className="w-full h-full border-0 absolute inset-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              )}
            </div>

            {/* Features Info Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6 bg-black/40 border-t border-white/5 text-center text-white/70 text-xs leading-relaxed font-light">
              <div className="flex items-center gap-3 justify-center sm:justify-start">
                <div className="w-8 h-8 rounded-full bg-brand-gold/10 text-brand-gold flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className={isRtl ? 'text-right' : 'text-left'}>
                  <p className="font-bold text-white">{isRtl ? 'جدة - السامر' : 'Jeddah - Al-Samer'}</p>
                  <p className="text-[10px] text-white/50">{isRtl ? 'موقع مميز وسهل الوصول' : 'Strategic Premium Location'}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 justify-center sm:justify-start">
                <div className="w-8 h-8 rounded-full bg-brand-gold/10 text-brand-gold flex items-center justify-center shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div className={isRtl ? 'text-right' : 'text-left'}>
                  <p className="font-bold text-white">{isRtl ? 'عقم طبي بنسبة 100%' : '100% Medical Sterility'}</p>
                  <p className="text-[10px] text-white/50">{isRtl ? 'أعلى معايير النظافة والتعقيم' : 'Highest Hygiene Standards'}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 justify-center sm:justify-start">
                <div className="w-8 h-8 rounded-full bg-brand-gold/10 text-brand-gold flex items-center justify-center shrink-0">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <div className={isRtl ? 'text-right' : 'text-left'}>
                  <p className="font-bold text-white">{isRtl ? 'خصوصية تامة' : 'Absolute Privacy'}</p>
                  <p className="text-[10px] text-white/50">{isRtl ? 'أجنحة مغلقة لكل ضيف' : 'Closed Private Suites'}</p>
                </div>
              </div>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

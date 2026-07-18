import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Calendar, RotateCcw, ArrowRight, ArrowLeft, CheckCircle2, Award } from 'lucide-react';
import { Language } from '../types';
import { SERVICES_DATA } from '../data';

interface InteractiveQuizProps {
  lang: Language;
  onBook: (serviceId: string) => void;
}

interface Question {
  id: number;
  text: { ar: string; en: string };
  options: {
    id: string;
    text: { ar: string; en: string };
    desc: { ar: string; en: string };
  }[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: {
      ar: "ما هو مستوى نشاطك البدني وضغوطاتك اليومية؟",
      en: "What is your daily activity level and physical stress?"
    },
    options: [
      {
        id: "high-stress",
        text: { ar: "نشاط بدني عالٍ وإرهاق عضلي", en: "High physical activity / muscle fatigue" },
        desc: { ar: "تمارين مكثفة، حركة مستمرة، أو شد عضلي دائم", en: "Intense workouts, constant movement, or chronic stiffness" }
      },
      {
        id: "desk-job",
        text: { ar: "وظيفة مكتبية وجلوس طويل", en: "Desk job / prolonged sitting" },
        desc: { ar: "آلام في الظهر والرقبة بسبب الجلوس لساعات طويلة", en: "Lower back, shoulder, and neck strain from screen time" }
      },
      {
        id: "general-fatigue",
        text: { ar: "خمول وتعب عام وضغط ذهني", en: "General fatigue & mental burnout" },
        desc: { ar: "بحاجة لتصفية الذهن واستعادة طاقتك الحيوية", en: "Looking to clear your mind and restore vital energy levels" }
      }
    ]
  },
  {
    id: 2,
    text: {
      ar: "ما هو الهدف الرئيسي الذي تود تحقيقه اليوم؟",
      en: "What is your primary goal for today's session?"
    },
    options: [
      {
        id: "muscle-relief",
        text: { ar: "تخفيف الآلام وتفكيك العضلات", en: "Deep muscle & tension relief" },
        desc: { ar: "إزالة التشنجات العضلية والتعافي الرياضي العميق", en: "Melt knots, relieve deep soreness, and boost recovery" }
      },
      {
        id: "mental-relaxation",
        text: { ar: "استرخاء ذهني ونفسي كامل", en: "Absolute mental relaxation & peace" },
        desc: { ar: "الهروب من صخب الحياة والتمتع بهدوء حسي مطلق", en: "Unwind your senses, calm the mind, and experience bliss" }
      },
      {
        id: "skin-care",
        text: { ar: "تنقية البشرة والجلد وتجديد الخلايا", en: "Skin purification & cell renewal" },
        desc: { ar: "تقشير عميق، تنظيف فائق، وتنعيم متكامل للبشرة", en: "Deep exfoliation, detoxification, and cellular renewal" }
      }
    ]
  },
  {
    id: 3,
    text: {
      ar: "ما هو الأسلوب المفضل والطقوس التي تستهويك؟",
      en: "What is your preferred ritual style?"
    },
    options: [
      {
        id: "traditional-hammam",
        text: { ar: "الحمام الملكي أو المغربي الفاخر", en: "Royal or Premium Moroccan Bath" },
        desc: { ar: "بخار دافئ، ليفة مغربية، وصابون بلدي بالأعشاب والزيوت العطرية لتنقية البشرة", en: "Warm steam, authentic Kessa scrub, herbal black soap, and essential oils" }
      },
      {
        id: "deep-massage",
        text: { ar: "مساج استرخائي مركز (إندونيسي أو مغربي)", en: "Focused relaxing massage (Indonesian or Moroccan)" },
        desc: { ar: "ضربات احترافية وزيوت دافئة من معالجين معتمدين لتفكيك العقد العضلية", en: "Expert strokes and warm therapeutic oils from certified therapists to melt stress" }
      },
      {
        id: "full-package",
        text: { ar: "باقات المساج مع الحمام المغربي (الدمج المثالي)", en: "Combined Massage & Moroccan Bath (Full Package)" },
        desc: { ar: "الدمج الفاخر بين جلسة التدليك وحمام البخار الاستشفائي لنتائج قصوى", en: "The ultimate luxury blending of deep massage and full steaming Moroccan bath" }
      }
    ]
  }
];

export function InteractiveQuiz({ lang, onBook }: InteractiveQuizProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResult, setShowResult] = useState(false);

  const isRtl = lang === 'ar';

  const handleOptionSelect = (optionId: string) => {
    setAnswers(prev => ({ ...prev, [currentStep]: optionId }));
  };

  const handleNext = () => {
    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowResult(false);
  };

  // Determine recommendation based on answers
  const getRecommendation = () => {
    const a1 = answers[0]; // activity
    const a2 = answers[1]; // goal
    const a3 = answers[2]; // style

    // Find the closest service matching our new 9 services:
    if (a3 === 'full-package') {
      if (a1 === 'high-stress') {
        // High stress & full package -> Moroccan Package (60 min) + Moroccan Bath
        return SERVICES_DATA.find(s => s.id === 'moroccan-bath-60') || SERVICES_DATA[7];
      } else if (a1 === 'desk-job') {
        // Desk job & full package -> Indonesian Package (60 min) + Moroccan Bath
        return SERVICES_DATA.find(s => s.id === 'indonesian-bath-60') || SERVICES_DATA[5];
      } else {
        // General fatigue & full package -> Moroccan Package (45 min) + Moroccan Bath
        return SERVICES_DATA.find(s => s.id === 'moroccan-bath-45') || SERVICES_DATA[6];
      }
    }

    if (a3 === 'traditional-hammam' || a2 === 'skin-care') {
      if (a1 === 'high-stress' || a2 === 'skin-care') {
        // Ultimate volcanic/mud cleansing -> Royal Bath
        return SERVICES_DATA.find(s => s.id === 'royal-bath') || SERVICES_DATA[8];
      } else {
        // Standard package with bath -> Indonesian Package (45 Min) + Moroccan Bath
        return SERVICES_DATA.find(s => s.id === 'indonesian-bath-45') || SERVICES_DATA[4];
      }
    }

    if (a3 === 'deep-massage' || a2 === 'muscle-relief') {
      if (a1 === 'high-stress') {
        // Moroccan Massage 60 min
        return SERVICES_DATA.find(s => s.id === 'moroccan-massage-60') || SERVICES_DATA[3];
      } else if (a1 === 'desk-job') {
        // Indonesian Massage 60 min
        return SERVICES_DATA.find(s => s.id === 'indonesian-massage-60') || SERVICES_DATA[1];
      } else {
        // Moroccan Massage 45 min
        return SERVICES_DATA.find(s => s.id === 'moroccan-massage-45') || SERVICES_DATA[2];
      }
    }

    return SERVICES_DATA.find(s => s.id === 'indonesian-massage-45') || SERVICES_DATA[0];
  };

  const recommendedService = showResult ? getRecommendation() : null;

  return (
    <div className="w-full max-w-3xl mx-auto bg-brand-brown/95 backdrop-blur-md border border-brand-gold/20 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden text-white my-8">
      {/* Background Ornament pattern */}
      <div className="absolute inset-0 opacity-[0.03] bg-repeat pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("https://pvhgmczyccgkpzxkiolq.supabase.co/storage/v1/object/public/web/Phone%20Wallpaper.jpg")' }} />

      <AnimatePresence mode="wait">
        {!showResult ? (
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: isRtl ? -30 : 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isRtl ? 30 : -30 }}
            transition={{ duration: 0.4 }}
            className="relative z-10"
          >
            {/* Steps indicator */}
            <div className="flex items-center justify-between mb-8">
              <span className="text-[10px] tracking-widest uppercase font-bold text-brand-gold">
                {isRtl ? 'مستشار العناية الافتراضي' : 'Virtual Wellness Advisor'}
              </span>
              <div className="flex gap-1.5">
                {QUESTIONS.map((_, idx) => (
                  <div 
                    key={idx} 
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === currentStep ? 'w-8 bg-brand-gold' : 'w-2 bg-white/20'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Question Text */}
            <h3 className="text-xl sm:text-2xl font-bold font-cairo mb-8 leading-tight">
              {QUESTIONS[currentStep].text[lang]}
            </h3>

            {/* Options list */}
            <div className="space-y-4 mb-10">
              {QUESTIONS[currentStep].options.map((option) => {
                const isSelected = answers[currentStep] === option.id;
                return (
                  <button
                    key={option.id}
                    onClick={() => handleOptionSelect(option.id)}
                    className={`w-full text-right p-4 sm:p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between group cursor-pointer ${
                      isSelected 
                        ? 'bg-brand-gold text-brand-brown border-brand-gold shadow-lg shadow-brand-gold/10' 
                        : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-brand-gold/30'
                    }`}
                  >
                    <div className={isRtl ? 'text-right' : 'text-left'}>
                      <span className={`block text-sm sm:text-base font-bold ${isSelected ? 'text-brand-brown' : 'text-white'}`}>
                        {option.text[lang]}
                      </span>
                      <span className={`block text-xs mt-1 font-light ${isSelected ? 'text-brand-brown/85' : 'text-white/60'}`}>
                        {option.desc[lang]}
                      </span>
                    </div>
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                      isSelected ? 'border-brand-brown bg-brand-brown text-brand-gold' : 'border-white/30 group-hover:border-brand-gold/50'
                    }`}>
                      {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-brand-gold" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-white/10">
              <button
                onClick={handlePrev}
                disabled={currentStep === 0}
                className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                  currentStep === 0 ? 'text-white/20 cursor-not-allowed' : 'text-white/60 hover:text-white'
                }`}
              >
                {isRtl ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
                {isRtl ? 'السابق' : 'Previous'}
              </button>

              <button
                onClick={handleNext}
                disabled={!answers[currentStep]}
                className={`h-11 px-6 bg-brand-gold text-brand-brown font-bold text-xs uppercase tracking-widest flex items-center gap-2 cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-40 disabled:hover:scale-100 disabled:cursor-not-allowed`}
              >
                {currentStep === QUESTIONS.length - 1 ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-pulse" />
                    {isRtl ? 'اكتشف النتيجة' : 'Reveal Result'}
                  </>
                ) : (
                  <>
                    {isRtl ? 'التالي' : 'Next'}
                    {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                  </>
                )}
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 25 }}
            className="text-center relative z-10"
          >
            <div className="w-16 h-16 rounded-full bg-brand-gold/15 flex items-center justify-center text-brand-gold mx-auto mb-6 border border-brand-gold/30">
              <Award className="w-8 h-8" />
            </div>

            <span className="text-xs font-bold text-brand-gold uppercase tracking-widest">
              {isRtl ? 'طقسك المثالي الموصى به' : 'YOUR DESIGNATED RITUAL'}
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-2 mb-6 font-cairo">
              {recommendedService?.title[lang]}
            </h3>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 max-w-xl mx-auto text-right" dir={isRtl ? 'rtl' : 'ltr'}>
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4 text-xs font-medium text-white/70">
                <span>{isRtl ? 'المدة:' : 'Duration:'} <span className="text-brand-gold">{recommendedService?.duration[lang]}</span></span>
                <span>{isRtl ? 'السعر المقدر:' : 'Est. Price:'} <span className="text-brand-gold font-bold">{recommendedService?.price[lang]}</span></span>
              </div>
              <p className="text-sm text-white/80 leading-relaxed font-light mb-4 text-center">
                {recommendedService?.description[lang]}
              </p>
              <div className="space-y-2 max-w-sm mx-auto">
                {recommendedService?.benefits[lang].slice(0, 3).map((b, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-white/70 justify-center">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
              <button
                onClick={() => recommendedService && onBook(recommendedService.id)}
                className="w-full h-12 bg-brand-gold text-brand-brown font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg shadow-brand-gold/25"
              >
                <Calendar className="w-4 h-4" />
                {isRtl ? 'احجز هذه الجلسة الآن' : 'Book This Session Now'}
              </button>
              
              <button
                onClick={handleReset}
                className="w-full sm:w-auto h-12 px-6 bg-transparent border border-white/20 text-white/60 hover:text-white hover:border-white/40 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer transition-all duration-300"
              >
                <RotateCcw className="w-4 h-4" />
                {isRtl ? 'أعد الاختبار' : 'Retake Quiz'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

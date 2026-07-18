import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, User, Phone, Clipboard, CheckCircle, Sparkles } from 'lucide-react';
import { Service, Language } from '../types';
import { SERVICES_DATA, TRANSLATIONS } from '../data';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedServiceId: string;
  lang: Language;
}

export function BookingModal({ isOpen, onClose, selectedServiceId, lang }: BookingModalProps) {
  const [serviceId, setServiceId] = useState(selectedServiceId);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingRef, setBookingRef] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const t = TRANSLATIONS[lang].bookingModal;
  const isRtl = lang === 'ar';

  // Sync selected service when the modal is opened with a specific service
  useEffect(() => {
    if (isOpen) {
      setServiceId(selectedServiceId);
      setIsSuccess(false);
      setIsLoading(false);
      setErrors({});
    }
  }, [isOpen, selectedServiceId]);

  // Lock scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const validate = () => {
    const tempErrors: Record<string, string> = {};
    if (!serviceId) tempErrors.service = isRtl ? 'يرجى اختيار الخدمة' : 'Please select a service';
    if (!date) tempErrors.date = isRtl ? 'يرجى تحديد التاريخ' : 'Please select a date';
    if (!time) tempErrors.time = isRtl ? 'يرجى اختيار وقت الزيارة' : 'Please select a time';
    
    if (!name.trim()) {
      tempErrors.name = isRtl ? 'الاسم مطلوب' : 'Name is required';
    } else if (name.trim().length < 3) {
      tempErrors.name = isRtl ? 'الاسم يجب أن يكون ٣ أحرف على الأقل' : 'Name must be at least 3 characters';
    }

    if (!phone.trim()) {
      tempErrors.phone = isRtl ? 'رقم الجوال مطلوب' : 'Phone number is required';
    } else {
      // Saudi phone format validation check
      const saudiRegex = /^(05|5)\d{8}$/;
      if (!saudiRegex.test(phone.trim().replace(/\s/g, ''))) {
        tempErrors.phone = isRtl ? 'صيغة جوال غير صحيحة (مثال: 05xxxxxxxx)' : 'Invalid Saudi phone number (e.g. 05xxxxxxxx)';
      }
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);

    // Simulate luxury API call that locks in appointment times
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      // Generate a nice random reference ID
      const randomId = `ROOH-${Math.floor(1000 + Math.random() * 9000)}`;
      setBookingRef(randomId);
    }, 2000);
  };

  // Find currently selected service details for the summary
  const selectedServiceDetails = SERVICES_DATA.find((s) => s.id === serviceId);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-brand-brown/80 backdrop-blur-md">
          {/* Modal Backdrop animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 cursor-pointer"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-lg bg-brand-beige border border-brand-brown/10 rounded-3xl shadow-2xl overflow-hidden z-10"
            dir={isRtl ? 'rtl' : 'ltr'}
          >
            {/* Header close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2 text-brand-brown/60 hover:text-brand-brown hover:bg-brand-brown/5 rounded-full transition-colors cursor-pointer"
              aria-label={t.closeBtn}
            >
              <X className="w-5 h-5" />
            </button>

            {/* Simulated Loading State */}
            {isLoading && (
              <div className="flex flex-col items-center justify-center p-12 min-h-[450px] text-center">
                <div className="relative w-16 h-16 mb-6">
                  {/* Outer circle spinning */}
                  <div className="absolute inset-0 rounded-full border-4 border-brand-gold/20 border-t-brand-gold animate-spin" />
                  {/* Inner logo design glowing */}
                  <div className="absolute inset-3 rounded-full bg-brand-brown flex items-center justify-center text-white text-[10px] font-bold tracking-widest">
                    ROOH
                  </div>
                </div>
                <h3 className="text-xl font-bold text-brand-brown font-cairo font-montserrat">
                  {isRtl ? 'جاري تأمين موعدك الفاخر...' : 'Securing your premium slot...'}
                </h3>
                <p className="text-sm text-brand-brown/60 mt-2 max-w-xs leading-relaxed">
                  {isRtl 
                    ? 'نقوم بالتنسيق مع أخصائي الاستشفاء لحجز الفترة الزمنية التي حددتها.'
                    : 'Syncing with our recovery specialists to reserve your selected time block.'}
                </p>
              </div>
            )}

            {/* Success Booking Screen */}
            {!isLoading && isSuccess && (
              <div className="p-8 sm:p-10">
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="relative mb-4">
                    <div className="absolute -inset-1 bg-brand-gold/30 rounded-full blur animate-pulse" />
                    <CheckCircle className="w-16 h-16 text-brand-gold relative z-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-brand-brown font-cairo">
                    {t.successTitle}
                  </h3>
                  <p className="text-xs font-semibold text-brand-gold-dark mt-1 tracking-wider uppercase font-montserrat font-cairo">
                    {t.successSubtitle}
                  </p>
                </div>

                {/* Booking Receipt Summary Card */}
                <div className="bg-brand-cream border border-brand-brown/5 rounded-2xl p-6 mb-6 text-sm">
                  {/* Reference number */}
                  <div className="flex items-center justify-between border-b border-brand-brown/10 pb-3 mb-3 font-mono">
                    <span className="text-brand-brown/60 text-xs uppercase">{t.referenceLabel}</span>
                    <span className="font-bold text-brand-gold-dark text-base tracking-wider">{bookingRef}</span>
                  </div>

                  <p className="font-bold text-brand-brown mb-3 border-b border-brand-brown/5 pb-2 text-xs">
                    {t.appointmentDetails}
                  </p>

                  {/* Summary Details */}
                  <div className="space-y-3 font-cairo font-montserrat">
                    <div className="flex justify-between items-start gap-4">
                      <span className="text-brand-brown/60">{isRtl ? 'الخدمة' : 'Service'}:</span>
                      <span className="font-bold text-brand-brown text-right">{selectedServiceDetails?.title[lang]}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-brand-brown/60">{isRtl ? 'التاريخ' : 'Date'}:</span>
                      <span className="font-bold text-brand-brown">{date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-brand-brown/60">{isRtl ? 'وقت الوصول' : 'Arrival Time'}:</span>
                      <span className="font-bold text-brand-brown">{time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-brand-brown/60">{isRtl ? 'الضيف' : 'Guest'}:</span>
                      <span className="font-bold text-brand-brown">{name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-brand-brown/60">{isRtl ? 'رقم الجوال' : 'Phone'}:</span>
                      <span className="font-bold text-brand-brown inline-block" dir="ltr" style={{ unicodeBidi: 'plaintext' }}>{phone}</span>
                    </div>
                  </div>
                </div>

                {/* Instructions */}
                <div className="bg-yellow-50 border border-yellow-200/60 rounded-xl p-4 text-xs text-brand-brown/90 leading-relaxed mb-6">
                  <div className="flex items-center gap-1.5 font-bold mb-1 text-brand-gold-dark">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isRtl ? 'تنبيهات هامة للزيارة' : 'Important Visit Details'}</span>
                  </div>
                  {t.successMsg}
                </div>

                {/* Back button */}
                <button
                  onClick={onClose}
                  className="w-full h-12 bg-brand-brown text-white font-bold rounded-xl hover:bg-brand-gold hover:text-brand-brown transition-colors duration-300 font-cairo font-montserrat text-sm cursor-pointer shadow-md"
                >
                  {isRtl ? 'العودة للموقع' : 'Return to Website'}
                </button>
              </div>
            )}

            {/* Standard Form Screen */}
            {!isLoading && !isSuccess && (
              <form onSubmit={handleSubmit} className="p-6 sm:p-8">
                {/* Modal Titles */}
                <div className="mb-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-brand-brown font-cairo pr-6">
                    {t.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-brand-brown/60 mt-1 leading-relaxed">
                    {t.subtitle}
                  </p>
                </div>

                {/* Form fields */}
                <div className="space-y-4 max-h-[60vh] overflow-y-auto no-scrollbar pr-1">
                  {/* Service Field */}
                  <div>
                    <label className="block text-xs font-bold text-brand-brown/80 mb-1.5 font-cairo font-montserrat">
                      {t.serviceLabel}
                    </label>
                    <div className="relative">
                      <select
                        value={serviceId}
                        onChange={(e) => setServiceId(e.target.value)}
                        className={`w-full h-11 bg-white border rounded-xl px-4 text-sm text-brand-brown focus:outline-none focus:ring-2 focus:ring-brand-gold/50 cursor-pointer appearance-none ${
                          errors.service ? 'border-red-500' : 'border-brand-brown/10'
                        }`}
                      >
                        <option value="">{isRtl ? 'اختر جلسة...' : 'Select a session...'}</option>
                        {SERVICES_DATA.map((srv) => (
                          <option key={srv.id} value={srv.id}>
                            {srv.title[lang]} ({srv.price[lang]})
                          </option>
                        ))}
                      </select>
                      {/* Custom dropdown arrow */}
                      <div className={`absolute inset-y-0 flex items-center pointer-events-none text-brand-brown/40 ${isRtl ? 'left-4' : 'right-4'}`}>
                        <Clipboard className="w-4 h-4" />
                      </div>
                    </div>
                    {errors.service && <p className="text-red-500 text-[11px] mt-1">{errors.service}</p>}
                  </div>

                  {/* Date & Time Fields Row */}
                  <div className="grid grid-cols-2 gap-4">
                    {/* Date picker */}
                    <div>
                      <label className="block text-xs font-bold text-brand-brown/80 mb-1.5 font-cairo font-montserrat">
                        {t.dateLabel}
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          value={date}
                          min={new Date().toISOString().split('T')[0]} // restrict past dates
                          onChange={(e) => setDate(e.target.value)}
                          className={`w-full h-11 bg-white border rounded-xl px-3 text-sm text-brand-brown focus:outline-none focus:ring-2 focus:ring-brand-gold/50 cursor-pointer ${
                            errors.date ? 'border-red-500' : 'border-brand-brown/10'
                          }`}
                        />
                      </div>
                      {errors.date && <p className="text-red-500 text-[11px] mt-1">{errors.date}</p>}
                    </div>

                    {/* Time picker */}
                    <div>
                      <label className="block text-xs font-bold text-brand-brown/80 mb-1.5 font-cairo font-montserrat">
                        {t.timeLabel}
                      </label>
                      <div className="relative">
                        <input
                          type="time"
                          value={time}
                          onChange={(e) => setTime(e.target.value)}
                          className={`w-full h-11 bg-white border rounded-xl px-3 text-sm text-brand-brown focus:outline-none focus:ring-2 focus:ring-brand-gold/50 cursor-pointer ${
                            errors.time ? 'border-red-500' : 'border-brand-brown/10'
                          }`}
                        />
                      </div>
                      {errors.time && <p className="text-red-500 text-[11px] mt-1">{errors.time}</p>}
                    </div>
                  </div>

                  {/* Name field */}
                  <div>
                    <label className="block text-xs font-bold text-brand-brown/80 mb-1.5 font-cairo font-montserrat">
                      {t.nameLabel}
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder={isRtl ? 'محمد أحمد' : 'John Doe'}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={`w-full h-11 bg-white border rounded-xl px-4 text-sm text-brand-brown focus:outline-none focus:ring-2 focus:ring-brand-gold/50 ${
                          errors.name ? 'border-red-500' : 'border-brand-brown/10'
                        }`}
                      />
                      <div className={`absolute inset-y-0 flex items-center text-brand-brown/30 ${isRtl ? 'left-4' : 'right-4'}`}>
                        <User className="w-4 h-4" />
                      </div>
                    </div>
                    {errors.name && <p className="text-red-500 text-[11px] mt-1">{errors.name}</p>}
                  </div>

                  {/* Phone field */}
                  <div>
                    <label className="block text-xs font-bold text-brand-brown/80 mb-1.5 font-cairo font-montserrat">
                      {t.phoneLabel}
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        placeholder="05xxxxxxxx"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className={`w-full h-11 bg-white border rounded-xl px-4 text-sm text-brand-brown focus:outline-none focus:ring-2 focus:ring-brand-gold/50 text-left ${
                          errors.phone ? 'border-red-500' : 'border-brand-brown/10'
                        }`}
                        dir="ltr"
                      />
                      <div className={`absolute inset-y-0 flex items-center text-brand-brown/30 ${isRtl ? 'left-4' : 'right-4'}`}>
                        <Phone className="w-4 h-4" />
                      </div>
                    </div>
                    {errors.phone && <p className="text-red-500 text-[11px] mt-1">{errors.phone}</p>}
                  </div>

                  {/* Notes / Special requests */}
                  <div>
                    <label className="block text-xs font-bold text-brand-brown/80 mb-1.5 font-cairo font-montserrat">
                      {t.notesLabel}
                    </label>
                    <textarea
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder={isRtl ? 'مثال: تفضيل الضغط المتوسط، تجنب أسفل الظهر، إلخ.' : 'e.g. Medium pressure preference, avoid lower back, etc.'}
                      className="w-full bg-white border border-brand-brown/10 rounded-xl p-3 text-sm text-brand-brown focus:outline-none focus:ring-2 focus:ring-brand-gold/50"
                    />
                  </div>
                </div>

                {/* Form submit footer button */}
                <div className="mt-6 pt-4 border-t border-brand-brown/10">
                  <button
                    type="submit"
                    className="w-full h-12 bg-brand-brown text-white font-bold rounded-xl hover:bg-brand-gold hover:text-brand-brown transition-colors duration-300 font-cairo font-montserrat text-sm cursor-pointer shadow-md"
                  >
                    {t.confirmBtn}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

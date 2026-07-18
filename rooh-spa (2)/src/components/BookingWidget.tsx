import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, ChevronRight, ChevronLeft } from 'lucide-react';
import { Language } from '../types';

interface BookingWidgetProps {
  lang: Language;
  onSelect: (dateString: string, timeString: string) => void;
  initialDate?: string;
  initialTime?: string;
}

const MONTHS_AR = [
  'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
  'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
];

const MONTHS_EN = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const WEEKDAYS_AR = ['أحد', 'إثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'];
const WEEKDAYS_EN = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export function BookingWidget({ lang, onSelect, initialDate = '', initialTime = '' }: BookingWidgetProps) {
  const isRtl = lang === 'ar';

  // Initialize with current real-time today's date
  const today = new Date();
  const [currentYear, setCurrentYear] = useState<number>(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState<number>(today.getMonth());
  
  const [selectedDateStr, setSelectedDateStr] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');

  // Available luxurious time slots
  const slots = [
    { value: '10:00 AM', label: { ar: '10:00 صباحاً', en: '10:00 AM' } },
    { value: '12:00 PM', label: { ar: '12:00 ظهراً', en: '12:00 PM' } },
    { value: '02:00 PM', label: { ar: '02:00 ظهراً', en: '02:00 PM' } },
    { value: '04:00 PM', label: { ar: '04:00 عصراً', en: '04:00 PM' } },
    { value: '06:00 PM', label: { ar: '06:00 مساءً', en: '06:00 PM' } },
    { value: '08:00 PM', label: { ar: '08:00 مساءً', en: '08:00 PM' } },
    { value: '10:00 PM', label: { ar: '10:00 مساءً', en: '10:00 PM' } },
  ];

  // Helper to format Date to YYYY-MM-DD cleanly using local timezone values to prevent offset shifts
  const formatDateString = (d: Date): string => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    // Determine dynamic default or initial date on open
    let defaultDate = today;
    if (initialDate) {
      const parsed = new Date(initialDate);
      if (!isNaN(parsed.getTime())) {
        defaultDate = parsed;
      }
    }

    const dateStr = formatDateString(defaultDate);
    setSelectedDateStr(dateStr);
    setCurrentYear(defaultDate.getFullYear());
    setCurrentMonth(defaultDate.getMonth());

    const initialTimeStr = initialTime || slots[3].value; // default 4:00 PM
    setSelectedTimeSlot(initialTimeStr);

    onSelect(dateStr, initialTimeStr);
  }, [initialDate, initialTime]);

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(prev => prev - 1);
    } else {
      setCurrentMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(prev => prev + 1);
    } else {
      setCurrentMonth(prev => prev + 1);
    }
  };

  const handleMonthDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentMonth(parseInt(e.target.value, 10));
  };

  const handleYearDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentYear(parseInt(e.target.value, 10));
  };

  const handleDayClick = (dayNum: number) => {
    const selectedD = new Date(currentYear, currentMonth, dayNum);
    const dateStr = formatDateString(selectedD);
    setSelectedDateStr(dateStr);
    onSelect(dateStr, selectedTimeSlot);
  };

  const handleTimeSelect = (timeVal: string) => {
    setSelectedTimeSlot(timeVal);
    onSelect(selectedDateStr, timeVal);
  };

  // Month grid calculations
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();

  // Create grid cells
  const gridCells = [];
  // Blank days before the 1st of the month
  for (let i = 0; i < firstDayIndex; i++) {
    gridCells.push(null);
  }
  // Days of the month
  for (let d = 1; d <= daysInMonth; d++) {
    gridCells.push(d);
  }

  const todayMidnight = new Date();
  todayMidnight.setHours(0, 0, 0, 0);

  // Years option (Allow choosing/scrolling current year up to next 3 years)
  const currentYearNum = today.getFullYear();
  const yearOptions = [currentYearNum, currentYearNum + 1, currentYearNum + 2];

  return (
    <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5 relative overflow-hidden text-white space-y-4">
      {/* Label / Title */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-brand-gold uppercase">
          <CalendarIcon className="w-4 h-4 text-brand-gold" />
          <span>{isRtl ? 'اختر تاريخ ووقت الجلسة' : 'CHOOSE DATE & TIME'}</span>
        </div>
        <span className="text-[10px] text-white/50 bg-white/5 px-2 py-0.5 rounded border border-white/5 font-mono">
          {selectedDateStr}
        </span>
      </div>

      {/* Month & Year Navigation Header */}
      <div className="bg-[#1F1412] p-3 rounded-xl border border-white/5 space-y-3">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={handlePrevMonth}
            className="p-1.5 hover:bg-white/5 hover:text-brand-gold rounded-lg transition-colors cursor-pointer"
          >
            {isRtl ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>

          {/* Elegant Display of Month and Year */}
          <div className="flex items-center gap-2 font-cairo">
            <span className="text-sm font-bold tracking-wide text-brand-gold">
              {isRtl ? MONTHS_AR[currentMonth] : MONTHS_EN[currentMonth]}
            </span>
            <span className="text-sm font-medium text-white/70">
              {currentYear}
            </span>
          </div>

          <button
            type="button"
            onClick={handleNextMonth}
            className="p-1.5 hover:bg-white/5 hover:text-brand-gold rounded-lg transition-colors cursor-pointer"
          >
            {isRtl ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          </button>
        </div>

        {/* Quick Month & Year Dropdown/Selectors for effortless Year-round navigation */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <select
              value={currentMonth}
              onChange={handleMonthDropdownChange}
              className="w-full h-9 bg-brand-brown/80 border border-white/5 rounded-lg px-2 text-xs text-white/80 focus:outline-none focus:border-brand-gold/60 cursor-pointer"
            >
              {(isRtl ? MONTHS_AR : MONTHS_EN).map((mName, index) => (
                <option key={index} value={index} className="bg-brand-brown text-white">
                  {mName}
                </option>
              ))}
            </select>
          </div>
          <div>
            <select
              value={currentYear}
              onChange={handleYearDropdownChange}
              className="w-full h-9 bg-brand-brown/80 border border-white/5 rounded-lg px-2 text-xs text-white/80 focus:outline-none focus:border-brand-gold/60 cursor-pointer"
            >
              {yearOptions.map((yr) => (
                <option key={yr} value={yr} className="bg-brand-brown text-white">
                  {yr}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Weekday Labels Header */}
      <div className="grid grid-cols-7 gap-1 text-center text-[10px] uppercase font-bold text-white/40 tracking-wider">
        {(isRtl ? WEEKDAYS_AR : WEEKDAYS_EN).map((day, idx) => (
          <div key={idx} className="py-1">
            {day}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1">
        {gridCells.map((dayNum, idx) => {
          if (dayNum === null) {
            return <div key={`empty-${idx}`} />;
          }

          const cellDate = new Date(currentYear, currentMonth, dayNum);
          const cellDateStr = formatDateString(cellDate);
          const isSelected = cellDateStr === selectedDateStr;
          
          // Disable booking dates in the past
          const isPast = cellDate < todayMidnight;

          return (
            <button
              key={`day-${dayNum}`}
              type="button"
              disabled={isPast}
              onClick={() => handleDayClick(dayNum)}
              className={`h-9 sm:h-10 text-xs flex flex-col items-center justify-center rounded-lg border font-semibold transition-all duration-300 relative ${
                isPast
                  ? 'bg-transparent border-transparent text-white/10 cursor-not-allowed'
                  : isSelected
                  ? 'bg-brand-gold border-brand-gold text-brand-brown font-extrabold shadow-lg shadow-brand-gold/10'
                  : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-brand-gold/25 cursor-pointer text-white/90'
              }`}
            >
              <span>{dayNum}</span>
              {/* Subtle underline for today's real-time date */}
              {cellDateStr === formatDateString(today) && (
                <span className={`absolute bottom-1 w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-brand-brown' : 'bg-brand-gold animate-ping'}`} />
              )}
            </button>
          );
        })}
      </div>

      {/* Divider */}
      <div className="h-[1px] bg-white/5 my-2" />

      {/* Time Slots Selector */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-[10px] text-white/50 uppercase font-bold tracking-wider">
          <Clock className="w-3.5 h-3.5" />
          <span>{isRtl ? 'الأوقات المتاحة اليوم:' : 'Available Time Slots:'}</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {slots.map((slot) => {
            const isSelected = selectedTimeSlot === slot.value;
            return (
              <button
                key={slot.value}
                type="button"
                onClick={() => handleTimeSelect(slot.value)}
                className={`text-center py-2 px-3 rounded-xl border text-xs font-semibold transition-all duration-300 cursor-pointer ${
                  isSelected 
                    ? 'bg-white text-brand-brown border-white scale-102 shadow-md' 
                    : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-brand-gold/30'
                }`}
              >
                {slot.label[lang]}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}


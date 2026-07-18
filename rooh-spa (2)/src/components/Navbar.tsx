import { useState, useEffect } from 'react';
import { Menu, X, Languages, Calendar, ShieldCheck, Palette, Sparkles, Droplet } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data';

interface NavbarProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  onBookNow: () => void;
  theme: 'chocolate' | 'oceanic';
  onThemeToggle: () => void;
}

export function Navbar({ lang, onLanguageChange, onBookNow, theme, onThemeToggle }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const t = TRANSLATIONS[lang].navbar;
  const isRtl = lang === 'ar';

  // Monitor page scrolling to add background blur to navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLanguageToggle = () => {
    onLanguageChange(lang === 'ar' ? 'en' : 'ar');
  };

  const menuItems = [
    { label: t.services, href: '#services' },
    { label: t.about, href: '#about' },
    { label: t.testimonials, href: '#testimonials' },
    { label: t.contact, href: '#contact' },
  ];

  return (
    <header
      style={{
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className="fixed top-0 inset-x-0 z-40 bg-brand-brown shadow-lg border-b border-white/5"
      dir={isRtl ? 'rtl' : 'ltr'}
      id="main-app-header"
    >
      {/* Top social & info bar */}
      <div className="border-b border-white/5 bg-black/25 py-1.5 text-[11px] text-white/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2 font-cairo">
            <span className="text-brand-gold">📍</span>
            <span>{isRtl ? 'جدة، حي السامر' : 'Jeddah, Al-Samer'}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline font-cairo text-white/40">{isRtl ? 'تابعنا على منصاتنا:' : 'Follow us:'}</span>
            <div className="flex items-center gap-3">
              {/* TikTok */}
              <a 
                href="https://www.tiktok.com/@rooh.spaa" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-5 h-5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-black hover:border-black transition-all duration-300 transform hover:scale-110"
                title="TikTok"
              >
                <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .8.11v-3.5a6.34 6.34 0 0 0-1.5-.18 6.39 6.39 0 0 0-6.39 6.39 6.39 6.39 0 0 0 6.39 6.39 6.4 6.4 0 0 0 6.39-6.39V7.51a8.2 8.2 0 0 0 4.22 1.22V5.28a8.11 8.11 0 0 1-3.77-1.41z" />
                </svg>
              </a>
              {/* Instagram */}
              <a 
                href="https://www.instagram.com/roohspaa" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-5 h-5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7] hover:border-transparent transition-all duration-300 transform hover:scale-110"
                title="Instagram"
              >
                <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
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
                className="w-5 h-5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-black hover:bg-[#FFFC00] hover:border-[#FFFC00] transition-all duration-300 transform hover:scale-110"
                title="Snapchat"
              >
                <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2c-3.953 0-5.5 2.5-5.5 5 0 .814.28 1.48.51 2.03.11.26.15.42-.03.6-.28.28-.96.86-1.56 1.37-.52.44-.61.76-.23.99.36.22 1.58.4 2.38.54.21.03.35.12.35.34 0 .33-.3 1.54-.36 1.83-.17.81.4 1.33.99 1.33.39 0 .84-.18 1.25-.45.34-.23.51-.23.83 0 .74.52 1.63.95 2.65.95 1.02 0 1.91-.43 2.65-.95.32-.23.49-.23.83 0 .41.27.86.45 1.25.45.59 0 1.16-.52.99-1.33-.06-.29-.36-1.5-.36-1.83 0-.22.14-.31.35-.34.8-.14 2.02-.32 2.38-.54.38-.23.29-.55-.23-.99-.6-.51-1.28-1.09-1.56-1.37-.18-.18-.14-.34-.03-.6.23-.55.51-1.216.51-2.03 0-2.5-1.547-5-5-5z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          
          {/* Logo & Slogan block */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-12 h-12 rounded-xl bg-white/5 backdrop-blur-sm flex items-center justify-center p-1.5 border border-white/10 shadow-md group-hover:scale-105 transition-transform duration-300">
              <img 
                src="https://pvhgmczyccgkpzxkiolq.supabase.co/storage/v1/object/public/web/Untitled%20-%20June%2020,%202026%20at%2012.55.15-18.png" 
                alt="Rooh Spa Logo" 
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <span className="block text-lg font-bold text-white tracking-wider font-cairo group-hover:text-brand-gold transition-colors duration-300">
                {t.logo}
              </span>
              <span className="block text-[9px] text-brand-gold/80 tracking-widest uppercase font-cairo mt-0.5">
                {isRtl ? 'أفضل مركز علاجي بالمساج التخصصي بمدينة جدة' : 'PREMIUM MEN WELLNESS IN JEDDAH'}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-white/80 hover:text-brand-gold transition-colors duration-200 relative py-1 group font-cairo"
              >
                {item.label}
                {/* Underline expansion animation on hover */}
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
              </a>
            ))}
          </nav>

          {/* Languages and Action Area */}
          <div className="hidden md:flex items-center gap-5">
            {/* Theme Toggle Button */}
            <button
              onClick={onThemeToggle}
              className="flex items-center justify-center w-8 h-8 rounded-full border border-white/15 text-white/90 hover:text-brand-brown hover:bg-brand-gold hover:border-brand-gold transition-all duration-300 cursor-pointer group"
              title={isRtl ? 'تغيير سمة الألوان' : 'Switch Color Theme'}
            >
              {theme === 'chocolate' ? (
                <Droplet className="w-4 h-4 text-[#00C2CB] group-hover:text-brand-brown" />
              ) : (
                <Sparkles className="w-4 h-4 text-brand-gold group-hover:text-brand-brown" />
              )}
            </button>

            {/* Animated Language switcher button */}
            <button
              onClick={handleLanguageToggle}
              className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full border border-white/10 text-white hover:text-brand-brown hover:bg-brand-gold hover:border-brand-gold transition-all duration-300 cursor-pointer"
              title={isRtl ? 'Switch to English' : 'تحويل للغة العربية'}
            >
              <Languages className="w-3.5 h-3.5" />
              <span className="font-mono">{isRtl ? 'EN' : 'العربية'}</span>
            </button>

            {/* Book Appointment primary CTA */}
            <button
              onClick={onBookNow}
              className="h-10 px-5 bg-brand-gold text-brand-brown hover:bg-brand-beige hover:text-brand-brown transition-all duration-300 font-bold rounded-full text-xs font-cairo flex items-center gap-2 cursor-pointer shadow-md active:translate-y-0.5"
            >
              <Calendar className="w-3.5 h-3.5" />
              {t.bookNow}
            </button>
          </div>

          {/* Mobile responsive buttons */}
          <div className="flex md:hidden items-center gap-3">
            {/* Mobile Theme switcher shortcut */}
            <button
              onClick={onThemeToggle}
              className="p-2 text-white/80 hover:text-brand-gold border border-white/10 rounded-full transition-colors cursor-pointer"
              aria-label="Toggle theme"
              title={isRtl ? 'تغيير سمة الألوان' : 'Switch Color Theme'}
            >
              {theme === 'chocolate' ? (
                <Droplet className="w-4 h-4 text-[#00C2CB]" />
              ) : (
                <Sparkles className="w-4 h-4 text-brand-gold" />
              )}
            </button>

            {/* Language switcher shortcut */}
            <button
              onClick={handleLanguageToggle}
              className="p-2 text-white/80 hover:text-brand-gold border border-white/10 rounded-full transition-colors cursor-pointer"
              aria-label="Toggle language"
            >
              <Languages className="w-4 h-4" />
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-white/80 hover:text-brand-gold border border-white/10 rounded-full transition-colors cursor-pointer"
              aria-expanded={isOpen}
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Slide Down Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-brand-brown/95 border-b border-white/5 shadow-xl py-6 px-4 animate-fade-in">
          <div className="flex flex-col gap-4">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-white/90 hover:text-brand-gold text-base font-semibold py-2 border-b border-white/5 font-cairo"
              >
                {item.label}
              </a>
            ))}

            {/* Mobile Social Links Bar */}
            <div className="flex flex-col gap-2 pt-2 border-b border-white/5 pb-4">
              <span className="text-[10px] text-white/40 uppercase tracking-widest font-cairo">
                {isRtl ? 'تابعنا على منصاتنا:' : 'Follow us:'}
              </span>
              <div className="flex items-center gap-4">
                {/* TikTok */}
                <a 
                  href="https://www.tiktok.com/@rooh.spaa" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-white/70 hover:text-white"
                >
                  <span className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .8.11v-3.5a6.34 6.34 0 0 0-1.5-.18 6.39 6.39 0 0 0-6.39 6.39 6.39 6.39 0 0 0 6.39 6.39 6.4 6.4 0 0 0 6.39-6.39V7.51a8.2 8.2 0 0 0 4.22 1.22V5.28a8.11 8.11 0 0 1-3.77-1.41z" />
                    </svg>
                  </span>
                  <span className="font-mono text-xs text-white/50">TikTok</span>
                </a>

                {/* Instagram */}
                <a 
                  href="https://www.instagram.com/roohspaa" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-white/70 hover:text-white"
                >
                  <span className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  </span>
                  <span className="font-mono text-xs text-white/50">Instagram</span>
                </a>

                {/* Snapchat */}
                <a 
                  href="https://www.snapchat.com/@roohspa3?share_id=bpMuMPJgOPo&locale=ar-EG" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-white/70 hover:text-white"
                >
                  <span className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2c-3.953 0-5.5 2.5-5.5 5 0 .814.28 1.48.51 2.03.11.26.15.42-.03.6-.28.28-.96.86-1.56 1.37-.52.44-.61.76-.23.99.36.22 1.58.4 2.38.54.21.03.35.12.35.34 0 .33-.3 1.54-.36 1.83-.17.81.4 1.33.99 1.33.39 0 .84-.18 1.25-.45.34-.23.51-.23.83 0 .74.52 1.63.95 2.65.95 1.02 0 1.91-.43 2.65-.95.32-.23.49-.23.83 0 .41.27.86.45 1.25.45.59 0 1.16-.52.99-1.33-.06-.29-.36-1.5-.36-1.83 0-.22.14-.31.35-.34.8-.14 2.02-.32 2.38-.54.38-.23.29-.55-.23-.99-.6-.51-1.28-1.09-1.56-1.37-.18-.18-.14-.34-.03-.6.23-.55.51-1.216.51-2.03 0-2.5-1.547-5-5-5z" />
                    </svg>
                  </span>
                  <span className="font-mono text-xs text-white/50">Snapchat</span>
                </a>
              </div>
            </div>

            {/* Mobile Booking Call to Action */}
            <button
              onClick={() => {
                setIsOpen(false);
                onBookNow();
              }}
              className="w-full h-11 bg-brand-gold text-brand-brown hover:bg-brand-beige font-bold rounded-xl text-sm font-cairo flex items-center justify-center gap-2 cursor-pointer shadow-md mt-2"
            >
              <Calendar className="w-4 h-4" />
              {t.bookNow}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

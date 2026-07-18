export type Language = 'ar' | 'en';

export interface Service {
  id: string;
  category?: { ar: string; en: string };
  title: { ar: string; en: string };
  duration: { ar: string; en: string };
  price: { ar: string; en: string };
  description: { ar: string; en: string };
  image: string;
  benefits: { ar: string[]; en: string[] };
}

export interface Testimonial {
  id: string;
  name: { ar: string; en: string };
  role: { ar: string; en: string };
  rating: number;
  text: { ar: string; en: string };
  date: { ar: string; en: string };
}

export interface TranslationDictionary {
  navbar: {
    logo: string;
    services: string;
    about: string;
    testimonials: string;
    contact: string;
    bookNow: string;
  };
  hero: {
    titleAccent: string;
    titleMain: string;
    subtitle: string;
    ratingText: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  services: {
    title: string;
    subtitle: string;
    durationLabel: string;
    priceLabel: string;
    bookService: string;
    includesBadge: string;
  };
  about: {
    title: string;
    tagline: string;
    p1: string;
    p2: string;
    certifiedStaff: string;
    certifiedStaffDesc: string;
    hygiene: string;
    hygieneDesc: string;
    sessionsCounter: string;
    sessionsLabel: string;
    experienceYears: string;
    experienceLabel: string;
    satisfactionRate: string;
    satisfactionLabel: string;
  };
  testimonials: {
    title: string;
    subtitle: string;
  };
  contact: {
    title: string;
    subtitle: string;
    whatsappTitle: string;
    whatsappDesc: string;
    whatsappAction: string;
    phoneTitle: string;
    phoneDesc: string;
    phoneAction: string;
    addressTitle: string;
    addressDesc: string;
    addressAction: string;
    formTitle: string;
    formName: string;
    formPhone: string;
    formService: string;
    formDate: string;
    formNotes: string;
    formSubmit: string;
    formSuccess: string;
    formSuccessDesc: string;
  };
  bookingModal: {
    title: string;
    subtitle: string;
    serviceLabel: string;
    dateLabel: string;
    timeLabel: string;
    nameLabel: string;
    phoneLabel: string;
    notesLabel: string;
    confirmBtn: string;
    closeBtn: string;
    successTitle: string;
    successSubtitle: string;
    successMsg: string;
    referenceLabel: string;
    appointmentDetails: string;
  };
}

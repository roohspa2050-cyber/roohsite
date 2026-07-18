import { Service, Testimonial, TranslationDictionary } from './types';

// Import local assets so Vite compiles and renames them correctly for production builds
import massageTherapy from './assets/images/massage_therapy_1783840145679.jpg';
import physicalTherapy from './assets/images/physical_therapy_1783840185298.jpg';
import recoveryJacuzzi from './assets/images/recovery_jacuzzi_1783840169601.jpg';
import moroccanHammam from './assets/images/moroccan_hammam_1783840158070.jpg';
import heroSpaBg from './assets/images/hero_spa_bg_1783840131287.jpg';

export const SERVICES_DATA: Service[] = [
  {
    id: 'indonesian-massage-45',
    category: { ar: 'مساج إندونيسي', en: 'Indonesian Massage' },
    title: {
      ar: 'مساج إندونيسي (45 دقيقة)',
      en: 'Indonesian Massage (45 Min)',
    },
    duration: {
      ar: '45 دقيقة',
      en: '45 Min',
    },
    price: {
      ar: '150 ريال',
      en: '150 SAR',
    },
    description: {
      ar: 'جلسة مساج إندونيسي تقليدي لتخفيف التوتر العضلي وتنشيط طاقة الجسد الحيوية.',
      en: 'Traditional Indonesian massage to relieve muscle tension and restore vital body energy.',
    },
    image: 'https://pvhgmczyccgkpzxkiolq.supabase.co/storage/v1/object/public/web/spa%207%20(3).png',
    benefits: {
      ar: ['تخفيف الإجهاد والتوتر العضلي', 'تنشيط الدورة الدموية', 'استرخاء بدني كامل'],
      en: ['Relieve stress & muscle tension', 'Boost blood circulation', 'Full body relaxation'],
    },
  },
  {
    id: 'indonesian-massage-60',
    category: { ar: 'مساج إندونيسي', en: 'Indonesian Massage' },
    title: {
      ar: 'مساج إندونيسي (60 دقيقة)',
      en: 'Indonesian Massage (60 Min)',
    },
    duration: {
      ar: '60 دقيقة',
      en: '60 Min',
    },
    price: {
      ar: '180 ريال',
      en: '180 SAR',
    },
    description: {
      ar: 'جلسة ممتدة من التدليك الإندونيسي التخصصي لتفكيك العقد العضلية واستعادة التوازن الكامل للجسد.',
      en: 'An extended specialized Indonesian massage to release muscle knots and restore full body balance.',
    },
    image: 'https://pvhgmczyccgkpzxkiolq.supabase.co/storage/v1/object/public/web/spa%207%20(3).png',
    benefits: {
      ar: ['تفكيك العقد العضلية العميقة', 'استرخاء ذهني وعضلي متكامل', 'زيادة مرونة الجسم'],
      en: ['Releases deep muscle knots', 'Full body & mind relaxation', 'Improves body flexibility'],
    },
  },
  {
    id: 'indonesian-bath-60',
    category: { ar: 'باقات الاستشفاء', en: 'Recovery Packages' },
    title: {
      ar: 'مساج + حمام مغربي (60 دقيقة)',
      en: 'Massage + Moroccan Bath (60 Min)',
    },
    duration: {
      ar: '60 دقيقة',
      en: '60 Min',
    },
    price: {
      ar: '250 ريال',
      en: '250 SAR',
    },
    description: {
      ar: 'باقة تجمع بين فوائد المساج الإندونيسي المركز لراحة العضلات، والحمام المغربي الأصيل لتنقية وتطهير البشرة بالكامل.',
      en: 'A perfect package blending focused Indonesian massage for muscle relief and authentic Moroccan bath for skin purification.',
    },
    image: 'https://pvhgmczyccgkpzxkiolq.supabase.co/storage/v1/object/public/web/spa%207%20(3).png',
    benefits: {
      ar: ['تقشير طبيعي للبشرة بالليفة المغربية', 'دمج مثالي للاسترخاء العضلي وتفتيح المسام', 'انتعاش فوري وحيوية مضاعفة'],
      en: ['Natural exfoliation with Kessa glove', 'Combines muscle relaxation & pore prep', 'Immediate freshness & doubled vitality'],
    },
  },
  {
    id: 'egyptian-massage-45',
    category: { ar: 'مساج سويدي', en: 'Swedish Massage' },
    title: {
      ar: 'مساج سويدي (45 دقيقة)',
      en: 'Swedish Massage (45 Min)',
    },
    duration: {
      ar: '45 دقيقة',
      en: '45 Min',
    },
    price: {
      ar: '200 ريال',
      en: '200 SAR',
    },
    description: {
      ar: 'تدليك سويدي استرخائي تخصصي لتجديد النشاط والراحة البدنية بالزيوت الفاخرة.',
      en: 'Specialized Swedish relaxation massage to renew energy and physical comfort with premium oils.',
    },
    image: 'https://pvhgmczyccgkpzxkiolq.supabase.co/storage/v1/object/public/web/spa%207%20(4).png',
    benefits: {
      ar: ['تخفيف فوري لآلام الظهر والرقبة', 'تحسين جودة النوم ومقاومة الأرق', 'تهدئة الجهاز العصبي'],
      en: ['Instant back & neck pain relief', 'Improves sleep quality', 'Calms the nervous system'],
    },
  },
  {
    id: 'egyptian-massage-60',
    category: { ar: 'مساج سويدي', en: 'Swedish Massage' },
    title: {
      ar: 'مساج سويدي (60 دقيقة)',
      en: 'Swedish Massage (60 Min)',
    },
    duration: {
      ar: '60 دقيقة',
      en: '60 Min',
    },
    price: {
      ar: '250 ريال',
      en: '250 SAR',
    },
    description: {
      ar: 'جلسة متكاملة وممتدة لتنشيط الدورة الدموية وتخفيف التشنجات العضلية والضغط النفسي.',
      en: 'A complete and extended session to boost blood circulation, relieve muscle spasms and mental stress.',
    },
    image: 'https://pvhgmczyccgkpzxkiolq.supabase.co/storage/v1/object/public/web/spa%207%20(4).png',
    benefits: {
      ar: ['تخلص الجسد من التعب المتراكم', 'تحفيز الليمف والدورة الدموية', 'استرخاء حسي ونفسي عميق'],
      en: ['Flushes out accumulated fatigue', 'Stimulates lymphatic system', 'Deep sensory & mental relaxation'],
    },
  },
  {
    id: 'egyptian-bath-60',
    category: { ar: 'باقات الاستشفاء', en: 'Recovery Packages' },
    title: {
      ar: 'مساج + حمام مغربي (60 دقيقة)',
      en: 'Massage + Moroccan Bath (60 Min)',
    },
    duration: {
      ar: '60 دقيقة',
      en: '60 Min',
    },
    price: {
      ar: '350 ريال',
      en: '350 SAR',
    },
    description: {
      ar: 'باقة فاخرة تجمع بين الحمام المغربي بالبخار الساخن مع جلسة تدليك سويدي متكاملة بأيدي معالجين محترفين.',
      en: 'A luxury package combining a hot steam Moroccan bath with a full Swedish massage by professional therapists.',
    },
    image: 'https://pvhgmczyccgkpzxkiolq.supabase.co/storage/v1/object/public/web/spa%207%20(4).png',
    benefits: {
      ar: ['تقشير البشرة بالصابون البلدي الأسود', 'تفكيك التوتر وتنعيم وتجديد خلايا البشرة', 'راحة استشفائية عميقة تدوم لأيام'],
      en: ['Pore cleansing with black soap', 'Dissolves tension & renews skin cells', 'Deep therapeutic relief that lasts for days'],
    },
  },
  {
    id: 'moroccan-massage-45',
    category: { ar: 'مساج مغربي', en: 'Moroccan Massage' },
    title: {
      ar: 'مساج مغربي (45 دقيقة)',
      en: 'Moroccan Massage (45 Min)',
    },
    duration: {
      ar: '45 دقيقة',
      en: '45 Min',
    },
    price: {
      ar: '200 ريال',
      en: '200 SAR',
    },
    description: {
      ar: 'مساج مغربي أصيل بالزيوت الدافئة لراحة العضلات والعمود الفقري وتخفيف ضغوط العمل.',
      en: 'Authentic Moroccan massage with warm oils to soothe muscles and spine and relieve work stress.',
    },
    image: 'https://pvhgmczyccgkpzxkiolq.supabase.co/storage/v1/object/public/web/spa%207%20(1).png',
    benefits: {
      ar: ['تدليك بزيوت مغربية طبيعية', 'تخفيف تشنجات العمود الفقري', 'راحة فورية للجسم والذهن'],
      en: ['Massage with organic Moroccan oils', 'Relieves spinal column tension', 'Instant relief for body & mind'],
    },
  },
  {
    id: 'moroccan-massage-60',
    category: { ar: 'مساج مغربي', en: 'Moroccan Massage' },
    title: {
      ar: 'مساج مغربي (60 دقيقة)',
      en: 'Moroccan Massage (60 Min)',
    },
    duration: {
      ar: '60 دقيقة',
      en: '60 Min',
    },
    price: {
      ar: '250 ريال',
      en: '250 SAR',
    },
    description: {
      ar: 'جلسة ممتدة من التدليك الاستشفائي المغربي الفاخر بالزيوت العطرية الدافئة لتخفيف آلام المفاصل وإعادة الحيوية.',
      en: 'An extended session of premium Moroccan therapeutic massage with warm essential oils to relieve joint pain and restore vitality.',
    },
    image: 'https://pvhgmczyccgkpzxkiolq.supabase.co/storage/v1/object/public/web/spa%207%20(1).png',
    benefits: {
      ar: ['تنشيط الدورة الدموية الكبرى', 'تغذية وترطيب البشرة بزيوت نقية', 'راحة استشفائية عميقة وممتدة'],
      en: ['Stimulates major blood circulation', 'Nourishes skin with pure organic oils', 'Deep, extended recovery and relief'],
    },
  },
  {
    id: 'moroccan-bath-60',
    category: { ar: 'باقات الاستشفاء', en: 'Recovery Packages' },
    title: {
      ar: 'مساج + حمام مغربي (60 دقيقة)',
      en: 'Massage + Moroccan Bath (60 Min)',
    },
    duration: {
      ar: '60 دقيقة',
      en: '60 Min',
    },
    price: {
      ar: '350 ريال',
      en: '350 SAR',
    },
    description: {
      ar: 'باقة الطقوس المغربية المتناغمة بامتياز. مساج بالزيوت المغربية الدافئة وحمام مغربي بالصابون البلدي والتقشير بالليفة.',
      en: 'The ultimate harmonized Moroccan ritual. Massage with warm Moroccan oils combined with a steaming Moroccan bath with black soap.',
    },
    image: 'https://pvhgmczyccgkpzxkiolq.supabase.co/storage/v1/object/public/web/spa%207%20(1).png',
    benefits: {
      ar: ['إزالة تامة لخلايا الجلد الميت وتفتيح المسام', 'تجانس تام بين التدليك الدافئ وحمام البخار', 'تخفيف إجهاد السفر والعمل الشاق'],
      en: ['Total removal of dead skin & pore cleansing', 'Complete harmony of warm massage & steam', 'Relieves travel fatigue and heavy strain'],
    },
  },
  {
    id: 'moroccan-bath-only',
    category: { ar: 'حمام مغربي', en: 'Moroccan Bath' },
    title: {
      ar: 'حمام مغربي',
      en: 'Moroccan Bath',
    },
    duration: {
      ar: '45 دقيقة',
      en: '45 Min',
    },
    price: {
      ar: '200 ريال',
      en: '200 SAR',
    },
    description: {
      ar: 'حمام مغربي تقليدي بالصابون البلدي الطبيعي والبخار الساخن والتقشير بالليفة لتنظيف عميق للبشرة.',
      en: 'Traditional Moroccan bath with natural black soap, hot steam, and Kessa scrub for deep skin cleansing.',
    },
    image: 'https://pvhgmczyccgkpzxkiolq.supabase.co/storage/v1/object/public/web/spa%207%20(1).png',
    benefits: {
      ar: ['تنظيف عميق وإزالة الجلد الميت', 'تفتيح المسام وتنشيط خلايا البشرة', 'شعور رائع بالانتعاش والنظافة'],
      en: ['Deep cleansing & dead skin removal', 'Opens pores & revitalizes skin cells', 'Wonderful sense of freshness and purity'],
    },
  },
  {
    id: 'royal-bath',
    category: { ar: 'خدمات أخرى', en: 'Other Services' },
    title: {
      ar: 'حمام ملكي',
      en: 'Royal Bath',
    },
    duration: {
      ar: '60 دقيقة',
      en: '60 Min',
    },
    price: {
      ar: '400 ريال',
      en: '400 SAR',
    },
    description: {
      ar: 'الحمام الملكي المطلق لرجال النخبة. يتضمن البخار الدافئ، التقشير بالليفة المغربية، قناع الطين البركاني بالأعشاب والزيوت العطرية الفاخرة.',
      en: 'The ultimate Royal bath for elite gentlemen. Features hot steam, Moroccan scrub, herbal volcanic mud mask, and luxury essential oils.',
    },
    image: heroSpaBg,
    benefits: {
      ar: ['تغذية الجلد بالمعادن النادرة والطين البركاني', 'تنظيف فائق وتنقية عميقة للبشرة والمسام', 'عطور ملكية وراحة تامة للأعصاب والجسد'],
      en: ['Nourishes skin with volcanic mud minerals', 'Superior deep cleansing of pores & skin', 'Royal scents & total relaxation of body & mind'],
    },
  },
  {
    id: 'cupping-stones',
    category: { ar: 'خدمات أخرى', en: 'Other Services' },
    title: {
      ar: 'مساج علاجي كاسات وأحجار',
      en: 'Therapeutic Cupping & Hot Stones Massage',
    },
    duration: {
      ar: '60 دقيقة',
      en: '60 Min',
    },
    price: {
      ar: '200 ريال',
      en: '200 SAR',
    },
    description: {
      ar: 'جلسة علاجية متكاملة تدمج بين كاسات الهواء لتخفيف الاحتقان العضلي والأحجار الساخنة لتفكيك تشنج العضلات العميقة.',
      en: 'An integrated therapeutic session blending cupping to relieve muscle congestion with hot stones to dissolve deep muscle spasms.',
    },
    image: massageTherapy,
    benefits: {
      ar: ['تخفيف الآلام المزمنة وتشنج العضلات', 'تحسين مرونة وحركة مفاصل الجسم', 'سحب السموم وتحفيز الدورة الليمفاوية'],
      en: ['Relieves chronic pain & muscle spasms', 'Improves joint flexibility and movement', 'Draws out toxins & stimulates lymphatic flow'],
    },
  },
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: '1',
    name: {
      ar: 'فهد العتيبي',
      en: 'Fahad Al-Otaibi',
    },
    role: {
      ar: 'عميل دائم',
      en: 'Regular Client',
    },
    rating: 5,
    text: {
      ar: 'من أفضل مراكز الاستشفاء والتدليك التي زرتها في جدة. نظافة استثنائية تفوق التوقعات، اهتمام مذهل بالتفاصيل، ومستوى احترافي راقٍ للغاية من المعالجين المعتمدين.',
      en: "One of the best wellness and massage centers I've visited in Jeddah. Exceptional cleanliness exceeding expectations, amazing attention to details, and a highly premium professional standard.",
    },
    date: {
      ar: 'قبل أسبوع',
      en: '1 week ago',
    },
  },
  {
    id: '2',
    name: {
      ar: 'محمد النمري',
      en: 'Mohammed Al-Nimri',
    },
    role: {
      ar: 'عضو الباقة الذهبية',
      en: 'Golden Package Member',
    },
    rating: 5,
    text: {
      ar: 'الحمام المغربي هنا تجربة استشفاء فاخرة ومختلفة تماماً. تشعر بالراحة الحقيقية بمجرد دخولك للمكان، والترتيب والنظافة لا غبار عليهما. أنصح به بشدة لكل باحث عن الهدوء.',
      en: 'The Moroccan Hammam here is a premium recovery experience. You feel deep relaxation the second you walk in. The organization and neatness are flawless. Highly recommended.',
    },
    date: {
      ar: 'قبل أسبوعين',
      en: '2 weeks ago',
    },
  },
  {
    id: '3',
    name: {
      ar: 'عبد الرحمن القحطاني',
      en: 'Abdulrahman Al-Qahtani',
    },
    role: {
      ar: 'عميل النخبة VIP',
      en: 'Elite VIP Client',
    },
    rating: 5,
    text: {
      ar: 'كنت أعاني من آلام مستمرة في الظهر بسبب الجلوس الطويل. بعد الاستعانة بجلسات العلاج الطبيعي والتدليك المتخصص شعرت بفرق هائل وتحسن في جودة نومي. شكر خاص للكادر الطبي المحترف.',
      en: 'I suffered from persistent back pain due to long desk hours. After undergoing physical therapy and targeted therapeutic massage, I felt a massive difference. Highly professional medical-grade staff.',
    },
    date: {
      ar: 'قبل شهر',
      en: '1 month ago',
    },
  },
];

export const TRANSLATIONS: Record<'ar' | 'en', TranslationDictionary> = {
  ar: {
    navbar: {
      logo: 'روح الاسترخاء',
      services: 'خدماتنا الفاخرة',
      about: 'من نحن',
      testimonials: 'آراء الضيوف',
      contact: 'اتصل بنا',
      bookNow: 'احجز جلستك الآن',
    },
    hero: {
      titleAccent: 'روح الاسترخاء',
      titleMain: 'استرخِ بعمق، اشفِ بحكمة',
      subtitle: 'ملاذ فاخر للرجال يستعيد توازن الجسد والعقل بنقاء طبيعي ورعاية طبية معتمدة.',
      ratingText: '٥ نجوم (تقييم ٤.٢ من ٥٠٠+ مراجعة جوجل)',
      ctaPrimary: 'احجز جلستك الآن',
      ctaSecondary: 'اكتشف خدماتنا العلاجية',
    },
    services: {
      title: 'علاج حقيقي، راحة تستحقها',
      subtitle: 'جلسات استشفاء وعناية صحية مصممة خصيصاً لتلبية متطلبات جسدك تحت إشراف نخبة من الأخصائيين المعتمدين.',
      durationLabel: 'المدة:',
      priceLabel: 'الاستثمار:',
      bookService: 'حجز هذه الخدمة',
      includesBadge: 'شاملة (مساج + تنحيف + حمام)',
    },
    about: {
      title: 'نحن لسنا مجرد مركز تدليك عابر',
      tagline: 'رواد العناية الطبية والبدنية للرجال في جدة',
      p1: 'تأسس مركز "روح الاسترخاء" (Rooh Spa) في حي السامر بمدينة جدة، ليكون صرحاً متكاملاً يتجاوز مفهوم التدليك السطحي. نحن ندمج بين أحدث أساليب الاستشفاء الرياضي والعلاج الطبيعي التخصصي وبين الطقوس الشرقية الفاخرة لاستعادة حيوية العضلات وتصفية الذهن.',
      p2: 'نلتزم بأعلى معايير التعقيم الفندقي والنظافة الطبية الصارمة لضمان بيئة هادئة وآمنة تمنحك الاسترخاء المطلق الذي تستحقه كادراً وتجهيزاً.',
      certifiedStaff: 'كادر طبي متخصص ومعتمد',
      certifiedStaffDesc: 'أطباء علاج طبيعي وأخصائيو مساج حاصلون على شهادات وتراخيص طبية معتمدة.',
      hygiene: 'بيئة آمنة وصحية بالكامل',
      hygieneDesc: 'بروتوكولات تعقيم صارمة وأدوات مخصصة لكل ضيف لضمان السلامة التامة والوقاية.',
      sessionsCounter: '+٢٠٠',
      sessionsLabel: 'جلسة استشفاء نشطة شهرياً',
      experienceYears: '+١٠',
      experienceLabel: 'سنوات من الخبرة والريادة',
      satisfactionRate: '٩٩٪',
      satisfactionLabel: 'نسبة رضا العملاء والضيوف',
    },
    testimonials: {
      title: 'ماذا يقول ضيوفنا الكرام؟',
      subtitle: 'شهادات نعتز بها من رجال وثقوا بـ "روح الاسترخاء" كخيارهم الأول للاستشفاء والعناية في جدة.',
    },
    contact: {
      title: 'جلسة استرخائك القادمة تنتظرك',
      subtitle: 'بادر بالتواصل معنا اليوم لتصميم تجربة الاستشفاء المثالية المتوافقة مع احتياجاتك البدنية والصحية.',
      whatsappTitle: 'مراسلة واتساب مباشرة',
      whatsappDesc: 'تواصل فوري لحجز المواعيد والاستفسار عن العروض والباكجات المتاحة.',
      whatsappAction: 'ابدأ المحادثة الآن',
      phoneTitle: 'الاتصال الهاتفي المباشر',
      phoneDesc: 'فريق الاستقبال متواجد للإجابة على مكالماتك ومساعدتك في اختيار باقتك المناسبة.',
      phoneAction: 'اتصل الآن (+966)',
      addressTitle: 'موقعنا الفريد في جدة',
      addressDesc: 'حي السامر، بالقرب من الطرق الحيوية لسهولة الوصول والمواقف المريحة.',
      addressAction: 'عرض الاتجاهات على خرائط جوجل',
      formTitle: 'احجز موعدك الآن',
      formName: 'الاسم الكريم',
      formPhone: 'رقم الجوال (٠٥xxxxxxxx)',
      formService: 'الخدمة المطلوبة',
      formDate: 'التاريخ المفضل للزيارة',
      formNotes: 'أي ملاحظات إضافية (اختياري)',
      formSubmit: 'إرسال طلب الحجز',
      formSuccess: 'تم إرسال طلبك بنجاح!',
      formSuccessDesc: 'سيتواصل معك مستشار الاستشفاء لدينا خلال ١٥ دقيقة لتأكيد موعدك النهائي. نتشرف بزيارتك!',
    },
    bookingModal: {
      title: 'احجز موعدك الآن',
      subtitle: 'املأ بياناتك أدناه وسيقوم كادرنا بتأكيد الحجز وتخصيص الجلسة لتناسب متطلبات جسدك.',
      serviceLabel: 'اختر الجلسة المطلوبة',
      dateLabel: 'تاريخ الزيارة المفضل',
      timeLabel: 'الوقت المفضل للزيارة',
      nameLabel: 'الاسم الكريم بالكامل',
      phoneLabel: 'رقم الجوال لتلقي تأكيد الحجز',
      notesLabel: 'تفضيلات إضافية (اختياري)',
      confirmBtn: 'تأكيد حجز الجلسة الفاخرة',
      closeBtn: 'إغلاق نافذة الحجز',
      successTitle: 'تم تأكيد موعدك المبدئي بنجاح!',
      successSubtitle: 'أهلاً بك في عالم الاسترخاء الطبي الحقيقي',
      successMsg: 'تم إرسال رسالة نصية قصيرة وواتساب إلى جوالك تحتوي على تفاصيل الموعد. يرجى الحضور قبل الموعد بـ ١٠ دقائق لتهيئة جسدك بالبخار مجاناً.',
      referenceLabel: 'رقم المرجعي للحجز:',
      appointmentDetails: 'تفاصيل موعدك المنظم:',
    },
  },
  en: {
    navbar: {
      logo: 'Rooh Spa',
      services: 'Luxury Services',
      about: 'About Us',
      testimonials: 'Guest Reviews',
      contact: 'Contact Us',
      bookNow: 'Book Now',
    },
    hero: {
      titleAccent: 'Rooh Spa & Wellness',
      titleMain: 'Relax Deeply, Heal Wisely',
      subtitle: 'A high-end sanctuary for men restoring body and mind balance with pure organic elements and certified medical-grade therapy.',
      ratingText: '5 Stars (Rating 4.2 out of 500+ Google Reviews)',
      ctaPrimary: 'Book Your Session Now',
      ctaSecondary: 'Discover Our Treatments',
    },
    services: {
      title: 'Real Treatment, Deserved Comfort',
      subtitle: 'Recovery and wellness sessions tailor-made to your physical demands under the guidance of elite certified specialists.',
      durationLabel: 'Duration:',
      priceLabel: 'Investment:',
      bookService: 'Book This Service',
      includesBadge: 'All-inclusive (Massage + Slimming + Hammam)',
    },
    about: {
      title: 'We Are Not Just a Regular Massage Center',
      tagline: 'Pioneers of Medical-Grade Men’s Wellness in Jeddah',
      p1: 'Founded in Al-Samer district, Jeddah, Rooh Spa (روح الاسترخاء) is a premier wellness institution built to surpass superficial therapies. We uniquely blend advanced athletic sports recovery, professional physical rehabilitation, and authentic luxury eastern bathing rituals to restore your muscles and declutter your mind.',
      p2: 'We practice strict clinical sanitation and luxury hospitality standards, securing a quiet, pristine environment for your comprehensive restoration and ultimate peace of mind.',
      certifiedStaff: 'Certified Medical Specialists',
      certifiedStaffDesc: 'Highly qualified physiotherapists and certified massage experts with accredited medical training.',
      hygiene: '100% Sterile & Safe Environment',
      hygieneDesc: 'Rigid sanitary protocols with disposable, fully sanitized single-use tools personalized for each guest.',
      sessionsCounter: '200+',
      sessionsLabel: 'Active Monthly Recovery Sessions',
      experienceYears: '10+',
      experienceLabel: 'Years of Pioneering Leadership',
      satisfactionRate: '99%',
      satisfactionLabel: 'Guest Satisfaction & Return Rate',
    },
    testimonials: {
      title: 'What Do Our Distinguished Guests Say?',
      subtitle: 'True testimonials from men who have chosen Rooh Spa as their primary recovery and self-care haven in Jeddah.',
    },
    contact: {
      title: 'Your Next Session Awaits You',
      subtitle: 'Contact us today to co-design your personalized wellness itinerary matched exactly with your physical demands.',
      whatsappTitle: 'Direct WhatsApp Chat',
      whatsappDesc: 'Instant chat for immediate bookings, luxury vouchers, and package customization.',
      whatsappAction: 'Start Chatting Now',
      phoneTitle: 'Direct Telephone Call',
      phoneDesc: 'Our concierge desk is ready to answer your inquiries and coordinate your arrival.',
      phoneAction: 'Call Concierge (+966)',
      addressTitle: 'Our Premier Jeddah Location',
      addressDesc: 'Al-Samer District, ideally situated with comfortable private parking and easy road access.',
      addressAction: 'Get Directions on Google Maps',
      formTitle: 'Book Your Appointment Now',
      formName: 'Full Name',
      formPhone: 'Phone Number (05xxxxxxxx)',
      formService: 'Desired Service',
      formDate: 'Preferred Date of Visit',
      formNotes: 'Any additional notes (Optional)',
      formSubmit: 'Submit Booking Request',
      formSuccess: 'Your Request Was Sent Successfully!',
      formSuccessDesc: 'Our wellness concierge will call you within 15 minutes to confirm your final booking slot. We look forward to hosting you!',
    },
    bookingModal: {
      title: 'Book Your Appointment Now',
      subtitle: 'Fill out the details below and our professional concierge will secure and customize your personalized session.',
      serviceLabel: 'Select Desired Session',
      dateLabel: 'Preferred Visit Date',
      timeLabel: 'Preferred Arrival Time',
      nameLabel: 'Full Name',
      phoneLabel: 'Mobile Number for SMS Confirmation',
      notesLabel: 'Additional Preferences (Optional)',
      confirmBtn: 'Confirm Luxury Booking',
      closeBtn: 'Close Booking Window',
      successTitle: 'Your Appointment is Provisionally Booked!',
      successSubtitle: 'Welcome to True Medical-Grade Rejuvenation',
      successMsg: 'A confirmation SMS & WhatsApp message has been dispatched to your mobile. Please arrive 10 minutes prior to your session for complimentary herbal tea and pre-steam preparation.',
      referenceLabel: 'Booking Reference Number:',
      appointmentDetails: 'Your Appointment Schedule:',
    },
  },
};

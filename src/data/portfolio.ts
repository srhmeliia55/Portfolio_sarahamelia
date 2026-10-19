/**
 * =====================================================================
 *  PUSAT DATA PORTFOLIO — SARAH AMELIA
 * =====================================================================
 *  Semua teks (Indonesia + English) dikumpulkan di file ini.
 *  Untuk mengubah isi website, cukup edit nilai di dalam `id` dan `en`.
 *
 *  Struktur:
 *   1. Profil        → nama, foto, peran, bio, statistik, sosial media
 *   2. About         → fokus keahlian
 *   3. Skills        → daftar kemampuan + level
 *   4. Journey       → riwayat pendidikan
 *   5. Contact       → informasi kontak
 *   6. UI            → label antarmuka (navigasi, tombol, judul section)
 * =====================================================================
 */

export type Locale = "id" | "en";

/** Teks dua bahasa. */
export type L = Record<Locale, string>;

export const DEFAULT_LOCALE: Locale = "id";
export const LOCALES: Locale[] = ["id", "en"];

/* ------------------------------------------------------------------ */
/* 1. PROFIL                                                           */
/* ------------------------------------------------------------------ */

export const profile = {
  name: "Sarah Amelia",
  initials: "SA",
  /**
   * Foto profil. Ganti file di `public/images/` lalu sesuaikan
   * `src` di bawah. Rasio yang paling pas: 4:5 (mis. 1000 × 1250).
   */
  photo: {
    src: "/images/sarah-placeholder.jpg",
    alt: {
      id: "Foto profil Sarah Amelia",
      en: "Portrait photo of Sarah Amelia",
    } as L,
  },
  greeting: {
    id: "Halo, saya",
    en: "Hi, I'm",
  } as L,
  /** Peran yang berganti-ganti di hero section. */
  roles: [
    { id: "Teknik Informatika — Semester 5", en: "Informatics Engineering — 5th Semester" },
    { id: "UI/UX Designer", en: "UI/UX Designer" },
    { id: "Design System Enthusiast", en: "Design System Enthusiast" },
    { id: "Prototyper Antarmuka", en: "Interface Prototyper" },
  ] as L[],
  /** Dipakai di kartu foto (About) sebagai label peran. */
  role: {
    id: "UI/UX Designer",
    en: "UI/UX Designer",
  } as L,
  headline: {
    id: "Saya merancang pengalaman digital yang intuitif, rapi, dan menyenangkan dipakai.",
    en: "I design digital experiences that feel intuitive, tidy, and genuinely pleasant to use.",
  } as L,
  tagline: {
    id: "Fokus pada riset pengguna, wireframe, dan design system di Figma. Saat ini menempuh semester 5 sambil mengerjakan studi kasus desain untuk kampus dan UMKM.",
    en: "Focused on user research, wireframing, and design systems in Figma. Currently in my 5th semester while working on design case studies for campus and small businesses.",
  } as L,
  location: {
    id: "Cilegon, Indonesia",
    en: "Cilegon, Indonesia",
  } as L,
  email: "srhmellia55@gmail.com",
  phone: "+62 812-3456-7890",
  availability: {
    id: "Terbuka untuk magang UI/UX dan proyek desain",
    en: "Open to UI/UX internships and design projects",
  } as L,
  resumeUrl: "#",
  bio: [
    {
      id: "Saya Sarah Amelia, mahasiswa semester 5 program studi Teknik Informatika yang jatuh cinta pada dunia desain antarmuka. Semuanya dimulai dari rasa penasaran kenapa sebuah halaman bisa terasa begitu nyaman dipakai — dan sejak itu saya tidak berhenti belajar.",
      en: "I'm Sarah Amelia, a 5th semester Informatics Engineering student who fell in love with interface design. It started with plain curiosity about why some pages simply feel good to use — and I haven't stopped learning since.",
    },
    {
      id: "Sehari-hari saya bekerja di Figma: melakukan riset kecil ke pengguna, menyusun wireframe, merapikan hierarki visual, lalu mengubahnya menjadi prototipe yang bisa diklik. Saya percaya desain yang baik lahir dari kebiasaan bertanya “apa yang sebenarnya dibutuhkan pengguna?” sebelum menyentuh warna atau tipografi.",
      en: "Day to day I work in Figma: running light user research, sketching wireframes, tidying visual hierarchy, then turning it all into clickable prototypes. I believe good design comes from asking “what does the user actually need?” before touching colour or typography.",
    },
    {
      id: "Selain merancang, saya senang menyusun design system — token warna, skala tipografi, dan komponen yang konsisten agar produk tetap rapi saat dikembangkan. Kemampuan pemrograman saya membantu memahami batasan teknis, sehingga rancangan tetap realistis untuk diwujudkan.",
      en: "Beyond designing screens, I enjoy building design systems — colour tokens, type scales, and consistent components so a product stays tidy as it grows. My programming background helps me respect technical constraints, keeping designs realistic to ship.",
    },
  ] as L[],
  /** Statistik singkat di hero — `value` dianimasikan sebagai angka. */
  stats: [
    { value: 5, decimals: 0, suffix: "", label: { id: "Semester ditempuh", en: "Semesters completed" } as L },
    { value: 3.84, decimals: 2, suffix: "", label: { id: "Indeks prestasi", en: "Grade point average" } as L },
    { value: 24, decimals: 0, suffix: "+", label: { id: "Desain & prototipe", en: "Screens & prototypes" } as L },
    { value: 8, decimals: 0, suffix: "", label: { id: "Sertifikat & kelas", en: "Certificates & courses" } as L },
  ],
  socials: [
    { icon: "github", label: "GitHub", href: "https://github.com/", handle: "@sarahamelia" },
    { icon: "linkedin", label: "LinkedIn", href: "https://linkedin.com/in/", handle: "in/sarahamelia" },
    { icon: "instagram", label: "Instagram", href: "https://instagram.com/", handle: "@sarah.designs" },
  ] as { icon: SocialIcon; label: string; href: string; handle: string }[],
};

export type SocialIcon = "github" | "linkedin" | "instagram";

/* ------------------------------------------------------------------ */
/* 2. ABOUT — FOKUS KEAHLIAN                                           */
/* ------------------------------------------------------------------ */

export type FocusIcon = "palette" | "layers" | "sparkles";

export const focusAreas: { icon: FocusIcon; title: L; desc: L }[] = [
  {
    icon: "palette",
    title: { id: "Perancangan Antarmuka", en: "Interface Design" },
    desc: {
      id: "Menyusun wireframe dan tampilan akhir di Figma dengan hierarki visual yang jelas, konsisten, dan mudah dipahami pengguna.",
      en: "Shaping wireframes and final screens in Figma with clear, consistent visual hierarchy that users understand at a glance.",
    },
  },
  {
    icon: "layers",
    title: { id: "Design System", en: "Design System" },
    desc: {
      id: "Membangun token warna, skala tipografi, dan pustaka komponen agar produk tetap rapi dan mudah dikembangkan bersama tim.",
      en: "Building colour tokens, type scales, and component libraries so a product stays tidy and easy for a team to extend.",
    },
  },
  {
    icon: "sparkles",
    title: { id: "Prototipe & Pengujian", en: "Prototyping & Testing" },
    desc: {
      id: "Membuat prototipe interaktif, mengujinya ke calon pengguna, lalu menyempurnakan alur berdasarkan temuan tersebut.",
      en: "Crafting interactive prototypes, testing them with real users, then refining the flow based on what the test revealed.",
    },
  },
];

/* ------------------------------------------------------------------ */
/* 3. SKILLS                                                           */
/* ------------------------------------------------------------------ */

export const skillGroups = [
  {
    title: { id: "Alat Desain", en: "Design Tools" },
    accent: "from-violet-500 to-fuchsia-500",
    items: [
      { name: "Figma", level: 92 },
      { name: "Framer", level: 76 },
      { name: "Adobe Illustrator", level: 80 },
      { name: "Adobe Photoshop", level: 78 },
      { name: "Adobe XD", level: 74 },
      { name: "ProtoPie", level: 68 },
    ],
  },
  {
    title: { id: "Metode UX", en: "UX Methods" },
    accent: "from-cyan-400 to-sky-500",
    items: [
      { name: "Wireframing", level: 90 },
      { name: "User Flow", level: 86 },
      { name: "User Research", level: 84 },
      { name: "Information Architecture", level: 82 },
      { name: "Usability Testing", level: 80 },
      { name: "Prototyping", level: 88 },
    ],
  },
  {
    title: { id: "Desain Visual", en: "Visual Design" },
    accent: "from-fuchsia-500 to-violet-600",
    items: [
      { name: "Typography", level: 86 },
      { name: "Color Theory", level: 84 },
      { name: "Design System", level: 88 },
      { name: "Responsive Layout", level: 85 },
      { name: "Accessibility", level: 76 },
      { name: "Design Handoff", level: 80 },
    ],
  },
];

/** Teks berjalan (marquee) di bawah daftar skill. */
export const techMarquee = [
  "Figma",
  "Wireframe",
  "Prototype",
  "Design System",
  "User Research",
  "Usability Testing",
  "Typography",
  "Color Theory",
  "Accessibility",
  "User Flow",
  "Framer",
  "Adobe XD",
  "Illustrator",
  "Photoshop",
  "Miro",
  "Notion",
];

/* ------------------------------------------------------------------ */
/* 4. JOURNEY — RIWAYAT PENDIDIKAN                                     */
/* ------------------------------------------------------------------ */

export type TimelineKind = "university" | "senior" | "junior" | "elementary";

export type TimelineItem = {
  period: L;
  title: L;
  org: L;
  desc: L;
  kind: TimelineKind;
};

export const timeline: TimelineItem[] = [
  {
    period: { id: "2023 — Sekarang", en: "2023 — Present" },
    title: { id: "S1 Teknik Informatika", en: "BSc in Informatics Engineering" },
    org: { id: "Universitas Teknologi Cilegon", en: "Cilegon University of Technology" },
    desc: {
      id: "Menempuh semester 5 dengan IPK 3.84. Mendalami interaksi manusia–komputer, basis data, dan rekayasa perangkat lunak yang menunjang cara saya merancang antarmuka.",
      en: "Currently in semester 5 with a 3.84 GPA. Coursework spans human–computer interaction, databases, and software engineering — all of which shape how I design interfaces.",
    },
    kind: "university",
  },
  {
    period: { id: "2020 — 2023", en: "2020 — 2023" },
    title: { id: "SMA 1 Cilegon", en: "SMA 1 Cilegon" },
    org: { id: "Sekolah Menengah Atas", en: "Senior High School" },
    desc: {
      id: "Mengambil jurusan Matematika dan Ilmu Pengetahuan Alam. Di sini saya mulai mengenal desain grafis dan membuat poster kegiatan sekolah secara mandiri.",
      en: "Took the Mathematics and Natural Sciences track. This is where I first picked up graphic design, making event posters for school activities on my own.",
    },
    kind: "senior",
  },
  {
    period: { id: "2017 — 2020", en: "2017 — 2020" },
    title: { id: "SMP Cilegon", en: "SMP Cilegon" },
    org: { id: "Sekolah Menengah Pertama", en: "Junior High School" },
    desc: {
      id: "Aktif di kegiatan kelas dan ekskul komputer. Dari sini rasa penasaran saya terhadap teknologi mulai tumbuh.",
      en: "Active in classroom activities and the computer club. This is where my curiosity about technology started to grow.",
    },
    kind: "junior",
  },
  {
    period: { id: "2011 — 2017", en: "2011 — 2017" },
    title: { id: "SD Cilegon", en: "SD Cilegon" },
    org: { id: "Sekolah Dasar", en: "Elementary School" },
    desc: {
      id: "Masa pertama saya berkenalan dengan komputer — dan awal dari kebiasaan menggambar, menata warna, serta memperhatikan tampilan sesuatu.",
      en: "My first encounter with computers — and the beginning of a habit of drawing, arranging colours, and noticing how things look.",
    },
    kind: "elementary",
  },
];

/* ------------------------------------------------------------------ */
/* 5. CONTACT                                                          */
/* ------------------------------------------------------------------ */

export const contact = {
  headline: {
    id: "Punya proyek atau kesempatan magang?",
    en: "Have a project or an internship in mind?",
  } as L,
  description: {
    id: "Saya selalu senang berdiskusi soal desain antarmuka, riset pengguna, atau peluang magang UI/UX. Kirim pesan dan saya akan balas secepatnya.",
    en: "I'm always happy to talk about interface design, user research, or UI/UX internship opportunities. Drop a message and I'll reply soon.",
  } as L,
  note: {
    id: "Biasanya membalas dalam 24 jam pada hari kerja.",
    en: "Usually replies within 24 hours on weekdays.",
  } as L,
};

/* ------------------------------------------------------------------ */
/* 6. UI — LABEL ANTARMUKA                                             */
/* ------------------------------------------------------------------ */

export const ui = {
  nav: [
    { href: "#home", label: { id: "Beranda", en: "Home" } as L },
    { href: "#about", label: { id: "Tentang", en: "About" } as L },
    { href: "#skills", label: { id: "Keahlian", en: "Skills" } as L },
    { href: "#journey", label: { id: "Pendidikan", en: "Education" } as L },
    { href: "#contact", label: { id: "Kontak", en: "Contact" } as L },
  ],
  actions: {
    getInTouch: { id: "Hubungi Saya", en: "Get In Touch" } as L,
    downloadCv: { id: "Unduh CV", en: "Download CV" } as L,
    scroll: { id: "Gulir ke bawah", en: "Scroll down" } as L,
    send: { id: "Kirim Pesan", en: "Send Message" } as L,
    sending: { id: "Menyiapkan…", en: "Preparing…" } as L,
    menu: { id: "Menu", en: "Menu" } as L,
    close: { id: "Tutup", en: "Close" } as L,
    switchLang: { id: "Ganti bahasa", en: "Switch language" } as L,
    switchTheme: { id: "Ganti tema", en: "Switch theme" } as L,
  },
  sections: {
    about: {
      eyebrow: { id: "Tentang Saya", en: "About Me" } as L,
      title: { id: "Sebuah perkenalan singkat", en: "A short introduction" } as L,
      focusTitle: { id: "Yang saya kerjakan", en: "What I do" } as L,
      educationLabel: { id: "Pendidikan", en: "Education" } as L,
      degreeLabel: { id: "Program Studi", en: "Study Programme" } as L,
      gpaLabel: { id: "Indeks Prestasi", en: "Grade Point Average" } as L,
      semesterLabel: { id: "Semester", en: "Semester" } as L,
    },
    skills: {
      eyebrow: { id: "Keahlian", en: "Skills" } as L,
      title: { id: "Alat & metode yang saya pakai setiap hari", en: "Tools & methods I use every day" } as L,
      subtitle: {
        id: "Kombinasi kemampuan desain dan pemahaman teknis yang saya asah melalui kuliah, studi kasus, dan eksplorasi mandiri.",
        en: "A blend of design craft and technical understanding, sharpened through coursework, case studies, and self exploration.",
      } as L,
      coreLabel: { id: "Kemampuan inti", en: "Core strengths" } as L,
    },
    journey: {
      eyebrow: { id: "Pendidikan", en: "Education" } as L,
      title: { id: "Riwayat pendidikan saya", en: "My education journey" } as L,
      subtitle: {
        id: "Jejak dari sekolah dasar hingga bangku kuliah — setiap tahapnya membentuk cara saya melihat dan merancang.",
        en: "A path from elementary school to university — each stage shaped the way I see and design.",
      } as L,
    },
    contact: {
      eyebrow: { id: "Kontak", en: "Contact" } as L,
      title: { id: "Mari bekerja sama", en: "Let's work together" } as L,
      formName: { id: "Nama", en: "Name" } as L,
      formEmail: { id: "Email", en: "Email" } as L,
      formSubject: { id: "Subjek", en: "Subject" } as L,
      formMessage: { id: "Pesan", en: "Message" } as L,
      placeholderName: { id: "Nama lengkap Anda", en: "Your full name" } as L,
      placeholderEmail: { id: "nama@email.com", en: "name@email.com" } as L,
      placeholderSubject: { id: "Kolaborasi proyek", en: "Project collaboration" } as L,
      placeholderMessage: { id: "Ceritakan sedikit tentang ide Anda…", en: "Tell me a bit about your idea…" } as L,
      emailLabel: { id: "Email", en: "Email" } as L,
      phoneLabel: { id: "Telepon", en: "Phone" } as L,
      locationLabel: { id: "Lokasi", en: "Location" } as L,
      socialLabel: { id: "Media sosial", en: "Social media" } as L,
    },
  },
  footer: {
    rights: { id: "Seluruh hak cipta dilindungi.", en: "All rights reserved." } as L,
    backToTop: { id: "Kembali ke atas", en: "Back to top" } as L,
  },
};

/* ------------------------------------------------------------------ */
/* Metadata situs                                                      */
/* ------------------------------------------------------------------ */

export const siteMeta = {
  title: "Sarah Amelia — UI/UX Designer · Teknik Informatika",
  description:
    "Portofolio Sarah Amelia — UI/UX Designer dan mahasiswa Teknik Informatika semester 5 yang berfokus pada design system dan prototipe antarmuka.",
  url: "https://sarahamelia.example.com",
  keywords: [
    "Sarah Amelia",
    "portfolio",
    "UI/UX designer",
    "product design",
    "Figma",
    "design system",
    "teknik informatika",
    "Cilegon",
  ],
};

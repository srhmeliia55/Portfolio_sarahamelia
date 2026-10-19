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
    src: "/images/sarah.jpeg",
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
    { id: "Video Editor", en: "Video Editor" },
    { id: "Motion Graphics", en: "Motion Graphics" },
    { id: "Color Grading", en: "Colour Grading" },
  ] as L[],
  /** Dipakai di kartu foto (About) sebagai label peran. */
  role: {
    id: "Video Editor",
    en: "Video Editor",
  } as L,
  headline: {
    id: "Saya merangkai potongan gambar menjadi cerita yang enak ditonton sampai akhir.",
    en: "I turn raw footage into stories people actually want to watch to the end.",
  } as L,
  tagline: {
    id: "Fokus pada editing, motion graphics, dan color grading di Premiere Pro dan After Effects. Saat ini menempuh semester 5 sambil mengerjakan konten video untuk kampus dan UMKM.",
    en: "Focused on editing, motion graphics, and colour grading in Premiere Pro and After Effects. Currently in my 5th semester while producing video content for campus and small businesses.",
  } as L,
  location: {
    id: "Cilegon, Indonesia",
    en: "Cilegon, Indonesia",
  } as L,
  email: "srhmellia55@gmail.com",
  phone: "+62 812-3456-7890",
  availability: {
    id: "Terbuka untuk magang & proyek video",
    en: "Open to editing internships & projects",
  } as L,
  resumeUrl: "#",
  bio: [
    {
      id: "Saya Sarah Amelia, mahasiswa semester 5 program studi Teknik Informatika yang jatuh cinta pada dunia editing video. Semuanya dimulai dari rasa penasaran kenapa sebuah potongan video bisa membuat orang betah menonton sampai habis — dan sejak itu saya tidak berhenti belajar.",
      en: "I'm Sarah Amelia, a 5th semester Informatics Engineering student who fell in love with video editing. It started with plain curiosity about why some cuts make people watch to the very end — and I haven't stopped learning since.",
    },
    {
      id: "Sehari-hari saya bekerja di Adobe Premiere Pro dan After Effects: memilah footage, menyusun alur cerita, mengatur ritme potongan, lalu menambahkan motion graphics dan teks agar pesannya sampai. Saya percaya video yang baik lahir dari kebiasaan bertanya “apa yang ingin penonton rasakan?” sebelum menyentuh transisi.",
      en: "Day to day I work in Adobe Premiere Pro and After Effects: sorting footage, shaping the story, setting the rhythm of each cut, then adding motion graphics and titles so the message lands. I believe good video comes from asking “what should the viewer feel?” before touching any transition.",
    },
    {
      id: "Selain memotong, saya senang merapikan warna dan audio — color grading yang konsisten antar-shot, subtitle yang mudah dibaca, dan sound mixing yang tidak menabrak dialog. Latar belakang pemrograman saya membuat alur kerja lebih rapi: penamaan file, template, dan preset yang bisa dipakai ulang.",
      en: "Beyond cutting, I enjoy polishing colour and sound — consistent grading across shots, readable subtitles, and mixes that never fight the dialogue. My programming background keeps the workflow tidy: sensible file naming, reusable templates, and presets.",
    },
  ] as L[],
  /** Statistik singkat di hero — `value` dianimasikan sebagai angka. */
  stats: [
    { value: 5, decimals: 0, suffix: "", label: { id: "Semester ditempuh", en: "Semesters completed" } as L },
    { value: 3.84, decimals: 2, suffix: "", label: { id: "Indeks prestasi", en: "Grade point average" } as L },
    { value: 24, decimals: 0, suffix: "+", label: { id: "Video & motion", en: "Videos & motion" } as L },
    { value: 8, decimals: 0, suffix: "", label: { id: "Sertifikat & kelas", en: "Certificates & courses" } as L },
  ],
  socials: [
    { icon: "github", label: "GitHub", href: "https://github.com/srhmeliia55/", handle: "@sarahamelia" },
    { icon: "linkedin", label: "LinkedIn", href: "https://linkedin.com/in/sarahamelia/", handle: "in/sarahamelia" },
    { icon: "instagram", label: "Instagram", href: "https://www.instagram.com/srhmeliia/", handle: "@sarah.edits" },
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
    title: { id: "Editing Video", en: "Video Editing" },
    desc: {
      id: "Memilah footage, menyusun alur cerita, dan mengatur ritme potongan agar video enak ditonton sampai akhir.",
      en: "Sorting footage, shaping the storyline, and setting the rhythm of each cut so the video is easy to watch to the end.",
    },
  },
  {
    icon: "layers",
    title: { id: "Motion Graphics", en: "Motion Graphics" },
    desc: {
      id: "Membuat animasi teks, lower third, dan transisi di After Effects supaya informasi tampil lebih jelas dan hidup.",
      en: "Building animated titles, lower thirds, and transitions in After Effects so information reads clearly and feels alive.",
    },
  },
  {
    icon: "sparkles",
    title: { id: "Color & Audio", en: "Colour & Audio" },
    desc: {
      id: "Menyeimbangkan warna antar-shot dan merapikan audio — dialog jernih, musik pas, tanpa ada yang saling menabrak.",
      en: "Balancing colour across shots and cleaning up audio — clear dialogue, fitting music, nothing fighting for space.",
    },
  },
];

/* ------------------------------------------------------------------ */
/* 3. SKILLS                                                           */
/* ------------------------------------------------------------------ */

export const skillGroups = [
  {
    title: { id: "Alat Editing", en: "Editing Tools" },
    accent: "from-violet-500 to-fuchsia-500",
    items: [
      { name: "Adobe Premiere Pro", level: 92 },
      { name: "Adobe After Effects", level: 84 },
      { name: "DaVinci Resolve", level: 78 },
      { name: "CapCut", level: 88 },
      { name: "Adobe Audition", level: 72 },
      { name: "Adobe Photoshop", level: 80 },
    ],
  },
  {
    title: { id: "Teknik Editing", en: "Editing Craft" },
    accent: "from-cyan-400 to-sky-500",
    items: [
      { name: "Cutting & Pacing", level: 90 },
      { name: "Storytelling", level: 86 },
      { name: "Transitions", level: 84 },
      { name: "Subtitle & Caption", level: 88 },
      { name: "Color Grading", level: 82 },
      { name: "Sound Design", level: 78 },
    ],
  },
  {
    title: { id: "Konten & Visual", en: "Content & Visual" },
    accent: "from-fuchsia-500 to-violet-600",
    items: [
      { name: "Motion Graphics", level: 84 },
      { name: "Short-form Video", level: 88 },
      { name: "Thumbnail Design", level: 86 },
      { name: "Typography", level: 80 },
      { name: "Storyboard", level: 78 },
      { name: "Export & Codec", level: 82 },
    ],
  },
];

/** Teks berjalan (marquee) di bawah daftar skill. */
export const techMarquee = [
  "Premiere Pro",
  "After Effects",
  "DaVinci Resolve",
  "CapCut",
  "Audition",
  "Photoshop",
  "Illustrator",
  "Motion Graphics",
  "Color Grading",
  "Sound Design",
  "Storyboard",
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
      id: "Menempuh semester 5 dengan IPK 3.84. Mendalami interaksi manusia–komputer, basis data, dan rekayasa perangkat lunak yang menunjang cara saya menyusun alur cerita dan merapikan proses editing.",
      en: "Currently in semester 5 with a 3.84 GPA. Coursework spans human–computer interaction, databases, and software engineering — all of which shape how I structure stories and organise my editing workflow.",
    },
    kind: "university",
  },
  {
    period: { id: "2020 — 2023", en: "2020 — 2023" },
    title: { id: "SMA Negeri 1 Cilegon", en: "SMA Negeri 1 Cilegon" },
    org: { id: "Sekolah Menengah Atas", en: "Senior High School" },
    desc: {
      id: "Mengambil jurusan Matematika dan Ilmu Pengetahuan Alam. Di sini saya mulai mengenal desain grafis dan mengedit video acara sekolah secara mandiri.",
      en: "Took the Mathematics and Natural Sciences track. This is where I first picked up graphic design and started editing videos for school events on my own.",
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
    id: "Saya selalu senang berdiskusi soal editing video, motion graphics, atau peluang magang. Kirim pesan dan saya akan balas secepatnya.",
    en: "I'm always happy to talk about video editing, motion graphics, or internship opportunities. Drop a message and I'll reply soon.",
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
      title: { id: "Alat & teknik yang saya pakai setiap hari", en: "Tools & techniques I use every day" } as L,
      subtitle: {
        id: "Kombinasi kemampuan editing dan pemahaman teknis yang saya asah melalui kuliah, proyek konten, dan eksplorasi mandiri.",
        en: "A blend of editing craft and technical understanding, sharpened through coursework, content projects, and self exploration.",
      } as L,
      coreLabel: { id: "Kemampuan inti", en: "Core strengths" } as L,
    },
    journey: {
      eyebrow: { id: "Pendidikan", en: "Education" } as L,
      title: { id: "Riwayat pendidikan saya", en: "My education journey" } as L,
      subtitle: {
        id: "Jejak dari sekolah dasar hingga bangku kuliah — setiap tahapnya membentuk cara saya melihat dan menyusun cerita.",
        en: "A path from elementary school to university — each stage shaped the way I see and tell stories.",
      } as L,
    },
    contact: {
      eyebrow: { id: "Kontak", en: "Contact" } as L,
      title: { id: "Mari bekerja sama", en: "Let's work together" } as L,
      formName: { id: "Nama", en: "Name" } as L,
      formEmail: { id: "Email", en: "Email" } as L,
      formSubject: { id: "Subjek", en: "Subject" } as L,
      formMessage: { id: "Pesan", en: "Message" } as L,
      placeholderName: { id: "Sarah Amelia", en: "Sarah Amelia" } as L,
      placeholderEmail: { id: "srhmeliia55@gmail.com", en: "srhmeliia55@gmail.com" } as L,
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
  title: "Sarah Amelia — Video Editor · Teknik Informatika",
  description:
    "Portofolio Sarah Amelia — Video Editor dan mahasiswa Teknik Informatika semester 5 yang berfokus pada editing, motion graphics, dan color grading.",
  url: "https://sarahamelia.my.id",
  keywords: [
    "Sarah Amelia",
    "portfolio",
    "video editor",
    "video editing",
    "motion graphics",
    "color grading",
    "Premiere Pro",
    "After Effects",
    "teknik informatika",
    "Cilegon",
  ],
};

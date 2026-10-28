/**
 * =====================================================================
 *  DAFTAR PROYEK
 * =====================================================================
 *  Satu objek = satu kartu di section "Proyek" pada beranda.
 *  Untuk menambah proyek baru:
 *
 *   1. Buat halaman di `src/app/projects/<slug>/page.tsx`.
 *   2. Tambahkan objek baru di array `projects` di bawah.
 *   3. (Opsional) tambahkan URL-nya di `src/app/sitemap.ts`.
 *
 *  Proyek pertama tampil sebagai kartu besar (featured), sisanya
 *  tampil sebagai kartu kecil di bawahnya. Proyek dengan
 *  `status: "soon"` belum bisa diklik — berguna untuk menyiapkan
 *  slot proyek berikutnya sebelum halamannya selesai.
 * =====================================================================
 */

import type { L } from "./portfolio";

export type ProjectStatus = "live" | "soon";

export type ProjectIcon = "code" | "globe" | "sparkles";

export type Project = {
  /** Nama pendek untuk breadcrumb dan judul kartu. */
  slug: string;
  /** Tujuan kartu. Kosongkan untuk proyek berstatus "soon". */
  href: string;
  title: string;
  /** Satu baris di bawah judul. */
  subtitle: L;
  /** Penjelasan singkat isi proyek. */
  desc: L;
  /** Label teknologi / topik. */
  tags: string[];
  /** Poin isi proyek — tampil sebagai daftar bernomor di kartu besar. */
  highlights: L[];
  /** Tahun pengerjaan — tampil di sudut kartu. */
  year: string;
  status: ProjectStatus;
  icon: ProjectIcon;
  /** Kelas gradien Tailwind untuk ikon kartu. */
  accent: string;
};

export const projects: Project[] = [
  {
    slug: "web-2",
    href: "/projects/web-2",
    title: "Web 2",
    subtitle: { id: "Dasar PHP", en: "PHP Basics" },
    desc: {
      id: "Tujuh latihan PHP dari mata kuliah Pemrograman Web 2. Setiap latihan berisi penjelasan singkat, kode yang bisa disalin, dan contoh hasilnya di browser.",
      en: "Seven PHP exercises from the Web Programming 2 course. Each exercise has a short explanation, copyable code, and an example of the result in the browser.",
    },
    tags: ["PHP", "HTML", "XAMPP"],
    highlights: [
      { id: "Menampilkan teks dengan echo", en: "Printing text with echo" },
      { id: "PHP di dalam HTML", en: "PHP inside HTML" },
      { id: "Ucapan ulang tahun", en: "Birthday greeting" },
      { id: "Penentuan nilai rapot", en: "Report card grading" },
      { id: "Perulangan while", en: "The while loop" },
      { id: "Perulangan do…while", en: "The do…while loop" },
      { id: "Perulangan foreach", en: "The foreach loop" },
    ],
    year: "2026",
    status: "live",
    icon: "code",
    accent: "from-violet-500 to-fuchsia-500",
  },
];

/** Proyek yang tampil besar di atas daftar. */
export const featuredProject = projects[0];

/** Proyek lain yang tampil sebagai kartu kecil. */
export const otherProjects = projects.slice(1);

/**
 * =====================================================================
 *  PROYEK WEB 2 — MATERI DASAR PHP
 * =====================================================================
 *  Isi halaman /projects/web-2: tujuh latihan PHP mulai dari echo
 *  sampai foreach. Setiap latihan punya kode dan contoh output.
 *
 *  Catatan: output di sini adalah contoh statis. PHP-nya dijalankan
 *  di server lokal (XAMPP), bukan di dalam Next.js.
 * =====================================================================
 */

import type { L } from "./portfolio";

export type OutputLine = {
  text: string;
  /** Tampilkan sebagai judul di panel output (mis. hasil tag <h1>). */
  heading?: boolean;
};

export type Web2Lesson = {
  /** Anchor sekaligus kunci React. */
  id: string;
  order: string;
  title: L;
  desc: L;
  /** Nama file contoh di dalam folder web2. */
  file: string;
  code: string;
  output: OutputLine[];
  /** Catatan tambahan di bawah contoh. */
  tip?: L;
};

export const web2Lessons: Web2Lesson[] = [
  {
    id: "echo",
    order: "01",
    title: { id: "Menampilkan teks dengan echo", en: "Printing text with echo" },
    desc: {
      id: "echo adalah perintah paling dasar di PHP untuk mengirim teks, angka, atau HTML ke browser. Setiap pernyataan diakhiri titik koma.",
      en: "echo is PHP's most basic statement for sending text, numbers, or HTML to the browser. Every statement ends with a semicolon.",
    },
    file: "echo.php",
    code: `<?php
// Teks biasa
echo "Halo, dunia!";
echo "<br>";

// echo juga bisa menampilkan angka
echo 2026;
echo "<br>";

// Beberapa nilai sekaligus, dipisah koma
echo "Saya ", "sedang ", "belajar PHP.";
?>`,
    output: [
      { text: "Halo, dunia!" },
      { text: "2026" },
      { text: "Saya sedang belajar PHP." },
    ],
    tip: {
      id: "Kutip ganda (\u201c\u2026\u201d) membaca nilai variabel, sedangkan kutip tunggal (\u2018\u2026\u2019) menampilkan teks apa adanya.",
      en: "Double quotes (\u201c\u2026\u201d) read variable values, while single quotes (\u2018\u2026\u2019) print text exactly as written.",
    },
  },
  {
    id: "php-dalam-html",
    order: "02",
    title: { id: "PHP di dalam HTML", en: "PHP inside HTML" },
    desc: {
      id: "Berkas .php boleh berisi HTML biasa. Kode PHP ditulis di antara <?php dan ?>, sedangkan <?= \u2026 ?> adalah singkatan dari echo.",
      en: "A .php file can contain plain HTML. PHP code goes between <?php and ?>, while <?= \u2026 ?> is shorthand for echo.",
    },
    file: "php-dalam-html.php",
    code: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Latihan PHP dalam HTML</title>
</head>
<body>
  <h1><?php echo "Selamat datang di Web 2"; ?></h1>

  <?php
    $nama = "Sarah";
    $waktu = date("H:i");
  ?>

  <p>Halo, <strong><?= $nama ?></strong>!</p>
  <p>Waktu sekarang: <?= $waktu ?> WIB</p>
</body>
</html>`,
    output: [
      { text: "Selamat datang di Web 2", heading: true },
      { text: "Halo, Sarah!" },
      { text: "Waktu sekarang: 19:42 WIB" },
    ],
    tip: {
      id: "<?= $nama ?> sama hasilnya dengan <?php echo $nama; ?>. Singkatan ini praktis dipakai di tengah template HTML.",
      en: "<?= $nama ?> gives the same result as <?php echo $nama; ?>. The shorthand is handy in the middle of an HTML template.",
    },
  },
  {
    id: "ucapan-ulang-tahun",
    order: "03",
    title: { id: "Ucapan ulang tahun", en: "Birthday greeting" },
    desc: {
      id: "Gabungkan variabel, interpolasi teks, dan tag HTML untuk membuat ucapan yang berubah sesuai nama, usia, dan tanggal hari ini.",
      en: "Combine variables, string interpolation, and HTML tags to build a greeting that changes with the name, age, and today's date.",
    },
    file: "ulang-tahun.php",
    code: `<?php
$nama = "Sarah Amelia";
$umur = 21;
$tanggal = date("d/m/Y");

echo "<h2>Selamat Ulang Tahun, $nama!</h2>";
echo "<p>Hari ini $tanggal, kamu genap berusia $umur tahun.</p>";
echo "<p>Semoga sehat selalu, dimudahkan rezekinya, ";
echo "dan semua impianmu tercapai. 🎂</p>";
?>`,
    output: [
      { text: "Selamat Ulang Tahun, Sarah Amelia!", heading: true },
      { text: "Hari ini 27/10/2026, kamu genap berusia 21 tahun." },
      { text: "Semoga sehat selalu, dimudahkan rezekinya, dan semua impianmu tercapai. 🎂" },
    ],
    tip: {
      id: "Variabel di dalam kutip ganda otomatis diganti nilainya. Kalau teksnya tidak perlu interpolasi, kutip tunggal lebih cepat dibaca PHP.",
      en: "Variables inside double quotes are replaced with their values automatically. If a string needs no interpolation, single quotes are faster for PHP to read.",
    },
  },
  {
    id: "nilai-rapot",
    order: "04",
    title: { id: "Penentuan nilai rapot", en: "Report card grading" },
    desc: {
      id: "if, elseif, dan else memilih satu dari beberapa kemungkinan. Di sini nilai angka diubah menjadi predikat huruf beserta keterangannya.",
      en: "if, elseif, and else pick one of several possibilities. Here a numeric score is converted into a letter grade with a description.",
    },
    file: "nilai-rapot.php",
    code: `<?php
$nama = "Sarah Amelia";
$nilai = 87;

if ($nilai >= 90) {
    $huruf = "A";
    $keterangan = "Sangat baik";
} elseif ($nilai >= 80) {
    $huruf = "B";
    $keterangan = "Baik";
} elseif ($nilai >= 70) {
    $huruf = "C";
    $keterangan = "Cukup";
} elseif ($nilai >= 60) {
    $huruf = "D";
    $keterangan = "Kurang";
} else {
    $huruf = "E";
    $keterangan = "Tidak lulus";
}

echo "Nama: $nama <br>";
echo "Nilai: $nilai <br>";
echo "Predikat: $huruf ($keterangan)";
?>`,
    output: [
      { text: "Nama: Sarah Amelia" },
      { text: "Nilai: 87" },
      { text: "Predikat: B (Baik)", heading: true },
    ],
    tip: {
      id: "Urutan pengecekan penting: mulai dari nilai tertinggi. Kalau >= 80 dicek lebih dulu, nilai 95 akan langsung masuk B.",
      en: "Order matters: check from the highest score down. If >= 80 is checked first, a score of 95 would fall into B.",
    },
  },
  {
    id: "while",
    order: "05",
    title: { id: "Perulangan while", en: "The while loop" },
    desc: {
      id: "while mengulang blok kode selama kondisinya benar. Kondisi diperiksa di awal, jadi kalau sudah salah sejak awal, blok tidak dijalankan sama sekali.",
      en: "while repeats a block of code as long as its condition is true. The condition is checked first, so if it starts false the block never runs.",
    },
    file: "while.php",
    code: `<?php
$angka = 1;

while ($angka <= 5) {
    echo "Perulangan ke-$angka <br>";
    $angka++;
}

echo "Selesai. Angka terakhir: $angka";
?>`,
    output: [
      { text: "Perulangan ke-1" },
      { text: "Perulangan ke-2" },
      { text: "Perulangan ke-3" },
      { text: "Perulangan ke-4" },
      { text: "Perulangan ke-5" },
      { text: "Selesai. Angka terakhir: 6", heading: true },
    ],
    tip: {
      id: "Jangan lupa $angka++. Tanpa penambahan itu kondisi selalu benar dan loop berjalan tanpa henti (infinite loop).",
      en: "Don't forget $angka++. Without it the condition stays true and the loop runs forever (infinite loop).",
    },
  },
  {
    id: "do-while",
    order: "06",
    title: { id: "Perulangan do\u2026while", en: "The do\u2026while loop" },
    desc: {
      id: "do\u2026while memeriksa kondisi di akhir. Artinya blok dijalankan minimal satu kali, walaupun kondisi sejak awal sudah salah.",
      en: "do\u2026while checks its condition at the end. That means the block runs at least once, even when the condition is false from the start.",
    },
    file: "do-while.php",
    code: `<?php
$angka = 10;

do {
    echo "Nilai angka: $angka <br>";
    $angka++;
} while ($angka <= 5);

echo "Perulangan tetap dijalankan satu kali.";
?>`,
    output: [
      { text: "Nilai angka: 10" },
      { text: "Perulangan tetap dijalankan satu kali.", heading: true },
    ],
    tip: {
      id: "Bandingkan dengan while: kondisi yang sama tidak akan menghasilkan output apa pun. do\u2026while cocok untuk proses yang harus dicoba dulu, baru diperiksa.",
      en: "Compare it with while: the same condition would produce no output at all. do\u2026while suits processes that must be tried first and checked afterwards.",
    },
  },
  {
    id: "foreach",
    order: "07",
    title: { id: "Perulangan foreach", en: "The foreach loop" },
    desc: {
      id: "foreach menelusuri setiap elemen array. Dengan bentuk $kunci => $nilai, kamu bisa mengambil nama mapel sekaligus skornya.",
      en: "foreach walks through every element of an array. With the $key => $value form you get both the subject name and its score.",
    },
    file: "foreach.php",
    code: `<?php
$nilai = [
    "Matematika" => 90,
    "Bahasa Indonesia" => 85,
    "Bahasa Inggris" => 88,
    "Informatika" => 95,
];

$total = 0;

foreach ($nilai as $mapel => $skor) {
    echo "$mapel: $skor <br>";
    $total += $skor;
}

$rata = $total / count($nilai);
echo "Rata-rata: $rata";
?>`,
    output: [
      { text: "Matematika: 90" },
      { text: "Bahasa Indonesia: 85" },
      { text: "Bahasa Inggris: 88" },
      { text: "Informatika: 95" },
      { text: "Rata-rata: 89.5", heading: true },
    ],
    tip: {
      id: "Tanpa $mapel =>, foreach hanya memberi nilainya saja. count() dipakai untuk menghitung jumlah data saat mencari rata-rata.",
      en: "Without $mapel =>, foreach only gives you the values. count() is used to get the number of entries when calculating the average.",
    },
  },
];

/* ------------------------------------------------------------------ */
/* Teks halaman                                                        */
/* ------------------------------------------------------------------ */

export const web2Page = {
  breadcrumb: { id: "Proyek", en: "Projects" } as L,
  eyebrow: { id: "Proyek · Pemrograman Web 2", en: "Project · Web Programming 2" } as L,
  title: { id: "Dasar PHP", en: "PHP Basics" } as L,
  titleAccent: {
    id: "dari echo sampai foreach",
    en: "from echo to foreach",
  } as L,
  subtitle: {
    id: "Kumpulan latihan PHP dari mata kuliah Pemrograman Web 2 — mulai dari mencetak teks, mencampur PHP dengan HTML, sampai mengolah nilai rapot dengan perulangan.",
    en: "A set of PHP exercises from the Web Programming 2 course — from printing text and mixing PHP with HTML to processing report card scores with loops.",
  } as L,
  facts: [
    {
      label: { id: "Mata kuliah", en: "Course" } as L,
      value: { id: "Pemrograman Web 2", en: "Web Programming 2" } as L,
    },
    {
      label: { id: "Bahasa", en: "Language" } as L,
      value: { id: "PHP 8 · HTML", en: "PHP 8 · HTML" } as L,
    },
    {
      label: { id: "Perangkat", en: "Tools" } as L,
      value: { id: "XAMPP · VS Code", en: "XAMPP · VS Code" } as L,
    },
  ],
  startCta: { id: "Mulai belajar", en: "Start learning" } as L,
  backCta: { id: "Kembali ke portofolio", en: "Back to portfolio" } as L,
  tocEyebrow: { id: "Materi", en: "Materials" } as L,
  tocTitle: { id: "Tujuh latihan, satu alur", en: "Seven exercises, one path" } as L,
  tocSubtitle: {
    id: "Setiap latihan berisi penjelasan singkat, kode PHP yang bisa disalin, dan contoh hasilnya di browser.",
    en: "Each exercise has a short explanation, copyable PHP code, and an example of the result in the browser.",
  } as L,
  codeLabel: { id: "Kode", en: "Code" } as L,
  outputLabel: { id: "Output", en: "Output" } as L,
  copyLabel: { id: "Salin", en: "Copy" } as L,
  copiedLabel: { id: "Tersalin", en: "Copied" } as L,
  tipLabel: { id: "Catatan", en: "Note" } as L,
  runEyebrow: { id: "Praktik", en: "Practice" } as L,
  runTitle: { id: "Cara menjalankan", en: "How to run it" } as L,
  runSubtitle: {
    id: "PHP berjalan di server, jadi file .php tidak bisa dibuka langsung dengan klik dua kali. Ikuti tiga langkah berikut.",
    en: "PHP runs on a server, so a .php file cannot be opened by double-clicking it. Follow these three steps.",
  } as L,
  runSteps: [
    {
      title: { id: "Siapkan XAMPP", en: "Set up XAMPP" } as L,
      desc: {
        id: "Instal XAMPP, buka XAMPP Control Panel, lalu klik Start pada modul Apache.",
        en: "Install XAMPP, open the Control Panel, then click Start on the Apache module.",
      } as L,
      code: "",
    },
    {
      title: { id: "Simpan file", en: "Save the file" } as L,
      desc: {
        id: "Buat folder web2 di dalam htdocs, lalu simpan setiap contoh sebagai file .php.",
        en: "Create a web2 folder inside htdocs, then save each example as a .php file.",
      } as L,
      code: "C:\\xampp\\htdocs\\web2\\echo.php",
    },
    {
      title: { id: "Buka di browser", en: "Open it in the browser" } as L,
      desc: {
        id: "Akses melalui localhost agar Apache memproses kode PHP-nya.",
        en: "Open it through localhost so Apache processes the PHP code.",
      } as L,
      code: "http://localhost/web2/echo.php",
    },
  ],
  runNote: {
    id: "Kalau file dibuka lewat file://, yang tampil hanya kode PHP-nya, bukan hasil yang sudah diproses.",
    en: "If the file is opened via file://, you only see the PHP code instead of the processed result.",
  } as L,
  outroTitle: { id: "Sudah selesai membaca?", en: "Finished reading?" } as L,
  outroDesc: {
    id: "Kembali ke beranda untuk melihat pengalaman, keahlian, dan proyek lain Sarah.",
    en: "Head back to the homepage to see Sarah's experience, skills, and other projects.",
  } as L,
};

/** Metadata halaman — dipakai di `app/projects/web-2/page.tsx`. */
export const web2Meta = {
  title: "Proyek Web 2 — Dasar PHP",
  description:
    "Latihan dasar PHP dari mata kuliah Pemrograman Web 2: echo, PHP di dalam HTML, ucapan ulang tahun, penentuan nilai rapot, while, do while, dan foreach.",
};

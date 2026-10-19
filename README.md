# Portofolio Sarah Amelia

Website portofolio pribadi yang modern dan profesional untuk **Sarah Amelia** — mahasiswa
Teknik Informatika semester 5 yang berfokus pada **editing video**, motion graphics, dan color grading.

## ✨ Fitur

| Fitur | Keterangan |
| --- | --- |
| **Tema terang & gelap** | Tombol ganti tema di navbar. Pilihan disimpan di `localStorage`; bawaan mengikuti preferensi sistem. Tanpa kedipan warna saat halaman dimuat. |
| **Bilingual (ID/EN)** | Tombol switch bahasa di navbar. Pilihan disimpan di `localStorage`. |
| **Hero 3D (Three.js)** | Medan partikel memanjang dengan shader titik halus + parallax kursor. Palet & mode pencampuran menyesuaikan tema. |
| **Animasi (Framer Motion)** | Reveal saat scroll, stagger, teks huruf-demi-huruf, kartu 3D tilt, tombol magnetik. |
| **Gulir halus (Lenis)** | Smooth scroll dengan dukungan `prefers-reduced-motion`. |
| **Kursor kustom** | Titik presisi + cincin pegas. Nonaktif otomatis di perangkat sentuh. |
| **Indikator kemajuan** | Garis progres gulir di bagian atas halaman. |
| **SEO lengkap** | Metadata, Open Graph (gambar dibuat otomatis), JSON-LD, `robots.txt`, `sitemap.xml`. |

## 🧱 Teknologi

- **Next.js 16** (App Router, Turbopack, Cache Components)
- **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- **Three.js** — scene hero
- **Framer Motion** — animasi & interaksi
- **Lenis** — smooth scrolling
- **Lucide React** — ikon

## 🚀 Menjalankan proyek

```bash
npm install
npm run dev      # http://localhost:3000
```

Perintah lain:

```bash
npm run build    # build produksi
npm run start    # jalankan hasil build
npm run lint     # ESLint
```

> Catatan Windows: bila `npm`/`npx` diblokir kebijakan eksekusi PowerShell, jalankan
> lewat `cmd /c "npm run dev"`.

## 📁 Struktur folder

```
src/
├─ app/
│  ├─ layout.tsx            # font, metadata, skrip tema, provider
│  ├─ page.tsx              # susunan seluruh section
│  ├─ globals.css           # token tema, utilitas kustom, keyframes
│  ├─ opengraph-image.tsx   # gambar pratinjau media sosial (otomatis)
│  ├─ robots.ts             # robots.txt
│  └─ sitemap.ts            # sitemap.xml
├─ components/
│  ├─ canvas/hero-scene.tsx # scene Three.js (sadar-tema)
│  ├─ layout/               # navbar & footer
│  ├─ sections/             # hero, about, skills, journey, contact
│  ├─ ui/                   # komponen kecil (reveal, tilt, marquee, toggle tema, dll.)
│  └─ providers.tsx         # tema, Lenis, locale, backdrop, kursor, scroll progress
├─ data/
│  └─ portfolio.ts          # 👈 SEMUA ISI KONTEN
└─ lib/
   ├─ theme.tsx             # provider tema terang/gelap
   ├─ locale.tsx            # provider bahasa ID/EN
   └─ ...                   # hooks, easing, cn, scroll
```

## ✍️ Mengubah konten

Seluruh teks ada di **satu file**: `src/data/portfolio.ts`.
Setiap teks berbentuk objek dua bahasa:

```ts
{ id: "Teks Bahasa Indonesia", en: "English text" }
```

Bagian yang bisa diubah:

1. **`profile`** — nama, inisial, **foto**, peran berganti, bio, statistik, email, telepon, dan sosial media.
2. **`focusAreas`** — tiga kartu keahlian di section *Tentang*.
3. **`skillGroups`** — daftar kemampuan beserta persentasenya.
4. **`techMarquee`** — teks berjalan di bawah section *Keahlian*.
5. **`timeline`** — riwayat pendidikan.
   `kind` bisa: `"university"`, `"senior"`, `"junior"`, atau `"elementary"`.
6. **`contact`** — judul & deskripsi section kontak.
7. **`ui`** — label antarmuka: navigasi, tombol, judul section, dsb.
8. **`siteMeta`** — judul, deskripsi, dan URL untuk SEO.

> **Tips:** ganti `siteMeta.url` dan `profile.resumeUrl` dengan URL asli sebelum deploy.

### 🖼️ Mengganti foto profil

Foto tampil di kolom kiri section *Tentang*.

1. Simpan foto di `public/images/` (mis. `foto-sarah.jpg`). Rasio paling pas **4:5** (contoh 1000 × 1250).
2. Ubah `src` pada `profile.photo` di `src/data/portfolio.ts`:

   ```ts
   photo: {
     src: "/images/foto-sarah.jpg",
     alt: { id: "Foto profil Sarah Amelia", en: "Portrait photo of Sarah Amelia" },
   },
   ```

3. Sesuaikan `alt` bila perlu untuk aksesibilitas.

Saat ini yang terpasang adalah gambar placeholder `public/images/sarah-placeholder.jpg`.

### 🎨 Mengubah tema warna

Semua warna ada sebagai **token** di `src/app/globals.css`:

- `:root { ... }` → nilai untuk tema **gelap**.
- `[data-theme="light"] { ... }` → override untuk tema **terang**.

Token tersebut dipetakan ke utilitas Tailwind lewat `@theme inline`, sehingga bisa dipakai
seperti: `bg-canvas`, `bg-card`, `text-ink`, `text-ink-3`, `border-hairline`, `text-accent`.
Untuk gaya khusus per tema, gunakan varian `dark:` (mis. `bg-white dark:bg-black`).

Aksen memakai palet bawaan Tailwind: `violet`, `fuchsia`, `cyan`.

### 🌗 Cara kerja tombol tema

1. Skrip inline di `<head>` (`src/app/layout.tsx`) membaca `localStorage` →
   preferensi sistem → gelap, lalu memasang `data-theme` **sebelum** paint pertama.
2. `ThemeProvider` (`src/lib/theme.tsx`) menyinkronkan React dengan nilai di DOM
   memakai `useSyncExternalStore`, jadi tidak ada error hidrasi.
3. Ikon tombol dipilih murni lewat CSS (`.theme-icon-light` / `.theme-icon-dark`)
   agar HTML server dan hasil hidrasi identik.

### Bahasa bawaan

Ubah `DEFAULT_LOCALE` di `src/data/portfolio.ts` dan atribut `lang` di `src/app/layout.tsx`.

## ⚡ Catatan performa

- Renderer 3D dibatasi pada device pixel ratio maks **1.8** (mobile: **1.5**).
- Loop render **berhenti** saat tab tidak aktif atau hero keluar dari viewport.
- Jumlah partikel dan detail geometri diturunkan otomatis di layar kecil.
- Scene 3D dibangun ulang saat tema berganti (warna & mode blending berubah).
- Bila WebGL tidak tersedia, halaman tetap tampil dengan latar gradien CSS.
- `prefers-reduced-motion` dihormati: Lenis, kursor kustom, dan loop 3D dinonaktifkan.

## ♿ Aksesibilitas

- Semua elemen interaktif dapat dijangkau keyboard (`:focus-visible` bergaya jelas).
- Gambar/kanvas dekoratif memakai `aria-hidden`.
- Kontras teks dijaga pada **kedua** tema.

## ☁️ Deploy

Cocok untuk **Vercel** (tanpa konfigurasi tambahan):

```bash
npx vercel
```

Atau build statis lalu unggah folder hasilnya ke hosting mana pun.

---

Dibuat dengan ❤️ untuk Sarah Amelia.

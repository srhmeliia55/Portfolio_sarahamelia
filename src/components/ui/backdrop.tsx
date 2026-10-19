/**
 * Lapisan latar global: aurora gradien, grid halus, dan tekstur noise.
 * Dipasang sekali di root agar konsisten di seluruh halaman.
 *
 * Semua warna memakai token tema (`--aurora-*`, `--vignette`, `--grid-line`)
 * sehingga otomatis ikut berubah saat tema terang/gelap ditukar.
 */
export function Backdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Basis warna */}
      <div className="absolute inset-0 bg-canvas" />

      {/* Aurora */}
      <div
        className="animate-aurora absolute -top-[28%] left-[-12%] size-[62rem] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle at center, var(--aurora-1), transparent 62%)" }}
      />
      <div
        className="animate-aurora absolute -right-[16%] top-[8%] size-[52rem] rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle at center, var(--aurora-2), transparent 62%)",
          animationDelay: "-6s",
        }}
      />
      <div
        className="animate-aurora absolute bottom-[-24%] left-[22%] size-[58rem] rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle at center, var(--aurora-3), transparent 64%)",
          animationDelay: "-11s",
        }}
      />

      {/* Grid */}
      <div className="bg-grid absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_at_50%_0%,#000_0%,transparent_78%)]" />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% -10%, transparent 35%, var(--vignette) 100%)",
        }}
      />

      {/* Grain */}
      <div className="noise absolute inset-0 opacity-[0.035] mix-blend-soft-light" />
    </div>
  );
}

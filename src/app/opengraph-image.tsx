import { ImageResponse } from "next/og";
import { profile, siteMeta } from "@/data/portfolio";

export const alt = siteMeta.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const siteHost = new URL(siteMeta.url).host;

/** Kartu pratinjau saat tautan dibagikan di media sosial / WhatsApp. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "74px",
          backgroundColor: "#04040c",
          backgroundImage:
            "radial-gradient(circle at 12% 8%, rgba(109,40,217,0.6), transparent 55%), radial-gradient(circle at 88% 92%, rgba(8,145,178,0.5), transparent 55%), radial-gradient(circle at 60% 40%, rgba(217,70,239,0.25), transparent 60%)",
          color: "#e2e8f0",
          fontFamily: "sans-serif",
        }}
      >
        {/* Identitas */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: 68,
              height: 68,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 20,
              background: "linear-gradient(135deg, #8b5cf6, #d946ef 55%, #22d3ee)",
              color: "#ffffff",
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            {profile.initials}
          </div>
          <div style={{ display: "flex", flexDirection: "column", marginLeft: 20 }}>
            <span style={{ fontSize: 24, fontWeight: 700, color: "#ffffff" }}>{profile.name}</span>
            <span style={{ fontSize: 15, color: "#a78bfa", letterSpacing: 4, marginTop: 6 }}>
              VIDEO EDITOR
            </span>
          </div>
        </div>

        {/* Judul */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              fontSize: 60,
              fontWeight: 700,
              lineHeight: 1.15,
              color: "#ffffff",
              maxWidth: 900,
            }}
          >
            Mengubah footage menjadi cerita yang enak ditonton sampai akhir.
          </span>
          <span style={{ fontSize: 22, color: "#94a3b8", marginTop: 24, maxWidth: 820 }}>
            Teknik Informatika · Semester 5 · Video Editing · Motion Graphics
          </span>
        </div>

        {/* Kaki */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 19, color: "#64748b" }}>{siteHost}</span>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px 22px",
              borderRadius: 999,
              border: "1px solid rgba(167,139,250,0.4)",
              color: "#c4b5fd",
              fontSize: 17,
            }}
          >
            Portofolio 2026
          </div>
        </div>
      </div>
    ),
    size,
  );
}

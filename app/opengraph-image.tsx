import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "KLE Mortgage Financing, LLC — Home Loans Made Simple";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background:
            "linear-gradient(135deg, #1A0407 0%, #4A1218 50%, #6B1C23 100%)",
          padding: "80px",
          color: "white",
          position: "relative",
        }}
      >
        {/* Gold vertical accent */}
        <div
          style={{
            position: "absolute",
            left: "60px",
            top: 0,
            bottom: 0,
            width: "2px",
            background: "linear-gradient(to bottom, transparent, #C9A345, transparent)",
            display: "flex",
          }}
        />

        {/* Brand mark */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "60px" }}>
          <div style={{ width: "12px", height: "12px", background: "#C9A345", borderRadius: "50%", display: "flex" }} />
          <div
            style={{
              fontSize: "20px",
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#C9A345",
              display: "flex",
            }}
          >
            KLE Mortgage Financing · NMLS #2380070
          </div>
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: "84px",
            fontWeight: 500,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            color: "#ffffff",
            display: "flex",
            flexDirection: "column",
            marginBottom: "40px",
          }}
        >
          <div style={{ display: "flex" }}>Home Loans</div>
          <div style={{ display: "flex", color: "#C9A345" }}>Made Simple.</div>
        </div>

        {/* Subcopy */}
        <div
          style={{
            fontSize: "26px",
            lineHeight: 1.4,
            color: "rgba(255,255,255,0.65)",
            maxWidth: "880px",
            display: "flex",
          }}
        >
          FHA · VA · USDA · Conventional · Jumbo · Hometown Heroes — licensed
          mortgage broker serving Florida.
        </div>

        {/* Bottom row */}
        <div
          style={{
            position: "absolute",
            bottom: "80px",
            left: "80px",
            right: "80px",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ fontSize: "20px", color: "#C9A345", fontWeight: 600, display: "flex" }}>
              klemortgage.com
            </div>
            <div style={{ fontSize: "18px", color: "rgba(255,255,255,0.45)", display: "flex" }}>
              (305) 705-2030 · North Miami Beach, FL
            </div>
          </div>
          <div
            style={{
              padding: "16px 32px",
              background: "#C9A345",
              color: "#1A0407",
              fontSize: "20px",
              fontWeight: 700,
              borderRadius: "999px",
              display: "flex",
            }}
          >
            Get Pre-Approved
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}

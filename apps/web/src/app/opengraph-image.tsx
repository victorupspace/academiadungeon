import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Academia Dungeon — hub para mestres de RPG";

/** OG image gerada em runtime — sem assets binários no repositório. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#060607",
          color: "#F4F4F5",
          position: "relative",
        }}
      >
        {/* fio de acento no topo */}
        <div style={{ display: "flex", height: 10, width: "100%", backgroundColor: "#A00024" }} />

        {/* blob de acento */}
        <div
          style={{
            position: "absolute",
            right: -140,
            top: 60,
            width: 480,
            height: 480,
            borderRadius: 480,
            background:
              "radial-gradient(circle at 40% 40%, rgba(200,16,46,0.55), rgba(160,0,36,0.25) 50%, transparent 72%)",
            filter: "blur(60px)",
            display: "flex",
          }}
        />

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 88px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 26,
            }}
          >
            <svg width="120" height="120" viewBox="0 0 64 64" fill="none">
              <path d="M32 2 36 6 32 10 28 6 32 2Z" fill="#A00024" />
              <path
                d="M14 54V30c0-12.2 8.06-19.5 18-19.5S50 17.8 50 30v24"
                stroke="#F4F4F5"
                strokeWidth="4"
              />
              <path
                d="M24 54V33c0-6.2 3.36-9.5 8-9.5s8 3.3 8 9.5v21"
                stroke="#F4F4F5"
                strokeWidth="3.25"
              />
              <path d="M32 34v14" stroke="#A00024" strokeWidth="3.5" />
              <path d="M8 54h48" stroke="#F4F4F5" strokeWidth="4" />
              <path d="M14 60h36" stroke="#F4F4F5" strokeWidth="3" />
            </svg>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: 84,
                fontWeight: 700,
                lineHeight: 1,
                letterSpacing: "0.01em",
                textTransform: "uppercase",
              }}
            >
              <span>Academia</span>
              <span style={{ color: "#F23A56" }}>Dungeon</span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 56,
              paddingTop: 28,
              borderTop: "2px solid #2C2C32",
              fontSize: 26,
              color: "#B6B6BC",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            {"// Domine a arte de narrar mundos"}
          </div>
        </div>

        {/* régua técnica inferior */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "2px solid #2C2C32",
            padding: "20px 88px",
            fontSize: 18,
            color: "#82828C",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}
        >
          <span>Materiais // Guias // Notícias</span>
          <span>AD_001</span>
        </div>
      </div>
    ),
    size
  );
}

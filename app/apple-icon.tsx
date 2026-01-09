import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0f",
          position: "relative",
        }}
      >
        {/* Magenta shadow layer */}
        <div
          style={{
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 120,
            fontWeight: 900,
            fontFamily: "monospace",
            color: "#ff00ff",
            transform: "translate(-3px, 0)",
            opacity: 0.6,
          }}
        >
          E
        </div>

        {/* Main cyan letter */}
        <div
          style={{
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 120,
            fontWeight: 900,
            fontFamily: "monospace",
            color: "#00ffff",
          }}
        >
          E
        </div>

        {/* Terminal prompt */}
        <div
          style={{
            position: "absolute",
            left: 20,
            top: 20,
            fontSize: 24,
            fontFamily: "monospace",
            color: "#00ff88",
          }}
        >
          &gt;
        </div>

        {/* Cursor */}
        <div
          style={{
            position: "absolute",
            right: 30,
            bottom: 35,
            width: 8,
            height: 24,
            background: "#00ffff",
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}

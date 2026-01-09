import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

export default function Icon() {
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
        {/* Magenta glow layer */}
        <div
          style={{
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 24,
            fontWeight: 900,
            fontFamily: "monospace",
            color: "#ff00ff",
            transform: "translate(-1px, 0)",
            opacity: 0.7,
          }}
        >
          E
        </div>
        {/* Cyan main layer */}
        <div
          style={{
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 24,
            fontWeight: 900,
            fontFamily: "monospace",
            color: "#00ffff",
          }}
        >
          E
        </div>
        {/* Terminal cursor accent */}
        <div
          style={{
            position: "absolute",
            right: 4,
            bottom: 6,
            width: 3,
            height: 8,
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

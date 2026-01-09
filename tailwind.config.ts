import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        "background-alt": "var(--background-alt)",
        "background-card": "var(--background-card)",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "accent-cyan": "var(--accent-cyan)",
        "accent-magenta": "var(--accent-magenta)",
        "accent-green": "var(--accent-green)",
        border: "var(--border)",
        "glow-cyan": "var(--glow-cyan)",
        "glow-magenta": "var(--glow-magenta)",
      },
      fontFamily: {
        sans: ["Space Grotesk", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      animation: {
        "glitch": "glitch 0.3s ease-in-out",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        "glow-pulse-magenta": "glow-pulse-magenta 2s ease-in-out infinite",
        "text-glow": "text-glow 2s ease-in-out infinite",
        "blink": "blink 1s step-end infinite",
        "float": "float 3s ease-in-out infinite",
        "gradient-shift": "gradient-shift 3s linear infinite",
        "fade-in-up": "fade-in-up 0.6s ease-out forwards",
        "scanline": "scanline 8s linear infinite",
      },
      keyframes: {
        glitch: {
          "0%": { transform: "translate(0)" },
          "20%": { transform: "translate(-2px, 2px)" },
          "40%": { transform: "translate(-2px, -2px)" },
          "60%": { transform: "translate(2px, 2px)" },
          "80%": { transform: "translate(2px, -2px)" },
          "100%": { transform: "translate(0)" },
        },
        "glow-pulse": {
          "0%, 100%": {
            boxShadow: "0 0 5px var(--accent-cyan), 0 0 10px var(--accent-cyan), 0 0 20px var(--glow-cyan)",
          },
          "50%": {
            boxShadow: "0 0 10px var(--accent-cyan), 0 0 20px var(--accent-cyan), 0 0 40px var(--glow-cyan)",
          },
        },
        "glow-pulse-magenta": {
          "0%, 100%": {
            boxShadow: "0 0 5px var(--accent-magenta), 0 0 10px var(--accent-magenta), 0 0 20px var(--glow-magenta)",
          },
          "50%": {
            boxShadow: "0 0 10px var(--accent-magenta), 0 0 20px var(--accent-magenta), 0 0 40px var(--glow-magenta)",
          },
        },
        "text-glow": {
          "0%, 100%": {
            textShadow: "0 0 5px var(--accent-cyan), 0 0 10px var(--accent-cyan)",
          },
          "50%": {
            textShadow: "0 0 10px var(--accent-cyan), 0 0 20px var(--accent-cyan), 0 0 30px var(--accent-cyan)",
          },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "gradient-shift": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
      },
      boxShadow: {
        "glow-cyan": "0 0 10px var(--accent-cyan), 0 0 20px var(--glow-cyan)",
        "glow-magenta": "0 0 10px var(--accent-magenta), 0 0 20px var(--glow-magenta)",
        "glow-cyan-lg": "0 0 20px var(--accent-cyan), 0 0 40px var(--glow-cyan)",
        "glow-magenta-lg": "0 0 20px var(--accent-magenta), 0 0 40px var(--glow-magenta)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;

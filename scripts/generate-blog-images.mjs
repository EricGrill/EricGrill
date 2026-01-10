#!/usr/bin/env node

/**
 * Batch generate hero images for blog posts using Gemini API
 * Usage: GEMINI_API_KEY=xxx node scripts/generate-blog-images.mjs
 */

import fs from "fs/promises";
import path from "path";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Image generation configurations
const IMAGES_TO_GENERATE = [
  {
    slug: "jiu-jitsu-teaches-debugging",
    filename: "jiu-jitsu-teaches-debugging-hero",
    prompt: `Cartoon comic book illustration of a man in his 30s-40s with short brown hair, athletic build, wearing a blue Brazilian jiu-jitsu gi, sitting cross-legged on martial arts mats in a traditional dojo. He has a focused, meditative expression with eyes closed. Above his head float translucent debugging flowcharts, code snippets, and bug icons - visualizing his thought process. The dojo has wooden walls, Japanese calligraphy scrolls, and soft natural lighting. Cyberpunk accent: subtle cyan glow on the floating code elements. Clean lines, cel-shading style.`,
  },
  {
    slug: "garmin-autopilot-trust",
    filename: "garmin-autopilot-trust-hero",
    prompt: `Cartoon comic book illustration of a pilot in his 30s-40s with short brown hair in a small aircraft cockpit (Rockwell Commander style). He's wearing an aviation headset, hands hovering near but not touching the yoke. The instrument panel shows a Garmin autopilot display glowing cyan. Through the windscreen: blue sky with clouds. A holographic HUD overlay shows "AUTOPILOT ENGAGED" with trust/handoff visualization. The pilot has a contemplative expression - theme of trust between human and machine. Warm cockpit lighting with cyan tech accents. Clean lines, cel-shading style.`,
  },
  {
    slug: "rockwell-commander-flying",
    filename: "rockwell-commander-flying-hero",
    prompt: `Cartoon comic book illustration of a pilot in his 30s-40s with short brown hair doing a pre-flight inspection of a classic Rockwell Commander aircraft on a sunny airport tarmac. He's holding a checklist that glows with code symbols and git commit messages instead of normal text - visual metaphor for code review. The aircraft is white with blue stripes. Background shows hangars and windsock. Golden hour lighting. The pilot has a methodical, careful expression. Clean lines, cel-shading style with warm orange and blue palette.`,
  },
  {
    slug: "bitcoin-2025-outlook",
    filename: "bitcoin-2025-outlook-hero",
    prompt: `Cartoon comic book illustration of a man in his 30s-40s with short brown hair, wearing a dark hoodie, at a futuristic trading/development workstation. Multiple curved monitors display Bitcoin price charts trending upward, Lightning Network node maps, and code editors. Orange Bitcoin symbols and golden accents throughout. The scene has a "builder at work" energy - constructive, not speculative. Background: city skyline through window at sunset. Color palette: deep blacks, bright orange, gold accents. Clean lines, cel-shading style.`,
  },
  {
    slug: "claude-code-intro",
    filename: "claude-code-intro-hero",
    prompt: `Cartoon comic book illustration of a man in his 30s-40s with short brown hair, wearing headphones, at a sleek developer workstation. On one monitor: VS Code with code. On another monitor: a glowing AI assistant interface (abstract, friendly) suggesting code completions. Visual connection between human and AI - collaborative energy. The developer has an "aha moment" expression. Cyberpunk aesthetic: dark room, cyan and magenta neon accents, floating holographic code snippets. Clean lines, cel-shading style.`,
  },
];

async function generateImage(prompt) {
  if (!GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY environment variable is not set");
  }

  const modelId = "gemini-2.0-flash-exp";
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelId}:generateContent?key=${GEMINI_API_KEY}`;

  const requestBody = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: { responseModalities: ["TEXT", "IMAGE"] },
  };

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  const candidates = data.candidates || [];

  for (const candidate of candidates) {
    const parts = candidate.content?.parts || [];
    for (const part of parts) {
      if (part.inlineData?.mimeType?.startsWith("image/")) {
        return {
          data: part.inlineData.data,
          mimeType: part.inlineData.mimeType,
        };
      }
    }
  }

  throw new Error("No image found in API response");
}

async function saveImage(imageData, outputPath) {
  const dir = path.dirname(outputPath);
  await fs.mkdir(dir, { recursive: true });
  const buffer = Buffer.from(imageData, "base64");
  await fs.writeFile(outputPath, buffer);
  return outputPath;
}

async function main() {
  console.log(`Starting batch image generation (${IMAGES_TO_GENERATE.length} images)...\n`);

  for (const config of IMAGES_TO_GENERATE) {
    console.log(`Generating: ${config.filename}`);
    console.log(`  Prompt: ${config.prompt.substring(0, 80)}...`);

    try {
      const result = await generateImage(config.prompt);
      const ext = result.mimeType === "image/jpeg" ? "jpg" : "png";

      // Save to public/blog for the blog post
      const blogPath = path.join(process.cwd(), "public/blog", `${config.filename}.${ext}`);
      await saveImage(result.data, blogPath);
      console.log(`  ✓ Saved: ${blogPath}\n`);

      // Also save to ericcharacter if it's an Eric character variant
      const characterPath = path.join(process.cwd(), "ericcharacter", `${config.filename}.${ext}`);
      await saveImage(result.data, characterPath);

    } catch (error) {
      console.error(`  ✗ Error: ${error.message}\n`);
    }

    // Small delay between API calls
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log("Batch generation complete!");
}

main();

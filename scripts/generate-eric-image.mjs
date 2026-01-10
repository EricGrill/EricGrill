#!/usr/bin/env node

/**
 * Standalone script to generate Eric character image using Gemini API
 * Usage: GEMINI_API_KEY=xxx node scripts/generate-eric-image.mjs
 */

import fs from "fs/promises";
import path from "path";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

async function generateImage(prompt) {
  if (!GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY environment variable is not set");
  }

  const modelId = "gemini-2.0-flash-exp";
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelId}:generateContent?key=${GEMINI_API_KEY}`;

  console.log("Generating image with prompt:", prompt.substring(0, 100) + "...");

  const requestBody = {
    contents: [
      {
        parts: [
          {
            text: prompt,
          },
        ],
      },
    ],
    generationConfig: {
      responseModalities: ["TEXT", "IMAGE"],
    },
  };

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();

  // Extract image from response
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
  const prompt = `Cartoon comic book illustration of a man in his 30s-40s with short brown hair, athletic build, wearing a dark hoodie with headphones around his neck. He is sitting at a futuristic workstation with multiple glowing monitors displaying Lightning Network payment channels, encrypted message flows, and Bitcoin symbols. The scene has a cyberpunk aesthetic with neon blue and orange accent lighting. Circuit board patterns and lightning bolt motifs in the background. The man has a focused, contemplative expression as he codes. Style: clean lines, cel-shading, tech-forward color palette.`;

  const filename = "eric-lightning-encrypted";
  const outputDir = "ericcharacter";

  console.log("Starting image generation...");

  try {
    const result = await generateImage(prompt);
    const ext = result.mimeType === "image/jpeg" ? "jpg" : "png";
    const outputPath = path.join(process.cwd(), outputDir, `${filename}.${ext}`);

    await saveImage(result.data, outputPath);
    console.log(`Image saved to: ${outputPath}`);

    // Also copy to public/blog for the blog post
    const blogPath = path.join(process.cwd(), "public/blog", `${filename}.${ext}`);
    await saveImage(result.data, blogPath);
    console.log(`Also saved to: ${blogPath}`);

  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

main();

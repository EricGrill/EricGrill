#!/usr/bin/env node

/**
 * Generate nano-banana illustrations for blog posts
 * Uses Gemini API directly
 */

import fs from "fs/promises";
import path from "path";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const OUTPUT_DIR = "./public/images/illustrations";

// Eric character style guide for consistency
const ERIC_STYLE = `
Simple cartoon illustration style. Eric is depicted as a friendly cartoon character with:
- Short brown hair
- Athletic build
- Expressive face showing the emotion of the moment
- Simple clean lines, not overly detailed
- Cyberpunk/tech aesthetic with cyan and magenta accent colors
- Dark background (#0a0a0f) with glowing elements
- Minimalist style suitable for inline blog graphics
`;

// All illustrations to generate
const ILLUSTRATIONS = [
  // lisbon-gold-rotator-cuff.mdx
  {
    slug: "lisbon-gold-rotator-cuff",
    name: "game-plan-crumpled",
    prompt: `Cartoon illustration: A determined athlete mid-takedown dive on a jiu-jitsu mat. A piece of paper labeled "GAME PLAN" flies away crumpled. The athlete has a "oh well!" expression. Humor and action combined. ${ERIC_STYLE}`,
  },
  {
    slug: "lisbon-gold-rotator-cuff",
    name: "adrenaline-molecule",
    prompt: `Cartoon illustration: An adrenaline molecule personified as a cute character with angel halo and innocent smile giving thumbs up. Behind it, a shoulder joint is comically falling apart with "sproing" effect lines. Dark background with cyan glow. ${ERIC_STYLE}`,
  },
  {
    slug: "lisbon-gold-rotator-cuff",
    name: "pain-arrives-late",
    prompt: `Cartoon illustration: "Pain" personified as a small red angry character running through airport arrivals gate, dragging a heavy suitcase, looking flustered and out of breath. Sign says "ARRIVALS". Humorous style. ${ERIC_STYLE}`,
  },

  // jiu-jitsu-teaches-debugging.mdx
  {
    slug: "jiu-jitsu-teaches-debugging",
    name: "tap-is-information",
    prompt: `Split diagram illustration: Left side shows person tapping on jiu-jitsu mat with data/info bubbles emerging. Right side shows computer crash log with same data bubbles. Visual parallel between the two. Clean minimal style. ${ERIC_STYLE}`,
  },
  {
    slug: "jiu-jitsu-teaches-debugging",
    name: "submission-hunting",
    prompt: `Cartoon illustration: Developer with magnifying glass frantically searching one code file, while a cartoon bug is clearly visible waving in another file they're ignoring. Humorous tech cartoon. ${ERIC_STYLE}`,
  },

  // garmin-autopilot-trust.mdx
  {
    slug: "garmin-autopilot-trust",
    name: "white-knuckle-autopilot",
    prompt: `Cartoon illustration: Pilot in cockpit with white-knuckle death grip on yoke, eyes wide and nervous, sweat drops. The autopilot display calmly shows "ENGAGED" with a smiley face. Humorous contrast. ${ERIC_STYLE}`,
  },
  {
    slug: "garmin-autopilot-trust",
    name: "pilot-vs-developer",
    prompt: `Split panel cartoon: Left shows pilot's hand hovering nervously over autopilot disconnect button. Right shows developer's hand hovering over "Stop Generating" button. Same nervous posture in both. ${ERIC_STYLE}`,
  },
  {
    slug: "garmin-autopilot-trust",
    name: "let-go-yoke",
    prompt: `Zen-style illustration: Hands releasing a yoke/control column, peaceful energy lines radiating outward. Minimalist, calming. Dark background with soft cyan glow. ${ERIC_STYLE}`,
  },

  // rockwell-commander-flying.mdx
  {
    slug: "rockwell-commander-flying",
    name: "meat-computer-checklist",
    prompt: `Illustration: Human brain with checkbox/checklist UI overlay. Title "MEAT COMPUTER v1.0". Cyberpunk style with glowing elements. Humorous tech meets biology. ${ERIC_STYLE}`,
  },
  {
    slug: "rockwell-commander-flying",
    name: "go-around-diagram",
    prompt: `Diagram showing two paths: One airplane persisting toward bad approach (red, danger), one airplane going around (green, safe). Parallel below shows: a PR being force-merged (red) vs closed/revised (green). ${ERIC_STYLE}`,
  },

  // bitcoin-opreturn-to-lightning-journey.mdx
  {
    slug: "bitcoin-opreturn-to-lightning",
    name: "testnet-vs-mainnet",
    prompt: `Two-panel cartoon: Panel 1 - Developer looking confident and happy on "TESTNET" labeled computer. Panel 2 - Same developer getting slapped in face by a giant receipt/bill on "MAINNET" computer. ${ERIC_STYLE}`,
  },
  {
    slug: "bitcoin-opreturn-to-lightning",
    name: "luxury-message",
    prompt: `Cartoon illustration: A simple text message "Hello" displayed in a fancy Tiffany jewelry box on velvet pillow with a $15 price tag. Satirical luxury goods style. ${ERIC_STYLE}`,
  },
  {
    slug: "bitcoin-opreturn-to-lightning",
    name: "wall-vs-door",
    prompt: `Simple illustration: Cartoon figure running face-first into brick wall labeled "OP_RETURN FEES". Right next to the wall is a clearly visible open door labeled "Lightning". Humorous. ${ERIC_STYLE}`,
  },

  // superpowers-brainstorming-guide.mdx
  {
    slug: "superpowers-brainstorming",
    name: "project-graveyard",
    prompt: `Cartoon illustration: Graveyard scene with folder icons as tombstones. Among them, 3 healthy glowing plants labeled "SHIPPED". Dark humor, developer relatability. ${ERIC_STYLE}`,
  },
  {
    slug: "superpowers-brainstorming",
    name: "button-tentacles",
    prompt: `Illustration: A simple UI button that has grown tentacles/roots connecting to increasingly complex infrastructure: a modal, database, state manager, API layer. Chaos spreading from simple button. ${ERIC_STYLE}`,
  },
  {
    slug: "superpowers-brainstorming",
    name: "narrator-freeze-frame",
    prompt: `Arrested Development style freeze frame: Developer looking confident, overlaid text "Narrator: He had not considered this." Retro TV style with scan lines. ${ERIC_STYLE}`,
  },

  // claude-code-intro.mdx
  {
    slug: "claude-code-intro",
    name: "rubber-stamp-developer",
    prompt: `Cartoon illustration: Developer depicted as a literal rubber stamp with "APPROVE" on bottom, mechanically stamping code suggestions. Tab key prominently featured. Humorous self-deprecating. ${ERIC_STYLE}`,
  },
  {
    slug: "claude-code-intro",
    name: "typescript-hydra",
    prompt: `Illustration: A hydra monster where each head is a TypeScript error message. Cutting one head shows two more errors spawning. Developer with sword looking overwhelmed. ${ERIC_STYLE}`,
  },

  // hookify-tool-guide.mdx
  {
    slug: "hookify-tool-guide",
    name: "evangelizing-vs-reality",
    prompt: `Two-panel cartoon: Panel 1 - Developer at podium enthusiastically presenting "HOOKS!" to audience. Panel 2 - Same developer at home on couch, laptop closed, Netflix on TV. ${ERIC_STYLE}`,
  },
  {
    slug: "hookify-tool-guide",
    name: "broken-json",
    prompt: `Cartoon illustration: A JSON file with visible cracks and bandages. Developer standing next to it with tiny hammer looking sheepish. "Oops" expression. ${ERIC_STYLE}`,
  },

  // claude-code-hooks.mdx
  {
    slug: "claude-code-hooks",
    name: "ai-chaos-triptych",
    prompt: `Three-panel comic strip: 1) Developer looks away from screen. 2) AI happily typing with sparkles. 3) Developer returns to chaos: .env on GitHub, weird database columns, console.logs everywhere. ${ERIC_STYLE}`,
  },
  {
    slug: "claude-code-hooks",
    name: "golden-retriever-coder",
    prompt: `Illustration: Golden retriever dog at laptop, eagerly typing, code and files flying everywhere. Capturing "enthusiastic but needs supervision" energy. Cute but chaotic. ${ERIC_STYLE}`,
  },

  // frontend-design-skill.mdx
  {
    slug: "frontend-design-skill",
    name: "ai-aesthetic-grid",
    prompt: `Illustration: Grid of 6 nearly identical landing pages, all purple-blue gradients, same layout. Labels: "SaaS Tool", "Crypto App", "Productivity", "AI Startup", "Fintech", "Health App". Satire of AI-generated design sameness. ${ERIC_STYLE}`,
  },
  {
    slug: "frontend-design-skill",
    name: "ai-aesthetic-wanted",
    prompt: `Wanted poster style: "WANTED: THE AI AESTHETIC". Mugshot showing purple-blue gradient blob. Distinguishing features listed: "Inter font", "rounded-2xl", "purple gradient". Reward: "Original Design". ${ERIC_STYLE}`,
  },

  // lightning-encrypted-message-queue.mdx
  {
    slug: "lightning-encrypted-mq",
    name: "server-vulnerabilities",
    prompt: `Diagram with central server icon. Three icons pointing at it: an eye (labeled "Sees Everything"), a crack/breach symbol (labeled "Compromised"), a gavel (labeled "Subpoenaed"). Clean infographic style. ${ERIC_STYLE}`,
  },
];

async function generateImage(prompt) {
  const modelId = "gemini-2.0-flash-exp";
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelId}:generateContent?key=${GEMINI_API_KEY}`;

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { responseModalities: ["TEXT", "IMAGE"] },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();

  for (const candidate of data.candidates || []) {
    for (const part of candidate.content?.parts || []) {
      if (part.inlineData?.mimeType?.startsWith("image/")) {
        return part.inlineData.data;
      }
    }
  }

  throw new Error("No image in response");
}

async function main() {
  if (!GEMINI_API_KEY) {
    console.error("GEMINI_API_KEY not set");
    process.exit(1);
  }

  console.log(`Generating ${ILLUSTRATIONS.length} illustrations...`);

  for (let i = 0; i < ILLUSTRATIONS.length; i++) {
    const ill = ILLUSTRATIONS[i];
    const outDir = path.join(OUTPUT_DIR, ill.slug);
    const outPath = path.join(outDir, `${ill.name}.png`);

    console.log(`[${i + 1}/${ILLUSTRATIONS.length}] ${ill.slug}/${ill.name}`);

    try {
      await fs.mkdir(outDir, { recursive: true });

      const imageData = await generateImage(ill.prompt);
      const buffer = Buffer.from(imageData, "base64");
      await fs.writeFile(outPath, buffer);

      console.log(`  ✓ Saved to ${outPath}`);
    } catch (err) {
      console.error(`  ✗ Error: ${err.message}`);
    }

    // Rate limiting - wait between requests
    if (i < ILLUSTRATIONS.length - 1) {
      await new Promise(r => setTimeout(r, 2000));
    }
  }

  console.log("\nDone!");
}

main();

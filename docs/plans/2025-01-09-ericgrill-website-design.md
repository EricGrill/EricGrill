# ericgrill.com Website Design

## Overview

Personal brand website for Eric Grill - a platform combining thought leadership, content creation, and professional portfolio.

**Domain:** ericgrill.com
**Positioning:** Multidimensional - "Builder. Pilot. Grappler."
**Background:** OG Bitcoiner, serial entrepreneur, CEO of Chainbytes, software developer with fintech/hedge fund experience

## Goals

1. **Thought leadership** - Establish expert voice, attract speaking/consulting opportunities
2. **Content hub** - Build audience through writing, grow email list
3. **Professional portfolio** - Showcase background with blog as supporting content

## Design Direction

Reference: [AC Modern Brand Digital Consultant](https://dribbble.com/shots/26271346-AC-Modern-Brand-Digital-Consultant-Personal-Website-Home-Page)

### Color Palette

| Use | Color | Hex |
|-----|-------|-----|
| Background | White | `#FFFFFF` |
| Alt sections | Soft gray | `#F8F9FA` |
| Primary text | Near-black | `#121212` |
| Secondary text | Muted gray | `#6B7280` |
| Accent | Electric blue | `#2563EB` |
| Borders | Light gray | `#E5E7EB` |

### Typography

- **Headlines:** Inter or Satoshi, bold, 48-72px (hero), 32-40px (sections)
- **Body:** Inter or system stack, 18px base
- **Monospace:** For code snippets

### Layout Principles

- Max content width: ~720px (blog posts)
- Generous white space: 80-120px between sections
- Card-based blog grid: 2-3 columns desktop, 1 column mobile
- Subtle hover states on interactive elements

## Site Structure

### Pages

- **Home** (`/`) - Hero + featured posts + newsletter signup
- **Blog** (`/blog`) - All posts with topic filters
- **About** (`/about`) - Story and background
- **Contact** (`/contact`) - Simple contact form

### Navigation

```
[Eric Grill]                    [Blog] [About] [Contact]
```

- Clean top nav, no dropdowns
- Mobile: hamburger menu

### URL Structure

- `/` - Home
- `/blog` - Blog index
- `/blog/[slug]` - Individual posts
- `/blog?topic=ai` - Filtered view (query params)
- `/about`
- `/contact`

## Blog Topics

Five content categories with filter functionality:

1. **AI** - Artificial intelligence, machine learning
2. **Aviation** - Flying, pilot experiences
3. **Jiu Jitsu** - BJJ training, competition, philosophy
4. **Blockchain** - Bitcoin, crypto, Web3
5. **Programming** - Software development, technical posts

Posts can have multiple topic tags for crossover content.

## Page Layouts

### Home Page

1. **Hero Section**
   - Large name: "Eric Grill" (64-72px)
   - Tagline: "Builder. Pilot. Grappler. Writing about AI, aviation, jiu jitsu, and blockchain."
   - CTA button: "Read the blog" or "Subscribe"
   - Photo placeholder for later

2. **Featured Posts**
   - Heading: "Latest" or "Recent Writing"
   - 3 post cards (title, topic tag, date, excerpt)
   - Link: "View all posts"

3. **Newsletter Section**
   - Soft gray background band
   - Heading + one-liner
   - Email input + subscribe button (ConvertKit)

4. **Footer**
   - Minimal: copyright, social links, contact link

### Blog Index

- Page title: "Blog" or "Writing"
- Topic filter bar: `All` `AI` `Aviation` `Jiu Jitsu` `Blockchain` `Programming`
- Post grid: 2 columns desktop, 1 mobile
- Cards show: topic tag, title, date, read time, excerpt
- Pagination when needed

### Individual Post

- Centered layout, max-width 720px
- Header: topic tag, title, date + read time
- Body: MDX-rendered content
  - Proper heading hierarchy
  - Syntax-highlighted code blocks
  - Styled blockquotes
  - Centered images with captions
- Footer: topic tags, related posts, newsletter CTA

### About Page

- Large heading
- 2-3 paragraphs: story, journey, why you write
- Photo placeholder
- CTA to contact or blog

### Contact Page

- Heading + short intro (what you're open to)
- Form: name, email, message, submit
- Or: direct email display

## Technical Stack

### Framework & Tools

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Content:** MDX for blog posts
- **Hosting:** Vercel

### Project Structure

```
ericgrill/
├── app/
│   ├── page.tsx              # Home
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global styles
│   ├── blog/
│   │   ├── page.tsx          # Blog index
│   │   └── [slug]/page.tsx   # Individual post
│   ├── about/page.tsx
│   └── contact/page.tsx
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── PostCard.tsx
│   ├── TopicFilter.tsx
│   └── NewsletterForm.tsx
├── content/
│   └── posts/                # MDX blog posts
├── lib/
│   └── posts.ts              # MDX parsing helpers
└── public/                   # Static assets
```

### Blog Post Format

```mdx
---
title: "Post Title"
date: "2025-01-09"
topics: ["ai", "programming"]
excerpt: "Brief description for cards and SEO."
---

Post content in markdown...
```

### Content Workflow

1. Write posts as `.mdx` files in `content/posts/`
2. Include frontmatter metadata
3. `git push` triggers Vercel deployment

### Integrations

- **Newsletter:** ConvertKit (embed form or API)
- **Contact form:** API route sending email, or Formspree

## Future Enhancements (Not in v1)

- Professional photography in hero/about
- RSS feed
- Search functionality
- Dark mode toggle
- Reading progress indicator
- Social share buttons

## Open Questions

None - design validated and ready for implementation.

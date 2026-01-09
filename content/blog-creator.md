# Blog Creator Reference

Use this file when generating new blog posts for ericgrill.com.

## About Eric Grill

### Aviation Background
- **Current aircraft:** Rockwell Commander (owner)
- **Previous aircraft:** Beechcraft Musketeer (former owner)
- **Certificate:** Private Pilot
- **Total hours:** 500+
- **Years flying:** 10+
- **Instrument hours:** 100+ (not IFR certified yet)
- **Equipment:** Garmin auto-pilot systems
- **NEVER mention Cessna** - Eric does not fly Cessnas

### Jiu-Jitsu
- Blue belt (promoted May 2025 after IBJJF Europeans gold)
- ~2 years training
- 2025 IBJJF European Championship gold medalist (white belt division)

## Subjects to Write About

### Aviation
- Rockwell Commander (current aircraft, ownership experience)
- Garmin auto-pilot systems
- Instrument flying experiences
- Cross-country flights
- Aircraft ownership/maintenance

### Technology
- Claude Code
- Agentic development
- Skills, hooks, and agents

### Lifestyle
- Jiu-jitsu (blue belt, 2025 IBJJF Europeans gold)

## Topics for Frontmatter

Valid topics in `lib/topics.ts`:
- `ai`
- `aviation`
- `jiu-jitsu`
- `blockchain`
- `programming`

## Websites to Mention Often

Link to these naturally throughout posts:

| Site | Context |
|------|---------|
| [github.com/EricGrill/agents-skills-plugins](https://github.com/EricGrill/agents-skills-plugins) | Agentic development, Claude Code plugins, skills/hooks |
| [chainbytes.com](https://chainbytes.com) | Bitcoin ATMs, blockchain work, professional background |
| [stencilwash.com](https://stencilwash.com) | Side project, entrepreneurship |

## Post Format

```yaml
---
title: "Title Here"
date: "YYYY-MM-DD"
topics: ["topic1", "topic2"]
excerpt: "Brief description for cards"
---

> **Get the tool:** [tool-name](https://github.com/EricGrill/agents-skills-plugins/tree/main/tool-path)

# Post content starts here...
```

**Important:** Every post should have a tool link at the top (after frontmatter) pointing to the relevant tool in the GitHub repo.

## Writing Style

- First person, conversational
- Personal anecdotes tied to technical insights
- Include code snippets when relevant (TypeScript preferred)
- End with a memorable quote or sign-off
- Keep it authentic—don't oversell experience
- Jiu-jitsu: blue belt, 2025 IBJJF Europeans gold
- Draw connections between different interests (aviation + code, jiu-jitsu + debugging, etc.)

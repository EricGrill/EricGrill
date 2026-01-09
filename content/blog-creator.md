# Blog Creator Reference

Use this file when generating new blog posts for ericgrill.com.

## Subjects to Write About

### Aviation
- Rockwell Commander (aircraft ownership/flying)
- Garmin auto-pilot systems

### Technology
- Claude Code
- Agentic development
- Skills, hooks, and agents

### Lifestyle
- Jiu-jitsu (2 years experience, still learning)

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
- Jiu-jitsu: ~2 years training (beginner mindset)
- Draw connections between different interests (aviation + code, jiu-jitsu + debugging, etc.)

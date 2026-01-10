# Project Instructions for Claude

## Writing Style Rules

When writing blog posts or any content for this site:

1. **NEVER use em-dashes (— or --)** in copy. This is a dead giveaway of AI-generated content. Instead:
   - Use periods to break up thoughts
   - Use commas for parenthetical phrases
   - Use parentheses when needed
   - Restructure sentences to be more direct

2. **Voice**: First person, conversational, technical but accessible

3. **Format**: MDX files in `/content/posts/` with frontmatter:
   ```yaml
   ---
   title: "Post Title"
   date: "YYYY-MM-DD"
   topics: ["topic1", "topic2"]
   excerpt: "Brief description"
   heroImage: "/images/blog/post-slug-hero.png"
   ---
   ```

4. **Standard opening**: Include the tools link after frontmatter:
   ```markdown
   > **Explore my tools:** [agents-skills-plugins](https://github.com/EricGrill/agents-skills-plugins)
   ```

## SEO

Audit files are in `/seo/`. See `/seo/README.md` for current status and outstanding issues.

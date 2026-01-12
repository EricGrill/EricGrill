---
name: postiz
description: Create and schedule social media posts via Postiz. Use for sharing blog posts to Twitter/X and Facebook.
---

# Postiz Social Media Posting

This skill interfaces with the Postiz instance at `postiz.stencilwash.com` to create and schedule social media posts.

## Configuration

**Required Environment Variable:** `POSTIZ_API_KEY`

The API key must be set in your environment. Get it from your Postiz dashboard under Settings > API Keys.

**Base URL:** `https://postiz.stencilwash.com/api/public/v1`

## Workflow

### Step 1: Verify Connection and List Integrations

First, verify the API connection and get available social media channels:

```bash
# Check connection
curl -s -H "Authorization: $POSTIZ_API_KEY" \
  "https://postiz.stencilwash.com/api/public/v1/is-connected"

# List connected integrations (Twitter, Facebook, etc.)
curl -s -H "Authorization: $POSTIZ_API_KEY" \
  "https://postiz.stencilwash.com/api/public/v1/integrations"
```

Save the integration IDs for the platforms you want to post to.

### Step 2: Create Posts

**For immediate posting:**
```bash
curl -X POST \
  -H "Authorization: $POSTIZ_API_KEY" \
  -H "Content-Type: application/json" \
  "https://postiz.stencilwash.com/api/public/v1/posts" \
  -d '{
    "type": "now",
    "posts": [{
      "integration": {"id": "INTEGRATION_ID"},
      "value": [{"content": "Your post content here", "image": []}],
      "settings": {"__type": "x"}
    }]
  }'
```

**For scheduled posting:**
```bash
curl -X POST \
  -H "Authorization: $POSTIZ_API_KEY" \
  -H "Content-Type: application/json" \
  "https://postiz.stencilwash.com/api/public/v1/posts" \
  -d '{
    "type": "schedule",
    "date": "2026-01-12T15:00:00.000Z",
    "posts": [{
      "integration": {"id": "INTEGRATION_ID"},
      "value": [{"content": "Your post content here", "image": []}],
      "settings": {"__type": "x"}
    }]
  }'
```

### Step 3: Platform-Specific Settings

**Twitter/X (`__type: "x"`):**
```json
{
  "settings": {
    "__type": "x",
    "who_can_reply_post": "everyone"
  }
}
```

**Facebook (`__type: "facebook"`):**
```json
{
  "settings": {
    "__type": "facebook"
  }
}
```

**LinkedIn (`__type: "linkedin"`):**
```json
{
  "settings": {
    "__type": "linkedin"
  }
}
```

## Blog Post Promotion Template

When promoting a blog post, create engaging social copy:

**For Twitter/X (280 char limit):**
- Lead with a hook or key insight
- Include the blog post URL
- Add 1-2 relevant hashtags
- Keep under 280 characters

**For Facebook (longer form):**
- Can be more detailed
- Include a brief summary
- Add the URL
- Can include more context

## Example: Promote a Blog Post

```bash
# Post to Twitter/X
curl -X POST \
  -H "Authorization: $POSTIZ_API_KEY" \
  -H "Content-Type: application/json" \
  "https://postiz.stencilwash.com/api/public/v1/posts" \
  -d '{
    "type": "now",
    "posts": [{
      "integration": {"id": "TWITTER_INTEGRATION_ID"},
      "value": [{
        "content": "I gave Claude Code 50+ Kali Linux tools and the ability to spawn attack VMs. Here'\''s how I turned it into a frighteningly effective security tool.\n\nhttps://ericgrill.com/blog/kali-orchestration-ai-hacker\n\n#AI #Security #ClaudeCode",
        "image": []
      }],
      "settings": {"__type": "x", "who_can_reply_post": "everyone"}
    }]
  }'
```

## Uploading Images

To include images with your post:

```bash
# Upload image first
curl -X POST \
  -H "Authorization: $POSTIZ_API_KEY" \
  -H "Content-Type: application/json" \
  "https://postiz.stencilwash.com/api/public/v1/upload-from-url" \
  -d '{"url": "https://ericgrill.com/images/blog/your-image.png"}'

# Use the returned path in your post
# "image": ["returned-image-path"]
```

## Rate Limits

- 30 requests per hour
- Multiple posts can be included in a single request to different platforms

## Checklist for Blog Promotion

1. [ ] Verify API connection with `/is-connected`
2. [ ] Get integration IDs with `/integrations`
3. [ ] Draft Twitter copy (under 280 chars with URL)
4. [ ] Draft Facebook copy (can be longer)
5. [ ] Optionally upload hero image
6. [ ] Create posts (immediate or scheduled)
7. [ ] Verify posts appeared with `/posts` endpoint

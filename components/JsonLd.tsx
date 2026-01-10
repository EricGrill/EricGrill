type JsonLdProps = {
  data: Record<string, unknown>;
};

// JSON-LD component for structured data
// Safe to use dangerouslySetInnerHTML here because:
// 1. All data comes from our schema generators, not user input
// 2. JSON.stringify escapes any special characters
// 3. This is the standard Next.js pattern for JSON-LD
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Pre-built schema generators
export function generateArticleSchema({
  title,
  description,
  url,
  imageUrl,
  datePublished,
  author,
}: {
  title: string;
  description: string;
  url: string;
  imageUrl: string;
  datePublished: string;
  author: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: description,
    url: url,
    image: imageUrl,
    datePublished: datePublished,
    dateModified: datePublished,
    author: {
      "@type": "Person",
      name: author,
      url: "https://ericgrill.com/about",
    },
    publisher: {
      "@type": "Person",
      name: "Eric Grill",
      url: "https://ericgrill.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };
}

export function generatePersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Eric Grill",
    url: "https://ericgrill.com",
    image: "https://ericgrill.com/images/eric-headshot.jpeg",
    description:
      "Builder. Pilot. Grappler. Writing about AI, aviation, jiu jitsu, blockchain, and programming.",
    sameAs: [
      "https://www.linkedin.com/in/ericgrill/",
      "https://x.com/EricGrill",
      "https://github.com/EricGrill",
    ],
    jobTitle: "Builder",
    knowsAbout: [
      "Artificial Intelligence",
      "Aviation",
      "Brazilian Jiu Jitsu",
      "Blockchain",
      "Programming",
    ],
  };
}

export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Eric Grill",
    url: "https://ericgrill.com",
    description:
      "Builder. Pilot. Grappler. Writing about AI, aviation, jiu jitsu, blockchain, and programming.",
    author: {
      "@type": "Person",
      name: "Eric Grill",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://ericgrill.com/blog?search={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

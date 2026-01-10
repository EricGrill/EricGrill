import Link from "next/link";
import { JsonLd, generateBreadcrumbSchema } from "./JsonLd";

type BreadcrumbItem = {
  label: string;
  href: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const baseUrl = "https://ericgrill.com";

  // Build full schema items with absolute URLs
  const schemaItems = items.map((item) => ({
    name: item.label,
    url: item.href.startsWith("http") ? item.href : `${baseUrl}${item.href}`,
  }));

  const breadcrumbSchema = generateBreadcrumbSchema(schemaItems);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center gap-2 font-mono text-sm text-text-secondary">
          {items.map((item, index) => (
            <li key={item.href} className="flex items-center gap-2">
              {index > 0 && (
                <span className="text-border">/</span>
              )}
              {index === items.length - 1 ? (
                <span className="text-text-primary">{item.label}</span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-accent-cyan transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}

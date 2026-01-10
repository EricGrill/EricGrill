"use client";

import Image from "next/image";
import { useState, ImgHTMLAttributes, DetailedHTMLProps } from "react";

type BlogImageProps = DetailedHTMLProps<
  ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;

export function BlogImage({ src, alt, width, height, ...props }: BlogImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  if (!src) return null;

  // Handle external images vs local images
  const isExternal = src.startsWith("http");

  // Default dimensions for blog images
  const imgWidth = typeof width === "number" ? width : 800;
  const imgHeight = typeof height === "number" ? height : 450;

  return (
    <figure className="my-8 -mx-4 md:mx-0">
      <div className="relative overflow-hidden rounded-lg border border-border bg-surface">
        {/* Loading skeleton */}
        {isLoading && (
          <div className="absolute inset-0 bg-surface animate-pulse" />
        )}

        {isExternal ? (
          // External images use regular img tag
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt || "Blog image"}
            className="w-full h-auto"
            onLoad={() => setIsLoading(false)}
          />
        ) : (
          // Local images use Next.js Image for optimization
          <Image
            src={src}
            alt={alt || "Blog image"}
            width={imgWidth}
            height={imgHeight}
            className={`w-full h-auto transition-opacity duration-300 ${
              isLoading ? "opacity-0" : "opacity-100"
            }`}
            onLoad={() => setIsLoading(false)}
            priority={false}
            quality={85}
            sizes="(max-width: 768px) 100vw, 800px"
          />
        )}
      </div>

      {/* Caption from alt text */}
      {alt && (
        <figcaption className="mt-3 text-center font-mono text-sm text-text-secondary">
          {alt}
        </figcaption>
      )}
    </figure>
  );
}

export default BlogImage;

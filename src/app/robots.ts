import type { MetadataRoute } from "next";

/**
 * Crawlers must be able to fetch the pages to read the `noindex` directive,
 * so nothing is disallowed here. The sitemap is intentionally omitted: this
 * archived site should not advertise URLs for indexing.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
  };
}

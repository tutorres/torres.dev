import type { MetadataRoute } from "next"
import { absoluteUrl } from "@/lib/site"

/** Everything here is public, so nothing is disallowed. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/"),
  }
}

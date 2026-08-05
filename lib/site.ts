/**
 * Canonical origin for the site. No custom domain is registered yet, so this
 * points at the Vercel deployment. When a domain is bought, change it here and
 * nowhere else: sitemap, robots and the JSON-LD Person entity all read it.
 *
 * No trailing slash. Callers concatenate paths that start with "/".
 */
export const SITE_URL = "https://torres-dev-ai.vercel.app"

/** Absolute URL for a path such as "/articles/some-slug". */
export function absoluteUrl(path = "/"): string {
  return `${SITE_URL}${path}`
}

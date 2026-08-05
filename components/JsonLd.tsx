import { author } from "@/lib/author"
import { absoluteUrl, SITE_URL } from "@/lib/site"

/**
 * Structured data for search engines.
 *
 * "Arthur Torres" is a common name, so the Person entity below is the signal
 * that ties this domain to a specific human: the sameAs profiles are the part
 * Google actually uses to reconcile the identity.
 *
 * Server components only. These render a plain script tag, no client JS.
 */

/** Stable node id so other entities can point at the Person by reference. */
const PERSON_ID = `${SITE_URL}/#person`

type JsonLdObject = Record<string, unknown>

function JsonLdScript({ data }: { data: JsonLdObject }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is embedded verbatim. "<" is escaped so a value
      // can never close the script tag early.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  )
}

export function PersonJsonLd() {
  const data: JsonLdObject = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: author.name,
    jobTitle: author.role,
    url: absoluteUrl("/"),
    sameAs: [author.github, "https://linkedin.com/in/torres-arthur", "https://dev.to/arthurtorres"],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "CEFET-MG",
      alternateName: "Centro Federal de Educação Tecnológica de Minas Gerais",
    },
    worksFor: {
      "@type": "Organization",
      name: "Banco Inter",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Belo Horizonte",
      addressRegion: "MG",
      addressCountry: "BR",
    },
    knowsAbout: ["LLM agents", "Model Context Protocol", "Retrieval-Augmented Generation", "Python", "LLM evaluation"],
  }

  return <JsonLdScript data={data} />
}

export interface BlogPostingJsonLdProps {
  slug: string
  headline: string
  description: string
  /** ISO date, e.g. "2026-05-03". */
  datePublished: string
}

export function BlogPostingJsonLd({ slug, headline, description, datePublished }: BlogPostingJsonLdProps) {
  const url = absoluteUrl(`/articles/${slug}`)

  const data: JsonLdObject = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    mainEntityOfPage: url,
    url,
    headline,
    description,
    datePublished,
    inLanguage: "en",
    author: { "@id": PERSON_ID },
    publisher: { "@id": PERSON_ID },
  }

  return <JsonLdScript data={data} />
}

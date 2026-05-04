"use client"

import { Github, Linkedin, Mail } from "lucide-react"
import { type Locale, getTranslations } from "@/lib/i18n"

interface ContactProps {
  locale: Locale
}

const contactLinks = [
  {
    icon: Mail,
    label: "Email",
    href: "mailto:arthuroliveiratorres@gmail.com",
    display: "arthuroliveiratorres@gmail.com",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://linkedin.com/in/torres-arthur",
    display: "linkedin.com/in/torres-arthur",
  },
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/tutorres",
    display: "github.com/tutorres",
  },
]

export function Contact({ locale }: ContactProps) {
  const t = getTranslations(locale)

  return (
    <section id="contact" className="mx-auto max-w-3xl px-4 py-20">
      <h2 className="font-mono text-sm font-medium uppercase tracking-wider text-muted-foreground">
        {t.contact.title}
      </h2>
      <div className="mt-8 space-y-4">
        {contactLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith("mailto") ? undefined : "_blank"}
            rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
            className="flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors group"
          >
            <link.icon className="size-5 text-muted-foreground group-hover:text-foreground transition-colors" />
            <span className="font-mono text-sm">{link.display}</span>
          </a>
        ))}
      </div>
      <p className="mt-12 text-center font-mono text-xs text-muted-foreground">
        © {new Date().getFullYear()} Arthur Torres
      </p>
    </section>
  )
}

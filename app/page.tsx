"use client"

import { useState } from "react"
import { Navbar } from "@/components/Navbar"
import { Hero } from "@/components/Hero"
import { About } from "@/components/About"
import { Experience } from "@/components/Experience"
import { Projects } from "@/components/Projects"
import { Articles } from "@/components/Articles"
import { Skills } from "@/components/Skills"
import { Contact } from "@/components/Contact"
import { type Locale } from "@/lib/i18n"

export default function Home() {
  const [locale, setLocale] = useState<Locale>("en")

  return (
    <>
      <Navbar locale={locale} onLocaleChange={setLocale} />
      <main>
        <Hero locale={locale} />
        <About locale={locale} />
        <Experience locale={locale} />
        <Projects locale={locale} />
        <Articles locale={locale} />
        <Skills locale={locale} />
        <Contact locale={locale} />
      </main>
    </>
  )
}

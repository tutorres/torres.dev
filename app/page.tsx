"use client"

import { Navbar } from "@/components/Navbar"
import { Hero } from "@/components/Hero"
import { About } from "@/components/About"
import { Experience } from "@/components/Experience"
import { Projects } from "@/components/Projects"
import { Articles } from "@/components/Articles"
import { Skills } from "@/components/Skills"
import { Contact } from "@/components/Contact"
import { useLocale } from "@/lib/locale-context"

export default function Home() {
  const { locale } = useLocale()

  return (
    <>
      <Navbar locale={locale} />
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

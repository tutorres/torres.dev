/**
 * Decorative orbit of stack logos around a particle sphere.
 *
 * Deliberately dependency free. The sphere is CSS 3D transforms, not canvas and
 * not a motion library: every particle is positioned once at render and the whole
 * container is rotated by a single GPU composited animation, so there is no
 * per-frame JavaScript. A motion library here would animate ~90 DOM nodes every
 * frame to achieve the same picture.
 *
 * Icons are local SVGs under /public/logos rendered as CSS masks, so they inherit
 * the theme colour instead of shipping a baked-in fill that breaks in light mode.
 *
 * Keyframes live in app/globals.css, not in a <style> tag here: React 19 hoists
 * inline <style> into <head>, so the server and client trees disagree and
 * hydration warns.
 *
 * Purely decorative: aria-hidden, pointer-events-none, and every animation stops
 * under prefers-reduced-motion.
 */

const PARTICLE_COUNT = 130
const SPHERE_RADIUS = 145

/** Fibonacci sphere: even point distribution without clustering at the poles. */
function sphereParticles(count: number, radius: number) {
  const golden = Math.PI * (3 - Math.sqrt(5))

  return Array.from({ length: count }, (_, i) => {
    const y = 1 - (i / (count - 1)) * 2
    const ring = Math.sqrt(1 - y * y)
    const theta = golden * i

    return {
      x: Math.cos(theta) * ring * radius,
      y: y * radius,
      z: Math.sin(theta) * ring * radius,
      // Points on the far side read as further away.
      depth: (Math.sin(theta) * ring + 1) / 2,
    }
  })
}

type Orbit = {
  /** Written out in full so Tailwind's scanner can see the class names. */
  size: string
  /** Seconds for a full revolution. */
  duration: number
  icons: { slug: string; label: string; angle: number }[]
}

/**
 * The rings mirror the argument the hero makes. Inner ring is what everything is
 * written in, middle is the agent side, outer is the evaluation side. Kubernetes
 * and OpenAI were dropped: he coexists with the former rather than owning it, and
 * two model vendors in a decorative orbit is redundant.
 */
const orbits: Orbit[] = [
  {
    size: "size-[24rem] sm:size-[38rem]",
    duration: 26,
    icons: [
      { slug: "python", label: "Python", angle: -60 },
      { slug: "fastapi", label: "FastAPI", angle: 60 },
    ],
  },
  {
    size: "size-[32rem] sm:size-[50rem]",
    duration: 34,
    icons: [
      { slug: "anthropic", label: "Claude", angle: 0 },
      { slug: "langchain", label: "LangChain", angle: -110 },
      { slug: "n8n", label: "n8n", angle: 110 },
    ],
  },
  {
    size: "size-[40rem] sm:size-[62rem]",
    duration: 44,
    icons: [
      { slug: "pandas", label: "pandas", angle: -70 },
      { slug: "scikitlearn", label: "scikit-learn", angle: 0 },
      { slug: "pytest", label: "pytest", angle: 70 },
      { slug: "duckdb", label: "DuckDB", angle: 180 },
      { slug: "docker", label: "Docker", angle: -140 },
    ],
  },
]

export function TechOrbit() {
  const particles = sphereParticles(PARTICLE_COUNT, SPHERE_RADIUS)

  return (
    <div
      aria-hidden="true"
      className="tech-orbit-animated pointer-events-none absolute inset-x-0 bottom-0 -z-10 flex justify-center overflow-hidden"
      style={{ animation: "tech-orbit-breathe 12s ease-in-out infinite" }}
    >
      <div className="relative h-[32rem] w-full sm:h-[42rem]">
        {/* Particle sphere, half below the fold line so it reads as a horizon. */}
        <div
          className="absolute bottom-0 left-1/2 size-[19rem] -translate-x-1/2 translate-y-1/2 sm:size-[24rem]"
          style={{ perspective: "900px" }}
        >
          <div
            className="tech-orbit-animated relative size-full"
            style={{
              transformStyle: "preserve-3d",
              animation: "tech-orbit-sphere 40s linear infinite",
            }}
          >
            {particles.map((p, i) => (
              <span
                key={i}
                className="absolute left-1/2 top-1/2 rounded-full bg-foreground"
                style={{
                  width: 2,
                  height: 2,
                  opacity: 0.15 + p.depth * 0.45,
                  transform: `translate3d(${p.x}px, ${p.y}px, ${p.z}px)`,
                }}
              />
            ))}
          </div>
        </div>

        {orbits.map((orbit, index) => {
          return (
            <div
              key={index}
              className={`absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-full border border-border/50 ${orbit.size}`}
            >
              {orbit.icons.map((icon) => (
                <div
                  key={icon.slug}
                  className="tech-orbit-animated absolute left-1/2 top-0 h-1/2 origin-bottom"
                  style={{
                    ["--start" as string]: `${icon.angle}deg`,
                    animation: `tech-orbit-spin ${orbit.duration}s linear infinite`,
                  }}
                >
                  <div
                    className="tech-orbit-animated -mt-5 -ml-5 rounded-full border border-border/60 bg-background/80 p-2.5 backdrop-blur-sm sm:p-3"
                    style={{
                      ["--start" as string]: `${icon.angle}deg`,
                      animation: `tech-orbit-upright ${orbit.duration}s linear infinite`,
                    }}
                  >
                    <span
                      role="img"
                      aria-label={icon.label}
                      className="block size-5 bg-muted-foreground sm:size-7"
                      style={{
                        maskImage: `url(/logos/${icon.slug}.svg)`,
                        WebkitMaskImage: `url(/logos/${icon.slug}.svg)`,
                        maskRepeat: "no-repeat",
                        WebkitMaskRepeat: "no-repeat",
                        maskSize: "contain",
                        WebkitMaskSize: "contain",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )
        })}

        {/* Fades the rings into the page so they never fight the copy above. */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/40 to-transparent" />
      </div>
    </div>
  )
}

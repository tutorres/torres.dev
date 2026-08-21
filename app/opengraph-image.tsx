import { ImageResponse } from 'next/og'

// Static file-convention OG image. Next merges it into `og:image` and
// `twitter:image` automatically, which is what makes the existing
// `twitter: { card: 'summary_large_image' }` in layout.tsx render a card
// instead of an empty placeholder.
//
// No external font is loaded on purpose. The next/og runtime already ships
// Geist Regular as its default face, so the preview matches the site's
// typography with zero network calls at build or request time. Hierarchy is
// carried by size and by the zinc contrast steps, not by font weight.

export const alt = 'Arthur Torres, Applied AI Engineer. End-to-end ML over 37M rows of production telemetry. LLM agents in production under audit constraints.'

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

const BACKGROUND = '#0a0a0a'
const FOREGROUND = '#fafafa'
const MUTED = '#a1a1aa'
const SUBTLE = '#71717a'
const RULE = '#3f3f3f'
const HAIRLINE = '#27272a'

// One figure, not two. The pair used to read as a stat block, but both of the
// old rows were performance or volume claims and both came out. What is left is
// scale, which is the one number the page still stands behind without the case
// study open next to it.
const PROOFS = [
  { figure: '37M', label: 'rows of production telemetry' },
]

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: BACKGROUND,
          color: FOREGROUND,
          padding: '76px 80px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            borderLeft: `2px solid ${RULE}`,
            paddingLeft: 44,
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: 116,
              lineHeight: 1.05,
              letterSpacing: '-0.035em',
              color: FOREGROUND,
            }}
          >
            Arthur Torres
          </div>

          <div
            style={{
              display: 'flex',
              marginTop: 16,
              fontSize: 48,
              letterSpacing: '-0.01em',
              color: MUTED,
            }}
          >
            Applied AI Engineer
          </div>

          <div
            style={{
              display: 'flex',
              width: 220,
              height: 1,
              marginTop: 34,
              marginBottom: 34,
              backgroundColor: HAIRLINE,
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {PROOFS.map((proof, index) => (
              <div
                key={proof.figure}
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  fontSize: 42,
                  letterSpacing: '-0.015em',
                  marginTop: index === 0 ? 0 : 26,
                }}
              >
                {/* Fixed column so the two figures share a left edge and the
                    two labels share another, which is what makes the pair
                    scan as a stat block at feed thumbnail size. */}
                <div style={{ display: 'flex', width: 130, color: FOREGROUND }}>
                  {proof.figure}
                </div>
                <div style={{ display: 'flex', color: MUTED }}>{proof.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            paddingLeft: 46,
            fontSize: 26,
            letterSpacing: '0.01em',
            color: SUBTLE,
          }}
        >
          torres-dev-ai.vercel.app
        </div>
      </div>
    ),
    {
      ...size,
    },
  )
}

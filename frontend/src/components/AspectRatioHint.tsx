import { HintWrapper, HintFrames, HintLabel } from './AspectRatioHint.styled'

export function AspectRatioHint() {
  return (
    <HintWrapper>
      <HintFrames>
        {/* Portrait 9:16 — ideal */}
        <svg width="54" height="96" viewBox="0 0 54 96" aria-hidden="true">
          <rect
            x="1"
            y="1"
            width="52"
            height="94"
            fill="#e8f5e9"
            stroke="#2e7d32"
            strokeWidth="2"
          />
          <circle cx="27" cy="11" r="3" fill="#2e7d32" opacity="0.4" />
          <rect x="7" y="20" width="40" height="55" fill="#c8e6c9" />
          <text
            x="27"
            y="51"
            textAnchor="middle"
            fontSize="11"
            fill="#1b5e20"
            fontWeight="700"
            fontFamily="system-ui"
          >
            9:16
          </text>
          <text x="27" y="87" textAnchor="middle" fontSize="15" fill="#2e7d32">
            ✓
          </text>
        </svg>

        {/* Landscape 16:9 — not ideal */}
        <svg width="96" height="54" viewBox="0 0 96 54" aria-hidden="true">
          <rect
            x="1"
            y="1"
            width="94"
            height="52"
            fill="#f5f5f5"
            stroke="#bdbdbd"
            strokeWidth="1.5"
            strokeDasharray="5 3"
          />
          <rect x="7" y="7" width="82" height="40" fill="#eeeeee" />
          <text
            x="48"
            y="31"
            textAnchor="middle"
            fontSize="10"
            fill="#9e9e9e"
            fontFamily="system-ui"
          >
            16:9
          </text>
        </svg>
      </HintFrames>
      <HintLabel>Foto im Hochformat (9:16) sieht am besten aus</HintLabel>
    </HintWrapper>
  )
}

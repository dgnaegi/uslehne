import { HintWrapper, HintFrames, HintLabel } from './AspectRatioHint.styled'

export function AspectRatioHint() {
  return (
    <HintWrapper>
      <HintFrames>
        {/* Portrait 9:16 — ideal */}
        <svg width="54" height="96" viewBox="0 0 54 96" aria-hidden="true">
          <rect x="1" y="1" width="52" height="94" rx="6" fill="#e8f5e9" stroke="#4caf50" strokeWidth="2" />
          <circle cx="27" cy="12" r="3" fill="#4caf50" opacity="0.5" />
          <rect x="8" y="22" width="38" height="52" rx="3" fill="#c8e6c9" />
          <text x="27" y="52" textAnchor="middle" fontSize="10" fill="#2e7d32" fontWeight="bold">9:16</text>
          <text x="27" y="85" textAnchor="middle" fontSize="14" fill="#4caf50">✓</text>
        </svg>

        {/* Landscape 16:9 — not ideal */}
        <svg width="96" height="54" viewBox="0 0 96 54" aria-hidden="true">
          <rect x="1" y="1" width="94" height="52" rx="6" fill="#fafafa" stroke="#bdbdbd" strokeWidth="1.5" strokeDasharray="4 3" />
          <rect x="8" y="8" width="80" height="38" rx="3" fill="#f5f5f5" />
          <text x="48" y="31" textAnchor="middle" fontSize="10" fill="#9e9e9e">16:9</text>
        </svg>
      </HintFrames>
      <HintLabel>Foto im Hochformat (9:16) sieht am besten aus</HintLabel>
    </HintWrapper>
  )
}

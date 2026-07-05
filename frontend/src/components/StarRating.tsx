import { useState } from 'react'
import { Row, Star, Count } from './StarRating.styled'
import { IconStar } from '../icons'

interface Props {
  value: number | null
  count?: number
  readOnly?: boolean
  onChange?: (stars: number) => void
}

export function StarRating({ value, count, readOnly = false, onChange }: Props) {
  const [hovered, setHovered] = useState(0)
  const display = hovered || Math.round(value ?? 0)

  return (
    <Row>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          as={readOnly ? 'span' : 'button'}
          type={readOnly ? undefined : 'button'}
          $filled={n <= display}
          $interactive={!readOnly}
          onMouseEnter={() => !readOnly && setHovered(n)}
          onMouseLeave={() => !readOnly && setHovered(0)}
          onClick={() => !readOnly && onChange?.(n)}
          aria-label={readOnly ? undefined : `${n} Stern${n > 1 ? 'e' : ''}`}
        >
          <IconStar size={20} />
        </Star>
      ))}
      {count !== undefined && count > 0 && <Count>({count})</Count>}
    </Row>
  )
}

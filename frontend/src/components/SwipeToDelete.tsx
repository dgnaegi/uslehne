import { useState, useRef } from 'react'
import { IconX } from '../icons/IconX'
import {
  REVEAL_WIDTH,
  SwipeWrapper,
  SwipeContent,
  DeleteReveal,
  DeleteButton,
} from './SwipeToDelete.styled'

interface Props {
  onDelete: () => void
  disabled?: boolean
  children: React.ReactNode
}

export function SwipeToDelete({ onDelete, disabled = false, children }: Props) {
  const [offset, setOffset] = useState(0)
  const [animated, setAnimated] = useState(true)
  const startX = useRef(0)
  const startOffset = useRef(0)
  const active = useRef(false)

  function handleTouchStart(e: React.TouchEvent) {
    if (disabled) return
    startX.current = e.touches[0].clientX
    startOffset.current = offset
    active.current = true
    setAnimated(false)
  }

  function handleTouchMove(e: React.TouchEvent) {
    if (!active.current) return
    const delta = e.touches[0].clientX - startX.current
    setOffset(Math.min(0, Math.max(startOffset.current + delta, -REVEAL_WIDTH)))
  }

  function handleTouchEnd() {
    active.current = false
    setAnimated(true)
    setOffset((prev) => (prev < -REVEAL_WIDTH / 2 ? -REVEAL_WIDTH : 0))
  }

  return (
    <SwipeWrapper>
      <SwipeContent
        $offset={offset}
        $animated={animated}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {children}
      </SwipeContent>
      {!disabled && offset < 0 && (
        <DeleteReveal>
          <DeleteButton onClick={onDelete} aria-label="Löschen">
            <IconX size={20} />
          </DeleteButton>
        </DeleteReveal>
      )}
    </SwipeWrapper>
  )
}

import { useRef, useState, useCallback } from 'react'

const THRESHOLD = 80
const MAX_X = 150

export function useSwipeRight(onTrigger: () => void) {
  const startX = useRef(0)
  const startY = useRef(0)
  const tracking = useRef<'none' | 'h' | 'v'>('none')
  const swipeXRef = useRef(0)
  const suppressClick = useRef(false)

  const [swipeX, setSwipeX] = useState(0)

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX
    startY.current = e.touches[0].clientY
    tracking.current = 'none'
    suppressClick.current = false
  }, [])

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    const dx = e.touches[0].clientX - startX.current
    const dy = e.touches[0].clientY - startY.current

    if (tracking.current === 'none') {
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return
      tracking.current = Math.abs(dx) > Math.abs(dy) && dx > 0 ? 'h' : 'v'
    }
    if (tracking.current !== 'h') return

    const capped = Math.min(Math.max(dx, 0), MAX_X)
    swipeXRef.current = capped
    setSwipeX(capped)
  }, [])

  const onTouchEnd = useCallback(() => {
    if (swipeXRef.current >= THRESHOLD) {
      suppressClick.current = true
      if (navigator.vibrate) navigator.vibrate(40)
      onTrigger()
    }
    swipeXRef.current = 0
    setSwipeX(0)
    tracking.current = 'none'
  }, [onTrigger])

  const onTouchCancel = useCallback(() => {
    swipeXRef.current = 0
    setSwipeX(0)
    tracking.current = 'none'
  }, [])

  const onClickCapture = useCallback((e: React.MouseEvent) => {
    if (suppressClick.current) {
      e.preventDefault()
      e.stopPropagation()
      suppressClick.current = false
    }
  }, [])

  return {
    swipeX,
    threshold: THRESHOLD,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    onTouchCancel,
    onClickCapture,
  }
}

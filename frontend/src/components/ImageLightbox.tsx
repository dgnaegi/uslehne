import { useEffect, useRef, useCallback } from 'react'
import { Backdrop, CloseBtn, Img } from './ImageLightbox.styled'

interface Props {
  src: string
  alt: string
  onClose: () => void
}

const MIN_SCALE = 1
const MAX_SCALE = 6

export function ImageLightbox({ src, alt, onClose }: Props) {
  const scaleRef = useRef(1)
  const translateRef = useRef({ x: 0, y: 0 })
  const imgRef = useRef<HTMLImageElement>(null)

  // Touch tracking
  const lastTouchDist = useRef<number | null>(null)
  const lastTouchMid = useRef<{ x: number; y: number } | null>(null)
  const panStart = useRef<{ x: number; y: number; tx: number; ty: number } | null>(null)

  const applyTransform = useCallback(() => {
    const el = imgRef.current
    if (!el) return
    const { x, y } = translateRef.current
    el.style.transform = `translate(${x}px, ${y}px) scale(${scaleRef.current})`
  }, [])

  function clampTranslate(x: number, y: number): { x: number; y: number } {
    const el = imgRef.current
    if (!el) return { x, y }
    const s = scaleRef.current
    // Extra space the image takes up beyond its natural size
    const maxX = (el.naturalWidth > 0 ? el.offsetWidth : 0) * (s - 1)
    const maxY = (el.naturalHeight > 0 ? el.offsetHeight : 0) * (s - 1)
    return {
      x: Math.max(-maxX / 2, Math.min(maxX / 2, x)),
      y: Math.max(-maxY / 2, Math.min(maxY / 2, y)),
    }
  }

  function getTouchDist(touches: TouchList) {
    const dx = touches[0].clientX - touches[1].clientX
    const dy = touches[0].clientY - touches[1].clientY
    return Math.sqrt(dx * dx + dy * dy)
  }

  function getTouchMid(touches: TouchList) {
    return {
      x: (touches[0].clientX + touches[1].clientX) / 2,
      y: (touches[0].clientY + touches[1].clientY) / 2,
    }
  }

  const onTouchStart = useCallback((e: TouchEvent) => {
    e.preventDefault()
    if (e.touches.length === 2) {
      lastTouchDist.current = getTouchDist(e.touches)
      lastTouchMid.current = getTouchMid(e.touches)
      panStart.current = null
    } else if (e.touches.length === 1) {
      panStart.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
        tx: translateRef.current.x,
        ty: translateRef.current.y,
      }
      lastTouchDist.current = null
    }
  }, [])

  const onTouchMove = useCallback(
    (e: TouchEvent) => {
      e.preventDefault()
      if (e.touches.length === 2 && lastTouchDist.current !== null) {
        const newDist = getTouchDist(e.touches)
        const ratio = newDist / lastTouchDist.current
        scaleRef.current = Math.max(MIN_SCALE, Math.min(MAX_SCALE, scaleRef.current * ratio))
        lastTouchDist.current = newDist
        if (scaleRef.current === MIN_SCALE) translateRef.current = { x: 0, y: 0 }
        applyTransform()
      } else if (e.touches.length === 1 && panStart.current && scaleRef.current > 1) {
        const dx = e.touches[0].clientX - panStart.current.x
        const dy = e.touches[0].clientY - panStart.current.y
        const clamped = clampTranslate(panStart.current.tx + dx, panStart.current.ty + dy)
        translateRef.current = clamped
        applyTransform()
      }
    },
    [applyTransform],
  )

  const onTouchEnd = useCallback((e: TouchEvent) => {
    if (e.touches.length < 2) lastTouchDist.current = null
    if (e.touches.length === 0) panStart.current = null
  }, [])

  const onWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault()
      const delta = e.deltaY > 0 ? 0.85 : 1.18
      scaleRef.current = Math.max(MIN_SCALE, Math.min(MAX_SCALE, scaleRef.current * delta))
      if (scaleRef.current === MIN_SCALE) translateRef.current = { x: 0, y: 0 }
      applyTransform()
    },
    [applyTransform],
  )

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose],
  )

  useEffect(() => {
    const backdrop = imgRef.current?.parentElement
    if (!backdrop) return
    backdrop.addEventListener('touchstart', onTouchStart, { passive: false })
    backdrop.addEventListener('touchmove', onTouchMove, { passive: false })
    backdrop.addEventListener('touchend', onTouchEnd)
    backdrop.addEventListener('wheel', onWheel, { passive: false })
    document.addEventListener('keydown', onKeyDown)
    return () => {
      backdrop.removeEventListener('touchstart', onTouchStart)
      backdrop.removeEventListener('touchmove', onTouchMove)
      backdrop.removeEventListener('touchend', onTouchEnd)
      backdrop.removeEventListener('wheel', onWheel)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [onTouchStart, onTouchMove, onTouchEnd, onWheel, onKeyDown])

  return (
    <Backdrop onClick={onClose}>
      <CloseBtn
        onClick={(e) => {
          e.stopPropagation()
          onClose()
        }}
        aria-label="Schliessen"
      >
        ✕
      </CloseBtn>
      <Img
        ref={imgRef}
        src={src}
        alt={alt}
        $scale={scaleRef.current}
        onClick={(e) => { if (scaleRef.current > 1) e.stopPropagation() }}
        draggable={false}
      />
    </Backdrop>
  )
}

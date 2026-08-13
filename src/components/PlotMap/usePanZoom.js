import { useCallback, useEffect, useRef, useState } from 'react'

const MIN_SCALE = 0.4
const MAX_SCALE = 4
const clamp = (value, min, max) => Math.min(max, Math.max(min, value))

// Lightweight pan/zoom for a fixed-size canvas rendered inside a fixed-size
// viewport — wheel to zoom (cursor-centered), drag to pan, two-finger pinch
// to zoom on touch. No external dependency; transform is plain CSS
// translate+scale applied to the canvas element itself.
export default function usePanZoom() {
  const containerRef = useRef(null)
  const [transform, setTransform] = useState({ scale: 1, x: 0, y: 0 })

  const pointers = useRef(new Map())
  const dragOrigin = useRef(null)
  const pinchOrigin = useRef(null)

  const zoomAt = useCallback((clientX, clientY, factor) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const originX = clientX - rect.left
    const originY = clientY - rect.top
    setTransform((prev) => {
      const nextScale = clamp(prev.scale * factor, MIN_SCALE, MAX_SCALE)
      const ratio = nextScale / prev.scale
      return {
        scale: nextScale,
        x: originX - (originX - prev.x) * ratio,
        y: originY - (originY - prev.y) * ratio,
      }
    })
  }, [])

  const zoomByButton = useCallback((factor) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    zoomAt(rect.left + rect.width / 2, rect.top + rect.height / 2, factor)
  }, [zoomAt])

  const zoomIn = useCallback(() => zoomByButton(1.3), [zoomByButton])
  const zoomOut = useCallback(() => zoomByButton(1 / 1.3), [zoomByButton])

  // Centers + scales the canvas to fit inside the current viewport.
  const fit = useCallback((canvasWidth, canvasHeight, padding = 32) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const availW = Math.max(rect.width - padding * 2, 50)
    const availH = Math.max(rect.height - padding * 2, 50)
    const scale = clamp(Math.min(availW / canvasWidth, availH / canvasHeight), MIN_SCALE, MAX_SCALE)
    const x = (rect.width - canvasWidth * scale) / 2
    const y = (rect.height - canvasHeight * scale) / 2
    setTransform({ scale, x, y })
  }, [])

  // React attaches onWheel as a passive listener, so event.preventDefault()
  // inside it silently no-ops and the page scrolls along with the zoom.
  // A native listener registered with passive:false is the only way to
  // actually stop that scroll.
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const handleWheel = (event) => {
      event.preventDefault()
      const factor = event.deltaY < 0 ? 1.12 : 1 / 1.12
      zoomAt(event.clientX, event.clientY, factor)
    }
    el.addEventListener('wheel', handleWheel, { passive: false })
    return () => el.removeEventListener('wheel', handleWheel)
  }, [zoomAt])

  const onPointerDown = useCallback((event) => {
    // Capturing the pointer here would retarget the eventual click to the
    // container instead of the plot underneath it, so leave presses that
    // start on a plot alone — native click/hover on that plot keeps working,
    // and panning simply starts from empty canvas space instead.
    if (event.target.closest?.('[data-plot-id]')) return

    containerRef.current?.setPointerCapture?.(event.pointerId)
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY })

    if (pointers.current.size === 1) {
      dragOrigin.current = { startX: event.clientX, startY: event.clientY, base: transform }
    } else if (pointers.current.size === 2) {
      dragOrigin.current = null
      const pts = Array.from(pointers.current.values())
      const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y)
      pinchOrigin.current = {
        dist,
        base: transform,
        mid: { x: (pts[0].x + pts[1].x) / 2, y: (pts[0].y + pts[1].y) / 2 },
      }
    }
  }, [transform])

  const onPointerMove = useCallback((event) => {
    if (!pointers.current.has(event.pointerId)) return
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY })

    if (pointers.current.size === 2 && pinchOrigin.current) {
      const el = containerRef.current
      if (!el) return
      const pts = Array.from(pointers.current.values())
      const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y)
      const factor = dist / pinchOrigin.current.dist
      const rect = el.getBoundingClientRect()
      const originX = pinchOrigin.current.mid.x - rect.left
      const originY = pinchOrigin.current.mid.y - rect.top
      const nextScale = clamp(pinchOrigin.current.base.scale * factor, MIN_SCALE, MAX_SCALE)
      const ratio = nextScale / pinchOrigin.current.base.scale
      setTransform({
        scale: nextScale,
        x: originX - (originX - pinchOrigin.current.base.x) * ratio,
        y: originY - (originY - pinchOrigin.current.base.y) * ratio,
      })
    } else if (dragOrigin.current) {
      const dx = event.clientX - dragOrigin.current.startX
      const dy = event.clientY - dragOrigin.current.startY
      setTransform({ ...dragOrigin.current.base, x: dragOrigin.current.base.x + dx, y: dragOrigin.current.base.y + dy })
    }
  }, [])

  const endPointer = useCallback((event) => {
    pointers.current.delete(event.pointerId)
    if (pointers.current.size < 2) pinchOrigin.current = null
    if (pointers.current.size === 0) dragOrigin.current = null
  }, [])

  const onDoubleClick = useCallback((event) => {
    zoomAt(event.clientX, event.clientY, 1.6)
  }, [zoomAt])

  return {
    containerRef,
    transform,
    zoomIn,
    zoomOut,
    fit,
    isPanning: dragOrigin.current !== null,
    handlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp: endPointer,
      onPointerLeave: endPointer,
      onPointerCancel: endPointer,
      onDoubleClick,
    },
  }
}

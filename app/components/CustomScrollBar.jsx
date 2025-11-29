'use client'
import { useEffect, useRef, useState } from 'react'
import { useLenis } from '../context/LenisContext'

export default function CustomScrollbar() {
  const lenis = useLenis()
  const [thumbHeight, setThumbHeight] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const thumbRef = useRef(null)
  const dragStartRef = useRef({ y: 0, scroll: 0 })
  const targetScrollPerc = useRef(0)
  const animatedScrollPerc = useRef(0)
  const rafRef = useRef(null)
  const activityTimeoutRef = useRef(null)

  useEffect(() => {
     if (!lenis) {
    return;
  }
    const updateScrollbar = (e) => {
      const windowHeight = window.innerHeight
      
      const documentHeight = document.documentElement.scrollHeight
      const maxScroll = documentHeight - windowHeight

      targetScrollPerc.current = (e.scroll / maxScroll) * 100

      const thumbHeightCalc = (windowHeight / documentHeight) * windowHeight
      setThumbHeight(Math.max(thumbHeightCalc, 50))
      setIsVisible(documentHeight > windowHeight)

      setIsActive(true)
      clearTimeout(activityTimeoutRef.current)
      activityTimeoutRef.current = setTimeout(() => setIsActive(false), 1500)
    }
  // ✅ appel initial au montage
  updateScrollbar({ scroll: lenis.scroll || 0 })
  // ✅ écoute scroll
  lenis.on('scroll', updateScrollbar)

  // ✅ resize
  const handleResize = () => updateScrollbar({ scroll: lenis.scroll || 0 })
  window.addEventListener('resize', handleResize)



    return () => {
      lenis.off('scroll', updateScrollbar)
      clearTimeout(activityTimeoutRef.current)
      window.removeEventListener('resize', updateScrollbar)
    }
  }, [lenis])

  // Animation fluide du thumb (lerp)
  useEffect(() => {
    const animate = () => {
      animatedScrollPerc.current +=
        (targetScrollPerc.current - animatedScrollPerc.current) * 0.1

      const top =
        (animatedScrollPerc.current / 100) *
        (window.innerHeight - thumbHeight)

      if (thumbRef.current) {
        thumbRef.current.style.transform = `translate3d(0, ${top}px, 0)`
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [thumbHeight])

  // Drag manuel
  const handleMouseDown = (e) => {
    e.preventDefault()
    setIsDragging(true)
    setIsActive(true)
    dragStartRef.current = {
      y: e.clientY,
      scroll: lenis?.scroll || 0,
    }
  }

  useEffect(() => {
    if (!lenis) return

    const handleMouseMove = (e) => {
      if (!isDragging) return
      const deltaY = e.clientY - dragStartRef.current.y
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const maxScroll = documentHeight - windowHeight
      const trackHeight = windowHeight - thumbHeight

      const scrollAmount = (deltaY / trackHeight) * maxScroll
      const newScroll = dragStartRef.current.scroll + scrollAmount

      lenis.scrollTo(Math.max(0, Math.min(newScroll, maxScroll)), { immediate: true })
    }

    const stopDrag = () => {
      setIsDragging(false)
      document.body.style.userSelect = ''
      document.body.style.cursor = ''
      setTimeout(() => setIsActive(false), 1000)
    }

    if (isDragging) {
      document.body.style.userSelect = 'none'
      document.body.style.cursor = 'grabbing'
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', stopDrag)
      document.addEventListener('mouseleave', stopDrag)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', stopDrag)
      document.removeEventListener('mouseleave', stopDrag)
    }
  }, [isDragging, thumbHeight, lenis])

  // Click sur la track
  const handleTrackClick = (e) => {
    if (!lenis || e.target === thumbRef.current) return

    const rect = e.currentTarget.getBoundingClientRect()
    const clickY = e.clientY - rect.top
    const windowHeight = window.innerHeight
    const documentHeight = document.documentElement.scrollHeight
    const maxScroll = documentHeight - windowHeight

    const targetScroll = (clickY / windowHeight) * maxScroll
    setIsActive(true)
    lenis.scrollTo(targetScroll, { duration: 1.2, easing: (t) => 1 - Math.pow(1 - t, 3) })
    setTimeout(() => setIsActive(false), 1500)
  }

  if (!isVisible) return null

  return (
    <div className="fixed right-0 top-0 w-3 h-screen z-[9999] group" onClick={handleTrackClick}>
      <div className="absolute inset-0 bg-transparent" />
      <div
        ref={thumbRef}
        className={`
          absolute right-0 w-full rounded-full
          bg-[#b98d6b]
          shadow-[0_0_10px_rgba(118,75,162,0.4)]
          transition-[width,opacity] duration-300 ease-out
          ${isDragging ? 'w-4 opacity-100 cursor-grabbing' : 'cursor-grab group-hover:w-4'}
        `}
        style={{
          height: `${thumbHeight}px`,
          transform: 'translate3d(0, 0, 0)',
          willChange: 'transform',
          opacity: isActive ? 1 : 0,
        }}
        onMouseDown={handleMouseDown}
      />
    </div>
  )
}

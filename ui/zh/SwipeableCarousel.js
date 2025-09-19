'use client'

import { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export function SwipeableCarousel({ children, className = '' }) {
  const [currentIndex, setCurrentIndex] = useState(children.length > 0 ? Math.floor(children.length / 2) : 0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const containerRef = useRef(null)

  const totalCards = children.length

  // If there are no cards, return early
  if (totalCards === 0) {
    return (
      <div className={`w-full text-center py-8 ${className}`}>
        <p className="text-gray-500">暂无校友信息</p>
      </div>
    )
  }

  // If there's only one card, show it centered without navigation
  if (totalCards === 1) {
    return (
      <div className={`w-full flex justify-center py-8 ${className}`}>
        {children[0]}
      </div>
    )
  }

  // Track window size for responsive behavior
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Handle swipe navigation
  const goToSlide = (index) => {
    if (isTransitioning) return

    const newIndex = Math.max(0, Math.min(index, totalCards - 1))
    setCurrentIndex(newIndex)
    setIsTransitioning(true)
    setTimeout(() => setIsTransitioning(false), 300)
  }

  const nextSlide = () => {
    if (currentIndex < totalCards - 1) {
      goToSlide(currentIndex + 1)
    }
  }

  const prevSlide = () => {
    if (currentIndex > 0) {
      goToSlide(currentIndex - 1)
    }
  }

  // Touch/Mouse events
  const handlePointerDown = (e) => {
    e.preventDefault()
    setIsDragging(true)
    setDragStart(e.clientX || e.touches?.[0]?.clientX || 0)
    setDragOffset(0)
  }

  const handlePointerMove = (e) => {
    if (!isDragging) return
    e.preventDefault()

    const currentX = e.clientX || e.touches?.[0]?.clientX || 0
    const diff = currentX - dragStart
    setDragOffset(diff)
  }

  const handlePointerUp = (e) => {
    if (!isDragging) return
    e.preventDefault()

    const threshold = 50 // Minimum drag distance to trigger slide change

    if (Math.abs(dragOffset) > threshold) {
      if (dragOffset > 0 && currentIndex > 0) {
        prevSlide()
      } else if (dragOffset < 0 && currentIndex < totalCards - 1) {
        nextSlide()
      }
    }

    setIsDragging(false)
    setDragOffset(0)
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') prevSlide()
      if (e.key === 'ArrowRight') nextSlide()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentIndex, totalCards])

  // Calculate card positions and z-indices
  const getCardStyle = (index) => {
    const relativeIndex = index - currentIndex
    const absIndex = Math.abs(relativeIndex)

    // Responsive spacing based on screen size
    const baseSpacing = isMobile ? 120 : 180
    const maxVisibleSides = isMobile ? 1 : 2

    let translateX = 0
    let translateY = 0
    let scale = 1
    let zIndex = 1
    let opacity = 1

    if (relativeIndex === 0) {
      // Center card (focused)
      translateX = isDragging ? dragOffset : 0
      scale = 1
      zIndex = 10
      opacity = 1
    } else if (absIndex <= maxVisibleSides) {
      // Visible cards on sides
      const direction = relativeIndex > 0 ? 1 : -1

      translateX = (isDragging ? dragOffset : 0) + direction * (baseSpacing * absIndex)
      translateY = absIndex * (isMobile ? 10 : 15) // Slight vertical offset for depth
      scale = Math.max(isMobile ? 0.8 : 0.7, 1 - absIndex * 0.15)
      zIndex = 10 - absIndex
      opacity = Math.max(isMobile ? 0.6 : 0.4, 1 - absIndex * 0.3)
    } else {
      // Hidden cards
      const hideDistance = isMobile ? 400 : 600
      translateX = relativeIndex > 0 ? hideDistance : -hideDistance
      scale = 0.5
      zIndex = 1
      opacity = 0
    }

    return {
      transform: `translateX(${translateX}px) translateY(${translateY}px) scale(${scale})`,
      zIndex,
      opacity,
      transition: isDragging ? 'none' : 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      pointerEvents: relativeIndex === 0 ? 'auto' : 'none'
    }
  }

  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      {/* Cards container */}
      <div
        ref={containerRef}
        className="relative flex justify-center items-center py-12 px-4"
        style={{ minHeight: '600px', height: 'auto' }}
        onMouseDown={handlePointerDown}
        onMouseMove={handlePointerMove}
        onMouseUp={handlePointerUp}
        onMouseLeave={handlePointerUp}
        onTouchStart={handlePointerDown}
        onTouchMove={handlePointerMove}
        onTouchEnd={handlePointerUp}
      >
        {children.map((child, index) => (
          <div
            key={index}
            className="absolute select-none cursor-grab active:cursor-grabbing"
            style={getCardStyle(index)}
            onClick={() => {
              if (index !== currentIndex && !isDragging) {
                goToSlide(index)
              }
            }}
          >
            {child}
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      {totalCards > 1 && (
        <>
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/80 shadow-lg hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous card"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>

          <button
            onClick={nextSlide}
            disabled={currentIndex === totalCards - 1}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/80 shadow-lg hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next card"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>
        </>
      )}

    </div>
  )
}
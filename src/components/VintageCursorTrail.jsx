import React, { useEffect, useRef } from 'react'

/**
 * VintageCursorTrail
 * Elegant, subtle Loki / TVA-inspired temporal luminescence & delicate anime spark trail.
 * Designed to be clean, micro-aesthetic, buttery smooth, and completely non-intrusive.
 */
export default function VintageCursorTrail() {
  const canvasRef = useRef(null)

  useEffect(() => {
    // Only run on devices with a fine pointer (mouse/trackpad), not touch
    if (typeof window === 'undefined' || !window.matchMedia('(pointer: fine)').matches) {
      return
    }

    // Check prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    let mouseX = -100
    let mouseY = -100
    let lastMouseX = -100
    let lastMouseY = -100
    let isVisible = false

    // Smooth follower position
    let followerX = -100
    let followerY = -100

    const particles = []
    const MAX_PARTICLES = 18

    // Palette: TVA vintage timeline gold / amber with subtle temporal emerald accents
    const colors = [
      { r: 245, g: 158, b: 11 },   // Amber gold
      { r: 251, g: 191, b: 36 },   // Bright TVA golden
      { r: 217, g: 119, b: 6 },    // Deep vintage bronze
      { r: 52,  g: 211, b: 153 },  // Subtle temporal emerald
    ]

    const handleMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (!isVisible) {
        isVisible = true
        followerX = mouseX
        followerY = mouseY
      }

      // Calculate speed
      const dx = mouseX - lastMouseX
      const dy = mouseY - lastMouseY
      const dist = Math.hypot(dx, dy)

      // Emit delicate micro-sparks on movement
      if (dist > 3 && particles.length < MAX_PARTICLES) {
        const color = colors[Math.floor(Math.random() * colors.length)]
        particles.push({
          x: mouseX + (Math.random() - 0.5) * 6,
          y: mouseY + (Math.random() - 0.5) * 6,
          vx: (Math.random() - 0.5) * 0.8 + dx * 0.08,
          vy: (Math.random() - 0.5) * 0.8 + dy * 0.08 - 0.2, // slight upward float
          size: Math.random() * 1.8 + 0.8,
          alpha: 0.65,
          decay: Math.random() * 0.025 + 0.015,
          color
        })
      }

      lastMouseX = mouseX
      lastMouseY = mouseY
    }

    const handleMouseLeave = () => {
      isVisible = false
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('resize', handleResize)

    let animationFrameId

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      if (isVisible) {
        // Smooth follower easing (spring-like gentle lag)
        followerX += (mouseX - followerX) * 0.22
        followerY += (mouseY - followerY) * 0.22

        // 1. Subtle central temporal halo (very soft, refined glow)
        const gradient = ctx.createRadialGradient(followerX, followerY, 0, followerX, followerY, 18)
        gradient.addColorStop(0, 'rgba(251, 191, 36, 0.28)')
        gradient.addColorStop(0.5, 'rgba(245, 158, 11, 0.08)')
        gradient.addColorStop(1, 'rgba(245, 158, 11, 0)')

        ctx.beginPath()
        ctx.arc(followerX, followerY, 18, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        // 2. Micro timeline reticle dot
        ctx.beginPath()
        ctx.arc(followerX, followerY, 1.8, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(254, 243, 199, 0.85)'
        ctx.shadowColor = 'rgba(245, 158, 11, 0.8)'
        ctx.shadowBlur = 4
        ctx.fill()
        ctx.shadowBlur = 0 // reset
      }

      // 3. Render and update drifting micro-particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        p.vx *= 0.96
        p.vy *= 0.96
        p.alpha -= p.decay

        if (p.alpha <= 0) {
          particles.splice(i, 1)
          continue
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${p.alpha})`
        ctx.shadowColor = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${p.alpha * 0.7})`
        ctx.shadowBlur = 3
        ctx.fill()
        ctx.shadowBlur = 0 // reset
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 9999,
        mixBlendMode: 'screen'
      }}
      aria-hidden="true"
    />
  )
}

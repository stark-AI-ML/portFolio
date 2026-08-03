import React, { useEffect, useRef } from 'react'

/**
 * GhibliCompanion — Petite No-Face (Kaonashi) with Serene Delayed Spirit Drift & Lantern
 * 
 * Performance & Aesthetics:
 * - True time-stamped position history ring buffer (~1.3s delay before No-Face follows).
 * - Sleek, tranquil cloth draping (subtle micro-drift, no amplified waving).
 * - Smooth, gentle floating waddle and quiet spirit presence.
 * - 100% Direct DOM/SVG ref manipulation (0 React state re-renders during RAF loop).
 */

export default function GhibliCompanion() {
  const containerRef = useRef(null)
  const lanternRef = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!window.matchMedia('(pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let posX = window.innerWidth / 2
    let posY = window.innerHeight / 2
    let velX = 0
    let velY = 0

    let currentFacing = 1 // 1 for right, -1 for left
    let isInitialized = false
    let isVisible = false

    // True Time-Stamped Trail Buffer for authentic ~1.3s delay
    const DELAY_MS = 1300
    const history = [] // Array of { x, y, t }

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2

    // Continuous smooth phase counter for gentle floating
    let floatPhase = 0

    // Comfortable distance between cursor and No-Face
    const OFFSET_X = 50
    const OFFSET_Y = -12

    const onMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      const now = performance.now()

      if (!isInitialized) {
        posX = e.clientX + OFFSET_X + 40
        posY = e.clientY + OFFSET_Y
        // Prefill history buffer so he doesn't jump initially
        for (let t = now - DELAY_MS - 200; t <= now; t += 50) {
          history.push({ x: mouseX + OFFSET_X, y: mouseY + OFFSET_Y, t })
        }
        isInitialized = true
        isVisible = true
      }

      history.push({ x: mouseX + OFFSET_X, y: mouseY + OFFSET_Y, t: now })

      // Clean up old entries older than DELAY_MS + 1000ms
      while (history.length > 2 && history[0].t < now - (DELAY_MS + 1000)) {
        history.shift()
      }
    }

    const onMouseLeave = () => {
      isVisible = false
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    document.addEventListener('mouseleave', onMouseLeave)

    let rafId = null

    // ─── 60 FPS Physics & Render Loop ───
    const loop = (timestamp) => {
      const container = containerRef.current
      if (!container) {
        rafId = requestAnimationFrame(loop)
        return
      }

      if (!isVisible) {
        container.style.opacity = '0'
        rafId = requestAnimationFrame(loop)
        return
      }

      const now = performance.now()
      const targetTime = now - DELAY_MS

      // Always push current target state so history stays continuous even when cursor pauses
      if (history.length > 0) {
        const lastEntry = history[history.length - 1]
        if (now - lastEntry.t > 30) {
          history.push({ x: mouseX + OFFSET_X, y: mouseY + OFFSET_Y, t: now })
        }
      }

      // Find the historical position at (now - DELAY_MS)
      let targetX = mouseX + OFFSET_X
      let targetY = mouseY + OFFSET_Y

      if (history.length > 0) {
        if (targetTime <= history[0].t) {
          targetX = history[0].x
          targetY = history[0].y
        } else if (targetTime >= history[history.length - 1].t) {
          targetX = history[history.length - 1].x
          targetY = history[history.length - 1].y
        } else {
          // Interpolate between the two closest frames
          for (let i = 0; i < history.length - 1; i++) {
            if (history[i].t <= targetTime && targetTime <= history[i + 1].t) {
              const ratio = (targetTime - history[i].t) / (history[i + 1].t - history[i].t || 1)
              targetX = history[i].x + (history[i + 1].x - history[i].x) * ratio
              targetY = history[i].y + (history[i + 1].y - history[i].y) * ratio
              break
            }
          }
        }
      }

      // Smooth unhurried spirit spring physics
      const springK = 0.012
      const friction = 0.86

      const ax = (targetX - posX) * springK
      const ay = (targetY - posY) * springK
      velX = (velX + ax) * friction
      velY = (velY + ay) * friction

      // Soft speed clamp so No-Face moves serenely
      const speed = Math.hypot(velX, velY)
      const MAX_SPEED = 1.65
      if (speed > MAX_SPEED) {
        velX = (velX / speed) * MAX_SPEED
        velY = (velY / speed) * MAX_SPEED
      }

      posX += velX
      posY += velY

      const isGliding = speed > 0.2

      // Facing Direction
      if (velX > 0.2) currentFacing = 1
      else if (velX < -0.2) currentFacing = -1

      // Gentle floating phase
      floatPhase += isGliding ? 0.045 : 0.025
      const bobY = Math.sin(floatPhase) * (isGliding ? 1.8 : 1.4)
      const tiltDeg = Math.max(-3, Math.min(3, velX * 1.2))

      // Direct DOM transform update (smooth, no width squishing)
      container.style.transform = `translate3d(${posX}px, ${posY + bobY}px, 0) scaleX(${currentFacing}) rotate(${tiltDeg * currentFacing}deg)`
      container.style.opacity = isGliding ? '0.94' : '0.88'

      // Lantern subtle swing
      if (lanternRef.current) {
        const lanternSwing = Math.sin(floatPhase * 1.1) * (isGliding ? 5 : 2)
        lanternRef.current.style.transform = `rotate(${lanternSwing}deg)`
        lanternRef.current.style.transformOrigin = '27px 30px'
      }

      rafId = requestAnimationFrame(loop)
    }

    rafId = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 9999,
        opacity: 0,
        transition: 'opacity 0.4s ease',
        filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.45)) drop-shadow(0 0 10px rgba(45, 212, 191, 0.08))',
        willChange: 'transform',
        transformOrigin: '17px 26px',
      }}
    >
      <svg
        width="34"
        height="52"
        viewBox="0 0 34 52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: 'visible' }}
      >
        <defs>
          {/* Robe exterior dark plum gradient */}
          <linearGradient id="robeGradPetite" x1="17" y1="6" x2="17" y2="48" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#241b30" />
            <stop offset="40%" stopColor="#181224" />
            <stop offset="85%" stopColor="#100b1a" />
            <stop offset="100%" stopColor="#0a0612" />
          </linearGradient>

          {/* Interior hollow shadow */}
          <linearGradient id="innerHollowPetite" x1="17" y1="40" x2="17" y2="48" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#050308" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.8" />
          </linearGradient>

          {/* Lantern amber spirit glow */}
          <radialGradient id="lanternGlowPetite" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#d97706" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* ── 1. Open Cloak Interior Hollow ── */}
        <ellipse cx="17" cy="45" rx="12" ry="3.8" fill="url(#innerHollowPetite)" />

        {/* ── 2. Sleek Draped Cloak Body with Open Hem Silhouette ── */}
        <path
          d="M 8 13 C 8 6, 26 6, 26 13 L 28 26 C 29 33, 30 40, 31 44.5 C 27 46.5, 24 44.5, 21 46.2 C 18 47.2, 15 44.5, 13 45.5 C 10 47, 6 43.5, 3 44.5 C 4 40, 5 33, 6 26 Z"
          fill="url(#robeGradPetite)"
        />

        {/* ── 3. Sleek Subtle Fabric Crease Lines ── */}
        <path d="M 11 23 C 12 31, 13 38, 13 45" stroke="#2d223d" strokeWidth="0.8" strokeLinecap="round" fill="none" opacity="0.4" />
        <path d="M 23 23 C 22 31, 21 38, 21 46" stroke="#2d223d" strokeWidth="0.8" strokeLinecap="round" fill="none" opacity="0.4" />

        {/* ── 4. Arm & Lantern Group ── */}
        <g ref={lanternRef}>
          {/* Ambient Lantern Glow */}
          <circle cx="27" cy="33" r="9" fill="url(#lanternGlowPetite)" />

          {/* Silhouette Arm */}
          <path d="M 23 22 Q 26 26, 27 29" stroke="#1c1426" strokeWidth="2" strokeLinecap="round" fill="none" />

          {/* Lantern Cord & Structure */}
          <line x1="27" y1="29" x2="27" y2="33" stroke="#786047" strokeWidth="0.7" strokeLinecap="round" />
          <rect x="25" y="32" width="4.2" height="1.0" rx="0.3" fill="#543d2b" />
          <rect x="25.5" y="36" width="3.2" height="0.8" rx="0.2" fill="#543d2b" />

          {/* Lantern Core */}
          <rect x="25.4" y="33" width="3.4" height="3.0" rx="0.6" fill="#fbbf24" opacity="0.9" />
          <rect x="25.9" y="33.5" width="2.4" height="2.0" rx="0.3" fill="#fffbeb" opacity="0.8" />
        </g>

        {/* ── 5. Clean Classic Kaonashi Face ── */}
        <g>
          {/* Porcelain Oval Mask */}
          <ellipse cx="17" cy="13.5" rx="6.5" ry="8.5" fill="#ede8df" />
          <ellipse cx="17" cy="13.5" rx="6.4" ry="8.4" stroke="#c8bead" strokeWidth="0.3" fill="none" opacity="0.6" />

          {/* Maroon Triangular Markings */}
          <path d="M 13.5 7.5 L 14.8 10.5 L 12.5 10.5 Z" fill="#803854" opacity="0.75" />
          <path d="M 20.5 7.5 L 21.5 10.5 L 19.2 10.5 Z" fill="#803854" opacity="0.75" />
          <path d="M 12.8 16.5 L 14.8 16.5 L 13.8 19.5 Z" fill="#803854" opacity="0.75" />
          <path d="M 19.2 16.5 L 21.2 16.5 L 20.2 19.5 Z" fill="#803854" opacity="0.75" />

          {/* Eye Slits */}
          <ellipse cx="14" cy="13" rx="0.9" ry="1.3" fill="#181224" />
          <ellipse cx="20" cy="13" rx="0.9" ry="1.3" fill="#181224" />

          {/* Eye Glints */}
          <circle cx="14.2" cy="12.6" r="0.3" fill="#fdfcf9" opacity="0.8" />
          <circle cx="20.2" cy="12.6" r="0.3" fill="#fdfcf9" opacity="0.8" />

          {/* Mouth Line */}
          <line x1="16" y1="18" x2="18" y2="18" stroke="#181224" strokeWidth="0.5" strokeLinecap="round" opacity="0.6" />
        </g>
      </svg>
    </div>
  )
}

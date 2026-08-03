import React, { useEffect, useRef } from 'react'

/**
 * GhibliCompanion — No-Face (Kaonashi) with Open Billowing Cloth Hem & Lantern
 * 
 * Performance & Architecture:
 * - 100% Direct DOM/SVG ref manipulation (0 React state re-renders during RAF loop).
 * - Smooth historical trail queue with ~1.0s significant delay.
 * - Full walking animation: forward lean, walking cadence sway, lantern swing, side-look mask,
 *   and undulating open cloth hem wave.
 * - Idle state: peaceful 3/4 front float, gentle breathing cloth ripples, soft lantern glow.
 */

export default function GhibliCompanion() {
  const containerRef = useRef(null)
  const hemPathRef = useRef(null)
  const innerHollowRef = useRef(null)
  const lanternRef = useRef(null)
  const faceGroupRef = useRef(null)

  useEffect(() => {
    // Only run on desktop pointer devices & when user doesn't request reduced motion
    if (typeof window === 'undefined') return
    if (!window.matchMedia('(pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // Position & Trail state
    let posX = window.innerWidth / 2
    let posY = window.innerHeight / 2
    let velX = 0
    let velY = 0

    let currentFacing = 1 // 1 for right, -1 for left
    let targetFacing = 1

    let isInitialized = false
    let isVisible = false

    // Historical trail buffer for authentic ~1.0s delay
    // 60fps * 1.0s = ~60 sample trail queue
    const TRAIL_BUFFER_SIZE = 55
    const trail = []

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let lastMouseMoveTime = Date.now()

    // Animation cycle counters
    let walkPhase = 0
    let idlePhase = 0
    let clothPhase = 0
    let facingBlend = 1 // Smooth interpolation for turning

    const OFFSET_X = 35
    const OFFSET_Y = -15

    const onMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      lastMouseMoveTime = Date.now()

      if (!isInitialized) {
        posX = e.clientX + OFFSET_X + 50
        posY = e.clientY + OFFSET_Y
        // Prefill trail buffer
        for (let i = 0; i < TRAIL_BUFFER_SIZE; i++) {
          trail.push({ x: mouseX + OFFSET_X, y: mouseY + OFFSET_Y })
        }
        isInitialized = true
        isVisible = true
      }
    }

    const onMouseLeave = () => {
      isVisible = false
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    document.addEventListener('mouseleave', onMouseLeave)

    let rafId = null

    // ─── 60 FPS Physics & Render Loop ───
    const loop = () => {
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

      // 1. Push current desired target into trail buffer
      trail.push({ x: mouseX + OFFSET_X, y: mouseY + OFFSET_Y })
      while (trail.length > TRAIL_BUFFER_SIZE) {
        trail.shift()
      }

      // The delayed target is the oldest point in the trail buffer
      const delayedTarget = trail[0] || { x: mouseX + OFFSET_X, y: mouseY + OFFSET_Y }

      // 2. Smooth Spring Physics towards the delayed target
      const springK = 0.032
      const friction = 0.82

      const ax = (delayedTarget.x - posX) * springK
      const ay = (delayedTarget.y - posY) * springK
      velX = (velX + ax) * friction
      velY = (velY + ay) * friction
      posX += velX
      posY += velY

      const speed = Math.hypot(velX, velY)
      const isWalking = speed > 0.45

      // 3. Direction & Facing (with smooth transition)
      if (Math.abs(velX) > 0.3) {
        targetFacing = velX > 0 ? 1 : -1
      }
      facingBlend += (targetFacing - facingBlend) * 0.12

      // 4. Cadence & Phases
      if (isWalking) {
        walkPhase += speed * 0.14
        clothPhase += 0.12
      } else {
        idlePhase += 0.035
        clothPhase += 0.04
      }

      // 5. Walking Sway, Forward Lean & Floating Bob
      let swayDeg = 0
      let forwardLean = 0
      let bobY = 0

      if (isWalking) {
        // Waddling walk sway
        swayDeg = Math.sin(walkPhase) * 4.2
        forwardLean = Math.min(speed * 1.8, 6.5) * targetFacing
        bobY = Math.abs(Math.sin(walkPhase)) * -3.5 // Walk bounce
      } else {
        const timeSinceMove = Date.now() - lastMouseMoveTime
        if (timeSinceMove > 4000) {
          // Meditative resting float
          bobY = Math.sin(idlePhase * 0.7) * 4
        } else {
          // Serene hovering float
          bobY = Math.sin(idlePhase) * 2.5
        }
      }

      // 6. Direct DOM update for main container
      const totalRotate = swayDeg + forwardLean
      container.style.transform = `translate3d(${posX}px, ${posY + bobY}px, 0) scaleX(${facingBlend}) rotate(${totalRotate}deg)`
      container.style.opacity = isWalking ? '0.92' : '0.86'

      // 7. Dynamic Open Cloth Hem Waves (Living cloth rippling at the base)
      const w1 = Math.sin(clothPhase) * (isWalking ? 3.8 : 2.2)
      const w2 = Math.sin(clothPhase + 1.5) * (isWalking ? 4.2 : 2.5)
      const w3 = Math.sin(clothPhase + 3.0) * (isWalking ? 3.6 : 2.0)
      const w4 = Math.sin(clothPhase + 4.5) * (isWalking ? 4.0 : 2.4)

      const y1 = 73 + w1
      const y2 = 75 + w2
      const y3 = 74 + w3
      const y4 = 72 + w4

      if (hemPathRef.current) {
        hemPathRef.current.setAttribute(
          'd',
          `M 13 22
           C 13 11, 41 11, 41 22
           L 44 42
           C 45 52, 47 62, 48 ${y4}
           C 42 ${y3 + 3}, 37 ${y3 - 2}, 33 ${y2}
           C 29 ${y2 + 2}, 25 ${y1 - 2}, 21 ${y1}
           C 17 ${y1 + 3}, 11 ${y4 - 2}, 6 ${y4}
           C 7 62, 9 52, 10 42
           Z`
        )
      }

      if (innerHollowRef.current) {
        innerHollowRef.current.setAttribute('cy', String(73 + (w1 + w3) / 2))
      }

      // 8. Lantern Walking Swing Animation
      if (lanternRef.current) {
        const lanternSwing = isWalking ? Math.sin(walkPhase) * 14 : Math.sin(idlePhase) * 3
        lanternRef.current.style.transform = `rotate(${lanternSwing}deg)`
        lanternRef.current.style.transformOrigin = '43px 47px'
      }

      // 9. Side-Look Mask Offset
      if (faceGroupRef.current) {
        // When walking, mask turns slightly towards forward direction
        const maskShiftX = isWalking ? 2.5 : 0
        const maskShiftY = isWalking ? -0.5 : 0
        faceGroupRef.current.setAttribute('transform', `translate(${maskShiftX}, ${maskShiftY})`)
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
        transition: 'opacity 0.5s ease',
        filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.5)) drop-shadow(0 0 16px rgba(45, 212, 191, 0.08))',
        willChange: 'transform',
        transformOrigin: '27px 42px',
      }}
    >
      <svg
        width="54"
        height="84"
        viewBox="0 0 54 84"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: 'visible' }}
      >
        <defs>
          {/* Robe exterior dark plum lighting gradient */}
          <linearGradient id="robeGrad" x1="27" y1="12" x2="27" y2="78" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#251c33" />
            <stop offset="35%" stopColor="#181224" />
            <stop offset="85%" stopColor="#100b1a" />
            <stop offset="100%" stopColor="#0c0814" />
          </linearGradient>

          {/* Interior hollow shadow of the open cloth bottom */}
          <linearGradient id="innerHollow" x1="27" y1="64" x2="27" y2="78" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#050308" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.8" />
          </linearGradient>

          {/* Mask porcelain gradient */}
          <radialGradient id="maskShade" cx="45%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#faf7f2" />
            <stop offset="80%" stopColor="#ede6db" />
            <stop offset="100%" stopColor="#ded5c5" />
          </radialGradient>

          {/* Lantern amber spirit radiance */}
          <radialGradient id="lanternGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#d97706" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* ── 1. Open Cloak Interior Hollow ── */}
        <ellipse ref={innerHollowRef} cx="27" cy="73" rx="18" ry="5.5" fill="url(#innerHollow)" />

        {/* ── 2. Main Draped Cloak Body with Open Billowing Hem ── */}
        <path
          ref={hemPathRef}
          d="M 13 22 C 13 11, 41 11, 41 22 L 44 42 C 45 52, 47 62, 48 72 C 42 77, 37 72, 33 75 C 29 77, 25 71, 21 73 C 17 76, 11 70, 6 72 C 7 62, 9 52, 10 42 Z"
          fill="url(#robeGrad)"
        />

        {/* ── 3. Front Fabric Crease Lines ── */}
        <path d="M 17 38 C 18 50, 19 62, 20 73" stroke="#2d223d" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.45" />
        <path d="M 37 38 C 36 50, 34 62, 33 75" stroke="#2d223d" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.45" />
        <path d="M 27 46 C 27 56, 26 66, 26 76" stroke="#0c0814" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.6" />

        {/* ── 4. Arm & Lantern Group with Swing Physics ── */}
        <g ref={lanternRef}>
          {/* Ambient Lantern Glow */}
          <circle cx="43" cy="52" r="14" fill="url(#lanternGlow)" />

          {/* Silhouette Arm */}
          <path d="M 36 36 Q 42 41, 43 47" stroke="#1c1426" strokeWidth="2.8" strokeLinecap="round" fill="none" />

          {/* Lantern Cord */}
          <line x1="43" y1="47" x2="43" y2="52" stroke="#786047" strokeWidth="1" strokeLinecap="round" />

          {/* Lantern Wooden Structure */}
          <rect x="39.5" y="50" width="7" height="1.6" rx="0.5" fill="#543d2b" />
          <rect x="40" y="56" width="6" height="1.2" rx="0.4" fill="#543d2b" />

          {/* Lantern Core */}
          <rect x="40.5" y="51.6" width="5" height="4.4" rx="1" fill="#fbbf24" opacity="0.9" />
          <rect x="41.2" y="52.2" width="3.6" height="3.2" rx="0.5" fill="#fffbeb" opacity="0.8" />
        </g>

        {/* ── 5. Mask & Face Group (Side-Look Motion) ── */}
        <g ref={faceGroupRef}>
          {/* Iconic White Mask */}
          <ellipse cx="27" cy="22" rx="10" ry="12.5" fill="url(#maskShade)" />
          <ellipse cx="27" cy="22" rx="9.9" ry="12.4" stroke="#c8bead" strokeWidth="0.4" fill="none" opacity="0.6" />

          {/* Maroon Triangular Markings */}
          <path d="M 21.5 12.5 L 23.5 17 L 20 17 Z" fill="#803854" opacity="0.8" />
          <path d="M 32.5 12.5 L 34 17 L 30.5 17 Z" fill="#803854" opacity="0.8" />
          <path d="M 20.5 27 L 23.5 27 L 22 31.5 Z" fill="#803854" opacity="0.8" />
          <path d="M 30.5 27 L 33.5 27 L 32 31.5 Z" fill="#803854" opacity="0.8" />

          {/* Eye Slits */}
          <ellipse cx="22" cy="20.5" rx="1.6" ry="2.1" fill="#181224" />
          <ellipse cx="32" cy="20.5" rx="1.6" ry="2.1" fill="#181224" />

          {/* Eye Glints */}
          <circle cx="22.3" cy="19.8" r="0.45" fill="#fdfcf9" opacity="0.75" />
          <circle cx="32.3" cy="19.8" r="0.45" fill="#fdfcf9" opacity="0.75" />

          {/* Mouth Line */}
          <path d="M 25 28.5 Q 27 29.2, 29 28.5" stroke="#181224" strokeWidth="0.8" strokeLinecap="round" fill="none" opacity="0.7" />
        </g>
      </svg>
    </div>
  )
}

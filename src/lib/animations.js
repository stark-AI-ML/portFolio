/**
 * Portfolio v3 Motion Engine
 * High-performance, hardware-accelerated micro-animations & entrance choreography
 * Vintage editorial aesthetic with organic easing curves
 */

// Custom ease curves matching classic analog feel
export const EASING = {
  easeOutExpo: 'cubic-bezier(0.16, 1, 0.3, 1)',
  easeOutCubic: 'cubic-bezier(0.33, 1, 0.68, 1)',
  easeInOutQuad: 'cubic-bezier(0.45, 0, 0.55, 1)',
  vintageSpring: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
}

/**
 * Animate hero section on initial page load with a silky-smooth staggered entrance
 */
export function animateHeroEntrance() {
  if (typeof window === 'undefined') return

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReducedMotion) {
    document.querySelectorAll('.hero-banner, .hero-profile, .hero-desc, .button-group, .social-links').forEach(el => {
      el.style.opacity = '1'
      el.style.transform = 'none'
    })
    return
  }

  // 1. Hero Banner
  const banner = document.querySelector('.hero-banner')
  if (banner) {
    banner.style.opacity = '0'
    banner.style.transition = `opacity 850ms ${EASING.easeOutExpo}`
    requestAnimationFrame(() => {
      banner.style.opacity = '1'
    })
  }

  // 2. Profile Avatar & Name Info
  const profile = document.querySelector('.hero-profile')
  if (profile) {
    profile.style.opacity = '0'
    profile.style.transform = 'translateY(18px)'
    profile.style.transition = `opacity 700ms ${EASING.easeOutExpo} 150ms, transform 700ms ${EASING.easeOutExpo} 150ms`
    requestAnimationFrame(() => {
      profile.style.opacity = '1'
      profile.style.transform = 'translateY(0)'
    })
  }

  // 3. Bio Paragraphs
  const bio = document.querySelector('.hero-desc')
  if (bio) {
    bio.style.opacity = '0'
    bio.style.transform = 'translateY(12px)'
    bio.style.transition = `opacity 650ms ${EASING.easeOutExpo} 300ms, transform 650ms ${EASING.easeOutExpo} 300ms`
    requestAnimationFrame(() => {
      bio.style.opacity = '1'
      bio.style.transform = 'translateY(0)'
    })
  }

  // 4. Action Buttons
  const buttons = document.querySelector('.button-group')
  if (buttons) {
    buttons.style.opacity = '0'
    buttons.style.transform = 'translateY(10px)'
    buttons.style.transition = `opacity 600ms ${EASING.easeOutExpo} 400ms, transform 600ms ${EASING.easeOutExpo} 400ms`
    requestAnimationFrame(() => {
      buttons.style.opacity = '1'
      buttons.style.transform = 'translateY(0)'
    })
  }

  // 5. Social Links (Staggered Children)
  const socialPills = document.querySelectorAll('.social-link')
  socialPills.forEach((pill, idx) => {
    pill.style.opacity = '0'
    pill.style.transform = 'translateY(8px)'
    pill.style.transition = `opacity 500ms ${EASING.easeOutExpo} ${480 + idx * 60}ms, transform 500ms ${EASING.easeOutExpo} ${480 + idx * 60}ms`
    requestAnimationFrame(() => {
      pill.style.opacity = '1'
      pill.style.transform = 'translateY(0)'
    })
  })
}

/**
 * Initializes IntersectionObserver for scroll-triggered section elevations
 */
export function initScrollObserver() {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return () => {}

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReducedMotion) return () => {}

  const elements = document.querySelectorAll('.reveal-on-scroll')

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed')
          observer.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    }
  )

  elements.forEach((el) => observer.observe(el))

  return () => observer.disconnect()
}

/**
 * Smooth height & opacity expansion for experience timeline items
 */
export function animateAccordion(element, isOpen) {
  if (!element) return

  if (isOpen) {
    element.style.display = 'block'
    element.style.overflow = 'hidden'
    element.style.maxHeight = '0px'
    element.style.opacity = '0'
    element.style.transition = `max-height 350ms ${EASING.easeOutExpo}, opacity 350ms ${EASING.easeOutExpo}`

    requestAnimationFrame(() => {
      const scrollHeight = element.scrollHeight
      element.style.maxHeight = `${scrollHeight + 20}px`
      element.style.opacity = '1'
    })
  } else {
    element.style.overflow = 'hidden'
    element.style.maxHeight = `${element.scrollHeight}px`
    element.style.opacity = '1'
    element.style.transition = `max-height 250ms ${EASING.easeInOutQuad}, opacity 200ms ${EASING.easeInOutQuad}`

    requestAnimationFrame(() => {
      element.style.maxHeight = '0px'
      element.style.opacity = '0'
    })
  }
}

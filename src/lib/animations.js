import anime from './anime'

/**
 * Orchestrates the hero entrance animation timeline on page mount.
 */
export function animateHeroEntrance(container) {
  if (!container) return

  const tl = anime.timeline({
    easing: 'easeOutExpo'
  })

  tl.add({
    targets: container.querySelectorAll('.hero-banner'),
    opacity: [0, 1],
    scale: [1.04, 1],
    duration: 900
  })
  .add({
    targets: container.querySelectorAll('.hero-profile'),
    opacity: [0, 1],
    translateY: [24, 0],
    duration: 650
  }, '-=500')
  .add({
    targets: container.querySelectorAll('.hero-name-title'),
    opacity: [0, 1],
    translateX: [-12, 0],
    duration: 500
  }, '-=350')
  .add({
    targets: container.querySelectorAll('.hero-desc p'),
    opacity: [0, 1],
    translateY: [12, 0],
    duration: 550,
    delay: anime.stagger(70)
  }, '-=250')
  .add({
    targets: container.querySelectorAll('.button-group .btn'),
    opacity: [0, 1],
    translateY: [10, 0],
    duration: 450,
    delay: anime.stagger(80)
  }, '-=200')
  .add({
    targets: container.querySelectorAll('.social-link'),
    opacity: [0, 1],
    translateY: [8, 0],
    duration: 450,
    delay: anime.stagger(40)
  }, '-=200')

  return tl
}

/**
 * Initializes IntersectionObserver for elements with .reveal-on-scroll.
 * Returns a cleanup function.
 */
export function initScrollObserver(container) {
  if (!container || typeof IntersectionObserver === 'undefined') return () => {}

  const elements = container.querySelectorAll('.reveal-on-scroll')
  if (!elements.length) return () => {}

  // Set initial state
  elements.forEach(el => {
    if (!el.dataset.revealed) {
      el.style.opacity = '0'
      el.style.transform = 'translate3d(0, 20px, 0)'
    }
  })

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.revealed) {
          entry.target.dataset.revealed = 'true'
          anime({
            targets: entry.target,
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 700,
            easing: 'easeOutCubic'
          })
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  )

  elements.forEach(el => observer.observe(el))

  return () => {
    observer.disconnect()
  }
}

/**
 * Smoothly animates accordion content for Experience items.
 */
export function animateAccordion(element, isOpen) {
  if (!element) return

  if (isOpen) {
    element.style.display = 'block'
    element.style.overflow = 'hidden'
    const fullHeight = element.scrollHeight

    anime({
      targets: element,
      height: [0, fullHeight],
      opacity: [0, 1],
      duration: 350,
      easing: 'easeOutQuad',
      complete: () => {
        element.style.height = 'auto'
        element.style.overflow = 'visible'
      }
    })
  } else {
    element.style.overflow = 'hidden'
    const curHeight = element.scrollHeight

    anime({
      targets: element,
      height: [curHeight, 0],
      opacity: [1, 0],
      duration: 250,
      easing: 'easeInQuad',
      complete: () => {
        element.style.display = 'none'
      }
    })
  }
}

export { anime }

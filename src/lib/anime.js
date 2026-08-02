/**
 * Anime.js compatible lightweight animation engine
 * Supports: targets, properties (transforms, opacity, dimensional props, colors),
 * easings, delays, durations, timeline orchestration, and stagger utility.
 */

// --- Easing functions ---
const easings = {
  linear: t => t,
  easeInQuad: t => t * t,
  easeOutQuad: t => t * (2 - t),
  easeInOutQuad: t => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  easeInCubic: t => t * t * t,
  easeOutCubic: t => --t * t * t + 1,
  easeInOutCubic: t => (t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1),
  easeInQuart: t => t * t * t * t,
  easeOutQuart: t => 1 - --t * t * t * t,
  easeInOutQuart: t => (t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t),
  easeInExpo: t => (t === 0 ? 0 : Math.pow(2, 10 * (t - 1))),
  easeOutExpo: t => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
  easeInOutExpo: t => {
    if (t === 0) return 0
    if (t === 1) return 1
    if ((t /= 0.5) < 1) return 0.5 * Math.pow(2, 10 * (t - 1))
    return 0.5 * (-Math.pow(2, -10 * --t) + 2)
  },
  easeOutBack: t => {
    const s = 1.70158
    return --t * t * ((s + 1) * t + s) + 1
  },
  easeOutElastic: t => {
    if (t === 0) return 0
    if (t === 1) return 1
    const p = 0.3
    return Math.pow(2, -10 * t) * Math.sin(((t - p / 4) * (2 * Math.PI)) / p) + 1
  }
}

function parseCubicBezier(mX1, mY1, mX2, mY2) {
  const A = (aA1, aA2) => 1.0 - 3.0 * aA2 + 3.0 * aA1
  const B = (aA1, aA2) => 3.0 * aA2 - 6.0 * aA1
  const C = aA1 => 3.0 * aA1

  const calcBezier = (aT, aA1, aA2) => ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT
  const getSlope = (aT, aA1, aA2) => 3.0 * A(aA1, aA2) * aT * aT + 2.0 * B(aA1, aA2) * aT + C(aA1)

  return function (aX) {
    if (aX === 0 || aX === 1) return aX
    let aGuessT = aX
    for (let i = 0; i < 4; ++i) {
      const currentSlope = getSlope(aGuessT, mX1, mX2)
      if (currentSlope === 0.0) return aGuessT
      const currentX = calcBezier(aGuessT, mX1, mX2) - aX
      aGuessT -= currentX / currentSlope
    }
    return calcBezier(aGuessT, mY1, mY2)
  }
}

function getEasing(easing) {
  if (typeof easing === 'function') return easing
  if (typeof easing === 'string') {
    if (easings[easing]) return easings[easing]
    if (easing.startsWith('cubicBezier')) {
      const match = easing.match(/cubicBezier\(([^)]+)\)/)
      if (match) {
        const [x1, y1, x2, y2] = match[1].split(',').map(Number)
        return parseCubicBezier(x1, y1, x2, y2)
      }
    }
  }
  return easings.easeOutExpo
}

// --- Target resolution ---
function getTargets(targets) {
  if (!targets) return []
  if (typeof targets === 'string') {
    return Array.from(document.querySelectorAll(targets))
  }
  if (targets instanceof Element || targets instanceof Node) {
    return [targets]
  }
  if (targets instanceof NodeList || Array.isArray(targets)) {
    return Array.from(targets).flatMap(getTargets)
  }
  if (typeof targets === 'object') {
    return [targets]
  }
  return []
}

// --- Value Parsing & Interpolation ---
const TRANSFORM_PROPS = new Set([
  'translateX', 'translateY', 'translateZ',
  'rotate', 'rotateX', 'rotateY', 'rotateZ',
  'scale', 'scaleX', 'scaleY', 'scaleZ',
  'skewX', 'skewY'
])

function getDefaultUnit(prop) {
  if (prop.startsWith('translate')) return 'px'
  if (prop.startsWith('rotate') || prop.startsWith('skew')) return 'deg'
  if (prop.startsWith('scale')) return ''
  if (prop === 'opacity') return ''
  if (prop === 'height' || prop === 'width' || prop === 'maxHeight' || prop === 'top' || prop === 'left') return 'px'
  if (prop === 'letterSpacing') return 'em'
  return 'px'
}

function parseValWithUnit(val, defaultUnit = '') {
  if (typeof val === 'number') {
    return { num: val, unit: defaultUnit }
  }
  if (typeof val === 'string') {
    const num = parseFloat(val)
    const unit = val.replace(/^[+-]?([0-9]*[.])?[0-9]+/, '') || defaultUnit
    return { num: isNaN(num) ? 0 : num, unit }
  }
  return { num: 0, unit: defaultUnit }
}

function getInitialPropertyValue(el, prop) {
  if (!el || !(el instanceof Element)) return 0

  if (TRANSFORM_PROPS.has(prop)) {
    // Check inline transform cache or return sensible defaults
    if (!el._animeTransforms) el._animeTransforms = {}
    if (el._animeTransforms[prop] !== undefined) return el._animeTransforms[prop]
    if (prop.startsWith('scale')) return 1
    return 0
  }

  const computed = window.getComputedStyle(el)
  const val = computed[prop]
  if (val !== undefined && val !== '') {
    const parsed = parseFloat(val)
    if (!isNaN(parsed)) return parsed
  }
  if (prop === 'opacity') return 1
  return 0
}

function applyTransform(el) {
  if (!el._animeTransforms) return
  const t = el._animeTransforms
  const parts = []

  if (t.translateX !== undefined || t.translateY !== undefined) {
    const tx = t.translateX !== undefined ? `${t.translateX.num}${t.translateX.unit}` : '0px'
    const ty = t.translateY !== undefined ? `${t.translateY.num}${t.translateY.unit}` : '0px'
    parts.push(`translate3d(${tx}, ${ty}, 0)`)
  }
  if (t.rotate !== undefined) {
    parts.push(`rotate(${t.rotate.num}${t.rotate.unit})`)
  }
  if (t.scale !== undefined) {
    parts.push(`scale(${t.scale.num})`)
  } else {
    if (t.scaleX !== undefined) parts.push(`scaleX(${t.scaleX.num})`)
    if (t.scaleY !== undefined) parts.push(`scaleY(${t.scaleY.num})`)
  }
  el.style.transform = parts.join(' ')
}

function setPropertyValue(el, prop, currentNum, unit) {
  if (TRANSFORM_PROPS.has(prop)) {
    if (!el._animeTransforms) el._animeTransforms = {}
    el._animeTransforms[prop] = { num: currentNum, unit }
    applyTransform(el)
  } else if (prop === 'opacity') {
    el.style.opacity = currentNum
  } else if (prop === 'height' || prop === 'maxHeight' || prop === 'width') {
    el.style[prop] = `${currentNum}${unit}`
  } else {
    try {
      el.style[prop] = `${currentNum}${unit}`
    } catch {
      // Fallback
    }
  }
}

// --- Main anime function ---
export function anime(params = {}) {
  const elements = getTargets(params.targets)
  if (!elements.length) {
    return {
      play: () => {},
      pause: () => {},
      restart: () => {},
      finished: Promise.resolve()
    }
  }

  const duration = typeof params.duration === 'number' ? params.duration : 800
  const delayParam = params.delay || 0
  const easingFn = getEasing(params.easing || 'easeOutExpo')
  const completeCallback = params.complete
  const updateCallback = params.update

  // Extract animated properties
  const reservedKeys = new Set(['targets', 'duration', 'delay', 'easing', 'complete', 'update', 'loop', 'direction'])
  const animProps = {}

  for (const key of Object.keys(params)) {
    if (!reservedKeys.has(key)) {
      animProps[key] = params[key]
    }
  }

  let startTime = null
  let isRunning = true
  let rafId = null

  // Build target-specific animation tracks
  const tracks = elements.map((el, elIndex) => {
    const elDelay = typeof delayParam === 'function' ? delayParam(el, elIndex, elements.length) : delayParam
    const propTracks = []

    for (const [prop, val] of Object.entries(animProps)) {
      const defUnit = getDefaultUnit(prop)
      let fromVal, toVal

      if (Array.isArray(val)) {
        if (val.length === 1) {
          fromVal = getInitialPropertyValue(el, prop)
          toVal = val[0]
        } else {
          fromVal = val[0]
          toVal = val[1]
        }
      } else {
        fromVal = getInitialPropertyValue(el, prop)
        toVal = val
      }

      const parsedFrom = parseValWithUnit(fromVal, defUnit)
      const parsedTo = parseValWithUnit(toVal, defUnit)

      propTracks.push({
        prop,
        from: parsedFrom.num,
        to: parsedTo.num,
        unit: parsedTo.unit || parsedFrom.unit || defUnit
      })

      // Set initial value immediately
      setPropertyValue(el, prop, parsedFrom.num, parsedFrom.unit || defUnit)
    }

    return {
      el,
      delay: elDelay,
      props: propTracks
    }
  })

  let resolveFinished
  const finishedPromise = new Promise(resolve => {
    resolveFinished = resolve
  })

  function step(timestamp) {
    if (!startTime) startTime = timestamp
    const elapsed = timestamp - startTime
    let allFinished = true

    for (const track of tracks) {
      const trackElapsed = elapsed - track.delay
      if (trackElapsed < 0) {
        allFinished = false
        continue
      }

      const progress = Math.min(1, Math.max(0, trackElapsed / duration))
      const eased = easingFn(progress)

      for (const p of track.props) {
        const current = p.from + (p.to - p.from) * eased
        setPropertyValue(track.el, p.prop, current, p.unit)
      }

      if (progress < 1) {
        allFinished = false
      }
    }

    if (updateCallback) updateCallback()

    if (!allFinished && isRunning) {
      rafId = requestAnimationFrame(step)
    } else if (allFinished) {
      isRunning = false
      if (completeCallback) completeCallback()
      resolveFinished()
    }
  }

  rafId = requestAnimationFrame(step)

  return {
    play: () => {
      if (!isRunning) {
        isRunning = true
        startTime = null
        rafId = requestAnimationFrame(step)
      }
    },
    pause: () => {
      isRunning = false
      if (rafId) cancelAnimationFrame(rafId)
    },
    restart: () => {
      if (rafId) cancelAnimationFrame(rafId)
      startTime = null
      isRunning = true
      rafId = requestAnimationFrame(step)
    },
    finished: finishedPromise
  }
}

// --- Stagger helper ---
anime.stagger = function (val, params = {}) {
  const start = params.start || 0
  const direction = params.direction || 'normal'
  const from = params.from || 0

  return function (el, i, total) {
    let index = i
    if (direction === 'reverse') index = total - 1 - i
    if (from === 'center') index = Math.abs(total / 2 - i)
    return start + index * val
  }
}

// --- Timeline helper ---
anime.timeline = function (defaults = {}) {
  const queue = []
  let totalTime = 0

  const tl = {
    add: function (params = {}, offset = 0) {
      const merged = { ...defaults, ...params }
      let startTime = totalTime

      if (typeof offset === 'string' && offset.startsWith('-=')) {
        const sub = parseFloat(offset.slice(2)) || 0
        startTime = Math.max(0, totalTime - sub)
      } else if (typeof offset === 'number') {
        startTime = offset
      }

      const dur = typeof merged.duration === 'number' ? merged.duration : (defaults.duration || 800)
      const del = typeof merged.delay === 'number' ? merged.delay : 0

      queue.push({
        params: merged,
        startTime
      })

      totalTime = Math.max(totalTime, startTime + dur + del)
      return tl
    },
    play: function () {
      for (const item of queue) {
        setTimeout(() => {
          anime(item.params)
        }, item.startTime)
      }
    }
  }

  // Auto-play on next microtask if not manually invoked
  Promise.resolve().then(() => {
    tl.play()
  })

  return tl
}

export default anime

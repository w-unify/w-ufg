export function useScrollAnimations() {
  const setupObserver = () => {
    if (typeof window === 'undefined') return

    const observerOptions: IntersectionObserverInit = {
      root: null,
      threshold: 0.15
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
        }
      })
    }, observerOptions)

    const elementsToAnimate = document.querySelectorAll('.reveal, .fade, .fade-left, .pulse')
    elementsToAnimate.forEach(el => observer.observe(el))

    return observer
  }

  onMounted(() => {
    nextTick(() => {
      setupObserver()
    })
  })
}

export function useCounterAnimation() {
  const setupCounters = () => {
    if (typeof window === 'undefined') return

    const counters = document.querySelectorAll('.js-counter')

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement
          const target = parseInt(el.getAttribute('data-target') || '0')
          const step = parseInt(el.getAttribute('data-step') || '1')
          let count = 0

          const updateCount = () => {
            if (count < target) {
              count += step
              el.innerText = String(count > target ? target : count)
              setTimeout(updateCount, 50)
            } else {
              el.innerText = String(target)
            }
          }

          updateCount()
          observer.unobserve(el)
        }
      })
    }, { threshold: 0.5 })

    counters.forEach(counter => observer.observe(counter))
  }

  onMounted(() => {
    nextTick(() => {
      setupCounters()
    })
  })
}

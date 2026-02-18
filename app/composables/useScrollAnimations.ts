export function useScrollAnimations() {
  let intersectionObserver: IntersectionObserver | null = null
  let mutationObserver: MutationObserver | null = null

  const observeElement = (el: Element) => {
    if (!intersectionObserver) return
    const rect = el.getBoundingClientRect()
    const alreadyVisible = rect.top < window.innerHeight && rect.bottom > 0
    if (alreadyVisible) {
      el.classList.add('is-visible')
    } else {
      intersectionObserver.observe(el)
    }
  }

  const setupObserver = () => {
    if (typeof window === 'undefined') return

    intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          intersectionObserver?.unobserve(entry.target)
        }
      })
    }, { root: null, threshold: 0.15 })

    // Observar elementos existentes
    document.querySelectorAll('.reveal, .fade, .fade-left, .pulse').forEach(observeElement)

    // MutationObserver: detectar nuevos elementos que se agregan al DOM (datos async de Squidex)
    mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType !== 1) return
          const el = node as Element
          if (el.matches?.('.reveal, .fade, .fade-left, .pulse')) {
            observeElement(el)
          }
          el.querySelectorAll?.('.reveal, .fade, .fade-left, .pulse').forEach(observeElement)
        })
      })
    })

    mutationObserver.observe(document.body, { childList: true, subtree: true })
  }

  onMounted(() => {
    nextTick(() => {
      setupObserver()
    })
  })

  onUnmounted(() => {
    intersectionObserver?.disconnect()
    mutationObserver?.disconnect()
    intersectionObserver = null
    mutationObserver = null
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

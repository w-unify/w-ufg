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
  let intersectionObserver: IntersectionObserver | null = null
  let mutationObserver: MutationObserver | null = null
  const observed = new WeakSet<Element>()

  const animateCounter = (el: HTMLElement) => {
    if (observed.has(el)) return
    observed.add(el)
    const target = parseInt(el.getAttribute('data-target') || '0')
    const step = parseInt(el.getAttribute('data-step') || '1')
    let count = 0
    const updateCount = () => {
      if (count < target) {
        count = Math.min(count + step, target)
        el.innerText = String(count)
        setTimeout(updateCount, 50)
      } else {
        el.innerText = String(target)
      }
    }
    updateCount()
  }

  const observeCounter = (el: Element) => {
    if (observed.has(el) || !intersectionObserver) return
    intersectionObserver.observe(el)
  }

  const setup = () => {
    if (typeof window === 'undefined') return

    intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target as HTMLElement)
          intersectionObserver?.unobserve(entry.target)
        }
      })
    }, { threshold: 0.5 })

    // Observar los que ya existen
    document.querySelectorAll('.js-counter').forEach(observeCounter)

    // MutationObserver: detectar .js-counter que aparecen después (datos async)
    mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType !== 1) return
          const el = node as Element
          if (el.matches?.('.js-counter')) observeCounter(el)
          el.querySelectorAll?.('.js-counter').forEach(observeCounter)
        })
      })
    })
    mutationObserver.observe(document.body, { childList: true, subtree: true })
  }

  onMounted(() => nextTick(setup))

  onUnmounted(() => {
    intersectionObserver?.disconnect()
    mutationObserver?.disconnect()
    intersectionObserver = null
    mutationObserver = null
  })
}

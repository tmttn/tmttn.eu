import { useEffect, useCallback, useRef } from "react"

function throttle<T extends (...arguments_: unknown[]) => void>(function_: T, delay: number): T {
  let timeoutId: ReturnType<typeof setTimeout> | undefined
  let lastExecTime = 0
  
  return ((...arguments_: Parameters<T>) => {
    const currentTime = Date.now()
    
    if (currentTime - lastExecTime > delay) {
      function_(...arguments_)
      lastExecTime = currentTime
    } else {
      if (timeoutId) clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        function_(...arguments_)
        lastExecTime = Date.now()
      }, delay - (currentTime - lastExecTime))
    }
  }) as T
}

export default function Scrollable() {
  const mainNavLinksReference = useRef<NodeListOf<HTMLAnchorElement> | null>(null)
  const headerReference = useRef<HTMLElement | null>(null)

  const updateActiveNavigation = useCallback(() => {
    const fromTop = window.scrollY

    if (headerReference.current) {
      if (fromTop > 10) {
        headerReference.current.classList.add("scrolled")
      } else {
        headerReference.current.classList.remove("scrolled")
      }
    }

    if (mainNavLinksReference.current) {
      for (const link of Array.from(mainNavLinksReference.current)) {
        const section: HTMLElement | null = document.querySelector(link.hash)

        if (section && section.offsetTop <= fromTop &&
          section.offsetTop + section.offsetHeight > fromTop
        ) {
          link.classList.add("current")
        } else {
          link.classList.remove("current")
        }
      }
    }
  }, [])

  const throttledUpdateActiveNavigation = useCallback(() => {
    return throttle(updateActiveNavigation, 100)()
  }, [updateActiveNavigation])

  useEffect(() => {
    mainNavLinksReference.current = document.querySelectorAll("nav ul li a")
    headerReference.current = document.querySelector("header")

    window.addEventListener("scroll", throttledUpdateActiveNavigation, false)

    return () => {
      window.removeEventListener("scroll", throttledUpdateActiveNavigation, false)
    }
  }, [throttledUpdateActiveNavigation])

  return null
}

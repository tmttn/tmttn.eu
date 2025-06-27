import { useEffect, useCallback, useRef } from "react"

function throttle<T extends (...args: any[]) => void>(func: T, delay: number): T {
  let timeoutId: NodeJS.Timeout | null = null
  let lastExecTime = 0
  
  return ((...args: Parameters<T>) => {
    const currentTime = Date.now()
    
    if (currentTime - lastExecTime > delay) {
      func(...args)
      lastExecTime = currentTime
    } else {
      if (timeoutId) clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        func(...args)
        lastExecTime = Date.now()
      }, delay - (currentTime - lastExecTime))
    }
  }) as T
}

export default function Scrollable() {
  const mainNavLinksRef = useRef<NodeListOf<HTMLAnchorElement> | null>(null)
  const headerRef = useRef<HTMLElement | null>(null)

  const updateActiveNavigation = useCallback(() => {
    const fromTop = window.scrollY

    if (headerRef.current) {
      if (fromTop > 10) {
        headerRef.current.classList.add("scrolled")
      } else {
        headerRef.current.classList.remove("scrolled")
      }
    }

    if (mainNavLinksRef.current) {
      mainNavLinksRef.current.forEach(link => {
        const section: HTMLElement | null = document.querySelector(link.hash)

        if (section && section.offsetTop <= fromTop &&
          section.offsetTop + section.offsetHeight > fromTop
        ) {
          link.classList.add("current")
        } else {
          link.classList.remove("current")
        }
      })
    }
  }, [])

  const throttledUpdateActiveNavigation = useCallback(() => {
    return throttle(updateActiveNavigation, 100)()
  }, [updateActiveNavigation])

  useEffect(() => {
    mainNavLinksRef.current = document.querySelectorAll("nav ul li a")
    headerRef.current = document.querySelector("header")

    window.addEventListener("scroll", throttledUpdateActiveNavigation, false)

    return () => {
      window.removeEventListener("scroll", throttledUpdateActiveNavigation, false)
    }
  }, [throttledUpdateActiveNavigation])

  return null
}

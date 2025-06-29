import React, { useRef, useEffect, useState } from 'react'
import { useTheme } from '../../contexts/ThemeContext'
import { ParticleCanvas } from './ParticleBackground.styled'


interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  alpha: number
  life: number
  maxLife: number
}

interface ParticleBackgroundProperties {
  particleCount?: number
  className?: string
}

export default function ParticleBackground({ 
  particleCount = 50, 
  className 
}: Readonly<ParticleBackgroundProperties>) {
  const { isDark } = useTheme()
  const canvasReference = useRef<HTMLCanvasElement>(null)
  const animationReference = useRef<number>(0)
  const particlesReference = useRef<Particle[]>([])
  const mouseReference = useRef({ x: 0, y: 0 })
  const scrollReference = useRef(0)
  const lastScrollReference = useRef(0)
  const [isVisible, setIsVisible] = useState(true)
  const lastFrameTime = useRef(0)
  const fpsTarget = 60
  const frameInterval = 1000 / fpsTarget

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = globalThis.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setIsVisible(false)
      return
    }

    const canvas = canvasReference.current
    if (!canvas) return

    const context = canvas.getContext('2d')
    if (!context) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()

    // Particle colors based on theme
    const particleColors = isDark ? [
      'rgba(96, 165, 250, 0.8)', // primary blue
      'rgba(165, 180, 252, 0.6)', // primary highlight
      'rgba(52, 211, 153, 0.7)',  // accent green
      'rgba(244, 114, 182, 0.5)', // secondary pink
    ] : [
      'rgba(59, 130, 246, 0.6)',  // darker blue for light mode
      'rgba(29, 78, 216, 0.5)',   // darker blue variant
      'rgba(5, 150, 105, 0.6)',   // darker green
      'rgba(225, 29, 72, 0.4)',   // darker pink
    ]

    const createParticle = (): Particle => {
      const maxLife = 300 + Math.random() * 200
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        color: particleColors[Math.floor(Math.random() * particleColors.length)],
        alpha: Math.random() * 0.5 + 0.2,
        life: maxLife,
        maxLife
      }
    }

    // Initialize particles
    const initParticles = () => {
      particlesReference.current = []
      for (let index = 0; index < particleCount; index++) {
        particlesReference.current.push(createParticle())
      }
    }

    // Mouse tracking
    const handleMouseMove = (event: MouseEvent) => {
      mouseReference.current = {
        x: event.clientX,
        y: event.clientY
      }
    }

    // Scroll tracking
    const handleScroll = () => {
      scrollReference.current = window.scrollY
    }

    // Animation loop with frame rate limiting
    const animate = (currentTime: number) => {
      // Frame rate limiting for consistent 60fps
      if (currentTime - lastFrameTime.current < frameInterval) {
        animationReference.current = requestAnimationFrame(animate)
        return
      }
      lastFrameTime.current = currentTime

      context.clearRect(0, 0, canvas.width, canvas.height)

      const mouseX = mouseReference.current.x
      const mouseY = mouseReference.current.y
      const scrollDelta = (scrollReference.current - lastScrollReference.current) * 0.01
      lastScrollReference.current = scrollReference.current
      
      for (let index = 0; index < particlesReference.current.length; index++) {
        const particle = particlesReference.current[index]
        // Update particle position
        particle.x += particle.vx
        particle.y += particle.vy
        
        // Optimized mouse interaction - attract particles to mouse
        const dx = mouseX - particle.x
        const dy = mouseY - particle.y
        const distanceSquared = dx * dx + dy * dy
        
        if (distanceSquared < 22_500) { // 150^2 to avoid sqrt calculation
          const distance = Math.sqrt(distanceSquared)
          const force = (150 - distance) / 150
          particle.vx += dx * force * 0.0001
          particle.vy += dy * force * 0.0001
        }

        // Add some randomness and very subtle scroll influence
        particle.vx += (Math.random() - 0.5) * 0.02
        particle.vy += (Math.random() - 0.5) * 0.02 + scrollDelta * 0.1

        // Boundary wrapping
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        // Velocity damping
        particle.vx *= 0.99
        particle.vy *= 0.99

        // Life cycle
        particle.life--
        if (particle.life <= 0) {
          particlesReference.current[index] = createParticle()
          continue
        }

        // Optimized particle rendering - reduce expensive effects
        const lifeRatio = particle.life / particle.maxLife
        const alpha = particle.alpha * lifeRatio
        
        context.save()
        context.globalAlpha = alpha
        context.fillStyle = particle.color
        context.beginPath()
        context.arc(particle.x, particle.y, particle.size * lifeRatio, 0, Math.PI * 2)
        context.fill()
        
        // Conditional glow effect - only for larger particles to reduce GPU load
        if (particle.size > 2) {
          context.shadowBlur = 6
          context.shadowColor = particle.color
          context.fill()
        }
        context.restore()
      }

      // Optimized connections - limit calculations and use distance squared
      const maxConnections = Math.min(particleCount * 2, 100) // Limit total connections
      let connectionCount = 0
      
      for (let index = 0; index < particlesReference.current.length && connectionCount < maxConnections; index++) {
        const particle = particlesReference.current[index]
        for (let index_ = index + 1; index_ < particlesReference.current.length && connectionCount < maxConnections; index_++) {
          const other = particlesReference.current[index_]
          const dx = particle.x - other.x
          const dy = particle.y - other.y
          const distanceSquared = dx * dx + dy * dy
          
          if (distanceSquared < 10_000) { // 100^2
            const distance = Math.sqrt(distanceSquared)
            const opacity = (100 - distance) / 100 * 0.08 // Reduced opacity for performance
            context.save()
            context.globalAlpha = opacity
            context.strokeStyle = isDark ? 'rgba(96, 165, 250, 0.25)' : 'rgba(59, 130, 246, 0.3)'
            context.lineWidth = 0.4
            context.beginPath()
            context.moveTo(particle.x, particle.y)
            context.lineTo(other.x, other.y)
            context.stroke()
            context.restore()
            connectionCount++
          }
        }
      }

      animationReference.current = requestAnimationFrame(animate)
    }

    // Event listeners
    globalThis.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', resizeCanvas)

    // Start animation
    initParticles()
    animationReference.current = requestAnimationFrame(animate)

    // Enhanced cleanup with React 19 improvements
    return () => {
      if (animationReference.current) {
        cancelAnimationFrame(animationReference.current)
        animationReference.current = 0
      }
      globalThis.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', resizeCanvas)
      
      // Clear particle references
      particlesReference.current = []
    }
  }, [particleCount, isDark, frameInterval])

  if (!isVisible) return

  return (
    <ParticleCanvas 
      ref={canvasReference} 
      className={className}
      aria-hidden="true"
      role="presentation"
      $isDark={isDark}
    />
  )
}
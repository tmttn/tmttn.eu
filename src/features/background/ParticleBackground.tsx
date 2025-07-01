import React, { useRef, useEffect, useState, useMemo } from 'react'
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

// Constants for particle behavior and rendering
const PARTICLE_CONSTANTS = {
  DEFAULT_PARTICLE_COUNT: 50,
  FRAME_RATE: 60,
  FRAME_INTERVAL: 1000 / 60,
  PARTICLE_MIN_LIFE: 300,
  PARTICLE_LIFE_VARIANCE: 200,
  VELOCITY_RANGE: 0.5,
  MIN_PARTICLE_SIZE: 1,
  PARTICLE_SIZE_VARIANCE: 3,
  MIN_ALPHA: 0.2,
  ALPHA_VARIANCE: 0.5,
  CONNECTION_DISTANCE_SQUARED: 10_000, // 100^2
  CONNECTION_OPACITY_BASE: 0.08,
  CONNECTION_LINE_WIDTH: 0.4,
  MAX_CONNECTIONS_MULTIPLIER: 2,
  MAX_TOTAL_CONNECTIONS: 100,
  PARTICLE_OPACITY: {
    DARK_BLUE: 0.8,
    DARK_HIGHLIGHT: 0.6,
    DARK_GREEN: 0.7,
    DARK_PINK: 0.5,
    LIGHT_BLUE: 0.6,
    LIGHT_BLUE_VARIANT: 0.5,
    LIGHT_GREEN: 0.6,
    LIGHT_PINK: 0.4,
  },
  CONNECTION_COLORS: {
    DARK: 'rgba(96, 165, 250, 0.25)',
    LIGHT: 'rgba(59, 130, 246, 0.3)',
  },
} as const

export default function ParticleBackground({ 
  particleCount = PARTICLE_CONSTANTS.DEFAULT_PARTICLE_COUNT, 
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
  const frameInterval = useMemo(() => PARTICLE_CONSTANTS.FRAME_INTERVAL, [])

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
      `rgba(96, 165, 250, ${PARTICLE_CONSTANTS.PARTICLE_OPACITY.DARK_BLUE})`, // primary blue
      `rgba(165, 180, 252, ${PARTICLE_CONSTANTS.PARTICLE_OPACITY.DARK_HIGHLIGHT})`, // primary highlight
      `rgba(52, 211, 153, ${PARTICLE_CONSTANTS.PARTICLE_OPACITY.DARK_GREEN})`,  // accent green
      `rgba(244, 114, 182, ${PARTICLE_CONSTANTS.PARTICLE_OPACITY.DARK_PINK})`, // secondary pink
    ] : [
      `rgba(59, 130, 246, ${PARTICLE_CONSTANTS.PARTICLE_OPACITY.LIGHT_BLUE})`,  // darker blue for light mode
      `rgba(29, 78, 216, ${PARTICLE_CONSTANTS.PARTICLE_OPACITY.LIGHT_BLUE_VARIANT})`,   // darker blue variant
      `rgba(5, 150, 105, ${PARTICLE_CONSTANTS.PARTICLE_OPACITY.LIGHT_GREEN})`,   // darker green
      `rgba(225, 29, 72, ${PARTICLE_CONSTANTS.PARTICLE_OPACITY.LIGHT_PINK})`,   // darker pink
    ]

    const createParticle = (): Particle => {
      const maxLife = PARTICLE_CONSTANTS.PARTICLE_MIN_LIFE + Math.random() * PARTICLE_CONSTANTS.PARTICLE_LIFE_VARIANCE
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * PARTICLE_CONSTANTS.VELOCITY_RANGE,
        vy: (Math.random() - 0.5) * PARTICLE_CONSTANTS.VELOCITY_RANGE,
        size: Math.random() * PARTICLE_CONSTANTS.PARTICLE_SIZE_VARIANCE + PARTICLE_CONSTANTS.MIN_PARTICLE_SIZE,
        color: particleColors[Math.floor(Math.random() * particleColors.length)],
        alpha: Math.random() * PARTICLE_CONSTANTS.ALPHA_VARIANCE + PARTICLE_CONSTANTS.MIN_ALPHA,
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
      const maxConnections = Math.min(particleCount * PARTICLE_CONSTANTS.MAX_CONNECTIONS_MULTIPLIER, PARTICLE_CONSTANTS.MAX_TOTAL_CONNECTIONS) // Limit total connections
      let connectionCount = 0
      
      for (let index = 0; index < particlesReference.current.length && connectionCount < maxConnections; index++) {
        const particle = particlesReference.current[index]
        for (let index_ = index + 1; index_ < particlesReference.current.length && connectionCount < maxConnections; index_++) {
          const other = particlesReference.current[index_]
          const dx = particle.x - other.x
          const dy = particle.y - other.y
          const distanceSquared = dx * dx + dy * dy
          
          if (distanceSquared < PARTICLE_CONSTANTS.CONNECTION_DISTANCE_SQUARED) { // 100^2
            const distance = Math.sqrt(distanceSquared)
            const opacity = (100 - distance) / 100 * PARTICLE_CONSTANTS.CONNECTION_OPACITY_BASE // Reduced opacity for performance
            context.save()
            context.globalAlpha = opacity
            context.strokeStyle = isDark ? PARTICLE_CONSTANTS.CONNECTION_COLORS.DARK : PARTICLE_CONSTANTS.CONNECTION_COLORS.LIGHT
            context.lineWidth = PARTICLE_CONSTANTS.CONNECTION_LINE_WIDTH
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
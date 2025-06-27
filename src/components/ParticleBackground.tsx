import React, { useRef, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useTheme } from '../contexts/ThemeContext'

const ParticleCanvas = styled.canvas<{ $isDark: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
  opacity: ${({ $isDark }) => $isDark ? 0.7 : 0.4};
  mix-blend-mode: ${({ $isDark }) => $isDark ? 'screen' : 'multiply'};
  
  @media (prefers-reduced-motion: reduce) {
    display: none;
  }
`

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

interface ParticleBackgroundProps {
  particleCount?: number
  className?: string
}

export default function ParticleBackground({ 
  particleCount = 50, 
  className 
}: ParticleBackgroundProps) {
  const { isDark } = useTheme()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | undefined>(undefined)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const scrollRef = useRef(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setIsVisible(false)
      return
    }

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

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
      particlesRef.current = []
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push(createParticle())
      }
    }

    // Mouse tracking
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current = {
        x: event.clientX,
        y: event.clientY
      }
    }

    // Scroll tracking
    const handleScroll = () => {
      scrollRef.current = window.scrollY
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const mouseX = mouseRef.current.x
      const mouseY = mouseRef.current.y + scrollRef.current
      
      particlesRef.current.forEach((particle, index) => {
        // Update particle position
        particle.x += particle.vx
        particle.y += particle.vy
        
        // Mouse interaction - attract particles to mouse
        const dx = mouseX - particle.x
        const dy = mouseY - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < 150) {
          const force = (150 - distance) / 150
          particle.vx += dx * force * 0.0001
          particle.vy += dy * force * 0.0001
        }

        // Add some randomness and scroll influence
        particle.vx += (Math.random() - 0.5) * 0.02
        particle.vy += (Math.random() - 0.5) * 0.02 + scrollRef.current * 0.0001

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
          particlesRef.current[index] = createParticle()
          return
        }

        // Draw particle
        const lifeRatio = particle.life / particle.maxLife
        const alpha = particle.alpha * lifeRatio
        
        ctx.save()
        ctx.globalAlpha = alpha
        ctx.fillStyle = particle.color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size * lifeRatio, 0, Math.PI * 2)
        ctx.fill()
        
        // Add glow effect
        ctx.shadowBlur = 10
        ctx.shadowColor = particle.color
        ctx.fill()
        ctx.restore()
      })

      // Draw connections between nearby particles
      particlesRef.current.forEach((particle, i) => {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const other = particlesRef.current[j]
          const dx = particle.x - other.x
          const dy = particle.y - other.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < 100) {
            const opacity = (100 - distance) / 100 * 0.1
            ctx.save()
            ctx.globalAlpha = opacity
            ctx.strokeStyle = isDark ? 'rgba(96, 165, 250, 0.3)' : 'rgba(59, 130, 246, 0.4)'
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(other.x, other.y)
            ctx.stroke()
            ctx.restore()
          }
        }
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    // Event listeners
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', resizeCanvas)

    // Start animation
    initParticles()
    animate()

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [particleCount, isDark])

  if (!isVisible) return null

  return (
    <ParticleCanvas 
      ref={canvasRef} 
      className={className}
      aria-hidden="true"
      role="presentation"
      $isDark={isDark}
    />
  )
}
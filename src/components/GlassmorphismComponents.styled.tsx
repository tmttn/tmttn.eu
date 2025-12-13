import styled from 'styled-components'

// Enhanced glassmorphism card with gradient border technique
export const GlassCard = styled.div<{ 
  $variant?: 'primary' | 'secondary' | 'accent' | 'neutral'
  $intensity?: 'light' | 'medium' | 'heavy'
}>`
  --border-width: 1px;
  position: relative;
  border-radius: 1rem;
  padding: 1.5rem;
  
  background: ${({ theme, $intensity = 'medium' }) => {
    const intensities = {
      light: theme.colors.glass.surface,
      medium: `rgba(${theme.isDark ? '255, 255, 255' : '0, 0, 0'}, ${theme.isDark ? '0.08' : '0.03'})`,
      heavy: `rgba(${theme.isDark ? '255, 255, 255' : '0, 0, 0'}, ${theme.isDark ? '0.12' : '0.05'})`
    }
    return intensities[$intensity]
  }};
  
  backdrop-filter: blur(12px) saturate(120%);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &::before {
    content: "";
    position: absolute;
    z-index: -1;
    inset: 0;
    border-radius: inherit;
    border: var(--border-width) solid transparent;
    background: ${({ theme, $variant = 'neutral' }) => {
      const variants = {
        primary: `linear-gradient(135deg, ${theme.colors.primary}40, ${theme.colors.primaryHighlight}40)`,
        secondary: `linear-gradient(135deg, ${theme.colors.secondary}40, ${theme.colors.accent}40)`,
        accent: `linear-gradient(135deg, ${theme.colors.accent}40, ${theme.colors.primary}40)`,
        neutral: `linear-gradient(135deg, ${theme.colors.glass.borderTop}, ${theme.colors.glass.borderBottom})`
      }
      return variants[$variant]
    }} border-box;
    mask: linear-gradient(black, black) border-box,
      linear-gradient(black, black) padding-box;
    mask-composite: subtract;
  }

  &:hover {
    background: ${({ theme, $intensity = 'medium' }) => {
      const intensities = {
        light: theme.colors.glass.surfaceHover,
        medium: `rgba(${theme.isDark ? '255, 255, 255' : '0, 0, 0'}, ${theme.isDark ? '0.12' : '0.05'})`,
        heavy: `rgba(${theme.isDark ? '255, 255, 255' : '0, 0, 0'}, ${theme.isDark ? '0.16' : '0.07'})`
      }
      return intensities[$intensity]
    }};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.isDark ? `
      0 8px 32px rgba(0, 0, 0, 0.15),
      0 0 0 1px rgba(255, 255, 255, 0.1);
    ` : `
      0 8px 32px rgba(0, 0, 0, 0.1),
      0 4px 16px rgba(0, 0, 0, 0.05),
      0 0 0 1px rgba(0, 0, 0, 0.05);
    `};
  }
`

// Glassmorphism navigation pill
export const GlassNavPill = styled.a<{ $active?: boolean }>`
  position: relative;
  display: block;
  padding: 0.75rem 1.25rem;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
  letter-spacing: -0.01em;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  
  color: ${({ theme, $active }) => 
    $active ? theme.colors.primary : theme.colors.textSecondary};
  
  background: ${({ theme }) => theme.colors.glass.surface};
  backdrop-filter: blur(10px) saturate(120%);
  border: 1px solid ${({ theme }) => theme.colors.glass.border};
  
  /* Enhanced shimmer effect */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, 
      transparent, 
      rgba(255, 255, 255, 0.15), 
      transparent);
    transition: left 0.5s ease;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.glass.surfaceHover};
    border-color: ${({ theme }) => theme.colors.glass.borderHover};
    transform: translateY(-2px);
    box-shadow: 
      0 8px 25px rgba(0, 0, 0, 0.15),
      0 0 0 1px rgba(255, 255, 255, 0.1);

    &::before {
      left: 100%;
    }
  }

  ${({ $active, theme }) => $active && `
    color: ${theme.colors.primary};
    background: ${theme.colors.glass.surfaceHover};
    border-color: ${theme.colors.primary};
    font-weight: 600;
    box-shadow: 
      0 4px 15px ${theme.colors.primary}33,
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
  `}
`

// Frosted glass panel with advanced effects
export const FrostedPanel = styled.div<{ 
  $blurIntensity?: number
  $borderGradient?: boolean
}>`
  --border-width: 1px;
  position: relative;
  background: ${({ theme }) => theme.colors.glass.surface};
  backdrop-filter: blur(${({ $blurIntensity = 12 }) => $blurIntensity}px) saturate(180%);
  border-radius: 16px;
  padding: 1.5rem;
  
  ${({ $borderGradient, theme }) => $borderGradient ? `
    &::before {
      content: "";
      position: absolute;
      z-index: -1;
      inset: 0;
      border-radius: inherit;
      border: var(--border-width) solid transparent;
      background: linear-gradient(135deg, 
        ${theme.colors.glass.borderTop}, 
        ${theme.colors.glass.borderBottom}) border-box;
      mask: linear-gradient(black, black) border-box,
        linear-gradient(black, black) padding-box;
      mask-composite: subtract;
    }
  ` : `
    border: 1px solid ${theme.colors.glass.border};
  `}
  
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
`

// Glassmorphism button
export const GlassButton = styled.button<{ 
  $variant?: 'primary' | 'secondary' | 'ghost'
  $size?: 'sm' | 'md' | 'lg'
}>`
  position: relative;
  border: none;
  border-radius: 12px;
  font-weight: 500;
  letter-spacing: -0.01em;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  overflow: hidden;
  
  ${({ $size = 'md' }) => {
    const sizes = {
      sm: 'padding: 0.5rem 1rem; font-size: 0.875rem;',
      md: 'padding: 0.75rem 1.5rem; font-size: 0.9rem;',
      lg: 'padding: 1rem 2rem; font-size: 1rem;'
    }
    return sizes[$size]
  }}
  
  ${({ theme, $variant = 'primary' }) => {
    const variants = {
      primary: `
        color: ${theme.colors.text};
        background: ${theme.colors.glass.surface};
        border: 1px solid ${theme.colors.primary};
        box-shadow: 0 0 20px ${theme.colors.primary}33;
      `,
      secondary: `
        color: ${theme.colors.text};
        background: ${theme.colors.glass.surface};
        border: 1px solid ${theme.colors.secondary};
        box-shadow: 0 0 20px ${theme.colors.secondary}33;
      `,
      ghost: `
        color: ${theme.colors.textSecondary};
        background: ${theme.colors.glass.surface};
        border: 1px solid ${theme.colors.glass.border};
      `
    }
    return variants[$variant]
  }}
  
  backdrop-filter: blur(10px) saturate(120%);
  
  /* Enhanced shimmer effect */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, 
      transparent, 
      rgba(255, 255, 255, 0.2), 
      transparent);
    transition: left 0.5s ease;
  }

  &:hover {
    transform: translateY(-2px);
    background: ${({ theme }) => theme.colors.glass.surfaceHover};
    
    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(0);
  }
`

// Glassmorphism modal/dialog
export const GlassModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
  
  background: ${({ theme }) => theme.colors.glass.surface};
  backdrop-filter: blur(20px) saturate(180%);
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.colors.glass.border};
  
  box-shadow: 
    0 25px 50px rgba(0, 0, 0, 0.25),
    0 0 0 1px rgba(255, 255, 255, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
    
  animation: modalSlideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  @keyframes modalSlideIn {
    from {
      opacity: 0;
      transform: translate(-50%, -45%) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
  }
`
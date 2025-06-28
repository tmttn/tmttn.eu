# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Generate sitemap and build for production (static export)
- `npm run build:analyze` - Build with bundle analyzer
- `npm run start` - Start production server
- `npm run lint` - Run Next.js linter
- `npm run format` - Format code with Prettier
- `npm run type-check` - TypeScript type checking without emit

## Project Architecture

This is a **Next.js 15** personal portfolio website configured for **static export** to Netlify. The site features:

### Core Architecture
- **Framework**: Next.js 15 with TypeScript
- **Styling**: Styled-components with theme system
- **Deployment**: Static export to Netlify (`output: 'export'`)
- **Bundling**: Turbopack for development, custom webpack optimizations for production

### Theme System
- Dual theme support (dark/light) with system preference detection
- Theme context in `src/contexts/ThemeContext.tsx`
- Theme definitions in `src/styles/theme.ts` 
- Glassmorphism design system with theme-aware colors
- User preference persistence in localStorage

### Key Components
- **ParticleBackground**: Interactive canvas animation with mouse tracking and scroll effects
- **GitHubHeatmap**: Displays GitHub activity using GitHub API
- **ThemeToggle/EnhancedThemeToggle**: Theme switching with animations
- **StyledComponents**: Main layout and section components with theme integration
- **SEOHead**: Structured data and meta tags
- **PageTransition**: Page transition animations

### Services & Utilities
- **GitHub Service** (`src/services/github.ts`): Fetches public repositories from GitHub API
- **FontAwesome** setup in `src/utils/fontawesome.js`
- **Structured Data** utilities for SEO

### File Structure Patterns
- `/pages/` - Next.js pages (index.tsx, _app.tsx, _document.tsx, 404.tsx)
- `/src/components/` - Reusable React components
- `/src/contexts/` - React contexts (ThemeContext)
- `/src/styles/` - Theme and global styles
- `/src/services/` - External API services
- `/src/utils/` - Utility functions
- `/public/static/` - Static assets (images, logos)

### Build Configuration
- Static export configured in `next.config.js`
- Bundle splitting optimization for vendor/common chunks
- Bundle analyzer support with `ANALYZE=true`
- Styled-components compiler enabled
- Image optimization disabled for static export compatibility

### Development Notes
- Uses `@/*` path alias for src directory imports
- Accessibility features implemented (skip navigation, ARIA labels, semantic HTML)
- Performance optimizations (lazy loading, chunk splitting, image optimization)
- SEO optimized with structured data and canonical URLs

## Git Commit Guidelines

Use **Conventional Commits** with fun, cool emojis for commit messages:

### Format
```
<emoji> <type>: <description>

[optional body]

[optional footer]
```

### Types & Emojis
- ✨ `feat:` - New features or functionality
- 🐛 `fix:` - Bug fixes
- 🎨 `style:` - UI/styling changes or code formatting
- ♻️ `refactor:` - Code refactoring without feature changes
- ⚡ `perf:` - Performance improvements
- 🧪 `test:` - Adding or updating tests
- 📝 `docs:` - Documentation updates
- 🔧 `chore:` - Build process, dependencies, or tooling
- 🚀 `deploy:` - Deployment-related changes
- 🌟 `enhance:` - Enhancements to existing features

### Contextual Emojis
Use emojis thematic to the context of the change:
- 🌙 Dark mode features
- 🌞 Light mode features  
- 🎭 Theme system changes
- 🎨 Styling and visual improvements
- 🎯 Particle system or animations
- 📊 GitHub integration or data display
- 🔗 Navigation or routing
- 📱 Responsive design
- ♿ Accessibility improvements
- 🏗️ Build system or infrastructure

### Examples
- `✨ feat: add GitHub activity heatmap component`
- `🐛 fix: prevent particles from falling during scroll`
- `🌞 style: improve light mode contrast for better accessibility`
- `⚡ perf: optimize bundle size with code splitting`
- `🔧 chore: update dependencies to latest versions`
- `🎭 feat: add theme persistence with localStorage`
- `📊 enhance: improve GitHub API data visualization`
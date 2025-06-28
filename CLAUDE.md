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

## Available CLI Tools

Claude has access to the following CLI tools for development and deployment:

- **GitHub CLI (`gh`)** - For GitHub operations (issues, PRs, releases, repository management)
- **Netlify CLI (`netlify`)** - For Netlify deployments, functions, and site management

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
- **Barrel Files & Path Aliases**: Project uses barrel files with path aliases for clean imports
- Accessibility features implemented (skip navigation, ARIA labels, semantic HTML)
- Performance optimizations (lazy loading, chunk splitting, image optimization)
- SEO optimized with structured data and canonical URLs

## Import System & Barrel Files

This project uses **barrel files** and **path aliases** for clean, maintainable imports.

### Available Import Paths

Use these path aliases instead of relative imports:

- **`@components`** - All components including styled components
- **`@features`** - All features (layout, navigation, portfolio, seo, theme, transitions, background)
- **`@services`** - GitHub API service and other services
- **`@styles`** - Themes, global styles, and style utilities
- **`@utils`** - Utility functions (structured data, etc.)
- **`@contexts`** - React contexts (theme context, etc.)

### Import Examples

```typescript
// ✅ Correct - Use barrel imports with path aliases
import { Layout, Portfolio, SEOHead } from '@features'
import { ClientOnlyIcon, ThemeToggle } from '@components'
import { useTheme, ThemeProvider } from '@contexts'
import { GitHubService } from '@services'
import { darkTheme, lightTheme, GlobalStyle } from '@styles'
import { personStructuredData } from '@utils'

// ❌ Avoid - Don't use relative paths
import Layout from '../src/features/layout'
import ClientOnlyIcon from '../../components/ClientOnlyIcon'
import { useTheme } from '../contexts/ThemeContext'
```

### Configuration Details

**TypeScript paths** (`tsconfig.json`):
- Path mappings are configured for TypeScript IntelliSense and type checking

**Turbopack aliases** (`next.config.js`):
- Development server uses Turbopack with `resolveAlias` configuration
- **IMPORTANT**: Path aliases are configured in `turbopack.resolveAlias`, NOT in webpack config
- This prevents "Webpack is configured while Turbopack is not" warnings

**Webpack config** (`next.config.js`):
- Only used for production bundle analysis when `ANALYZE=true`
- Path aliases are handled by TypeScript + Turbopack, not webpack

### Barrel File Structure

Each directory has an `index.ts` barrel file that re-exports components:

```
src/
├── components/index.ts      # Exports all components
├── features/index.ts        # Exports all features
├── services/index.ts        # Exports all services
├── styles/index.ts          # Exports themes and styles
├── utils/index.ts           # Exports utilities
└── contexts/index.ts        # Exports contexts
```

### Adding New Components

When adding new components/features:

1. Create the component file
2. Add export to the appropriate barrel file (`index.ts`)
3. Import using the path alias (`@components`, `@features`, etc.)

### Troubleshooting

- **"Webpack configured while Turbopack is not" warning**: Ensure path aliases are in `turbopack.resolveAlias`, not webpack config
- **Import not found**: Check if the component is exported in the barrel file
- **TypeScript errors**: Verify paths in `tsconfig.json` match directory structure

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
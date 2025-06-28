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

### Testing Commands

- `npm test` - Run Jest unit tests
- `npm run test:watch` - Run Jest tests in watch mode
- `npm run test:coverage` - Run Jest tests with coverage report
- `cypress:open` - Open Cypress interactive test runner
- `cypress:run` - Run Cypress tests headlessly
- `e2e` - Run full E2E test suite (starts dev server + runs Cypress)
- `e2e:chrome` - Run E2E tests in Chrome browser
- `e2e:ci` - Run E2E tests for CI/CD (starts production server)

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

```text
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

```text
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

### IMPORTANT: Commit Message Rules

- **NEVER** add auto-generated signatures like "🤖 Generated with [Claude Code]" or "Co-Authored-By: Claude"
- Keep commit messages clean and professional without AI-generated footers
- Focus on the actual changes and their purpose, not the tool used to make them

## Security Vulnerability Management

**ALWAYS** address security vulnerabilities when detected. Follow this process:

### Automated Security Checks

1. **Run `npm audit`** regularly to check for vulnerabilities
2. **Check GitHub Dependabot alerts** in the repository security tab
3. **Address security issues immediately** - they take priority over other tasks

### Vulnerability Resolution Process

1. **Identify affected packages**: Use `npm audit` and GitHub Dependabot alerts
2. **Update dependencies**: Try `npm update` first for direct dependencies
3. **Use npm overrides**: For transitive dependencies that can't be directly updated:

   ```json
   "overrides": {
     "vulnerable-package": "^secure-version"
   }
   ```

4. **Clean install**: `rm package-lock.json && npm install` to ensure fresh resolution
5. **Verify fixes**: Run `npm audit` to confirm 0 vulnerabilities
6. **Test thoroughly**: Ensure `npm run build` and `npm run lint` still pass

### Security Best Practices

- **Never ignore security warnings** - always investigate and fix
- **Update dependencies regularly** using `npx npm-check-updates -u`
- **Use compatible versions** that work with the current Node.js/TypeScript setup
- **Prefer latest stable versions** unless compatibility issues arise
- **Document security fixes** clearly in commit messages with 🔒 emoji

### Priority Order

1. **High severity vulnerabilities** - Fix immediately
2. **Medium severity vulnerabilities** - Fix within 24 hours  
3. **Low severity vulnerabilities** - Fix within a week
4. **Update other dependencies** - During regular maintenance

**Security is non-negotiable** - always maintain a clean `npm audit` status.

## Testing Architecture

This project uses a comprehensive testing strategy with both unit tests and end-to-end tests.

### Unit Testing (Jest)

- **Framework**: Jest with React Testing Library
- **Coverage**: 96.52% coverage with 80% minimum threshold enforced
- **Location**: `__tests__/` directory with mirrored src structure
- **Mock Strategy**: Styled-components mocked to avoid React DOM warnings
- **Key Features**:
  - Component rendering and interaction tests
  - Theme context and accessibility testing
  - Service layer and utility function testing
  - Performance and error boundary testing

### End-to-End Testing (Cypress + Cucumber)

- **Framework**: Cypress 14.5+ with Cucumber/Gherkin integration
- **BDD Approach**: Feature files written in Gherkin syntax for non-technical stakeholders
- **Browser Support**: Chrome (primary), with cross-browser capability
- **Test Categories**:
  - **Core Functionality**: Navigation, theme toggle, component rendering
  - **Responsive Design**: Mobile, tablet, desktop viewport testing
  - **Accessibility**: Keyboard navigation, screen reader compatibility, ARIA support
  - **Performance**: Page load times, asset optimization, smooth animations

### Gherkin Feature Files

Located in `cypress/e2e/`, organized by concern:

- `portfolio-website.feature` - Core website functionality
- `responsive-design.feature` - Multi-device compatibility
- `accessibility.feature` - WCAG compliance and usability
- `performance.feature` - Speed and optimization validation

### Step Definitions

Located in `cypress/e2e/step_definitions/`:

- `common.ts` - Shared steps across features
- `portfolio-website.ts` - Core functionality steps
- `responsive-design.ts` - Responsive behavior steps
- `accessibility.ts` - Accessibility testing steps
- `performance.ts` - Performance measurement steps

### Custom Cypress Commands

- **Navigation**: `visitHomePage()`, `scrollToSection()`, `checkNavigation()`
- **Theme Testing**: `toggleTheme()`, `assertTheme()`
- **Responsive**: `setViewport()`, `checkResponsiveLayout()`
- **Accessibility**: `checkA11y()`, `checkSkipNavigation()`
- **Performance**: `measurePageLoad()`, `checkGitHubIntegration()`

### CI/CD Integration

E2E tests run in the CI pipeline:

- **Trigger**: On pull requests and main branch pushes
- **Parallelization**: Runs after build step, parallel to unit tests
- **Browser**: Chrome headless in CI environment
- **Artifacts**: Screenshots on failure, videos, and Cucumber reports
- **Server**: Starts production build for realistic testing conditions

### Test Data Management

- **Test IDs**: Strategic `data-testid` attributes for reliable element selection
- **Mock Data**: GitHub API responses mocked for consistent testing
- **Environment**: Separate test configuration with controlled variables

### Best Practices

- **Gherkin Writing**: Focus on user behavior, not implementation details
- **Step Reusability**: Common steps shared across multiple scenarios
- **Test Isolation**: Each scenario independent with proper setup/teardown
- **Reporting**: Cucumber HTML/JSON reports for stakeholder communication
- **Accessibility First**: Every feature includes accessibility validation

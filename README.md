# Personal Portfolio — Next.js 15 + Netlify

[![Netlify Status](https://api.netlify.com/api/v1/badges/be69a204-608b-4d68-9882-2eee8c608e24/deploy-status)](https://app.netlify.com/sites/tmttnbe/deploys)

This is a modern, high-performance personal portfolio website built with **Next.js 15** and **TypeScript**, designed for **static export** and deployment to **Netlify**. It features a dual-theme glassmorphism design, interactive animations, GitHub integration, and a clean, maintainable codebase with robust developer tooling.

---

## 🚀 Quick Start

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start development server**

   ```bash
   npm run dev
   ```

3. **Build for production (static export)**

   ```bash
   npm run build
   ```

4. **Preview static build locally**

   ```bash
   npm run start
   ```

---

## 🛠️ Development Commands

- `npm run dev` — Start dev server (Turbopack)
- `npm run build` — Static export for production (includes sitemap)
- `npm run build:analyze` — Analyze bundle size
- `npm run start` — Start production server
- `npm run lint` — Run Next.js linter
- `npm run format` — Format code with Prettier
- `npm run type-check` — TypeScript type-check (no emit)

---

## 🏗️ Project Architecture

- **Framework:** Next.js 15 (App Router) + TypeScript
- **Styling:** Styled-components with custom theme system
- **Deployment:** Static export (`output: 'export'`) for Netlify
- **Bundling:** Turbopack (dev), custom webpack optimizations (prod)

### Main Features

- **Dual Theme:** Light/Dark, auto-detects system preference, persists user choice
- **Glassmorphism:** Modern, soft UI effects, theme-aware colors
- **Interactive Animations:** Particle background, page transitions
- **GitHub Integration:** Activity heatmap via GitHub API
- **SEO:** Structured data, canonical URLs, meta/OG tags
- **Accessibility:** ARIA labels, skip navigation, semantic HTML
- **Performance:** Lazy loading, chunk splitting, static image assets

---

## 🗂️ Source Structure

```text
/pages/                # Next.js pages (index, _app, _document, 404, etc.)
/src/
  components/          # Reusable React components
  features/            # Feature modules (layout, portfolio, navigation, etc.)
  contexts/            # React contexts (ThemeContext, etc.)
  styles/              # Themes, global styles, style helpers
  services/            # API clients (GitHub, etc.)
  utils/               # Helpers (structured data, FontAwesome setup, etc.)
/public/static/        # Static images and assets
```

---

## 📦 Clean Imports & Barrel Files

This project uses **barrel files** and **path aliases** for cleaner imports and easier refactoring.

### Import Path Aliases

- `@components` — All components
- `@features` — Feature modules (layout, portfolio, etc.)
- `@services` — API clients
- `@styles` — Themes and styles
- `@utils` — Utilities
- `@contexts` — React contexts

**Example:**

```typescript
import { Layout, Portfolio } from '@features'
import { ThemeToggle } from '@components'
import { useTheme } from '@contexts'
```

> **Avoid**: Relative imports like `../../components/ThemeToggle`

### How Barrel Files Work

Each directory contains an `index.ts` that re-exports everything inside. Always add new exports there!

**Adding a new component:**  

1. Create your component in `/src/components/`
2. Export it via `/src/components/index.ts`
3. Import it using `@components/MyComponent`

---

## ⚙️ Build & Configuration

- **Static export:** Set in `next.config.js`
- **Bundle splitting:** Optimized for vendor/common chunks
- **Bundle analyzer:** Enabled with `ANALYZE=true`
- **Styled-components:** Compiler enabled
- **Image optimization:** Disabled for static export compatibility
- **Aliases:**  
  - TypeScript: See `tsconfig.json`
  - Turbopack: See `next.config.js` (`turbopack.resolveAlias`)
  - _Do not_ configure aliases in webpack (for dev)

**Troubleshooting:**

- "Webpack configured while Turbopack is not": Move aliases to `turbopack.resolveAlias`
- "Import not found": Ensure exported from the correct barrel file
- TypeScript errors: Check `tsconfig.json` paths and directory structure

---

## 🌈 Key Components & Features

- **ParticleBackground:** Canvas animation, mouse/scroll effects
- **GitHubHeatmap:** GitHub commit activity visualization
- **ThemeToggle:** Switches themes, animated
- **SEOHead:** Meta and structured data
- **PageTransition:** Animated route changes
- **FontAwesome:** Icon setup in `@utils/fontawesome.js`

---

## 🔒 Security Best Practices

- **Run `npm audit` regularly** to catch vulnerabilities
- **Address Dependabot alerts** in GitHub
- **Never ignore security warnings**; fix ASAP
- Use npm `overrides` for transitive dependency fixes:

  ```json
  "overrides": {
    "vulnerable-package": "^safe-version"
  }
  ```

- After updates:  
  - `rm package-lock.json && npm install`
  - `npm audit` until 0 vulnerabilities
  - Test with `npm run build` and `npm run lint`
- **Commit security fixes** with the 🔒 emoji

**Priorities:**

1. High severity — Fix immediately
2. Medium — Within 24h
3. Low — Within a week

---

## 📝 Git Commit Conventions

Use **Conventional Commits** with themed emojis:

| Type       | Emoji | Use For                             |
|------------|-------|-------------------------------------|
| feat       | ✨     | New features                        |
| fix        | 🐛     | Bug fixes                           |
| style      | 🎨     | UI/design/formatting                |
| refactor   | ♻️     | Code refactoring                    |
| perf       | ⚡     | Performance improvements            |
| test       | 🧪     | Adding/updating tests               |
| docs       | 📝     | Documentation                       |
| chore      | 🔧     | Tooling, dependencies, build        |
| deploy     | 🚀     | Deployment                         |
| enhance    | 🌟     | Improvements to existing features   |

**Contextual emojis:**  

- 🌙 dark mode, 🌞 light mode, 🎭 theme, 🎯 animation, 📊 GitHub features, 🔗 navigation, 📱 responsive, ♿ accessibility, 🏗️ infra, 🔒 security

**Commit message format:**

```text
<emoji> <type>: <short description>

[optional body]

[optional footer]
```

**Examples:**

- `✨ feat: add GitHub activity heatmap component`
- `🐛 fix: prevent particles from falling during scroll`
- `🎭 feat: add theme persistence with localStorage`
- `🔒 fix: update lodash to patch critical vulnerability`

> **Never** include AI-generated signatures or footers. Keep commit messages clear and focused on the changes.

---

## 🧑‍💻 CLI Tools

- **GitHub CLI:** Issue/PR/release management (`gh`)
- **Netlify CLI:** Deploy, manage functions/sites (`netlify`)

---

## 💡 Contributing & Maintenance

- Use path aliases and barrel files for all imports
- Prefer functional, accessible, and theme-aware components
- Regularly update dependencies and fix all security issues (see above)
- Document new features and update SEO/structured data as needed

---

## 📢 Feedback & Issues

Found a bug or have a suggestion?  
Open an issue or PR — contributions are welcome!

---

**Enjoy building and customizing your portfolio!**

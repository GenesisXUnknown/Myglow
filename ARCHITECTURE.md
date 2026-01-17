# ARCHITECTURE.md - GlowMatch System Architecture

**Version:** 1.0
**Last Updated:** 2026-01-17
**Status:** Production-Ready

---

## TABLE OF CONTENTS

1. [Overview](#overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Layer Architecture](#layer-architecture)
5. [Naming Conventions](#naming-conventions)
6. [Coding Standards](#coding-standards)
7. [State Management](#state-management)
8. [Routing & Navigation](#routing--navigation)
9. [Component Patterns](#component-patterns)
10. [Testing Strategy](#testing-strategy)
11. [Security](#security)
12. [Performance](#performance)
13. [Deployment](#deployment)
14. [Future Roadmap](#future-roadmap)

---

## OVERVIEW

**GlowMatch** is an AI-powered makeup color matching application built on seasonal color analysis principles. The app analyzes user selfies to determine their seasonal color type and provides personalized makeup recommendations.

### Core Functionality
- Seasonal color analysis (12 distinct color palettes)
- AI-powered image processing for color determination
- Virtual makeup try-on with freemium model
- Personalized makeup recommendations
- User profile with saved looks
- Premium subscription flow

### Architecture Philosophy
- **Single Page Application (SPA)** - React Router manages navigation
- **Component-Driven Development** - Reusable UI components
- **Unidirectional Data Flow** - Zustand for predictable state
- **Mobile-First Design** - Responsive Tailwind CSS
- **Progressive Enhancement** - Core features work without premium

---

## TECH STACK

### Core Framework
```
React: 18.3.1          # UI library
Vite: 5.4.21           # Build tool & dev server
```

### Styling & Animation
```
Tailwind CSS: 3.4.1    # Utility-first CSS
PostCSS: 8.4.35        # CSS processing
Autoprefixer: 10.4.17  # CSS vendor prefixes
Framer Motion: 11.0.8  # Animation library
```

### State & Routing
```
Zustand: 4.4.7         # State management
React Router: 6.21.3   # Client-side routing
```

### Development Tools
```
ESLint: 8.56.0         # Code linting
@vitejs/plugin-react   # React Fast Refresh
```

### Browser APIs Used
- Canvas API (color extraction)
- FileReader API (image upload)
- LocalStorage (state persistence via Zustand)

---

## PROJECT STRUCTURE

```
glowmatch/
├── public/                    # Static assets
│   └── vite.svg              # Vite logo (placeholder)
│
├── src/
│   ├── components/            # Reusable UI components
│   │   ├── UI.jsx            # Component library (Button, Card, etc.)
│   │   └── BottomNav.jsx     # Navigation component
│   │
│   ├── screens/               # Page-level components (routes)
│   │   ├── HomeScreen.jsx
│   │   ├── AnalyzeScreen.jsx
│   │   ├── ResultsScreen.jsx
│   │   ├── TryOnScreen.jsx
│   │   ├── LooksScreen.jsx
│   │   ├── ProfileScreen.jsx
│   │   └── PremiumScreen.jsx
│   │
│   ├── utils/                 # Utility functions
│   │   └── colorAnalysis.js  # Image processing & analysis
│   │
│   ├── store.js               # Global state management (Zustand)
│   ├── App.jsx                # Root component & routing
│   ├── main.jsx               # React entry point
│   └── index.css              # Global styles & Tailwind
│
├── index.html                 # HTML entry point
├── package.json               # Dependencies & scripts
├── vite.config.js             # Vite configuration
├── tailwind.config.js         # Tailwind theme & customization
├── postcss.config.js          # PostCSS plugins
├── vercel.json                # Deployment configuration
├── .gitignore                 # Git ignore rules
├── README.md                  # User documentation
├── CLAUDE.md                  # AI assistant guide
└── ARCHITECTURE.md            # This file
```

### Directory Conventions

**`/components/`** - Reusable, composable UI components
- Pure presentation logic
- Accept props, no direct state access
- Named exports for multiple components per file
- Styled with Tailwind classes

**`/screens/`** - Route-level page components
- One screen per route
- Connect to global state (Zustand)
- Handle business logic
- Default exports
- Named with "Screen" suffix

**`/utils/`** - Pure functions and helpers
- No side effects (where possible)
- Well-documented with JSDoc
- Named exports
- Fully typed parameters and returns

**`/public/`** - Static assets served as-is
- Images, fonts, icons
- Accessible via root URL

---

## LAYER ARCHITECTURE

### 1. PRESENTATION LAYER
**Location:** `/src/components/`, `/src/screens/`

**Responsibilities:**
- Render UI based on props and state
- Handle user interactions
- Delegate business logic to utils or state

**Rules:**
- Components must be pure (same props = same output)
- No direct API calls in components
- Use Tailwind for styling (no inline styles unless dynamic)
- Prefer composition over inheritance

**Example Structure:**
```jsx
// Component pattern
export const Button = ({ variant, onClick, children, ...props }) => {
  // 1. Derive styles from props
  const classes = getButtonClasses(variant)

  // 2. Render with motion wrapper
  return (
    <motion.button className={classes} onClick={onClick} {...props}>
      {children}
    </motion.button>
  )
}

// Screen pattern
const HomeScreen = () => {
  // 1. Get state
  const { currentSeason } = useStore()

  // 2. Derive data
  const hasAnalyzed = !!currentSeason

  // 3. Render
  return (
    <Container>
      {/* UI elements */}
    </Container>
  )
}
```

### 2. STATE MANAGEMENT LAYER
**Location:** `/src/store.js`

**Responsibilities:**
- Centralized application state
- State mutations (actions)
- Persistence (via Zustand middleware)
- Derived state (selectors)

**Rules:**
- All state updates go through actions
- No direct state mutation
- Persist user data (season, photos, saved looks, premium status)
- Actions are synchronous (async handled in components/utils)

**State Shape:**
```javascript
{
  // User state
  currentSeason: string | null,
  userPhoto: string | null,
  savedLooks: Array<Look>,

  // Freemium state
  tryOnCount: number,
  isPremium: boolean,
  maxFreeTryOns: number,

  // Actions
  setCurrentSeason: (id) => void,
  setUserPhoto: (photo) => void,
  incrementTryOnCount: () => number,
  canTryOn: () => boolean,
  getRemainingTryOns: () => number,
  upgradeToPremium: () => void,
  saveLook: (look) => void,
  deleteLook: (id) => void,
  getCurrentSeasonData: () => SeasonData | null,
  getAllSeasons: () => SeasonData[],
  getSeasonById: (id) => SeasonData
}
```

### 3. UTILITY LAYER
**Location:** `/src/utils/`

**Responsibilities:**
- Pure business logic
- Image processing
- Color analysis algorithms
- Data transformations

**Rules:**
- No side effects (except DOM manipulation for canvas)
- Well-documented with JSDoc
- Error handling with try/catch
- Return Promises for async operations

**Example:**
```javascript
/**
 * Analyze image and determine seasonal color type
 * @param {string} imageUrl - URL of uploaded image
 * @returns {Promise<AnalysisResult>}
 * @throws {Error} If analysis fails
 */
export const analyzeImage = (imageUrl) => {
  return new Promise((resolve, reject) => {
    // Implementation
  })
}
```

### 4. DATA LAYER
**Location:** `/src/store.js` (embedded)

**Responsibilities:**
- Seasonal color palette data (12 seasons)
- Makeup product data (lips, eyes, cheeks, etc.)
- Celebrity examples
- Color recommendations

**Rules:**
- Immutable data structures
- Typed with JSDoc or TypeScript (future)
- Comprehensive and production-ready

---

## NAMING CONVENTIONS

### Files
```
Components:     PascalCase.jsx      (Button.jsx, ColorSwatch.jsx)
Screens:        PascalCase.jsx      (HomeScreen.jsx, TryOnScreen.jsx)
Utilities:      camelCase.js        (colorAnalysis.js, imageProcessor.js)
Config:         kebab-case.js       (vite.config.js, tailwind.config.js)
Styles:         kebab-case.css      (index.css, app.css)
```

### Code
```
Components:     PascalCase          (Button, Card, Modal)
Functions:      camelCase           (analyzeImage, extractColors)
Constants:      SCREAMING_SNAKE     (MAX_FILE_SIZE, API_ENDPOINT)
Variables:      camelCase           (userData, currentSeason)
CSS Classes:    kebab-case          (btn-primary, gradient-text)
```

### React Conventions
```
Props:          camelCase           (onClick, isActive, variant)
State:          camelCase           (selectedColor, isLoading)
Hooks:          use* prefix         (useStore, useNavigate)
Event Handlers: handle* prefix      (handleClick, handleSubmit)
Boolean Props:  is/has/can prefix   (isActive, hasError, canSubmit)
```

---

## CODING STANDARDS

### 1. COMPONENT STRUCTURE

**Order of elements in a component:**
```jsx
import statements
↓
Constants/Types
↓
Main component function
  ↓ Hooks (state, effects, custom)
  ↓ Derived state/variables
  ↓ Event handlers
  ↓ Render helpers
  ↓ Return JSX
↓
Helper functions (outside component)
↓
Export
```

**Example:**
```jsx
import { useState } from 'react'
import useStore from '../store'

const ITEMS_PER_PAGE = 12

const LooksScreen = () => {
  // 1. Hooks
  const { getCurrentSeasonData } = useStore()
  const [selectedCategory, setSelectedCategory] = useState('everyday')

  // 2. Derived state
  const seasonData = getCurrentSeasonData()
  const looks = getLooksByCategory(seasonData, selectedCategory)

  // 3. Event handlers
  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
  }

  // 4. JSX
  return (
    <Container>
      {/* render */}
    </Container>
  )
}

// 5. Helpers outside component
const getLooksByCategory = (data, category) => {
  // logic
}

export default LooksScreen
```

### 2. PROPS & PROP DESTRUCTURING

**Always destructure props:**
```jsx
// ✅ Good
export const Button = ({ variant, onClick, children, className = '' }) => {
  // ...
}

// ❌ Bad
export const Button = (props) => {
  return <button onClick={props.onClick}>{props.children}</button>
}
```

**Use default parameters:**
```jsx
export const Card = ({
  children,
  className = '',
  glass = false,
  onClick
}) => {
  // ...
}
```

### 3. CONDITIONAL RENDERING

**Prefer early returns for loading/error states:**
```jsx
const ResultsScreen = () => {
  const seasonData = getCurrentSeasonData()

  // Early return for no data
  if (!seasonData) {
    return <NoDataState />
  }

  // Main render
  return <Results data={seasonData} />
}
```

**Use ternary for inline conditionals:**
```jsx
{isLoading ? <Spinner /> : <Content />}
```

**Use && for single conditionals:**
```jsx
{error && <ErrorMessage message={error} />}
```

### 4. STYLING PATTERNS

**Component-specific styles:**
```jsx
// Use Tailwind classes
<button className="px-6 py-3 rounded-full bg-gradient-to-r from-primary-500 to-primary-600">
  Click me
</button>

// Extract complex classes to variables
const baseClasses = "font-semibold px-6 py-3 rounded-full"
const variantClasses = variant === 'primary'
  ? "bg-gradient-to-r from-primary-500 to-primary-600"
  : "border-2 border-primary-400"

<button className={`${baseClasses} ${variantClasses}`}>
  Click me
</button>
```

**Global utility classes (index.css):**
```css
@layer components {
  .gradient-text {
    @apply bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent;
  }
}
```

### 5. ERROR HANDLING

**In async functions:**
```javascript
export const analyzeImage = (imageUrl) => {
  return new Promise((resolve, reject) => {
    try {
      // Analysis logic
      resolve(result)
    } catch (error) {
      reject(new Error('Failed to analyze image: ' + error.message))
    }
  })
}
```

**In components:**
```jsx
const AnalyzeScreen = () => {
  const [error, setError] = useState(null)

  const handleAnalyze = async () => {
    try {
      const result = await analyzeImage(photo)
      // Success
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {/* ... */}
    </>
  )
}
```

### 6. DOCUMENTATION

**Component documentation:**
```jsx
/**
 * ColorSwatch Component
 * Displays a circular color preview with optional name label
 *
 * @param {string} color - Hex color code
 * @param {string} name - Color name to display
 * @param {boolean} selected - Whether swatch is selected
 * @param {Function} onClick - Click handler
 * @param {string} size - Size variant: 'sm' | 'md' | 'lg'
 */
export const ColorSwatch = ({ color, name, selected, onClick, size = 'md' }) => {
  // ...
}
```

**Function documentation:**
```javascript
/**
 * Determine if undertone is warm or cool based on color analysis
 * @param {Array<{r: number, g: number, b: number}>} colors - Array of RGB colors
 * @returns {'warm' | 'cool'} Undertone classification
 */
export const determineUndertone = (colors) => {
  // ...
}
```

---

## STATE MANAGEMENT

### Zustand Store Pattern

**Store Structure:**
```javascript
const useStore = create(
  persist(
    (set, get) => ({
      // STATE
      currentSeason: null,

      // ACTIONS
      setCurrentSeason: (seasonId) => set({ currentSeason: seasonId }),

      // COMPUTED/SELECTORS
      getCurrentSeasonData: () => {
        const seasonId = get().currentSeason
        return seasonId ? seasonalData[seasonId] : null
      },
    }),
    {
      name: 'glowmatch-storage', // localStorage key
    }
  )
)
```

### Using the Store

**In components:**
```jsx
import useStore from '../store'

const MyComponent = () => {
  // Select only what you need
  const { currentSeason, setCurrentSeason } = useStore()

  // Or use selectors
  const seasonData = useStore(state => state.getCurrentSeasonData())

  return <div>{seasonData?.name}</div>
}
```

### Persistence Strategy

**What to persist:**
- ✅ User preferences (currentSeason, userPhoto)
- ✅ Saved looks
- ✅ Premium status (for demo - in production use backend)
- ✅ Try-on count

**What NOT to persist:**
- ❌ Temporary UI state (loading, errors)
- ❌ Derived data (can be recomputed)

---

## ROUTING & NAVIGATION

### Route Structure

```javascript
// App.jsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<HomeScreen />} />
    <Route path="/analyze" element={<AnalyzeScreen />} />
    <Route path="/results" element={<ResultsScreen />} />
    <Route path="/try-on" element={<TryOnScreen />} />
    <Route path="/looks" element={<LooksScreen />} />
    <Route path="/profile" element={<ProfileScreen />} />
    <Route path="/premium" element={<PremiumScreen />} />
  </Routes>
  <BottomNav />
</BrowserRouter>
```

### Navigation Patterns

**Programmatic navigation:**
```jsx
import { useNavigate } from 'react-router-dom'

const MyComponent = () => {
  const navigate = useNavigate()

  const handleSuccess = () => {
    navigate('/results')
  }
}
```

**Link-based navigation:**
```jsx
import { Link } from 'react-router-dom'

<Link to="/analyze">Analyze Now</Link>
```

### Route Guards

**Check state before rendering:**
```jsx
const ResultsScreen = () => {
  const seasonData = getCurrentSeasonData()
  const navigate = useNavigate()

  if (!seasonData) {
    return (
      <EmptyState
        title="No analysis yet"
        action={<Button onClick={() => navigate('/analyze')}>Analyze Now</Button>}
      />
    )
  }

  return <Results data={seasonData} />
}
```

---

## COMPONENT PATTERNS

### 1. CONTAINER PATTERN

**Container handles logic, presentation component renders:**
```jsx
// Presentation component
export const ColorPalette = ({ colors, onColorSelect }) => (
  <div className="grid grid-cols-4 gap-4">
    {colors.map(color => (
      <ColorSwatch
        key={color.hex}
        {...color}
        onClick={() => onColorSelect(color)}
      />
    ))}
  </div>
)

// Container component (screen)
const TryOnScreen = () => {
  const seasonData = getCurrentSeasonData()
  const [selected, setSelected] = useState(null)

  const handleColorSelect = (color) => {
    if (canTryOn()) {
      setSelected(color)
      incrementTryOnCount()
    }
  }

  return <ColorPalette colors={seasonData.makeup.lips} onColorSelect={handleColorSelect} />
}
```

### 2. COMPOUND COMPONENTS

**For complex UI with multiple related parts:**
```jsx
export const Modal = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null

  return (
    <motion.div className="modal-overlay" onClick={onClose}>
      <motion.div className="modal-content" onClick={e => e.stopPropagation()}>
        {title && <div className="modal-header">{title}</div>}
        <div className="modal-body">{children}</div>
      </motion.div>
    </motion.div>
  )
}
```

### 3. RENDER PROPS (SPARINGLY)

**Only when sharing complex stateful logic:**
```jsx
const withLoading = (Component) => (props) => {
  const [loading, setLoading] = useState(false)

  return <Component {...props} loading={loading} setLoading={setLoading} />
}
```

---

## TESTING STRATEGY

### Testing Pyramid

```
       /\
      /E2E\       (Few - Critical user flows)
     /------\
    /  INT   \    (Some - Component integration)
   /----------\
  /    UNIT    \  (Most - Utils, functions)
 /--------------\
```

### Test Organization

```
tests/
├── unit/
│   ├── utils/
│   │   └── colorAnalysis.test.js
│   └── components/
│       └── UI.test.jsx
├── integration/
│   └── screens/
│       └── AnalyzeScreen.test.jsx
└── e2e/
    └── user-flows.test.js
```

### Testing Frameworks

**Recommended Stack:**
```json
{
  "vitest": "^1.0.0",           // Unit testing
  "@testing-library/react": "^14.0.0",  // React testing
  "@testing-library/jest-dom": "^6.0.0", // DOM matchers
  "@testing-library/user-event": "^14.0.0", // User interactions
  "playwright": "^1.40.0"       // E2E testing (future)
}
```

### Test Patterns

**Unit test (utility):**
```javascript
// tests/unit/utils/colorAnalysis.test.js
import { describe, it, expect } from 'vitest'
import { rgbToHsl, determineUndertone } from '@/utils/colorAnalysis'

describe('colorAnalysis', () => {
  describe('rgbToHsl', () => {
    it('converts pure red correctly', () => {
      const result = rgbToHsl(255, 0, 0)
      expect(result.h).toBe(0)
      expect(result.s).toBe(100)
      expect(result.l).toBe(50)
    })
  })
})
```

**Component test:**
```javascript
// tests/unit/components/Button.test.jsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '@/components/UI'

describe('Button', () => {
  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click me</Button>)

    await userEvent.click(screen.getByText('Click me'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

**Integration test (screen):**
```javascript
// tests/integration/screens/AnalyzeScreen.test.jsx
import { render, screen, waitFor } from '@testing-library/react'
import { AnalyzeScreen } from '@/screens/AnalyzeScreen'

describe('AnalyzeScreen', () => {
  it('analyzes uploaded image and navigates to results', async () => {
    // Test full flow
  })
})
```

### Coverage Goals

```
Statements   : 80%
Branches     : 75%
Functions    : 80%
Lines        : 80%
```

**Critical paths requiring 100% coverage:**
- Color analysis algorithms
- Freemium logic (try-on counting)
- State management actions

---

## SECURITY

### 1. INPUT VALIDATION

**Image uploads:**
```javascript
const validateImage = (file) => {
  // Size check
  const MAX_SIZE = 5 * 1024 * 1024 // 5MB
  if (file.size > MAX_SIZE) {
    throw new Error('File too large')
  }

  // Type check
  const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error('Invalid file type')
  }

  return true
}
```

### 2. XSS PREVENTION

**React automatically escapes:**
```jsx
// Safe - React escapes by default
<div>{userInput}</div>

// NEVER use dangerouslySetInnerHTML with user input
// ❌ DANGEROUS
<div dangerouslySetInnerHTML={{ __html: userInput }} />
```

### 3. SECRETS MANAGEMENT

**Environment variables (future backend):**
```javascript
// ❌ NEVER
const API_KEY = 'hardcoded-key-12345'

// ✅ ALWAYS
const API_KEY = import.meta.env.VITE_API_KEY
```

### 4. CONTENT SECURITY POLICY

**Vercel deployment (vercel.json):**
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        }
      ]
    }
  ]
}
```

---

## PERFORMANCE

### 1. CODE SPLITTING

**Route-based splitting (already implemented):**
```javascript
// Vite automatically code-splits routes
const HomeScreen = lazy(() => import('./screens/HomeScreen'))
```

### 2. IMAGE OPTIMIZATION

**Canvas processing:**
```javascript
// Downsample large images before analysis
const downsampleImage = (img, maxWidth = 800) => {
  const canvas = document.createElement('canvas')
  const scale = Math.min(1, maxWidth / img.width)
  canvas.width = img.width * scale
  canvas.height = img.height * scale

  const ctx = canvas.getContext('2d')
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

  return canvas
}
```

### 3. MEMOIZATION

**React.memo for expensive components:**
```jsx
import { memo } from 'react'

export const ColorSwatch = memo(({ color, name, onClick }) => {
  // Component logic
})
```

**useMemo for expensive calculations:**
```jsx
const filteredColors = useMemo(() => {
  return colors.filter(c => c.finish === selectedFinish)
}, [colors, selectedFinish])
```

### 4. BUNDLE SIZE

**Current targets:**
```
Initial bundle: < 150kb (gzipped)
Lazy chunks:    < 50kb each
```

**Monitor with:**
```bash
npm run build -- --mode analyze
```

---

## DEPLOYMENT

### Vercel Configuration

**vercel.json:**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### Build Process

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm run preview      # Preview production build
```

### Environment Variables

**Current (none required for frontend-only app)**

**Future (with backend):**
```env
VITE_API_URL=https://api.glowmatch.app
VITE_STRIPE_PUBLIC_KEY=pk_live_xxx
VITE_ANALYTICS_ID=GA-xxx
```

### CI/CD (Future)

**GitHub Actions workflow:**
```yaml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run build
      - run: npm test
      - uses: amondnet/vercel-action@v20
```

---

## FUTURE ROADMAP

### Phase 2: Backend Integration
**Priority: HIGH**

- [ ] Add Node.js/Express backend
- [ ] PostgreSQL database for user data
- [ ] JWT authentication
- [ ] Stripe payment integration
- [ ] Product recommendation API
- [ ] User-uploaded photos storage (S3)

**Architecture Impact:**
```
NEW: /backend/
├── src/
│   ├── api/          # Express routes
│   ├── models/       # Database models
│   ├── services/     # Business logic
│   └── middleware/   # Auth, validation
└── tests/
```

### Phase 3: Advanced Features
**Priority: MEDIUM**

- [ ] AI model training for better color analysis
- [ ] Social features (share looks, follow users)
- [ ] In-app product purchases (affiliate links)
- [ ] AR try-on (WebGL/Three.js)
- [ ] Professional consultation booking

### Phase 4: Mobile Apps
**Priority: LOW**

- [ ] React Native app
- [ ] Native camera integration
- [ ] Push notifications

### Technical Debt

**Current known issues:**
```javascript
// TODO: Replace client-side color analysis with ML model
// Current: Canvas-based color extraction (limited accuracy)
// Future: TensorFlow.js or backend ML API
// File: src/utils/colorAnalysis.js

// TODO: Add comprehensive error boundary
// Current: Local error handling
// Future: Global error boundary with logging
// File: src/App.jsx

// TODO: Implement proper image upload validation
// Current: Basic file type check
// Future: Image format validation, malware scan
// File: src/screens/AnalyzeScreen.jsx
```

---

## BREAKING CHANGES LOG

### Version 1.0.0 (Current)
- Initial architecture
- No breaking changes

---

## APPENDIX

### A. Color Season Data Schema

```typescript
interface SeasonData {
  id: string
  name: string
  season: 'Spring' | 'Summer' | 'Autumn' | 'Winter'
  undertone: 'warm' | 'cool'
  description: string
  characteristics: string[]
  bestColors: string[]      // Hex codes
  avoidColors: string[]     // Hex codes
  makeup: {
    lips: MakeupItem[]
    eyes: MakeupItem[]
    cheeks: MakeupItem[]
    highlights: MakeupItem[]
    bronzer: MakeupItem[]
    brows: MakeupItem[]
  }
  celebrities: string[]
}

interface MakeupItem {
  name: string
  hex: string
  finish: 'matte' | 'satin' | 'glossy' | 'shimmer' | 'metallic' | 'cream' | 'powder' | 'liquid'
}
```

### B. Component API Reference

See `src/components/UI.jsx` for full component documentation.

### C. Useful Commands

```bash
# Development
npm run dev                    # Start dev server
npm run build                  # Production build
npm run preview                # Preview build

# Code Quality
npm run lint                   # Run ESLint (TODO: configure)
npm run format                 # Run Prettier (TODO: configure)
npm test                       # Run tests (TODO: configure)

# Deployment
vercel                         # Deploy to Vercel
vercel --prod                  # Deploy to production
```

---

**Document Maintainer:** Lead Architect
**Review Frequency:** Every major feature addition
**Last Reviewed:** 2026-01-17

---

## CONTRIBUTING TO THIS DOCUMENT

When updating this architecture:

1. **Update version number** at top
2. **Add breaking changes** to log
3. **Update roadmap** as features complete
4. **Document new patterns** immediately
5. **Get review** before merging architectural changes

**This document is the source of truth for GlowMatch's architecture.**

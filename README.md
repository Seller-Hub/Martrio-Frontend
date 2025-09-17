# Martrio Frontend

A lightweight **Next.js 15** (App Router) app with **React 19**, **Tailwind CSS v4**, and **Radix UI**.  
Deployed on **Vercel**. Tests use **Jest + React Testing Library** (80/20 setup).

---

## Tech Stack
- **Next.js 15** (Turbopack)
- **React 19**
- **Tailwind CSS v4**
- **Radix UI** primitives
- **Jest + Testing Library** (unit/component)
- **Vercel** (hosting)

---

## Requirements
- **Node.js 20.x**
- **npm** (lockfile managed via `package-lock.json`)

---

## Getting Started

```bash
# Install dependencies
npm install

# Run dev server
npm run dev   # http://localhost:3000

# Build for production
npm run build

# Start production server
npm start
```

---

## Scripts

```jsonc
{
  "dev": "next dev --turbopack",
  "build": "next build --turbopack",
  "start": "next start",

  "typecheck": "tsc -p tsconfig.json --noEmit",
  "lint": "next lint",
  "test": "jest",
  "test:watch": "jest --watch",
  "ci": "npm run typecheck && npm run lint && npm run test && npm run build"
}
```

---

## Project Structure (key paths)

```
src/
  app/
    register/
      page.tsx                      // role selection (wrapped in <Suspense>)
    (auth)/
      register/[role]/
        basic/page.tsx              // basic info (uses <Suspense>)
        business/page.tsx           // business info (uses <Suspense>)
  components/
    ui/                             // Card, Button, Input, etc.
```

> **Note:** Any component calling `useSearchParams()` must be inside a `<Suspense>` boundary (Next.js App Router rule).

---

## Testing (80/20)

- Config files: `jest.config.mjs`, `jest.setup.ts`
- Example test: `src/__tests__/smoke.test.tsx`

Run tests:
```bash
npm run test
npm run test:watch
```

Mock Next hooks in tests when needed:
```ts
// example
jest.mock("next/navigation", () => ({
  ...jest.requireActual("next/navigation"),
  useRouter: () => ({ push: jest.fn() }),
  useSearchParams: () => new URLSearchParams(""),
}));
```

---

## Environment Variables
None required yet. When adding APIs:

- Client-exposed: `NEXT_PUBLIC_API_BASE`
- Server-only: `API_SECRET` (never read server secrets in client code)

Vercel helpers:
```bash
vercel env add
vercel env pull .env.local
```

---

## Deployment (Vercel)

**CLI (current setup):**
```bash
# Preview
vercel --scope mandira10s-projects

# Production
vercel --prod --scope mandira10s-projects
```

If this folder links to the wrong project:
```bash
rm -rf .vercel
vercel link --scope mandira10s-projects
# ? Link to existing project -> No
# ? Project name -> martrio-frontend
```

**Recommended later (Git-based):**
- Connect the repo in Vercel dashboard.
- Set **Production Branch** = `main`.
- Push to `main` → auto production deploy.
- Every PR → auto preview deploy.

---

## Troubleshooting

- **`useSearchParams() should be wrapped in a suspense boundary`**  
  Wrap the component that calls it in `<Suspense fallback={null}>…</Suspense>`.

- **ESLint `react/no-unescaped-entities`**  
  Escape apostrophes: `Let&apos;s` or wrap string in `{""}`.

- **TypeScript `no-explicit-any`**  
  Use concrete types (e.g., `Record<string, string>`) or `unknown` + narrow.

- **Turbopack root warning**  
  Remove stray lockfiles outside the repo (e.g., `C:\Users\<you>\package-lock.json`) or set `turbopack.root` in `next.config`.

- **Windows/PowerShell npm line breaks**  
  Don’t use trailing `\` for multi-line commands. Use a backtick `` ` `` or a single line.

---

## Contributing

- Small, focused PRs.
- Run checks locally before pushing:
```bash
npm run typecheck && npm run lint && npm run test && npm run build
```

---

## License
MIT © Martrio

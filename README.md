# Martrio

# Martrio Frontend – Tech Stack & High‑Level Architecture

A short reference for **what we’re using on the client side and how the pieces fit together**. Ideal for new contributors or for system‑design overviews.

---

## 1. Tech Stack

| Layer             | Choice                                            | Rationale                                            |
| ----------------- | ------------------------------------------------- | ---------------------------------------------------- |
| Runtime           | **React 18 (CRA TypeScript template)**            | Standard‑issue SPA; fast onboarding                  |
| Routing           | **React Router DOM v6**                           | Nested, param‑friendly routes (`/store/:sellerId/*`) |
| State mgmt & Data | **React Query** (future) + **Axios**              | Declarative fetch + cache when we wire APIs          |
| Styling           | **TailwindCSS** (planned)                         | Utility classes keep CSS concise                     |
| Forms             | **React Hook Form + Zod** (planned)               | Type‑safe, accessible form handling                  |
| Realtime          | **Socket.IO client** (future)                     | Delegate / customer chat                             |
| Testing           | **Jest + React Testing Library** (bundled in CRA) | Unit & integration tests                             |

> **Keep it lean:** we’ll add libraries only when a feature demands them.

---

## 2. Frontend Folder Structure (proposed)

```
src/
  index.tsx         # entry – wraps <App /> with BrowserRouter
  App.tsx           # route switch
  pages/            # top‑level routes (Home, Storefront, Dashboard)
  components/       # shared presentational components
  hooks/            # custom React hooks (useAuth, useChat…)
  services/         # API & socket helpers (axios instance, auth)
  styles/           # Tailwind config & global styles
```

*Rule of thumb:* **pages render components and call hooks; hooks call services.**

---

## 3. High‑Level Data Flow

```
Browser ↔ Axios/React‑Query  —— HTTP  ——>  Backend REST API (Node + Express)
Browser ↔ Socket.IO client   —— WS   ——>  Realtime Gateway (chat, live metrics)
```

1. **Auth**: CRA stores JWT in `localStorage`; Axios attaches it via interceptor.
2. **Routing**: `/store/:sellerId/*` loads Storefront page which fetches product list.
3. **Chat** (future): Storefront hooks open a Socket.IO channel `seller/{id}` for region and DM rooms.

---
# SellerHub Frontend — Next.js (App Router)

A concise reference to the SellerHub client and how it fits the platform: sellers connect their existing stores (e.g., Shopify/WooCommerce) and assign regional admins who promote via unique referral links with optional region-specific pricing, while checkout remains on the seller’s own site. 


---

## 1) Tech Stack

| Layer                | Choice                                              | Why |
|---------------------|-----------------------------------------------------|-----|
| Framework           | **Next.js (App Router, TypeScript)**                | File-based routing, Server Components/Actions, top DX |
| UI & Design System  | **shadcn/ui** + **Tailwind CSS v4**                 | Accessible primitives, consistent styling, fast build |
| Styling             | Tailwind utilities + small CSS vars                 | Speed + themeability |
| Forms & Validation  | **React Hook Form** + **Zod**                       | Type-safe, accessible forms |
| Data Fetching       | Native `fetch` / **Server Actions**; **TanStack Query (opt.)** | Start lean; add cache when needed |
| HTTP Client         | Native `fetch` (Axios optional per service)         | Fewer deps; standards-based |
| Auth                | TBD (NextAuth.js **or** backend-issued JWT)         | Pluggable |
| Testing             | **Vitest** + **React Testing Library**; **Playwright** (e2e) | Unit/integration/e2e |
| Icons               | **lucide-react**                                    | Clean icon set |

> Philosophy: **Start minimal**; add libraries only when a feature truly needs them.

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## 1) Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

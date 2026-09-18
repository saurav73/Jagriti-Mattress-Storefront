# Jagriti Mattress

Jagriti Mattress is a calm, editorial storefront for discovering premium mattresses and bedding made for the way Nepal rests.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/jagriti-mattress/src/App.tsx` — single-page storefront, product catalog data, cart drawer, checkout request flow, contact form, and order lookup.
- `artifacts/jagriti-mattress/src/index.css` — Jagriti brand tokens, responsive layout, art-directed mattress illustration, motion, and accessibility behavior.
- `lib/api-spec/openapi.yaml` — shared API contract; currently retains the workspace health endpoint while commerce services are staged for a later pass.

## Architecture decisions

- The first release is presentation-first so shoppers can experience the brand and primary purchase path without payment credentials or a commerce provider.
- Product imagery is art-directed in CSS to keep the initial storefront lightweight and consistent with the supplied brand brief.
- Cart state is persisted in the browser so an in-progress bag survives refreshes.

## Product

- Editorial homepage with Jagriti’s Nepal-specific positioning and brand story.
- Four mattress tiers with Nepalese rupee starting prices and quick add-to-bag actions.
- Responsive shopping bag drawer with quantity controls and a COD-first request-a-call checkout.
- Contact/consultation form and order-number lookup surface.

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details

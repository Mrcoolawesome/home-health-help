# GitHub Copilot Instructions

## Product Overview
This application is a **consumer-focused hospice comparison platform** that empowers patients and their families to make informed decisions about hospice care. The platform directly addresses the root cause of hospice referral challenges by providing transparent, comprehensive comparisons of hospice providers using official Medicare data.

### Core Features
- **Hospice provider comparison**: Side-by-side comparisons of hospice providers with quality metrics, ratings, and services
- **CMS data integration**: Real-time data from CMS.gov's open-source Medicare database via their Web API
- **Search and filtering**: Geographic search (by location, county, zip code) with advanced filtering options
- **Quality metrics**: Display of key performance indicators including patient satisfaction, care quality, and compliance ratings
- **User-friendly interface**: Simplified presentation of complex Medicare data for non-technical users
- **Decision support**: Tools to help families evaluate which hospice best meets their specific needs

### Target Audience
The platform serves patients' families and caregivers as a **B2C product**, providing a better alternative to the complex Medicare.gov hospice comparison tools. Users can directly research and compare hospice options without needing physician referrals or intermediaries.

### Value Proposition
By making Medicare's hospice data more accessible and easier to compare, this platform solves the fundamental problem in hospice referrals: information asymmetry. Families gain the knowledge needed to make confident, informed choices about hospice care.

## Technical Overview
This is a Next.js 15 + Supabase starter kit using App Router, TypeScript, Tailwind CSS, and shadcn/ui components. The project implements cookie-based authentication that works across the entire Next.js stack (Client/Server Components, Route Handlers, Server Actions, and Middleware).

### CMS API 
We'll be getting all our data via the CMS api. Here is a link to the list of all 8 datasets we can pull from: https://data.cms.gov/provider-data/topics/hospice-care. A description on how to use their api's are listed in the api tabs of each of the datasets. 

## Architecture & Patterns

### Supabase Client Creation
- **Browser client**: Use `createClient()` from `@/lib/supabase/client` in Client Components
- **Server client**: Use `createClient()` from `@/lib/supabase/server` in Server Components, Route Handlers, and Server Actions
- **Critical**: Never put server clients in global variables - always create new instances per function call (important for Fluid compute)
- **Duplicate patterns**: Both `lib/supabase/server.ts` and `utils/supabase/server.ts` exist with different env var names (`PUBLISHABLE_OR_ANON_KEY` vs `PUBLISHABLE_KEY`)

### Authentication Flow
- **Middleware**: `middleware.ts` delegates to `lib/supabase/middleware.ts` which handles session refresh and route protection
- **Protected routes**: Middleware redirects unauthenticated users to `/auth/login` (except `/`, `/login`, `/auth/*`)
- **User detection**: Use `supabase.auth.getClaims()` (faster) instead of `getUser()` when possible
- **Client-side auth**: Forms in `/components/*-form.tsx` use client-side Supabase for auth actions

### Component Patterns
- **Server auth**: `AuthButton` is an async Server Component that checks user status
- **Form handling**: Auth forms use client-side state management with `useState` and `useRouter`
- **Styling**: Uses `cn()` utility from `@/lib/utils` combining clsx + tailwind-merge
- **UI components**: shadcn/ui components in `@/components/ui/` with "new-york" style

### Route Structure
- **Public routes**: `/`, `/auth/*` (login, sign-up, forgot-password, etc.)
- **API routes**: `/auth/confirm/route.ts` for email verification handling

## Development Workflow

### Environment Setup
```bash
# Development with Turbopack
npm run dev

# Environment variables required
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
```

### Key Commands
- `npm run dev` - Start with Turbopack for faster HMR
- `npm run build` - Production build
- `npm run lint` - ESLint with Next.js config

### Component Creation
- Use shadcn/ui components from `@/components/ui/`
- Import paths use `@/*` alias for root directory
- Server Components for auth checks, Client Components for forms/interactions

## Critical Implementation Details

### Supabase Session Management
- **Mandatory**: Always call `supabase.auth.getClaims()` in middleware after client creation
- **Cookie handling**: Middleware must return the original `supabaseResponse` object unchanged
- **Error handling**: Server-side `setAll()` cookies may throw in Server Components (can be ignored with middleware)

### Environment Variables
- **Development check**: `hasEnvVars` utility skips auth checks when env vars missing
- **Inconsistent naming**: Watch for `PUBLISHABLE_OR_ANON_KEY` vs `PUBLISHABLE_KEY` across different client files

### Route Protection
- **Middleware config**: Excludes static files, images, and Next.js internals
- **Auth redirects**: Unauthenticated users redirected to `/auth/login` with original URL in `next` param
- **Layout separation**: `/protected/*` uses dedicated layout with navigation and auth button

## Common Gotchas
- Don't create server Supabase clients in global scope
- Middleware session refresh is critical for SSR - don't remove `getClaims()`
- Environment variable naming inconsistency between client files
- Server Components can't use client-side auth methods
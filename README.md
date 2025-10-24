<h1 align="center">Hospice Comparison Platform</h1>

<p align="center">
 A consumer-focused platform empowering families to find and compare hospice providers using Medicare data
</p>

<p align="center">
  <a href="#overview"><strong>Overview</strong></a> ·
  <a href="#features"><strong>Features</strong></a> ·
  <a href="#getting-started"><strong>Getting Started</strong></a> ·
  <a href="#development-workflow"><strong>Development</strong></a> ·
  <a href="#database-management"><strong>Database</strong></a>
</p>
<br/>

## Overview

This application is a consumer-focused hospice comparison platform that empowers patients and their families to make informed decisions about hospice care. The platform addresses the information asymmetry in hospice referrals by presenting transparent, comprehensive comparisons of hospice providers using official Medicare (CMS) data.

## Core Features

- Hospice provider comparisons: Side-by-side comparisons of hospice providers with quality metrics, ratings, and services.
- CMS data integration: Real-time use of CMS.gov Medicare hospice datasets via their public APIs.
- Search & filtering: Geographic search (by location, county, zip code) and advanced filters to narrow providers by services and performance.
- Quality metrics: Clear display of key performance indicators such as patient satisfaction, care quality, and compliance ratings drawn from Medicare data.
- User-friendly interface: Simplified presentation of complex Medicare data for non-technical users using shadcn/ui + Tailwind.
- Decision support: Tools and guidance to help families evaluate and choose the hospice that best meets their needs.

## Target Audience

The platform is designed for patients, families, and caregivers (B2C), offering an accessible alternative to the complex Medicare.gov hospice comparison tools. It enables direct research and comparison of hospice options without needing intermediaries.

## Value Proposition

By surfacing Medicare hospice data in a clear, comparable format, the platform gives families the information needed to make confident, informed decisions about hospice care.

## Technical Features

- Next.js 15 with App Router
- TypeScript and Tailwind CSS
- Supabase for authentication, database, and real-time features
- shadcn/ui components with "new-york" style
- Cookie-based authentication working across Server/Client Components, Route Handlers, Server Actions, and Middleware
- Integration points to CMS APIs for hospice datasets

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase CLI (`npm install -g @supabase/cli`)

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Mrcoolawesome/home-health-help.git
   cd home-health-help
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start Supabase locally**
   ```bash
   npx supabase start
   ```
   This will start all Supabase services including:
   - Database (PostgreSQL)
   - Auth server
   - API server 
   - Studio (GUI) at http://127.0.0.1:54323
   - Email testing (inbucket) at http://127.0.0.1:54324

4. **Set up environment variables**
   After `supabase start` completes, it will output the local connection details. Create a `.env.local` file:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=[ANON_KEY_FROM_SUPABASE_START_OUTPUT]
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```
   The application will be available at [http://localhost:3000](http://localhost:3000)

### Database Schema
The application uses two main tables:
- `users_doctors` - Doctor profiles with specializations and referral status
- `users_hh` - Home health provider profiles with company information

## Development Workflow

### Key Commands
```bash
# Development with Turbopack (faster HMR)
npm run dev

# Build for production
npm run build

# Lint code
npm run lint

# Start Supabase services
npx supabase start

# Stop Supabase services  
npx supabase stop

# Reset database (warning: deletes all data)
npx supabase db reset
```

### Working with Authentication
- Email confirmations are **disabled** for local development
- Test emails are captured by inbucket at http://127.0.0.1:54324
- Users can sign up as either doctors or home health providers
- Authentication uses cookie-based sessions that work across Server/Client Components

## Database Management

### Creating Migrations
When you make schema changes via Supabase Studio GUI, capture them as migrations:

```bash
# Generate migration from current database state
npx supabase db diff -f my_migration_name

# Apply migrations to local database
npx supabase db reset

# Push migrations to remote (production)
npx supabase db push
```

### Migration Workflow
1. Make schema changes in Supabase Studio (http://127.0.0.1:54323)
2. Generate migration: `npx supababase db diff -f descriptive_name`
3. Review the generated SQL in `supabase/migrations/`
4. Apply changes: `npx supabase db reset`
5. Commit migration files to version control

### Database Tables
- **users_doctors**: Doctor profiles linked to `auth.users`
- **users_hh**: Home health provider profiles linked to `auth.users`
- Both tables have Row Level Security (RLS) enabled
- Users can only modify their own profiles
- Cross-user visibility enabled for search functionality

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── auth/              # Authentication pages
│   ├── protected/         # Protected routes with navigation
│   └── page.tsx           # Landing page
├── components/            # React components
│   ├── signup-forms/      # Role-specific signup forms
│   └── ui/               # shadcn/ui components
├── lib/                  # Utilities and Supabase clients
│   └── supabase/         # Supabase client configurations
└── supabase/             # Supabase configuration and migrations
    ├── migrations/       # Database schema changes
    └── config.toml       # Local development configuration
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally with `npm run dev`
5. Create a pull request

For database changes, always include migration files generated with `npx supabase db diff -f migration_name`.

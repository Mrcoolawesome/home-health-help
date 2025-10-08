<h1 align="center">Physician-Hospice Referral Network</h1>

<p align="center">
 A platform connecting physicians with hospice home health providers to streamline hospice referrals
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

This application is a **physician-hospice referral network platform** that connects physicians with hospice home health providers to facilitate easier access to hospice care for patients. The platform serves two main user types:

### User Perspectives

**Home Health Provider View**: Search-focused interface with filters for county and medical profession to discover physicians accepting hospice referrals.

**Physician/Doctor View**: Dashboard interface for profile management, allowing doctors to update their referral status (e.g., "looking to partner with home health") and maintain their professional information.

### Key Features
- **Physician Profiles**: Doctors can create accounts, specify medical specialties, and indicate interest in hospice referrals
- **Provider Network**: Hospice providers can showcase services and search for physician partners
- **Contact Coordination**: Physicians include links to contact information for external communication (avoiding HIPAA compliance requirements)
- **Role-based Access**: Different interfaces optimized for each user type

## Technical Features

- **Next.js 15** with App Router for modern React development
- **Supabase** for authentication, database, and real-time features
- **TypeScript** for type safety and better developer experience
- **Tailwind CSS** for responsive styling
- **shadcn/ui** components with "new-york" style
- **Cookie-based authentication** that works across the entire Next.js stack
- **Row Level Security (RLS)** for secure data access
- **Local development** with Supabase CLI and email testing

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

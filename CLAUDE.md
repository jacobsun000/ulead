# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the Ulead Education website - a Next.js 14 application for an educational consulting company that helps international students apply to US schools and universities. The site includes both public pages and an admin panel for content management.

**Localization Structure:**
- English site (default): Routes under `app/(en)/` (accessible at `/`)
- Chinese site: Routes under `app/zh/` (accessible at `/zh`)
- Separate layouts and metadata for each locale
- Chinese site is currently under development with placeholder content

## Development Commands

- **Development server**: `pnpm run dev` (or use `run.sh` script)
- **Build**: `pnpm run build` 
- **Production server**: `pnpm run start`
- **Lint**: `pnpm run lint`

The project uses pnpm as the package manager (evidenced by pnpm-lock.yaml).

## Architecture & Key Technologies

### Core Stack
- **Next.js 14** with App Router
- **React 18** with Server Components
- **Tailwind CSS** for styling
- **Vercel Postgres** (@vercel/postgres) for database
- **Vercel Blob** (@vercel/blob) for file storage
- **NextAuth** for authentication (admin panel)
- **JWT** (jose library) for session management

### Database Integration
- Uses Vercel Postgres with direct SQL queries via `sql` template literals
- Database tables include: `team_members`, `alumni`, `success_story`, `university`, `high_school`, `other_school`
- All database operations are performed server-side in React Server Components or API routes

### Authentication & Security
- JWT-based authentication with middleware protection
- Admin routes (`/admin/*` and `/api/admin/*`) require authentication
- JWT verification handled in `middleware.js` using jose library
- Secure cookie-based session management

## File Structure & Patterns

### App Router Structure
- **`app/(en)/`** - English site pages (default locale)
- **`app/zh/`** - Chinese site pages
- **`app/api/`** - API routes for CRUD operations
- **`app/admin/`** - Protected admin panel pages (locale-independent)
- **`ui/en/`** - English UI components
- **`ui/zh/`** - Chinese UI components (to be developed)
- **`public/img/`** - Static images organized by page/section
- **`data/`** - CSV data files

### Component Patterns
- Server Components for data fetching (using `await sql`)
- Client Components marked with `'use client'` for interactivity
- Reusable UI components in `/ui` directory
- Image optimization with Next.js `Image` component

### API Route Patterns
- Standard REST patterns (GET, POST, PUT, DELETE)
- Consistent response format: `{ success: boolean, data?: any, message?: string }`
- Error handling with appropriate HTTP status codes
- Admin API routes require authentication

### Database Query Patterns
- Server-side data fetching in page components
- Direct SQL queries using Vercel Postgres `sql` template literals
- Example: `const { rows } = await sql\`SELECT * FROM team_members ORDER BY order_index ASC\`;`

## Key Features & Business Logic

### Content Management
- **Team Members**: Admin can manage team member profiles with ordering
- **Alumni**: Showcase of successful students with school logos
- **Success Stories**: Student testimonials for high school and university
- **School Data**: University, high school, and junior high school information
- **Offers**: School admission offers and matriculation data

### File Upload System
- Image uploads handled via Vercel Blob storage
- Remote image patterns configured in `next.config.mjs`
- Upload API at `/api/admin/image-upload`

### Responsive Design
- Mobile-first approach with Tailwind CSS
- Slider components for mobile, grid layouts for desktop
- Responsive navigation with mobile hamburger menu

## Development Notes

### Styling Approach
- Custom Tailwind configuration with theme colors (`primary`, `secondary`, `primaryLight`)
- Custom fonts: Geist Sans and Geist Mono loaded locally
- Component-level styling with Tailwind classes

### State Management
- Minimal client-side state using React hooks
- Server state managed through database queries
- No external state management library used

### Security Considerations
- Environment variables stored in `.env.local`
- JWT secrets and database credentials kept secure
- Admin routes protected by middleware
- Input validation in API routes

## Localization Implementation

### Route Structure
- **English (default)**: `yourdomain.com/` → `app/(en)/`
- **Chinese**: `yourdomain.com/zh/` → `app/zh/`
- Route groups `(en)` allows English to be the default without `/en` prefix
- Each locale has its own layout with appropriate metadata and language settings

### Metadata Strategy
- Separate metadata objects in each layout file
- English metadata optimized for US/international audience
- Chinese metadata with appropriate titles, descriptions, and keywords for Chinese market
- Proper `lang` attributes and OpenGraph locale settings

### Database Considerations
- Current API routes are locale-agnostic and serve same data to both sites
- Future enhancement: Add `locale` column to content tables for locale-specific content
- Admin panel can potentially manage content for both locales

## Common Tasks

When working with this codebase:

1. **Adding new content types**: Create database table, API routes in `/api/admin/`, and admin page
2. **Updating English UI components**: Modify components in `/ui/en/` directory
3. **Updating Chinese UI components**: Modify components in `/ui/zh/` directory (to be developed)
4. **Database changes**: Update SQL queries in server components and API routes
5. **Admin features**: Add to `/app/admin/` with corresponding API routes
6. **Image handling**: Use Vercel Blob storage for uploads, Next.js Image for display
7. **Localization**: Add new locale by creating `app/[locale]/` directory with appropriate layout and metadata
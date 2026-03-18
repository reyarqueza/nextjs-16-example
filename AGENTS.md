# Project Guide: Next.js 16 Example

This file serves as the foundational mandate for all AI interactions within this project. Adhere to these standards rigorously.

## Project Overview
A modern media management application built with Next.js 16, React 19, and PostgreSQL. The application focuses on tracking physical media collections (VHS, LaserDisc, DVD, etc.).

## Tech Stack
- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Library:** [React 19](https://react.dev/)
- **Language:** TypeScript
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Database:** PostgreSQL (using `postgres.js` driver)
- **Deployment:** Vercel

## Folder Structure
```text
/
├── app/                  # Next.js App Router (Pages, Layouts, Actions)
│   ├── components/       # Shared UI components
│   ├── manage/           # Management interface
│   ├── actions.ts        # Server Actions
│   ├── globals.css       # Global styles (Tailwind 4)
│   └── layout.tsx        # Root layout
├── database/             # Schema and database scripts
│   └── setup.sql         # DDL and seed data
├── public/               # Static assets
├── next.config.ts        # Next.js configuration
├── package.json          # Dependencies and scripts
└── tsconfig.json         # TypeScript configuration
```

## Rules of Engagement

### Coding Standards
- **Components:** Prefer functional components with TypeScript interfaces for props.
- **Server Actions:** Use Next.js Server Actions for data mutations (defined in `app/actions.ts`).
- **Data Fetching:** Use Server Components for data fetching where possible.
- **Caching:** Only use Next.js 16 Cache Components for caching. Do not use Next.js 15 cache features. cacheComponents is enabled in next.config.ts to enforce this.

### Styling & UI
- **Tailwind CSS:** Use Tailwind utility classes for all styling.

### Database Patterns
- **SQL First:** Write clean, optimized SQL. Use the `postgres.js` client for database interactions.
- **Schema:** Follow the relational structure defined in `database/setup.sql`. Ensure all foreign key constraints and unique indexes are respected.

### Best Practices
- **Type Safety:** Maintain strict TypeScript typing across the codebase.
- **Clean Code:** Prioritize readability. Consolidate logic into clean abstractions rather than threading state across unrelated layers.

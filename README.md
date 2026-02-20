# nextjs-16-example

This example demonstrates Next.js core features as of early 2026:

- App Router
- React Server Components
- Server Actions
- Streaming & Suspense
- Cache Components — The new caching model (Next.js 16)

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy on Vercel

Use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Vercel Storage

After deploying to vercel, in your project, you will create a database
integration with Neon:

Storage > Create Database > Neon > Continue > [Choose your region] > Continue >
[type in database name: media-database] > Create

## Use Vercel cli to pull in environment variables to .env.local



## Setup PostgreSQL on Neon

> Prerequisites - Setup the small PostgreSQL media-database at
[Neon](https://neon.com/) following the directions at:
https://github.com/reyarqueza/media-database

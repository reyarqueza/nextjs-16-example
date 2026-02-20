# nextjs-16-example

This example demonstrates Next.js core features as of early 2026:

- App Router
- React Server Components
- Server Actions
- Streaming & Suspense
- Cache Components — The new caching model (Next.js 16)

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

This example also uses Postgres at Neon.

## 1. Clone this repository


## 2. Deploy on Vercel

Use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 3. Vercel Storage

After deploying to vercel, in your project, you will create a database
integration with Neon:

On Vercel, click through the following:

> Storage > Create Database > Neon > Continue > [Choose your region] > Continue >
[type in database name: media-database] > Create

## 4. Vercel CLI
```bash
nextjs-16-example on  main via  v22.19.0 
❯ vercel link
Vercel CLI 50.1.3
? Set up “~/nextjs-16-example”? yes
? Which scope should contain your project? Rey Arqueza's projects
? Found project “rey-arquezas-projects/nextjs-16-example”. Link to it? yes
✅  Linked to rey-arquezas-projects/nextjs-16-example (created .vercel)
? Would you like to pull environment variables now? yes
> Downloading `development` Environment Variables for rey-arquezas-projects/nextjs-16-example
✅  Created .env.local file and added it to .gitignore [66ms]
```

## 5. Setup PostgreSQL on Neon
On Vercel, click to your Storage:
> Storage > media-database > Open in Neon

Setup the small PostgreSQL media-database following the directions at:
https://github.com/reyarqueza/media-database

No need to clone.
Copy and paste the SQL scripts into Neon as instructed by the [README.md](https://github.com/reyarqueza/media-database)

## 6. The usual setup
```bash
pnpm install
```

```bash
pnpm run dev
```

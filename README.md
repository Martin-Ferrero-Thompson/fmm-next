This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

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

## Weekly automated release

This repo includes a scheduled GitHub Actions workflow that performs a weekly production release:

- File: `.github/workflows/weekly-release.yml`
- Schedule: Every Monday at 06:00 UTC (and can be triggered manually via “Run workflow”)
- Action: Bumps the patch version in `package.json` (e.g., `0.1.2 -> 0.1.3`) and pushes directly to `main`
- Result: A push to `main` triggers Vercel to deploy a new production build

Notes:

- No Git tags or GitHub Releases are created by this workflow.
- If branch protection is enabled in the future, switch the workflow to open a PR instead of pushing to `main`.

## Build timestamp and footer

On every build, a small prebuild script generates build metadata so the footer can display the current version and the publish date/time:

- Script: `scripts/generate-build-info.mjs`
- Hook: Runs via the `prebuild` npm script before `next build`
- Output: `src/build-info.ts` with:
	- `version` — taken from `package.json`
	- `builtAt` — ISO-8601 UTC timestamp at build time

The footer imports this data and shows:

- `v<version> — Published <date>`
- The date/time is formatted client-side using the viewer’s locale with “medium date + short time”.

Local development notes:

- A placeholder `src/build-info.ts` exists for local dev and is overwritten during actual builds.
- To see the formatted date in your browser locally, run the dev server and open the site.

### Try it locally

```bash
# Start the dev server
pnpm dev

# Or produce a production build (runs the prebuild script) and then start
pnpm build
pnpm start
```

## Environment variables

This project includes a `.env.example` file with the common variables used by the app. To run the app locally, copy that file to `.env.local` and fill in the real values (do not commit `.env.local`).

Example commands:

```bash
# copy the example file to a local env file
cp .env.example .env.local

# open .env.local and fill in values (or set them in your hosting provider)
${EDITOR:-nano} .env.local
```

Important notes:

- Keep server-only keys out of the browser. Variables prefixed with `NEXT_PUBLIC_` are exposed to client-side code. Use `SUPABASE_SERVICE_ROLE_KEY` (or other service keys) only on the server.
- Do not commit `.env.local` to git. Add it to `.gitignore` if it's not already ignored.
- After changing environment variables, restart the dev server so Next picks up the new values.
- For deployments (Vercel, Netlify, etc.) configure the environment variables in the platform's dashboard rather than committing them to the repo.


Bumping:

pnpm version patch --no-git-tag-version
git add package.json pnpm-lock.yaml || true
git commit -m "chore(release): bump to v$(node -p \"require('./package.json').version\")"
git push
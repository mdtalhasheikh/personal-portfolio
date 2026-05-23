## Mohammad Talah Sheikh Portfolio

A professional portfolio website built with Next.js. It includes an executive portfolio landing page and a server-side OpenRouter-powered Digital Twin chat experience grounded in Mohammad Talah Sheikh's career profile.

## Tech Stack

- Next.js App Router
- React
- TypeScript
- OpenRouter chat completions
- Vitest and Testing Library
- ESLint

## Environment

Copy `.env.example` to `.env` and add a newly rotated OpenRouter key:

```sh
OPENROUTER_API_KEY=sk-or-v1-your-openrouter-key
OPENROUTER_MODEL=openai/gpt-oss-120b
NEXT_PUBLIC_SITE_URL=http://localhost:3000
CONTACT_WEBHOOK_URL=
```

`OPENROUTER_MODEL` is optional and defaults to `openai/gpt-oss-120b` when unset. `CONTACT_WEBHOOK_URL` is optional; when set, contact form submissions are forwarded to that private endpoint. Never commit `.env` or real API keys.

## Run Locally

```sh
npm install
npm run dev
```

Open `http://localhost:3000` to view the site.

## Scripts

```sh
npm run dev
npm run build
npm run start
npm run lint
npm run typecheck
npm test
```

## Deployment

Deploy to Vercel or another Next.js host. Add `OPENROUTER_API_KEY`, `NEXT_PUBLIC_SITE_URL`, and optionally `CONTACT_WEBHOOK_URL` as deployment environment variables.

## License

MIT. See `LICENSE`.

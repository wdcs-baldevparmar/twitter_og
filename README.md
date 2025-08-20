# Twitter OG Demo (Next.js App Router)

A minimal demo showing how to generate a dynamic OpenGraph image with `next/og` and share it on Twitter using the intent URL.

## Quick Start

```bash
pnpm i   # or: npm i  | yarn
pnpm dev # or: npm run dev | yarn dev
```

Open: http://localhost:3000

## Routes

- `/` — Home
- `/ETH_USD` — Example pair page with dynamic `generateMetadata` and a "Share on Twitter" button
- `/api/og` — Dynamic OpenGraph PNG, 1200x630

### Example

Visit:
```
http://localhost:3000/ETH_USD?side=BUY&leverage=10&pnl=12.45
```

It sets OG/Twitter meta with image URL:
```
/api/og?side=BUY&leverage=10&pair=ETH-USD&pnl=12.45
```

And the page provides a Share button that opens:
```
https://twitter.com/intent/tweet?text=<dynamic-text>&url=<page-url>
```

## Notes
- Twitter caches images; to bust cache append a dummy query param (e.g., `&t=timestamp`).
- Twitter card type: `summary_large_image` is set by `generateMetadata` via the `twitter` field.
- The OG image uses green for positive PnL and red for negative.
```)

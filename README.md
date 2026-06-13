# Remove BG

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

A free, open-source background remover. Drop in an image (by file or URL) and get back a
transparent PNG. It is a thin, clean front end over the [remove.bg](https://www.remove.bg)
API, with the API key kept server-side so it never reaches the browser.

## Features

- Accepts either an uploaded file or an image URL (one or the other, mutually exclusive in
  the UI).
- Returns a transparent PNG, shown inline with a download button.
- The remove.bg key lives in a server-side API route, not in client code.

## How it works

The page posts the image to `POST /api/removebg`, which forwards it to
`https://api.remove.bg/v1.0/removebg` with the `REMOVEBG_API_KEY` header and `size=auto`,
then streams the resulting PNG back to the browser as a blob.

## Tech stack

- **Next.js (App Router) + React + TypeScript**
- **Tailwind CSS + daisyUI**
- **axios** to call the remove.bg API from the server route

## Run it

This app needs a remove.bg API key. Get a free key at
[remove.bg/api](https://www.remove.bg/api), then:

```bash
npm install
echo "REMOVEBG_API_KEY=your_key_here" > .env.local
npm run dev        # http://localhost:3000
```

## Project layout

```
src/app/
  page.tsx                  # file/URL input, result preview, download
  api/removebg/route.ts     # server proxy to the remove.bg API
```

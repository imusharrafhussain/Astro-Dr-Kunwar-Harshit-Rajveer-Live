# Dr Kunwar Harshit Rajveer — Website

This repo contains the **Aacharya website** with:

- **Client**: Vite + React (`Aacharya-website/client`)
- **Server**: Node/Express API (`Aacharya-website/server`)

## Prerequisites

- **Node.js**: 18+ recommended
- **npm**: comes with Node

## Quick start (recommended)

From the repo root:

```bash
cd Aacharya-website
npm install
npm run dev
```

Then open:

- **Frontend**: `http://localhost:5173` (Vite may use 5174 if 5173 is busy)
- **API**: `http://localhost:5000`

## Run client and server separately

### 1) Client (Vite + React)

```bash
cd Aacharya-website/client
npm install
npm run dev
```

### 2) Server (Express)

In a second terminal:

```bash
cd Aacharya-website/server
npm install
npm run dev
```

If there is no `dev` script in the server, use:

```bash
npm start
```

## Build (production)

### Client build

```bash
cd Aacharya-website/client
npm run build
npm run preview
```

Preview will print a local URL (commonly `http://localhost:4173`).

## Troubleshooting

- **`npm` says no `package.json`**: you’re likely in the wrong folder. Run commands from `Aacharya-website/` (or from `Aacharya-website/client` / `Aacharya-website/server`).
- **Port already in use (EADDRINUSE)**:
  - Vite will automatically pick the next port (e.g. 5174).
  - For the API (often 5000), stop the other running server instance or change the port in server config.
- **Fresh install**: if things look strange after pulling changes, try deleting `node_modules` and reinstalling:

```bash
cd Aacharya-website
rm -rf node_modules
npm install
```


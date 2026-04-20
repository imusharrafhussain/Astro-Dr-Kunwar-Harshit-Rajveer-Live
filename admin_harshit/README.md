## Harshit Admin Dashboard (`admin_harshit`)

Separate admin panel for viewing user-submitted records and exporting them to Excel.

### What data it shows (current website forms)

- **Reports** (`Report`):
  - `name`, `email`, `phone`
  - `reportType`
  - `dateOfBirth`, `birthTime`, `birthPlace`
  - `partnerDOB`, `partnerBirthTime`, `partnerBirthPlace` (only for compatibility)
  - `additionalInfo`, `status`
  - `createdAt`, `updatedAt`

- **Consultation** (`Appointment`):
  - `name`, `email`, `phone`
  - `service`
  - `preferredDate`, `preferredTime`
  - `message`, `status`
  - `createdAt`, `updatedAt`

- **Contacts** (`Contact`):
  - `name`, `email`, `subject`, `message`, `isRead`
  - `createdAt`, `updatedAt`

### Server setup (secure admin login)

The server exposes:

- `POST /api/admin/login`
- `GET /api/admin/records/:category` (protected)
- `GET /api/admin/summary` (protected)

Configure these environment variables in your server `.env`:

- `ADMIN_EMAIL` = your admin email
- `ADMIN_PASSWORD_HASH` = bcrypt hash of your admin password
- `ADMIN_JWT_SECRET` (optional, recommended) = separate JWT secret for admin tokens
- `ADMIN_URL` (optional) = admin app origin for CORS (default `http://localhost:5174`)

Generate a bcrypt hash (run inside `Aacharya-website/server/`):

```bash
node -e "const bcrypt=require('bcryptjs'); const pw=process.argv[1]||'change-me'; console.log(bcrypt.hashSync(pw, 12));" "YOUR_PASSWORD"
```

### Run locally

1) Start backend (example):

```bash
cd ../Aacharya-website/server
npm install
npm run dev
```

2) Start admin app:

```bash
npm install
copy .env.example .env
npm run dev
```

Open the URL printed by the dev server and login. By default, it runs on `http://localhost:5174`.

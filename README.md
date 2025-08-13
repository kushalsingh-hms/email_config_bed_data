# Email Service with Gmail SMTP

Production-ready email service built with Next.js (App Router + TypeScript) and Gmail SMTP via Nodemailer. It exposes an API endpoint to send “Bed Pickup Confirmation” emails and includes a simple UI for manual testing.

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Nodemailer (Gmail SMTP)
- Tailwind CSS (UI styles)

## Project Structure

```
email/
├── app/
│   ├── api/
│   │   └── send-email/
│   │       └── route.ts          # Email API endpoint (server-only)
│   ├── globals.css               # Global styles (Tailwind)
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Minimal UI to test the API
├── next.config.js                # Next.js config
├── package.json                  # Scripts and dependencies
├── postcss.config.js             # PostCSS plugins
├── tailwind.config.js            # Tailwind configuration
├── tsconfig.json                 # TypeScript config
└── .env.local                    # Local env vars (not committed)
```

## Local Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create `.env.local` in the project root:
   ```env
   GMAIL_USER=usme1601@gmail.com
   GMAIL_APP_PASSWORD=pjsg gxgp mqdm pfnm
   REPLY_TO=kushal.singh@rsystems.com
   ```
   - Requires a Gmail account with 2FA enabled and a generated App Password.
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open `http://localhost:3000` and test the form, or call the API directly (see below).

## API

- Method: POST
- Route: `/api/send-email`
- Content-Type: `application/json`

### Request Schema

```json
{
  "toEmail": "string (email)",
  "staffName": "string",
  "accountNumber": "string",
  "departmentName": "string",
  "bedType": "string",
  "referenceNumber": "string",
  "barcodeInfo": "string (optional)",
  "patientId": "string (optional)",
  "patientName": "string (optional)",
  "floorRoom": "string (optional)"
}
```

Required: `toEmail`, `staffName`, `accountNumber`, `departmentName`, `bedType`, `referenceNumber`.

### Sample Requests

Minimal:
```bash
curl -X POST http://localhost:3000/api/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "toEmail": "recipient@example.com",
    "staffName": "John Doe",
    "accountNumber": "ACC123456",
    "departmentName": "ICU",
    "bedType": "ICU Bed",
    "referenceNumber": "REF001"
  }'
```

Full (with optional fields):
```bash
curl -X POST http://localhost:3000/api/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "toEmail": "recipient@example.com",
    "staffName": "Jane Doe",
    "accountNumber": "ACC999",
    "departmentName": "Surgery",
    "bedType": "Med-Surg",
    "barcodeInfo": "BC123, BC124",
    "patientId": "P-1001",
    "patientName": "Mary Smith",
    "floorRoom": "3rd / 301",
    "referenceNumber": "REF-2024-09-01"
  }'
```

### Responses

- 200 OK
  ```json
  { "success": true, "messageId": "<gmail_message_id>", "message": "Email sent successfully" }
  ```
- 400 Bad Request
  ```json
  { "error": "Missing required field: <field>" }
  ```
- 500 Error
  ```json
  { "error": "Failed to send email" }
  ```

### Template and Mapping

The email body is an HTML template that renders the provided fields. Optional fields (barcode/patient details/floor & room) are included only when provided.

## VAPI Integration Notes

Map the VAPI “call summary” fields to the request schema above. At minimum you must provide: `toEmail`, `staffName`, `accountNumber`, `departmentName`, `bedType`, `referenceNumber`. Include any available optional fields for richer context.

## Gmail Setup

1. Enable 2-Step Verification on the Gmail account.
2. Generate an App Password (Mail, on your device) and use it as `GMAIL_APP_PASSWORD`.
3. The sender will be exactly `GMAIL_USER`.

## Deployment (GitHub + Vercel)

1. Push this project to GitHub.
2. In Vercel, import the repository.
3. In Vercel → Settings → Environment Variables, add:
   - `GMAIL_USER`
   - `GMAIL_APP_PASSWORD`
   - `REPLY_TO` (optional)
4. Deploy. Vercel will build and host the app. The API route is serverless by default.
5. After deployment, test the API on your production URL:
   ```bash
   curl -X POST https://<your-vercel-domain>/api/send-email \
     -H "Content-Type: application/json" \
     -d '{
       "toEmail": "recipient@example.com",
       "staffName": "John Doe",
       "accountNumber": "ACC123456",
       "departmentName": "ICU",
       "bedType": "ICU Bed",
       "referenceNumber": "REF001"
     }'
   ```

## Observability

- Check the Gmail Sent mailbox for delivered emails.
- Vercel → Logs: check serverless function logs for `app/api/send-email/route.ts`.

## Troubleshooting

- Not receiving emails:
  - Check spam/junk folders.
  - Gmail may flag first sends as suspicious; check the Gmail account’s security alerts.
  - Ensure App Password is correct and not revoked.
- 535 Authentication failed:
  - Verify `GMAIL_USER` and `GMAIL_APP_PASSWORD` are correct.
- EPERM/ENOTFOUND errors on SMTP:
  - Ensure outbound SMTP is allowed from your hosting environment.

## Development

- Start dev server:
  ```bash
  npm run dev
  ```
- Build for production:
  ```bash
  npm run build
  ```
- Start production server (after build):
  ```bash
  npm start
  ```
- Lint:
  ```bash
  npm run lint
  ```

## Security & Compliance

- Do not commit `.env.local` or API keys; `.gitignore` already excludes local env files.
- Rotate API keys periodically and on suspicion of compromise.
- If including patient information, ensure your usage complies with your organization’s privacy and security requirements. Email is not inherently HIPAA-compliant unless handled under appropriate agreements and controls.

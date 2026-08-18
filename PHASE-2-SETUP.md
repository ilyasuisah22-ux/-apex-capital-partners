# Apex Capital Partners Phase 2 Setup

The application code is ready for external service credentials. No secrets are included in this repository.

## 1. Local Environment

Copy `.env.example` to `.env.local` and fill in the values from the services below. Never commit `.env.local`.

```powershell
Copy-Item .env.example .env.local
```

Required public Supabase values:

- `NEXT_PUBLIC_SUPABASE_URL`: Supabase Project Settings > API > Project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase Project Settings > API > Publishable/anon key

Required server values for media:

- `SUPABASE_SERVICE_ROLE_KEY` is reserved for future trusted maintenance jobs. The current request handlers use the authenticated Supabase session and RLS; do not expose this key to the browser.
- `R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET_NAME`, and `R2_PUBLIC_BASE_URL` are required for uploads.

Optional notification values:

- `RESEND_API_KEY` and `RESEND_FROM_EMAIL` enable inquiry email notifications. Without them, inquiries still save to Supabase, but no email is sent.

## 2. Supabase

1. Create a Supabase project.
2. Open SQL Editor and run the complete file `supabase/schema.sql`.
3. Open Authentication > Users and create the owner with email and password. Do not create a public registration page.
4. Copy the new Auth user's UUID.
5. Run this SQL, replacing the UUID with the owner user ID:

```sql
insert into public.admin_users (user_id)
values ('00000000-0000-0000-0000-000000000000')
on conflict (user_id) do nothing;
```

The `admin_users` allowlist is required. A normal authenticated Supabase user is not automatically an administrator.

## 3. Cloudflare R2

1. In Cloudflare Dashboard, open R2 Object Storage and create a bucket named `apex-capital-media` or another private name.
2. Create an R2 API token scoped only to this bucket with Object Read & Write permission. Copy the Access Key ID and Secret Access Key into `.env.local`; never paste them into source files or chat.
3. Configure a custom public domain for the bucket, for example `media.your-domain.example`, and set `R2_PUBLIC_BASE_URL` to that HTTPS URL without a trailing slash.
4. Add this CORS policy to the R2 bucket if browser media previews need cross-origin access:

```json
[
  {
    "AllowedOrigins": ["http://localhost:3000"],
    "AllowedMethods": ["GET", "HEAD"],
    "AllowedHeaders": ["*"],
    "ExposeHeaders": ["ETag"],
    "MaxAgeSeconds": 3600
  }
]
```

Add the eventual website origin to `AllowedOrigins` before Phase 3 deployment. Do not use `*` for a production bucket.

The server uploads and deletes through the R2 S3-compatible API. The browser never receives the R2 secret keys.

## 4. Resend

1. Create or use a Resend account.
2. Verify the sending domain or sender address.
3. Create an API key with the minimum sending permission required.
4. Set `RESEND_API_KEY` and `RESEND_FROM_EMAIL`, for example:

```text
RESEND_FROM_EMAIL=Apex Capital Partners <notifications@your-verified-domain.example>
```

Notifications are sent to `ApexCapitalPartners.Hmt@gmail.com` after an inquiry record is successfully saved. An email failure is logged server-side and does not falsely report delivery to the visitor.

## 5. Run And Verify

```powershell
npm run dev
npm run lint
npm run typecheck
npm run build
```

With Supabase configured, sign in at `/admin/login`. The owner must be present in both Supabase Auth and `public.admin_users`.

## Current Boundary

This phase does not deploy the application, purchase/configure a production domain, or claim production readiness. Run the final external-service and deployment verification in Phase 3.

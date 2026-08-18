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

Optional notification values:

- `NOTIFICATION_EMAIL` controls where inquiry notifications are delivered. It defaults to `ApexCapitalPartners.Hmt@gmail.com` when omitted.
- `RESEND_API_KEY` and `RESEND_FROM_EMAIL` enable inquiry email notifications. Without them, inquiries still save to Supabase, but no email is sent.
- Development Resend configuration: `NOTIFICATION_EMAIL=ilyasuisah22@gmail.com` and `RESEND_FROM_EMAIL=Apex Capital Partners <onboarding@resend.dev>`.

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

## 3. Supabase Storage

1. Open the Supabase SQL Editor.
2. Run the complete `supabase/schema.sql` file. It creates the public `apex-media` bucket, allowed MIME types, the 100 MB object limit, and storage policies.
3. The server uploads and deletes through the authenticated Supabase Storage API. No separate storage secret is required for the current flow.

The bucket is public-read so the public website can render active media. Upload, update, and delete require both a signed-in user and a matching row in `public.admin_users`.

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

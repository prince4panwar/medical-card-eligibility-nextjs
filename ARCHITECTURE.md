# Architecture Overview

This document explains the architecture, data flow, feature set, and design decisions for the **Medical Card Eligibility Checker** built using **Next.js App Router**.

---

## 📁 Project Structure

The project follows a **feature-oriented, App Router–first structure**, keeping server and client responsibilities clearly separated.

```
app/
 ├─ page.tsx                       // Home page (state selector)
 ├─ state/
 │   └─ [slug]/
 │       ├─ page.tsx               // State details (SSG + revalidate)
 │       ├─ apply/page.tsx         // Eligibility form
 │       └─ success/page.tsx       // Confirmation page
 │
 ├─ admin/
 │   ├─ login/page.tsx             // Admin login (client)
 │   ├─ page.tsx                   // Admin dashboard (server-protected)
 │   └─ submissions/page.tsx       // View submissions
 │
 ├─ api/
 │   ├─ eligibility/route.ts       // Handle form submission
 |   ├─ auth/login/route.ts        // Handle authentication
 │   └─ admin/
 │       ├─ login/route.ts          // Admin login API
 │       └─ logout/route.ts         // Admin logout API
 │
components/
 ├─ StateSelector.tsx
 ├─ FormInputs.tsx
 │
data/
 ├─ states.json                    // Static state data
 ├─ submissions.json               // All users submission data
 │
lib/
 ├─ auth.ts                        // JWT + cookie utilities
```

### Why this structure?

- Keeps **routing colocated with UI** (App Router best practice)
- Clear separation of **server logic**, **client components**, and **shared utilities**
- Easy to scale with more features or routes

---

## 🔄 Data Flow Explanation

### 1️⃣ Home → State Page

- User selects a U.S. state from a dropdown
- App navigates to `/state/[slug]`
- State data is loaded from `states.json`
- Page is statically generated using:

  - `generateStaticParams`
  - `revalidate` for ISR

### 2️⃣ State Page → Eligibility Form

- User clicks **Start Evaluation**
- Navigates to `/state/[slug]/apply`
- State slug is used to:

  - Display contextual information
  - Validate minimum age

### 3️⃣ Eligibility Form Submission

- Form handled using **React Hook Form + Zod**
- Client-side validation before submit
- On submit:

  - POST request to `/api/eligibility`
  - Server validates data again
  - Submission is stored (in-memory / JSON)

### 4️⃣ Success Page

- On success, user is redirected to:
  `/state/[slug]/success?name=...`
- Displays confirmation message using query params

### 5️⃣ Admin Authentication Flow

- Admin logs in via `/admin/login`
- Credentials checked against environment variables
- On success:

  - JWT is created
  - Stored in **HTTP-only cookie**

- Protected admin pages:

  - Read cookie on the server
  - Verify JWT before rendering

---

## ✨ Features Implemented

- ✅ State-based eligibility check
- ✅ Static generation with ISR
- ✅ Dynamic routing
- ✅ Form validation (Zod + RHF)
- ✅ API routes for submission handling
- ✅ Confirmation flow
- ✅ Admin authentication (JWT + cookies)
- ✅ Protected admin routes
- ✅ Admin submissions table
- ✅ Clean, reusable components
- ✅ Basic SEO metadata

---

## 🔐 Security Considerations

- JWT stored in **HTTP-only cookies**
- Tokens verified on the server only
- No sensitive data exposed to the client
- Admin routes protected at render time

---

## 🚀 Production-Grade Improvements

If this were a production application, the following improvements would be made:

### 🔒 Security

- Hash admin passwords (bcrypt)
- Use a database-backed user system
- Add refresh tokens
- CSRF protection
- Rate limiting on auth routes

### 🗄️ Data & Storage

- Replace in-memory storage with a database (PostgreSQL / MongoDB)
- Add schema migrations
- Add pagination for admin submissions

### ⚡ Performance

- Edge middleware for auth
- Caching strategies
- Optimized API responses

### 🧪 Testing

- Unit tests (Jest / Vitest)
- Integration tests
- E2E tests (Playwright)

### 🧩 UX & DX

- Better error handling and user feedback
- Loading & empty states
- Accessibility improvements

---

## ⚖️ Trade-offs Made (Due to Time Constraints)

- ❌ No database (used in-memory / JSON storage)
- ❌ No password hashing
- ❌ No refresh token implementation
- ❌ Minimal UI styling
- ❌ Limited error boundary handling

These trade-offs were intentional to:

- Focus on **architecture and correctness**
- Meet assignment scope
- Deliver within a reasonable timeframe

---

## 🧠 Final Notes

This project focuses on **clean architecture, correct Next.js App Router usage, and secure patterns**, rather than UI complexity. The structure is designed to be easy to extend into a full production system.

# Medical Card Eligibility Checker (Next.js)

A small **Next.js (App Router)** application that allows users to check medical card eligibility based on their U.S. state and submit an evaluation form. The project also includes a basic **Admin Dashboard** protected using **JWT authentication with HTTP-only cookies** (no database).

---

## 📦 Prerequisites

Make sure you have the following installed:

- **Node.js** (v18 or later recommended)
- **npm**

---

## ⚙️ Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/prince4panwar/medical-card-eligibility-nextjs.git
```

### 2️⃣ Navigate to the project directory

```bash
cd medical-card-eligibility-nextjs
```

### 3️⃣ Install dependencies

```bash
npm install
```

---

## 🔐 Environment Variables

Create a `.env.local` file in the root directory and add the following:

```env
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123
ADMIN_SECRET=super-secret-admin-key
```

⚠️ **Important:** Restart the development server after adding or updating environment variables.

---

## ▶️ Running the Project

Start the development server:

```bash
npm run dev
```

Open your browser and visit:

```
http://localhost:3000
```

---

## 🔑 Admin Authentication

### Admin Login Page

```
/admin/login
```

### Demo Credentials

- **Email:** `admin@example.com`
- **Password:** `admin123`

After successful login, you can access:

```
/admin
/admin/submissions
```

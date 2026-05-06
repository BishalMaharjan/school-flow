<div align="center">

<img src="https://img.shields.io/badge/SchoolFlow-Multi--tenant%20SaaS-1E3A5F?style=for-the-badge&logoColor=white" alt="SchoolFlow" />

# SchoolFlow

### Multi-tenant School Management SaaS Platform

**Centralize. Automate. Elevate.**

A production-ready, role-based school management system built for multiple schools on a single platform — covering students, teachers, attendance, exams, fees, and communication.

<br/>

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white)](https://postgresql.org)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white)](https://prisma.io)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](CONTRIBUTING.md)
[![Status](https://img.shields.io/badge/Status-In%20Development-orange?style=flat-square)]()

<br/>

[Features](#-features) · [Tech Stack](#-tech-stack) · [Getting Started](#-getting-started) · [Project Structure](#-project-structure) · [API Docs](#-api-documentation) · [Roadmap](#-roadmap) · [Contributing](#-contributing)

</div>

---

## 📖 Overview

SchoolFlow is a **multi-tenant SaaS platform** that helps schools manage their entire operations from one centralized system. Each school gets its own isolated data environment while sharing the same platform infrastructure.

Built for **school administrators, teachers, students, and parents** — everyone gets a role-specific dashboard tailored to their needs.

```
Super Admin  →  Manages all schools on the platform
School Admin →  Manages one school (students, fees, exams, notices)
Teacher      →  Marks attendance, enters exam marks, posts assignments
Student      →  Views results, attendance, assignments, fee details
Parent       →  Monitors child's performance, fees, and notices
```

---

## ✨ Features

### 🔐 Authentication & Multi-tenancy
- JWT-based authentication with role-based access control (RBAC)
- Complete tenant isolation — each school's data is fully separated via `school_id`
- Secure password hashing with bcrypt
- Forgot password / reset password via email

### 🏫 School Management
- Multi-school support from a single platform instance
- School profile, logo, and branding configuration
- Class and section management
- Subject creation and teacher assignment

### 👨‍🎓 Student & Teacher Management
- Full CRUD for students and teachers
- Admission number generation
- Class/section assignment
- Guardian/parent linking
- Bulk import via CSV

### 📋 Attendance
- Daily attendance marking (Present / Absent / Late)
- Class-wise attendance records
- Attendance summary and reports per student
- Exportable attendance sheets

### 📝 Exams & Results
- Create exams, assign subjects, set full/pass marks
- Exam schedule management
- Teacher mark entry
- Automatic grade and GPA calculation
- Printable report cards (PDF)

### 💰 Fee Management
- Create fee categories and class-wise fee structures
- Auto-generate invoices for entire classes
- Track payment status: Unpaid / Partial / Paid
- Record payments with method and transaction reference
- Printable receipts with school branding

### 📢 Notices & Communication
- Publish school announcements
- Target by audience: All / Students / Teachers / Parents
- Notice history and archive

### 📊 Reports & Analytics
- Dashboard analytics: total students, teachers, attendance rate, fee collection
- Exportable reports: CSV, Excel, PDF
- Student list, attendance, fee collection, and result reports

### 🤖 AI Features *(Coming in V2)*
- AI Notice Generator — enter a topic, get a draft notice
- AI Student Performance Summary — detect trends and weak subjects
- AI School FAQ Chatbot

---

## 🛠 Tech Stack

### Backend
| Layer | Technology |
|---|---|
| Runtime | Node.js + TypeScript |
| Framework | Express.js |
| Database | PostgreSQL |
| ORM | Prisma |
| Authentication | JWT + bcrypt |
| Validation | Zod |
| File Uploads | Multer |
| Email | Nodemailer |
| PDF Generation | PDFKit |
| Excel Export | ExcelJS |
| Logging | Winston |

### Frontend *(In Progress)*
| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| Components | shadcn/ui |
| Data Fetching | TanStack Query |
| Forms | React Hook Form + Zod |
| State | Zustand |
| Auth | NextAuth.js |

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org) v18 or higher
- [PostgreSQL](https://postgresql.org) v14 or higher
- [npm](https://npmjs.com) or [yarn](https://yarnpkg.com)
- [Git](https://git-scm.com)

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/schoolflow-api.git
cd schoolflow-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Copy the example env file and fill in your values:

```bash
cp .env.example .env
```

Open `.env` and configure:

```env
# Database
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/schoolflow"

# JWT
JWT_SECRET="your-super-secret-jwt-key-here"
JWT_EXPIRES_IN="7d"

# Server
PORT=5000
NODE_ENV=development

# Email (for password reset)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Frontend URL (for CORS)
CLIENT_URL=http://localhost:3000

# AI (Optional - for V2 features)
OPENAI_API_KEY=your-openai-key
```

### 4. Set Up the Database

```bash
# Run all migrations
npx prisma migrate dev

# Seed the database with demo data
npx prisma db seed
```

### 5. Start the Development Server

```bash
npm run dev
```

The API will be running at `http://localhost:5000`

---

## 🧪 Demo Credentials

After seeding, you can log in with these demo accounts:

| Role | Email | Password |
|---|---|---|
| Super Admin | superadmin@schoolflow.com | Admin@1234 |
| School Admin | admin@greenwood.edu | Admin@1234 |
| Teacher | teacher@greenwood.edu | Admin@1234 |
| Student | student@greenwood.edu | Admin@1234 |
| Parent | parent@greenwood.edu | Admin@1234 |

> ⚠️ Change all passwords before deploying to production.

---

## 📁 Project Structure

```
schoolflow-api/
├── prisma/
│   ├── schema.prisma          # All database models
│   ├── seed.ts                # Demo data seeder
│   └── migrations/            # Auto-generated SQL migrations
│
├── src/
│   ├── config/
│   │   ├── database.ts        # Prisma client singleton
│   │   ├── env.ts             # Zod-validated environment variables
│   │   ├── app.ts             # Express app setup
│   │   └── server.ts          # HTTP server entry point
│   │
│   ├── middlewares/
│   │   ├── auth.middleware.ts     # JWT verification
│   │   ├── tenant.middleware.ts   # school_id isolation (multi-tenancy)
│   │   ├── role.middleware.ts     # Role-based access control
│   │   ├── validate.middleware.ts # Zod request validation
│   │   ├── error.middleware.ts    # Global error handler
│   │   └── upload.middleware.ts   # Multer file upload config
│   │
│   ├── modules/
│   │   ├── auth/              # Login, register, forgot/reset password
│   │   ├── schools/           # School profile and onboarding
│   │   ├── students/          # Student CRUD and profiles
│   │   ├── teachers/          # Teacher CRUD and assignments
│   │   ├── classes/           # Classes and sections
│   │   ├── subjects/          # Subjects and teacher assignment
│   │   ├── attendance/        # Daily attendance and reports
│   │   ├── exams/             # Exam creation and scheduling
│   │   ├── results/           # Mark entry and report cards
│   │   ├── assignments/       # Teacher assignments
│   │   ├── fees/              # Fee structure setup
│   │   ├── invoices/          # Invoice generation and payments
│   │   ├── notices/           # School announcements
│   │   ├── reports/           # Analytics and exports
│   │   └── ai/                # AI-powered features (V2)
│   │
│   ├── utils/
│   │   ├── jwt.ts             # Token signing and verification
│   │   ├── hash.ts            # bcrypt helpers
│   │   ├── response.ts        # Standard API response helpers
│   │   ├── pagination.ts      # Cursor and offset pagination
│   │   ├── mailer.ts          # Email sending via Nodemailer
│   │   ├── logger.ts          # Winston logger
│   │   └── export.ts          # CSV / Excel / PDF export helpers
│   │
│   └── types/
│       ├── express.d.ts       # Extends Express Request with user, school_id
│       └── index.d.ts         # Shared global types and enums
│
├── uploads/                   # Local file storage (logos, CSV imports)
├── tests/                     # Automated tests
├── .env                       # Environment variables (never commit)
├── .env.example               # Safe environment template
├── package.json
├── tsconfig.json
└── README.md
```

Each module follows the same consistent pattern:

```
modules/students/
├── students.router.ts      # Route definitions
├── students.controller.ts  # Request/response handling
├── students.service.ts     # Business logic
└── students.schema.ts      # Zod validation schemas
```

---

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication

All protected routes require a Bearer token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

---

### Auth Endpoints

#### `POST /api/auth/login`
Authenticate a user and receive a JWT token.

```json
// Request
{
  "email": "admin@greenwood.edu",
  "password": "Admin@1234"
}

// Response 200
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "role": "school_admin",
    "user": {
      "id": "uuid",
      "name": "John Doe",
      "email": "admin@greenwood.edu"
    }
  }
}
```

#### `POST /api/auth/register`
Register a new school and admin account.

```json
// Request
{
  "schoolName": "Greenwood High School",
  "adminName": "John Doe",
  "email": "admin@greenwood.edu",
  "password": "Admin@1234",
  "phone": "+977-9800000000"
}
```

#### `POST /api/auth/forgot-password`
Send a password reset email.

#### `POST /api/auth/reset-password`
Reset password using the token from email.

---

### Student Endpoints

| Method | Endpoint | Description | Access |
|---|---|---|---|
| `GET` | `/api/admin/students` | List all students | School Admin |
| `POST` | `/api/admin/students` | Create a student | School Admin |
| `GET` | `/api/admin/students/:id` | Get student by ID | School Admin |
| `PUT` | `/api/admin/students/:id` | Update student | School Admin |
| `DELETE` | `/api/admin/students/:id` | Delete student | School Admin |
| `POST` | `/api/admin/students/import` | Bulk import via CSV | School Admin |

#### Create Student Example

```json
// POST /api/admin/students
{
  "firstName": "Ram",
  "lastName": "Sharma",
  "admissionNo": "STD-1001",
  "dateOfBirth": "2010-05-15",
  "gender": "male",
  "classId": "uuid",
  "sectionId": "uuid",
  "guardianName": "Hari Sharma",
  "guardianPhone": "+977-9800000001"
}

// Response 201
{
  "success": true,
  "message": "Student created successfully",
  "data": { "id": "uuid", "admissionNo": "STD-1001", ... }
}
```

---

### Attendance Endpoints

| Method | Endpoint | Description | Access |
|---|---|---|---|
| `POST` | `/api/teacher/attendance` | Mark class attendance | Teacher |
| `GET` | `/api/teacher/attendance/report` | Attendance report | Teacher / Admin |
| `GET` | `/api/student/attendance` | My attendance summary | Student |

#### Mark Attendance Example

```json
// POST /api/teacher/attendance
{
  "classId": "uuid",
  "date": "2024-08-01",
  "records": [
    { "studentId": "uuid-1", "status": "present" },
    { "studentId": "uuid-2", "status": "absent" },
    { "studentId": "uuid-3", "status": "late" }
  ]
}
```

---

### Fee & Invoice Endpoints

| Method | Endpoint | Description | Access |
|---|---|---|---|
| `POST` | `/api/admin/fees` | Create fee structure | School Admin |
| `POST` | `/api/admin/invoices/generate` | Auto-generate invoices | School Admin |
| `GET` | `/api/admin/invoices` | List all invoices | School Admin |
| `POST` | `/api/admin/invoices/:id/pay` | Record a payment | School Admin |
| `GET` | `/api/admin/invoices/:id/receipt` | Download receipt PDF | School Admin |

---

### Standard Error Responses

```json
// 401 Unauthorized
{ "success": false, "message": "Invalid or expired token" }

// 403 Forbidden
{ "success": false, "message": "Access denied for your role" }

// 404 Not Found
{ "success": false, "message": "Student not found" }

// 422 Validation Error
{
  "success": false,
  "errors": [
    { "field": "email", "message": "Invalid email address" },
    { "field": "password", "message": "Password must be at least 8 characters" }
  ]
}
```

> 📄 Full API documentation available in [`docs/API_DOCUMENTATION.md`](docs/API_DOCUMENTATION.md)

---

## 🗄 Database Schema

Core tables and relationships:

```
schools          ← root tenant table
  └── users      ← all roles (admin, teacher, student, parent)
  └── students   ← student profiles linked to class/section
  └── teachers   ← teacher profiles
  └── classes    ← class definitions
       └── sections
  └── subjects   ← subjects assigned to classes
  └── attendance ← daily records per student
  └── exams      ← exam definitions
       └── results   ← marks per student per subject
  └── fees       ← fee structures per class
       └── invoices  ← per-student invoices
            └── payments
  └── notices    ← school announcements
```

> 📄 Full schema in [`docs/DATABASE_SCHEMA.md`](docs/DATABASE_SCHEMA.md) and [`prisma/schema.prisma`](prisma/schema.prisma)

---

## 📜 Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run database migrations
npm run migrate

# Seed demo data
npm run seed

# Run tests
npm test

# Lint code
npm run lint

# Format code
npm run format

# Open Prisma Studio (database GUI)
npm run studio
```

---

## 🗺 Roadmap

### ✅ Phase 1 — Foundation
- [x] Project structure and TypeScript setup
- [x] Authentication (login, register, JWT, RBAC)
- [x] Multi-tenant architecture with `school_id` isolation
- [x] Super admin dashboard
- [x] School onboarding

### 🔄 Phase 2 — Core Modules *(In Progress)*
- [ ] Student management (CRUD, bulk import)
- [ ] Teacher management
- [ ] Class and section management
- [ ] Subject management

### 📋 Phase 3 — Academic Operations
- [ ] Attendance tracking and reports
- [ ] Exam management and scheduling
- [ ] Marks entry and GPA calculation
- [ ] Printable report cards (PDF)
- [ ] Assignment management

### 💰 Phase 4 — Financial Management
- [ ] Fee structure setup
- [ ] Auto invoice generation
- [ ] Payment recording
- [ ] Receipt generation with school branding

### 📣 Phase 5 — Communication & Portals
- [ ] Notice board with audience targeting
- [ ] Teacher portal
- [ ] Student portal
- [ ] Parent portal

### 📊 Phase 6 — Reports & Analytics
- [ ] Dashboard analytics
- [ ] Export to CSV, Excel, PDF
- [ ] Attendance and fee collection reports

### 🎯 Phase 7 — Premium SaaS Features
- [ ] Subscription plans (Basic / Standard / Premium)
- [ ] Plan-based feature restrictions
- [ ] School branding (custom logo, receipt header)
- [ ] Audit logs
- [ ] Bulk CSV import

### 🤖 Phase 8 — AI Features (V2)
- [ ] AI notice generator
- [ ] AI student performance summary
- [ ] AI school FAQ chatbot

---

## 🧪 Running Tests

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run specific module tests
npm test -- --grep "auth"
npm test -- --grep "students"
```

---

## 🔒 Security

SchoolFlow follows security best practices:

- **Passwords** hashed with bcrypt (12 salt rounds)
- **JWT tokens** signed with a strong secret, expiry enforced
- **Tenant isolation** enforced on every database query via `school_id`
- **Input validation** with Zod on all endpoints
- **Role-based authorization** middleware on every protected route
- **SQL injection** prevented by Prisma ORM (parameterized queries)
- **Rate limiting** on auth endpoints to prevent brute force
- **CORS** configured for trusted origins only

To report a security vulnerability, please email **security@schoolflow.com** rather than opening a public issue.

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/attendance-reports`
3. Make your changes following the module pattern (router → controller → service → schema)
4. Write or update tests
5. Commit with a clear message: `git commit -m "feat: add attendance export to Excel"`
6. Push to your fork: `git push origin feature/attendance-reports`
7. Open a Pull Request

Please read [`CONTRIBUTING.md`](CONTRIBUTING.md) for the full contribution guidelines and code style rules.

### Commit Message Format

```
feat: add bulk student import via CSV
fix: correct GPA calculation for failed subjects
docs: update API documentation for invoices
refactor: extract PDF generation to shared util
test: add unit tests for attendance service
```

---

## 📄 Documentation

| Document | Description |
|---|---|
| [`docs/PROJECT_OVERVIEW.md`](docs/PROJECT_OVERVIEW.md) | Full project context and goals |
| [`docs/FEATURE_ROADMAP.md`](docs/FEATURE_ROADMAP.md) | All phases and features |
| [`docs/DATABASE_SCHEMA.md`](docs/DATABASE_SCHEMA.md) | Table definitions and relationships |
| [`docs/API_DOCUMENTATION.md`](docs/API_DOCUMENTATION.md) | All endpoints with examples |
| [`docs/USER_ROLES.md`](docs/USER_ROLES.md) | Role definitions and permissions |
| [`docs/DEPLOYMENT_GUIDE.md`](docs/DEPLOYMENT_GUIDE.md) | Step-by-step deployment |

---

## 🚢 Deployment

### Environment Variables for Production

```env
NODE_ENV=production
DATABASE_URL=postgresql://...
JWT_SECRET=<strong-random-secret-min-64-chars>
CLIENT_URL=https://yourdomain.com
```

### Deploy with Docker

```bash
# Build the image
docker build -t schoolflow-api .

# Run with Docker Compose
docker-compose up -d
```

### Deploy to Railway / Render / Heroku

```bash
# Set environment variables in your platform dashboard
# Then deploy
git push heroku main
```

> 📄 Full deployment guide in [`docs/DEPLOYMENT_GUIDE.md`](docs/DEPLOYMENT_GUIDE.md)

---

## 📝 License

This project is licensed under the [MIT License](LICENSE) — you are free to use, modify, and distribute this software.

---

## 👤 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [linkedin.com/in/yourprofile](https://linkedin.com/in/yourprofile)
- Email: your@email.com

---

## ⭐ Show Your Support

If SchoolFlow has been useful to you or you find the project interesting, please consider giving it a ⭐ on GitHub. It helps others discover the project and motivates continued development.

---

<div align="center">

Built with ❤️ using Node.js, Express, PostgreSQL, and Prisma

**SchoolFlow** — Simplifying school management, one feature at a time.

</div>

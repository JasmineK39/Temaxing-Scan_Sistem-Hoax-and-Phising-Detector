# Development Setup Guide

This document provides step-by-step instructions for setting up the Temaxing Scan development environment.

---

# 1. System Requirements

## Operating System

- Windows 10/11
- Ubuntu 22.04+
- macOS (Recommended latest version)

---

## Required Software

| Software | Minimum Version |
|-----------|-----------------|
| Git | 2.40+ |
| Node.js | 22 LTS |
| npm | 10+ |
| PHP | 8.4+ |
| Composer | 2.8+ |
| PostgreSQL | 18 |
| VS Code | Latest |

---

# 2. Clone Repository

Clone the repository from GitHub.

```bash
git clone https://github.com/<organization>/temaxing-scan.git

cd temaxing-scan
```

---

# 3. Project Structure

```
temaxing-scan/
│
├── frontend/
├── backend/
├── docs/
├── README.md
└── .gitignore
```

---

# 4. Frontend Setup

Move into frontend directory.

```bash
cd frontend
```

---

## Install Dependencies

```bash
npm install
```

---

## Install Required Packages

### React Router

```bash
npm install react-router-dom
```

---

### Axios

```bash
npm install axios
```

---

### Tailwind CSS

```bash
npm install tailwindcss @tailwindcss/vite
```

---

### Lucide React

```bash
npm install lucide-react
```

---

### shadcn/ui

Initialize shadcn.

```bash
npx shadcn@latest init
```

Install required components.

Example:

```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
npx shadcn@latest add badge
npx shadcn@latest add dialog
npx shadcn@latest add dropdown-menu
```

---

## Start Development Server

```bash
npm run dev
```

Expected output:

```
Local: http://localhost:5173
```

---

# 5. Backend Setup

Move into backend directory.

```bash
cd ../backend
```

---

## Install Composer Dependencies

```bash
composer install
```

---

## Create Environment File

```bash
cp .env.example .env
```

Windows (PowerShell)

```powershell
Copy-Item .env.example .env
```

---

## Generate Application Key

```bash
php artisan key:generate
```

---

## Configure Environment

Update the following values inside `.env`.

```env
APP_NAME="Temaxing Scan"

APP_ENV=local

APP_DEBUG=true

APP_URL=http://localhost:8000

DB_CONNECTION=pgsql

DB_HOST=127.0.0.1

DB_PORT=5432

DB_DATABASE=temaxing_scan

DB_USERNAME=postgres

DB_PASSWORD=YOUR_PASSWORD
```

---

## Install Laravel Sanctum

```bash
composer require laravel/sanctum
```

Publish Sanctum configuration.

```bash
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
```

---

## Run Database Migration

```bash
php artisan migrate
```

---

## Run Seeder

```bash
php artisan db:seed
```

---

## Start Laravel Server

```bash
php artisan serve
```

Expected output:

```
http://127.0.0.1:8000
```

---

# 6. PostgreSQL Setup

Create a new database.

Database Name

```
temaxing_scan
```

Encoding

```
UTF-8
```

Owner

```
postgres
```

Verify connection.

```bash
php artisan migrate:status
```

---

# 7. Verify Installation

Frontend

```
http://localhost:5173
```

Backend

```
http://127.0.0.1:8000
```

Database

```bash
php artisan migrate:status
```

Expected:

```
Migration name

Batch
```

without connection errors.

---

# 8. Git Workflow

Before starting development.

```bash
git checkout develop

git pull origin develop
```

Switch to your development branch.

Developer A

```bash
git checkout dev-a
```

Developer B

```bash
git checkout dev-b
```

Check current branch.

```bash
git branch
```

---

# 9. Build Project

Frontend

```bash
npm run build
```

Backend

```bash
php artisan optimize
```

---

# 10. Common Commands

Frontend

Install package

```bash
npm install <package-name>
```

Run development

```bash
npm run dev
```

Build production

```bash
npm run build
```

---

Backend

Run migration

```bash
php artisan migrate
```

Fresh migration

```bash
php artisan migrate:fresh --seed
```

Clear cache

```bash
php artisan optimize:clear
```

List routes

```bash
php artisan route:list
```

---

# 11. Troubleshooting

## PostgreSQL Driver Not Found

Error

```
could not find driver
```

Solution

- Enable PHP PostgreSQL extensions:
    - php_pgsql
    - php_pdo_pgsql
- Restart terminal/web server.
- Verify using:

```bash
php -m
```

---

## Migration Failed

Run

```bash
php artisan migrate:fresh --seed
```

---

## Node Modules Error

Delete

```
node_modules/
```

and

```
package-lock.json
```

then reinstall.

```bash
npm install
```

---

## Composer Error

Update Composer.

```bash
composer self-update
```

Then run.

```bash
composer install
```

---

# 12. Development Rules

- Never commit `.env`.
- Never commit `node_modules`.
- Never commit `vendor`.
- Always pull the latest `develop` before starting work.
- Use Conventional Commits.
- Create Pull Request before merging into `develop`.
- Resolve merge conflicts before creating a Pull Request.

---

# 13. Setup Checklist

## Frontend

- [ ] Node.js installed
- [ ] npm installed
- [ ] Dependencies installed
- [ ] Tailwind CSS configured
- [ ] shadcn/ui configured
- [ ] Frontend running

---

## Backend

- [ ] PHP installed
- [ ] Composer installed
- [ ] Laravel dependencies installed
- [ ] `.env` configured
- [ ] Application key generated
- [ ] Sanctum installed
- [ ] Migration successful
- [ ] Seeder successful
- [ ] Backend running

---

## Database

- [ ] PostgreSQL installed
- [ ] Database created
- [ ] Connection successful

---

## Git

- [ ] Repository cloned
- [ ] Correct branch checked out
- [ ] Ready for development
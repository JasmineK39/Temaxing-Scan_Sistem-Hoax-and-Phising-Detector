# Temaxing Scan Backend

Backend service for **Temaxing Scan**, a Digital Trust Platform designed to help users identify malicious websites, phishing attempts, and misinformation through multi-provider threat intelligence analysis.

---

# Project Status

> **Current Phase:** Backend Foundation & Core Analysis Engine 🚧

## Completed Features

### Authentication
- ✅ User Registration
- ✅ User Login
- ✅ Secure Password Hashing
- ✅ PostgreSQL Integration
- ✅ JWT/Sanctum Authentication *(adjust if needed)*

---

### URL Analysis Engine

#### URL Processing
- ✅ URL Normalization
- ✅ URL Information Extraction

#### Security Intelligence Providers

- ✅ WHOIS Lookup
- ✅ RDAP Lookup
- ✅ SSL Certificate Inspection
- ✅ VirusTotal Integration
- ✅ URLScan.io Integration
- ✅ PhishTank Integration

---

### Backend Architecture

Current backend uses a modular provider-based architecture.

```
AnalysisService
        │
        ▼
ProviderPipeline
        │
        ▼
ProviderRegistry
        │
        ├── WhoisService
        ├── SSLService
        ├── VirusTotalService
        ├── UrlScanService
        └── PhishTankService
```

Each provider is isolated behind a common interface, making the analysis engine extensible and easy to maintain.

---

# Frontend Progress

Implemented pages:

- ✅ Home
- ✅ User Dashboard

Dashboard modules:

- Dashboard
- Phishing Analysis
- Fake News Detection
- Scan History

```
Dashboard
│
├── Dashboard
├── Phishing Analysis
├── Fake News Detection
└── Scan History
```

---

# Technology Stack

## Backend

- Laravel 12
- PHP 8.4+
- PostgreSQL
- REST API
- Service Layer Architecture
- DTO Pattern
- Provider-Based Architecture

---

## Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui

---

# Security Providers

| Provider | Status |
|----------|--------|
| WHOIS & RDAP | ✅ Implemented |
| SSL Certificate | ✅ Implemented |
| VirusTotal | ✅ Implemented |
| URLScan.io | ✅ Implemented |
| PhishTank | ✅ Implemented |
| Google Safe Browsing | 🚧 Planned |
| OpenPhish | 🚧 Planned |

---

# Roadmap

## Phase 1 — Foundation

- ✅ Authentication
- ✅ PostgreSQL Integration
- ✅ URL Normalization
- ✅ URL Information Extraction
- ✅ Provider Architecture
- ✅ Multi-provider Integration

---

## Phase 2 — Risk Analysis

- 🚧 Analysis Orchestrator
- 🚧 Risk Engine
- 🚧 Risk Scoring
- 🚧 Risk Classification
- 🚧 Recommendation Engine

---

## Phase 3 — AI Analysis

- 🚧 AI-Based URL Explanation
- 🚧 Fake News Classification
- 🚧 AI Recommendation

---

## Phase 4 — User Features

- 🚧 Scan History API
- 🚧 User Profile
- 🚧 Account Settings
- 🚧 Dashboard Analytics

---

# Project Structure

```
app/
├── DTO/
├── Http/
├── Models/
├── Services/
│   └── Analysis/
│       ├── Contracts/
│       ├── DTO/
│       ├── Exceptions/
│       ├── Infrastructure/
│       ├── Mappers/
│       ├── Normalizers/
│       ├── Providers/
│       ├── ProviderPipeline.php
│       ├── ProviderRegistry.php
│       └── AnalysisService.php
└── ...
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/<your-username>/<your-repository>.git
```

```bash
cd backend
```

---

## Install Dependencies

```bash
composer install
```

---

## Environment Configuration

Copy the environment file.

```bash
cp .env.example .env
```

Generate application key.

```bash
php artisan key:generate
```

Configure PostgreSQL credentials inside `.env`.

Example:

```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=temaxing_scan
DB_USERNAME=postgres
DB_PASSWORD=your_password
```

---

## Run Migration

```bash
php artisan migrate
```

---

## Start Development Server

```bash
php artisan serve
```

---

# Development Principles

This project follows several software engineering principles:

- Clean Architecture
- Service Layer Pattern
- Single Responsibility Principle (SRP)
- Dependency Injection
- DTO Pattern
- Provider-Based Integration
- Extensible Analysis Pipeline
- Production-Oriented Design

---

# Contributors

| Name | Role |
|------|------|
| Jasmine Kunthi S | dev-a |
| Nisrina Khalisha S | dev-b |

---

# License

This project is developed for educational, research, and cybersecurity awareness purposes.

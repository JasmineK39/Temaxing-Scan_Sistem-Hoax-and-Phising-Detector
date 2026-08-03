# Software Requirements Specification (SRS)

# Temaxing Scan

Version 1.0

---

# 1. Introduction

## 1.1 Purpose

This Software Requirements Specification (SRS) defines the functional and non-functional requirements of **Temaxing Scan**, an AI-powered web application designed to assist users in identifying suspicious URLs and evaluating the credibility of online news.

The purpose of this document is to establish a shared understanding among developers, stakeholders, and future maintainers regarding the system's objectives, features, constraints, and expected behavior throughout the software development lifecycle.

---

## 1.2 Scope

Temaxing Scan is a web-based platform that provides two primary services:

- URL Security Analysis
- Fake News Analysis

The system integrates Artificial Intelligence (AI) and multiple cybersecurity intelligence services to analyze submitted URLs and news content.

For URL analysis, the system evaluates several security indicators such as SSL status, domain information, phishing databases, reputation services, and AI-generated explanations.

For news analysis, the system utilizes AI to assess credibility, identify misinformation patterns, and provide understandable explanations for users.

Additionally, authenticated users can access their previous analysis history, while administrators are able to manage users and monitor system activities.

---

## 1.3 Intended Audience

This document is intended for:

- Project Manager
- Frontend Developer
- Backend Developer
- System Tester
- Academic Supervisor
- Future System Maintainers

---

## 1.4 Definitions, Acronyms, and Abbreviations

| Term | Description |
|------|-------------|
| AI | Artificial Intelligence |
| API | Application Programming Interface |
| URL | Uniform Resource Locator |
| SSL | Secure Sockets Layer |
| WHOIS | Domain registration lookup service |
| VirusTotal | Malware and URL reputation service |
| Google Safe Browsing | Google's phishing and malware detection service |
| URLScan | Website scanning service |
| PhishTank | Public phishing database |
| Risk Score | Numerical representation of URL security risk |
| Dashboard | Main page displaying user overview |
| Analysis | Process of evaluating submitted data |

---

## 1.5 References

The following technologies and standards are referenced during development:

- React Documentation
- Laravel Documentation
- PostgreSQL Documentation
- TypeScript Documentation
- Tailwind CSS Documentation
- shadcn/ui Documentation
- Gemini API Documentation
- VirusTotal API Documentation
- Google Safe Browsing API Documentation

---

## 1.6 Document Overview

This document is organized into several sections describing the system overview, functional requirements, non-functional requirements, software interfaces, security requirements, database requirements, and future development plans.

The SRS serves as the primary technical reference throughout the implementation of Temaxing Scan.

# 2. Overall Description

## 2.1 Product Perspective

Temaxing Scan is a standalone web-based application designed to improve digital trust by providing AI-assisted analysis for suspicious URLs and online news.

The platform integrates multiple external cybersecurity intelligence services and artificial intelligence models to assist users in identifying phishing attempts, malicious websites, and misinformation. Instead of providing only technical indicators, the system also generates human-readable explanations to help users understand the analysis results.

The system follows a client-server architecture consisting of:

- Frontend (React + TypeScript)
- Backend REST API (Laravel 12)
- PostgreSQL Database
- External Security Intelligence APIs
- Artificial Intelligence Service

---

## 2.2 Product Functions

The major functions provided by the system include:

### Authentication

- User Registration
- User Login
- User Logout
- User Authentication using Laravel Sanctum

---

### Dashboard

- Display total analyses
- Display recent analyses
- Display security statistics
- Quick navigation to system features

---

### URL Security Analysis

Users can submit suspicious URLs for security evaluation.

The system performs:

- URL validation
- SSL inspection
- Domain information lookup
- Reputation checking
- Malware checking
- Phishing detection
- AI explanation generation
- Risk score calculation
- Security recommendation generation

---

### Fake News Analysis

Users can submit news content for credibility evaluation.

The system performs:

- AI credibility analysis
- Misinformation detection
- Clickbait identification
- Bias evaluation
- AI explanation generation
- Recommendation generation

---

### Analysis History

Authenticated users can:

- View previous analyses
- Search analyses
- Filter analyses
- Delete analyses

---

### Administration

Administrators can:

- Manage users
- Monitor analyses
- View system statistics
- Delete inappropriate records

---

## 2.3 User Classes

### Guest

A visitor who has not logged in.

Permissions:

- View Landing Page
- Register Account
- Login

---

### User

Registered users who utilize the analysis services.

Permissions:

- Analyze URLs
- Analyze News
- View Dashboard
- View Analysis History
- Delete Own History
- Update Profile
- Logout

---

### Administrator

Responsible for maintaining the system.

Permissions:

- View all users
- Manage users
- Monitor analyses
- Remove analysis records
- Access administrative dashboard

---

## 2.4 Operating Environment

### Client

- Google Chrome
- Microsoft Edge
- Mozilla Firefox

Recommended screen width:

- Desktop ≥ 1280 px
- Tablet ≥ 768 px

---

### Server

Operating System:

- Windows
- Linux

Backend:

- PHP 8.4+
- Laravel 12

Database:

- PostgreSQL 18

---

## 2.5 Design Constraints

The system shall comply with the following constraints:

- Development duration is limited to one month.
- Development team consists of two developers.
- The system relies on external APIs.
- Free-tier APIs may impose request limitations.
- Internet connectivity is required for analysis.

---

## 2.6 Assumptions and Dependencies

The system assumes that:

- PostgreSQL server is available.
- External APIs remain operational.
- AI services respond within acceptable latency.
- Users have internet connectivity.
- Modern browsers support JavaScript and HTTPS.

---

# 3. System Features

This chapter describes the major functional modules of Temaxing Scan.

---

## 3.1 User Authentication

### Description

The authentication module allows users to register, log in, access protected resources, and securely terminate sessions.

### Inputs

- Name
- Email
- Password

### Outputs

- Authentication Token
- User Information

### Preconditions

- User account exists (Login)
- Valid credentials

### Postconditions

- User session established

---

## 3.2 Dashboard

### Description

The dashboard provides users with an overview of their activities and quick access to the system.

### Functions

- Display total analyses
- Display latest analyses
- Display security overview
- Display shortcuts

---

## 3.3 URL Security Analysis

### Description

Allows users to analyze suspicious URLs.

### Input

- URL

### Process

The backend evaluates:

- SSL
- Domain Age
- Domain Reputation
- VirusTotal
- Google Safe Browsing
- URLScan
- WHOIS
- PhishTank

The collected information is processed to calculate a risk score and generate an AI explanation.

### Output

- Risk Score
- Risk Level
- Security Indicators
- AI Explanation
- Recommendation

---

## 3.4 Fake News Analysis

### Description

Allows users to analyze online news articles.

### Input

- News Title
- News Content
- Source URL (Optional)

### Process

AI evaluates:

- Credibility
- Manipulative Language
- Clickbait
- Bias
- Factual Consistency

### Output

- Credibility Score
- News Category
- AI Explanation
- Recommendation

---

## 3.5 Analysis History

### Description

Stores previous analyses performed by authenticated users.

### Functions

- View History
- Search History
- Filter History
- Delete History

---

## 3.6 User Profile

### Description

Allows users to manage personal information.

### Functions

- View Profile
- Update Profile
- Change Password

---

## 3.7 Administration

### Description

Administrative module used to maintain the platform.

### Functions

- View User List
- Delete User
- View Analysis Records
- Delete Analysis
- Monitor System Usage

# 4. External Interface Requirements

## 4.1 User Interface

The system shall provide a modern, responsive, and user-friendly interface that prioritizes usability and readability.

### General UI Requirements

- Responsive design for desktop and tablet devices.
- Consistent color palette throughout the application.
- Clear visual hierarchy.
- Accessible typography.
- Intuitive navigation.
- Minimalist and professional appearance.

### Main Pages

- Landing Page
- Login Page
- Register Page
- User Dashboard
- URL Analysis Page
- News Analysis Page
- Analysis History Page
- Profile Page
- Admin Dashboard

---

## 4.2 Software Interfaces

The system communicates with several external services.

| Service | Purpose |
|----------|----------|
| Gemini API | AI-generated explanation and news analysis |
| VirusTotal API | URL reputation and malware detection |
| Google Safe Browsing API | Phishing and malicious website detection |
| URLScan API | Website scanning |
| WHOIS | Domain registration lookup |
| PhishTank | Phishing database lookup |

Communication format:

- REST API
- JSON

Authentication:

- API Key
- HTTPS

---

## 4.3 Hardware Interfaces

Minimum client requirements:

- Dual-Core Processor
- 4 GB RAM
- Internet Connection

Recommended:

- Quad-Core Processor
- 8 GB RAM

Server requirements:

- PHP 8.4+
- PostgreSQL 18
- Internet access
- Minimum 2 GB RAM

---

## 4.4 Communication Interfaces

The application communicates through HTTPS.

Supported protocol:

- HTTPS
- REST API
- JSON

Character Encoding:

- UTF-8

---

# 5. Functional Requirements

## FR-01 User Registration

Description

The system shall allow new users to create an account.

Actor

Guest

Precondition

- User has not registered.

Postcondition

- User account is created.

Priority

High

---

## FR-02 User Login

Description

The system shall authenticate registered users.

Actor

User

Priority

High

---

## FR-03 User Logout

Description

The system shall terminate the current authenticated session.

Actor

User

Priority

High

---

## FR-04 URL Submission

Description

The system shall allow users to submit suspicious URLs for analysis.

Actor

User

Input

- URL

Output

- Analysis ID

Priority

High

---

## FR-05 URL Security Analysis

Description

The system shall evaluate submitted URLs using multiple security indicators.

The analysis includes:

- SSL Status
- Domain Information
- VirusTotal
- Google Safe Browsing
- URLScan
- WHOIS
- PhishTank

Output:

- Risk Score
- Risk Level
- Security Indicators

Priority

High

---

## FR-06 AI URL Explanation

Description

The system shall generate an AI explanation describing why the submitted URL is considered safe or suspicious.

Output

- Human-readable explanation
- Recommendation

Priority

High

---

## FR-07 News Submission

Description

The system shall allow users to submit news content for credibility evaluation.

Input

- Title
- Content
- Source URL (Optional)

Priority

High

---

## FR-08 Fake News Analysis

Description

The system shall evaluate submitted news using AI.

The analysis includes:

- Credibility
- Manipulative Language
- Clickbait Detection
- Bias Detection
- Consistency Evaluation

Output

- Credibility Score
- News Category
- AI Explanation

Priority

High

---

## FR-09 Analysis History

Description

The system shall store every completed analysis.

Users can:

- View History
- Search History
- Filter History
- Delete History

Priority

Medium

---

## FR-10 Dashboard

Description

The dashboard shall display user statistics.

Displayed information:

- Total Analyses
- URL Analyses
- News Analyses
- Recent Activity

Priority

Medium

---

## FR-11 User Profile

Description

Users shall be able to manage their profile.

Functions:

- View Profile
- Update Profile
- Change Password

Priority

Medium

---

## FR-12 Administration

Description

Administrators shall manage the system.

Functions:

- View Users
- Delete Users
- View Analysis Records
- Delete Analysis Records
- Monitor Platform Usage

Priority

High

---

# 6. Non-Functional Requirements

## 6.1 Performance

- Average page loading time shall not exceed 3 seconds.
- URL analysis results should be displayed within 10 seconds under normal API response conditions.
- News analysis results should be displayed within 15 seconds.

---

## 6.2 Reliability

- System availability target: 99%.
- Failed external API requests shall not crash the application.
- Errors shall be handled gracefully.

---

## 6.3 Security

The system shall:

- Encrypt passwords using Laravel Hash.
- Use HTTPS communication.
- Protect authenticated routes using Laravel Sanctum.
- Validate all user inputs.
- Prevent SQL Injection.
- Prevent Cross-Site Scripting (XSS).
- Prevent Cross-Site Request Forgery (CSRF).
- Store API keys securely using environment variables.

---

## 6.4 Maintainability

The system shall:

- Follow clean architecture principles.
- Use modular components.
- Separate frontend and backend responsibilities.
- Follow coding standards.
- Use Git for version control.

---

## 6.5 Scalability

The architecture shall support future implementation of:

- Browser Extension
- WhatsApp Bot
- Telegram Bot
- Mobile Application
- Deepfake Detection
- Audio Analysis

without major architectural changes.

---

## 6.6 Usability

The interface shall:

- Be intuitive for first-time users.
- Present analysis results in understandable language.
- Minimize unnecessary user actions.
- Provide clear error messages.

---

## 6.7 Compatibility

The application shall support:

- Google Chrome
- Microsoft Edge
- Mozilla Firefox

Latest two stable versions.

---

## 6.8 Availability

The application shall be accessible through the internet at any time, subject to server and third-party API availability.

---

## 6.9 Portability

The backend shall be deployable on:

- Windows
- Linux

The frontend shall be deployable on:

- Vercel
- Netlify
- Traditional Web Hosting

---

## 6.10 Data Integrity

The system shall ensure:

- Referential integrity between database tables.
- Unique identifiers for every analysis.
- Consistent storage of analysis results.
- Prevention of duplicate or corrupted records.

# 7. Database Requirements

## 7.1 Database Overview

Temaxing Scan uses PostgreSQL as the primary relational database management system (RDBMS). The database stores user accounts, analysis records, detailed analysis results, and administrative activities.

The database is designed using normalization principles to minimize redundancy while maintaining data integrity and scalability.

---

## 7.2 Main Entities

The primary entities in the database include:

- Users
- Analyses
- URL Analysis Details
- News Analysis Details
- Audit Logs

---

## 7.3 Entity Description

### Users

Stores user account information.

Main Attributes

- id
- name
- email
- password
- role
- created_at
- updated_at

---

### Analyses

Stores general information about every analysis.

Main Attributes

- id
- user_id
- analysis_type
- status
- created_at
- updated_at

Analysis Type:

- URL
- NEWS

---

### URL Analysis Details

Stores detailed URL analysis results.

Main Attributes

- id
- analysis_id
- url
- risk_score
- risk_level
- ssl_status
- domain_age
- virustotal_status
- safe_browsing_status
- urlscan_status
- whois_information
- phishtank_status
- ai_model
- ai_explanation
- recommendation

---

### News Analysis Details

Stores detailed news analysis results.

Main Attributes

- id
- analysis_id
- title
- content
- source_url
- credibility_score
- credibility_level
- bias_level
- clickbait_score
- ai_model
- ai_explanation
- recommendation

---

### Audit Logs

Stores administrator activities.

Main Attributes

- id
- admin_id
- analysis_id
- action
- created_at

---

## 7.4 Relationships

Relationship Summary

- One User can create many Analyses.
- One Analysis has one URL Analysis Detail.
- One Analysis has one News Analysis Detail.
- One Administrator can create many Audit Logs.
- One Analysis can have multiple Audit Logs.

---

## 7.5 Data Integrity Rules

The database shall enforce:

- Primary Key constraints
- Foreign Key constraints
- NOT NULL constraints where applicable
- Unique Email constraint
- Cascading updates where necessary
- Restricted deletion for critical data

---

## 7.6 Data Retention

The system shall retain analysis history until:

- Deleted by the user
- Deleted by an administrator

Soft Delete may be implemented for future versions.

---

# 8. Security Requirements

## 8.1 Authentication

The system shall authenticate users using Laravel Sanctum.

Unauthenticated users shall not access protected resources.

---

## 8.2 Authorization

The system shall implement Role-Based Access Control (RBAC).

Available roles:

- User
- Administrator

Users shall only access their own analysis records.

Administrators shall have elevated privileges.

---

## 8.3 Password Security

Passwords shall:

- Never be stored in plain text.
- Be hashed using Laravel Hash (bcrypt/Argon2).
- Meet minimum password requirements.

---

## 8.4 API Security

All API endpoints shall:

- Require HTTPS.
- Validate incoming requests.
- Return standardized error responses.
- Protect authenticated routes.

---

## 8.5 Input Validation

The system shall validate:

- URL format
- Email format
- Password strength
- News content length
- Required fields

Invalid requests shall return appropriate validation messages.

---

## 8.6 Protection Against Common Attacks

The application shall provide protection against:

- SQL Injection
- Cross-Site Scripting (XSS)
- Cross-Site Request Forgery (CSRF)
- Broken Authentication
- Mass Assignment
- Session Hijacking

---

## 8.7 Sensitive Information

Sensitive information such as:

- API Keys
- Database Credentials
- SMTP Credentials

shall be stored using environment variables (.env) and shall never be exposed to the frontend.

---

## 8.8 Audit Logging

Administrative actions shall be logged.

Examples:

- Delete Analysis
- Delete User
- Update User Role

---

## 8.9 Secure Communication

All communication between:

- Frontend
- Backend
- External APIs

shall use HTTPS.

---

# 9. Future Enhancements

The following features are considered for future releases.

## Phase 2

- Browser Extension
- Chrome Extension
- Microsoft Edge Extension

---

## Phase 3

- WhatsApp Bot
- Telegram Bot

---

## Phase 4

- Deepfake Detection
- AI Image Verification
- Audio Cloning Detection

---

## Phase 5

- Mobile Application (Android)
- Mobile Application (iOS)

---

## Phase 6

- Multi-language Support
- Indonesian
- English

---

## Phase 7

- Threat Intelligence Dashboard
- Organization Accounts
- Team Collaboration
- Analytics Report
- Export PDF
- Export Excel

---

# Appendix

## Appendix A — Technology Stack

Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Axios

Backend

- Laravel 12
- Laravel Sanctum

Database

- PostgreSQL 18

Artificial Intelligence

- Gemini API

External Services

- VirusTotal API
- Google Safe Browsing API
- URLScan API
- WHOIS
- PhishTank

---

## Appendix B — Supported Browsers

- Google Chrome
- Microsoft Edge
- Mozilla Firefox

Latest Stable Version

---

## Appendix C — Abbreviations

| Abbreviation | Meaning |
|--------------|---------|
| AI | Artificial Intelligence |
| API | Application Programming Interface |
| URL | Uniform Resource Locator |
| SSL | Secure Sockets Layer |
| REST | Representational State Transfer |
| JSON | JavaScript Object Notation |
| RBAC | Role-Based Access Control |


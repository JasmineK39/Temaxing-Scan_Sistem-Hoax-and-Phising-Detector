# Project Charter

## Project Information

| Item | Description |
|------|-------------|
| Project Name | Temaxing Scan |
| Project Type | AI-Powered Cybersecurity & Digital Trust Platform |
| Project Duration | 1 Month |
| Project Start | TBD |
| Project End | TBD |
| Development Method | Agile Scrum |
| Repository | GitHub |
| Team Size | 2 Developers |

---

# 1. Project Background

The rapid growth of digital technology has significantly increased the spread of cyber threats and misinformation. Many internet users are unable to distinguish between legitimate and malicious websites, phishing messages, or misleading news articles. This lack of digital literacy increases the risk of identity theft, financial fraud, and the spread of false information.

Temaxing Scan is developed as an AI-powered web platform that assists users in evaluating the safety of URLs and identifying potentially misleading news through automated analysis, external security intelligence services, and AI-generated explanations.

The platform aims to improve digital awareness by presenting analysis results in a clear, understandable, and actionable manner.

---

# 2. Problem Statement

Current internet users face several challenges:

- Difficulty determining whether a URL is safe.
- Lack of understanding of phishing indicators.
- Difficulty verifying online news credibility.
- Existing security tools often provide technical results without understandable explanations.
- Users require a centralized platform capable of analyzing both cybersecurity risks and misinformation.

---

# 3. Project Objective

The project aims to develop an AI-powered web application capable of:

- Analyzing suspicious URLs.
- Detecting phishing indicators.
- Evaluating news credibility.
- Providing AI-generated explanations understandable by non-technical users.
- Maintaining users' analysis history.
- Improving digital trust and cybersecurity awareness.

---

# 4. Project Scope

## In Scope

### User Management

- User Registration
- User Login
- User Logout
- User Profile

### URL Security Analysis

- URL submission
- Risk score calculation
- SSL verification
- VirusTotal integration
- Google Safe Browsing integration
- WHOIS lookup
- URLScan integration
- PhishTank lookup
- AI-generated explanation
- Security recommendation

### Fake News Analysis

- News text submission
- AI credibility analysis
- Misinformation detection
- AI explanation
- Recommendation

### Analysis History

- View previous analyses
- Search history
- Filter history
- Delete history

### Administration

- User management
- Analysis monitoring
- History management

---

## Out of Scope

The following features will not be implemented in Version 1:

- Mobile application
- Browser Extension
- WhatsApp Bot
- Telegram Bot
- Deepfake Detection
- Audio Cloning Detection
- Multi-language Support
- Real-time Notification
- Social Media Integration

---

# 5. Stakeholders

| Stakeholder | Responsibility |
|-------------|----------------|
| Project Manager | Planning, monitoring, sprint management |
| Developer A | Frontend development |
| Developer B | Backend development |
| End Users | Perform URL and news analysis |
| Administrator | Monitor users and analysis history |

---

# 6. Target Users

The platform is designed for:

- General Public
- University Students
- Small and Medium Enterprises (SMEs)
- Parents

---

# 7. Project Deliverables

The project will produce:

- Responsive Web Application
- REST API
- PostgreSQL Database
- Software Documentation
- Project Documentation
- Source Code Repository

---

# 8. Technology Stack

## Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Axios

## Backend

- Laravel 12
- Laravel Sanctum

## Database

- PostgreSQL

## AI Services

- Gemini API

## External Security Services

- VirusTotal API
- Google Safe Browsing API
- URLScan API
- WHOIS
- PhishTank

---

# 9. Project Constraints

- Development duration is limited to one month.
- Development team consists of only two developers.
- Free-tier APIs may have request limitations.
- Internet connection is required for external service integration.

---

# 10. Success Criteria

The project is considered successful if:

- Users can successfully analyze suspicious URLs.
- Users can analyze news content.
- AI explanations are generated correctly.
- Analysis history is stored successfully.
- Authentication functions properly.
- The system is responsive on desktop and tablet devices.
- All planned sprint deliverables are completed within one month.

---

# 11. Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| API request limit exceeded | High | Implement caching and request validation |
| External API unavailable | High | Provide fallback error handling |
| Merge conflict between developers | Medium | Use Git Flow and Pull Request workflow |
| Schedule delay | Medium | Weekly sprint review and backlog prioritization |
| UI inconsistency | Medium | Apply a centralized design system |

---

# 12. Assumptions

- All external APIs remain available throughout development.
- Developers use the same Git workflow.
- PostgreSQL is configured correctly on all development machines.
- Users have internet access to perform analyses.

---

# 13. Project Approval

| Role | Name | Signature |
|------|------|-----------|
| Developer A | Jasmine Kunthi S | |
| Developer B | Nisrina Khalisha S | |


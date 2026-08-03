export type RiskLevel = "safe" | "low" | "medium" | "high";

export type ScanRecord = {
  id: string;
  type: "Phishing" | "Fake News";
  target: string;
  score: number;
  risk: RiskLevel;
  result: string;
  date: string;
};

export const currentUser = {
  name: "Amina Youssef",
  email: "amina@temaxing.io",
  initials: "AY",
  plan: "Pro",
};

export const stats = [
  { key: "total", label: "Total Scans", value: "1,284", trend: "+12.4%", up: true },
  { key: "safe", label: "Safe Results", value: "946", trend: "+8.1%", up: true },
  { key: "suspicious", label: "Suspicious Results", value: "263", trend: "+3.2%", up: true },
  { key: "threats", label: "Threats Detected", value: "75", trend: "-4.6%", up: false },
] as const;

export const scanSuggestions = [
  "https://secure-paypa1-login.com",
  "https://drive-share-doc.co/verify",
  "https://news-today-breaking.info/article/8821",
];

export const recentActivity: ScanRecord[] = [
  {
    id: "SC-4821",
    type: "Phishing",
    target: "secure-paypa1-login.com/verify",
    score: 94,
    risk: "high",
    result: "Credential phishing",
    date: "Aug 2, 2026 · 11:24",
  },
  {
    id: "SC-4820",
    type: "Fake News",
    target: "Central bank freezes all savings accounts",
    score: 71,
    risk: "medium",
    result: "Misleading claims",
    date: "Aug 2, 2026 · 09:58",
  },
  {
    id: "SC-4819",
    type: "Phishing",
    target: "drive-share-doc.co/invoice",
    score: 48,
    risk: "low",
    result: "Suspicious redirect",
    date: "Aug 1, 2026 · 18:12",
  },
  {
    id: "SC-4818",
    type: "Phishing",
    target: "github.com/temaxing/scan",
    score: 6,
    risk: "safe",
    result: "No threat found",
    date: "Aug 1, 2026 · 14:03",
  },
  {
    id: "SC-4817",
    type: "Fake News",
    target: "New AI law bans open-source models",
    score: 88,
    risk: "high",
    result: "Fabricated source",
    date: "Jul 31, 2026 · 20:47",
  },
];

export const scanHistory: ScanRecord[] = [
  ...recentActivity,
  {
    id: "SC-4816",
    type: "Phishing",
    target: "apple-id-support-center.net",
    score: 91,
    risk: "high",
    result: "Brand impersonation",
    date: "Jul 31, 2026 · 16:20",
  },
  {
    id: "SC-4815",
    type: "Fake News",
    target: "Vaccine linked to memory loss, study says",
    score: 65,
    risk: "medium",
    result: "Unverified study",
    date: "Jul 30, 2026 · 12:41",
  },
  {
    id: "SC-4814",
    type: "Phishing",
    target: "stripe.com/dashboard",
    score: 3,
    risk: "safe",
    result: "No threat found",
    date: "Jul 30, 2026 · 10:05",
  },
  {
    id: "SC-4813",
    type: "Phishing",
    target: "dhl-parcel-fee-payment.top",
    score: 82,
    risk: "high",
    result: "Payment fraud",
    date: "Jul 29, 2026 · 19:33",
  },
  {
    id: "SC-4812",
    type: "Fake News",
    target: "City council approves 40% water tariff",
    score: 22,
    risk: "low",
    result: "Mostly accurate",
    date: "Jul 29, 2026 · 08:14",
  },
  {
    id: "SC-4811",
    type: "Phishing",
    target: "outlook-mail-quota-reset.com",
    score: 76,
    risk: "medium",
    result: "Credential harvesting",
    date: "Jul 28, 2026 · 21:02",
  },
  {
    id: "SC-4810",
    type: "Fake News",
    target: "Astronauts stranded, agency stays silent",
    score: 58,
    risk: "medium",
    result: "Missing context",
    date: "Jul 28, 2026 · 15:26",
  },
  {
    id: "SC-4809",
    type: "Phishing",
    target: "notion.so/temaxing/roadmap",
    score: 4,
    risk: "safe",
    result: "No threat found",
    date: "Jul 27, 2026 · 13:11",
  },
  {
    id: "SC-4808",
    type: "Phishing",
    target: "bank-otp-confirm-secure.xyz",
    score: 97,
    risk: "high",
    result: "OTP interception",
    date: "Jul 27, 2026 · 07:49",
  },
];

export const notifications = [
  {
    id: "n1",
    title: "High-risk domain blocked",
    body: "secure-paypa1-login.com scored 94/100 on your last scan.",
    time: "12m ago",
    unread: true,
  },
  {
    id: "n2",
    title: "Weekly security digest ready",
    body: "7 suspicious links and 2 fabricated articles caught this week.",
    time: "3h ago",
    unread: true,
  },
  {
    id: "n3",
    title: "Detection model updated",
    body: "Temaxing AI v1.4 improves brand-impersonation accuracy by 9%.",
    time: "Yesterday",
    unread: false,
  },
];

export const aiInsight = {
  summary:
    "Your exposure this week is concentrated in payment-themed phishing. 6 of 9 flagged links imitated billing or invoice flows, and all of them used domains registered in the last 14 days.",
  recommendation:
    "Enable link previews before opening billing emails, and verify any payment request through the provider's own dashboard rather than an emailed link.",
  trends: [
    "Newly registered lookalike domains up 31% month over month.",
    "Attackers increasingly wrap payloads inside shared-document links.",
    "AI-generated news claims now cite fake but plausible research titles.",
  ],
  tips: [
    "Check the domain, not the page design — clones are pixel-perfect.",
    "Treat urgency and countdowns as a signal, not a deadline.",
    "Scan an article's core claim before resharing it.",
  ],
};

export const phishingBreakdown = {
  target: "secure-paypa1-login.com/verify",
  score: 94,
  risk: "high" as RiskLevel,
  verdict: "Credential phishing",
  signals: [
    { label: "Domain age", detail: "Registered 9 days ago", weight: "High" },
    { label: "Brand similarity", detail: "Imitates PayPal login", weight: "High" },
    { label: "TLS certificate", detail: "Free cert, mismatched org", weight: "Medium" },
    { label: "Form behaviour", detail: "Posts credentials off-domain", weight: "High" },
    { label: "Reputation feeds", detail: "Listed in 3 threat feeds", weight: "Medium" },
  ],
};

export const fakeNewsResult = {
  credibility: 34,
  verdict: "Likely misleading",
  claims: [
    { claim: "A national bank froze all customer savings accounts.", status: "Unsupported" },
    { claim: "The policy was signed into law this week.", status: "False" },
    { claim: "Withdrawal limits were reduced in two regions.", status: "Partly true" },
  ],
  reasoning:
    "The article attributes its central claim to an unnamed official and no primary source or public record confirms it. Language patterns show heavy emotional framing and the publishing domain has no editorial policy or bylines.",
  recommendation:
    "Do not reshare. Cross-check with the central bank's official newsroom and at least one established wire service before treating this as accurate.",
};
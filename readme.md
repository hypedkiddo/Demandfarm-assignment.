# 💱 Real-Time Bitcoin & Forex Rate Tracker

A full-stack web application that fetches and stores real-time Bitcoin and Forex exchange rates, visualizes currency trends, provides actionable investment insights, and allows users to authenticate securely.

---

## ✨ Features

### 🔐 1. User Authentication
- Secure login system using:
  - Google Login
- Session management to ensure secure access to user-specific dashboards.

### 📊 2. Exchange Rate Data Collection
- Fetches **Bitcoin to USD (BTC-USD)** conversion rates every **10 minutes** from a public API.
- Fetches **USD to EUR, INR, GBP, CAD, and JPY** exchange rates at the same interval.
- Stores all exchange rate data in a **Firebase database** for historical tracking and analysis.

### 📈 3. Dashboard & Data Visualization
Accessible after successful login:
- **Custom Date-Time Filter:**
  - Set Start Time (Date + Time)
  - Set End Time (Date + Time)
- **Interactive Line Chart:**
  - Visualize historical currency movement.
  - Toggle chart lines for:
    - Bitcoin (BTC)
    - USD
    - EUR
    - INR
    - GBP
    - CAD
    - JPY

---

## 🛠 Tech Stack

| Frontend      | Backend     | Authentication | Database       |
|---------------|-------------|----------------|----------------|
| React (Vite)  | Firebase    | Firebase Auth (Google) | Firebase Firestore |

---
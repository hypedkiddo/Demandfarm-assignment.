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

## Installation

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [Git](https://git-scm.com/)

### Clone the Repository

```bash
git clone https://github.com/hypedkiddo/Demandfarm-assignment..git
cd Client
```
### Install Dependencies
```bash
npm install
```
### Environment Variables
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket_url
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id


## Start the application using npm:
```bash
npm run dev
```
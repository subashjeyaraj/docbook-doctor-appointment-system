# 🩺 DocBook — Smart Healthcare & Doctor Appointment Platform

[![GitHub Pages Ready](https://img.shields.io/badge/GitHub%20Pages-Ready-brightgreen)](https://pages.github.com/)
[![100% Frontend](https://img.shields.io/badge/Architecture-100%25%20Frontend-blue)]()
[![No Backend Required](https://img.shields.io/badge/Backend-Zero%20Dependencies-orange)]()
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**DocBook** is a modern, responsive, client-side digital healthcare web application. It enables patients to discover verified medical specialists, schedule instant appointments, consult with an AI Healthbot, check symptoms, locate nearby emergency hospitals on a live map, and order prescription medicines online.

---

## 🌟 Key Highlights

- **⚡ 100% Frontend / Serverless:** Zero Node.js, Express, or SQLite dependencies required. All data persists reliably in the browser using the built-in `docbook-storage.js` engine (`localStorage`).
- **🚀 Instant GitHub Pages Deployment:** Upload directly to GitHub and enable GitHub Pages—the entire application works immediately without build steps or servers.
- **✨ Premium Medical Design System:** Built with modern CSS3 variables, glassmorphic cards, smooth animations, and responsive mobile layouts.
- **🔑 1-Click Demo Logins:** Experience the complete Doctor and Patient workflows instantly without manual signup.

---

## 🚀 How to Run Locally

You don't need to install any packages or run terminal commands!

### Method 1: Direct File Open
Simply double-click [`index.html`](file:///c:/Users/SUBASH/Downloads/GITHUB/DOCTOR%20APPOINTMENT/index.html) in your file explorer to open it in any web browser (Chrome, Edge, Firefox, Safari).

### Method 2: Live Server (Optional)
If using VS Code, right-click [`index.html`](file:///c:/Users/SUBASH/Downloads/GITHUB/DOCTOR%20APPOINTMENT/index.html) and select **"Open with Live Server"**.

---

## 🌐 Deploy to GitHub Pages (3 Steps)

1. **Create a GitHub Repository:**
   Push all the files in this directory to your GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: DocBook Frontend App"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```

2. **Enable GitHub Pages:**
   - Go to your repository on GitHub.
   - Click **Settings** ➔ **Pages** (in the left sidebar).
   - Under **Build and deployment > Branch**, select `main` and `/ (root)`, then click **Save**.

3. **Visit Your Live Website:**
   Your website will be live in seconds at:
   `https://<your-username>.github.io/<repo-name>/`

---

## 🔑 Quick Demo Accounts

Pre-seeded demo credentials for instant testing:

| Role | Email | Password | What You Can Test |
| :--- | :--- | :--- | :--- |
| **👤 Patient** | `patient@docbook.com` | `patient123` | View booked visits, schedule new appointments, buy medicines |
| **🩺 Doctor** | `doctor@docbook.com` | `doctor123` | Review patient requests, approve (`✔ Confirm`), or cancel visits |

*Tip: You can also use the **"1-Click Instant Demo Login"** buttons directly on the home page and login screen.*

---

## 📱 Modules & Features

### 1. 📅 Instant Doctor Appointments (`appointment.html`)
- Filter doctors by specialty (Cardiology, Dermatology, Neurology, Pediatrics, Orthopedics, General Medicine).
- Search doctors by name or affiliated hospital.
- Booking modal with automatic date validation, selectable time slots, and patient auto-fill.
- Right-hand live appointment drawer with status badges (*Pending*, *Confirmed*, *Cancelled*).

### 2. 🩺 Doctor Management Dashboard (`doctor-dashboard.html`)
- Overview KPI metrics: Total Appointments, Pending Approval, Confirmed Sessions, Cancelled.
- Actionable consultation cards with **✔ Confirm** and **✖ Decline / Cancel** buttons.
- Real-time status synchronization with the patient's portal.

### 3. 👤 Patient Health Portal (`user-dashboard.html`)
- Patient profile with quick healthcare shortcuts.
- Real-time tracking of upcoming and past consultations.
- Recent pharmacy orders summary with order tracking IDs.

### 4. 🤖 DocBot AI Health Assistant (`ai-help.html`)
- Interactive virtual medical assistant for symptom questions and advice.
- Smart knowledge base covering fevers, coughs, headaches, digestive health, blood pressure, and first aid.
- Automatic emergency detection with warning flags and instant hospital links.
- Quick prompt pills for one-tap health questions.

### 5. 🏥 Hospital Finder & Emergency Radar (`hospitals.html`)
- Interactive OpenStreetMap & Leaflet mapping interface.
- Pre-loaded with verified 24/7 multi-specialty trauma and emergency centers.
- "📍 Locate Nearest to Me" button utilizing HTML5 Geolocation API.
- Direct phone call links and Google Maps driving directions.

### 6. 🩺 Smart Symptom Checker (`symptoms.html`)
- Multi-select symptom chips (fever, cough, chest tightness, nausea, rash, etc.).
- Specialist matching matrix recommending which doctor to consult.
- Initial home care suggestions and urgent care alerts.

### 7. 🛒 Online Pharmacy & E-Cart (`ecart.html`, `checkout.html`, `success.html`)
- Curated catalog of OTC medicines, immunity vitamins, first aid, and health monitors.
- Category filtering and real-time cart drawer with quantity adjustments.
- Express checkout form with address validation and simulated payment methods (COD, UPI, Card).
- Success order confirmation page with generated Order ID and delivery timeline.

---

## 📁 Project File Structure

```text
DOCTOR APPOINTMENT/
├── index.html                 # Main Landing / Homepage (Front Door for GitHub Pages)
├── appointment.html           # Doctor Directory & Appointment Booking System
├── doctor-dashboard.html      # Doctor Portal (Appointment Approvals & Schedule)
├── user-dashboard.html        # Patient Portal (Appointment History & Orders)
├── patient_dashboard.html     # Patient Portal Redirect Alias
├── login.html                 # Unified Authentication (with 1-Click Demo Logins)
├── register.html              # Account Type Selection (Patient vs Doctor)
├── user-register.html         # Patient Registration Form
├── doctor-register.html       # Doctor / Specialist Registration Form
├── symptoms.html              # Interactive Symptom Specialist Checker
├── hospitals.html             # Hospital GPS Finder with Leaflet Map
├── ai-help.html               # DocBot 24/7 AI Health Chatbot
├── ecart.html                 # Online Pharmacy & Health Supply Store
├── checkout.html              # Order Delivery & Payment Confirmation
├── success.html               # Order Placed Celebration & Receipt
├── about.html                 # About DocBook, Mission & Tech Architecture
├── docbook-storage.js         # Core Client-Side Data & Storage Engine (LocalStorage)
├── script.js                  # Frontend Utilities & Dynamic Renderers
├── style.css                  # Unified Responsive Design System & Stylesheet
├── .gitignore                 # Standard Git Ignore File
└── README.md                  # Comprehensive Documentation
```

---

## 🛠️ Built With

- **HTML5 & Semantic Elements**
- **Vanilla CSS3** (Custom Properties, Glassmorphism, CSS Grid & Flexbox)
- **Vanilla JavaScript (ES6+)** (Zero external frameworks, pure browser standards)
- **Remix Icon CDN** (Modern UI iconography)
- **Leaflet.js & OpenStreetMap** (Interactive emergency hospital mapping)
- **Google Fonts** (Plus Jakarta Sans & Poppins)

---

## 📄 License
This project is open source and available under the [MIT License](LICENSE).

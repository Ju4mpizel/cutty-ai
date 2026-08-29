Set-Content -Path "README.md" -Value @'

# 🎬 Cutty AI — Multimodal AI Video Director & Copilot for Short-Form Creators

> An intelligent, real-time AI director that audits short-form videos (TikTok, Reels, Shorts), analyzes audience retention spikes, and generates instant CapCut/Premiere editing toolkits using Google Vertex AI.

---

## 🌟 Overview

Short-form video retention drops in the first 3 seconds if pacing, hooks, or sound design fail. **Cutty AI** acts as an automated co-director that:

- **Multimodal Video Audit:** Inspects raw video and audio streams using **Gemini 3.5 Flash on Google Cloud Vertex AI**.
- **Interactive Retention Timeline:** Pinpoints second-by-second drop-off risks with synchronized playback.
- **Bro Mode Roast vs. Pro Verdict:** Offers unfiltered brutal feedback alongside executive editing advice.
- **Auto-Generated Editing Kit:** Curates SFX, viral typography, transitions, and subtitle color palettes with 1-click copy for CapCut and Premiere Pro.

---

## 🏗️ Architecture

[ Short-Form MP4 Video ]
│
▼
[ React 19 + Tailwind CSS Frontend (Vercel) ]
│ (Multipart / Form-Data Stream)
▼
[ Express Node.js Serverless Backend (Google Cloud Run) ]
│
▼
[ Google Cloud Vertex AI SDK (Gemini 3.5 Flash) ]
│
▼
[ Structured JSON Audit + Interactive Timeline + CapCut Kit ]

---

## 🚀 Technologies Used

- **Google Cloud Platform:** Google Cloud Run (Serverless container runtime in `us-central1`).
- **Google Vertex AI:** `gemini-3.5-flash` multimodal reasoning for video/audio temporal analysis.
- **Frontend:** React 19, Vite, Tailwind CSS v4, Bento Grid UI, SVG Iconography.
- **Backend:** Node.js (ESM), Express.js, Multer for stream buffer handling.

---

## 📦 Getting Started Locally

### 1. Backend Setup

cd backend
npm install
npm start

### 2. Frontend Setup

cd frontend
npm install
npm run dev

---

## 🌐 Live Deployments

- **Frontend Web App:** Hosted on Vercel
- **Backend API:** Hosted on Google Cloud Run (https://cutty-backend-747715483985.us-central1.run.app)
  '@

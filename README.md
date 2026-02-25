# Space Login Dashboard 🚀🌌

A futuristic, space-themed authentication UI with a cosmic dashboard and interactive 3D solar system explorer.

![Login Screen](https://via.placeholder.com/1200x700/0f0f2a/00ccff?text=Space+Login+Screen)
![Dashboard](https://via.placeholder.com/1200x700/1a0033/00ffff?text=Futuristic+Dashboard)
![Solar System Viewer](https://via.placeholder.com/1200x700/000033/ffffff?text=Interactive+3D+Solar+System)

## ✨ Features

- **Glassmorphism** login, signup, and forgot password forms
- Mini **password strength game** with space theme
- Rocket launch animation on successful login
- Compact cosmic dashboard with animated floating planets
- Futuristic progress gauges (Fuel, Oxygen, Shield)
- Full-screen **interactive 3D solar system**:
  - All major planets orbiting the Sun at realistic relative speeds
  - Planets rotating on their own axis
  - Saturn with visible rings
  - Earth with orbiting Moon
  - Floating name labels above each planet
  - Deep multi-layered star field with gentle, slow twinkling
  - Soft nebula glow in background
  - Mouse drag to rotate, scroll to zoom, pan support

## 🛠️ Tech Stack

| Category            | Technology                          | Purpose                                      |
|---------------------|-------------------------------------|----------------------------------------------|
| Build Tool          | Vite                                | Lightning-fast dev server & builds           |
| Framework           | React 18                            | Component-based UI                           |
| 3D Rendering        | @react-three/fiber + drei           | React-friendly Three.js layer                |
| Animations          | @react-spring/web                   | Smooth spring physics animations             |
| HTTP Client         | axios                               | API communication with backend               |
| Styling             | Tailwind CSS                        | Utility-first + custom glassmorphism         |
| State               | React Hooks (useState, useEffect)   | Lightweight, no external store               |

## 🚀 Installation & Running

```bash
# 1. Clone the repo
git clone <your-repo-url>
cd space-login-frontend

# 2. Install dependencies
npm install

# 3. Install required 3D libraries (if not already present)
npm install three @react-three/fiber @react-three/drei

# 4. Start development server
npm run dev

→ Open http://localhost:5173
Backend Requirement
The frontend connects to a backend at http://127.0.0.1:8000/api
Expected endpoints:

POST /login/ → { username, password }
POST /register/ → { username, email, password }

Response format:

{
  "success": true,
  "message": "Welcome aboard, Astronaut!"
}

Project Structure (key files)
textsrc/
├── components/
│   ├── AnimatedBackground.jsx
│   ├── FloatingCharacters.jsx
│   └── MiniSpaceGame.jsx
├── App.jsx               # ← Main app (login + dashboard + solar system)
└── main.jsx
Scripts
Bashnpm run dev       # Development server + HMR
npm run build     # Production build (dist/ folder)
npm run preview   # Preview production build locally
License
MIT License
Feel free to fork, modify, and share.
Made with love in Villupuram , Tamil Nadu 🌙✨
Last updated: February 2026
## Space Cartoon Login System - Technical Specification

### 1. Project Overview

The Space Cartoon Login System is an interactive, animated login interface built with **React** for the frontend and **Django** for the backend. The system includes an animated space background, floating characters (astronauts, rockets), a mini-space game during login, animated error messages, password strength meter, and forgot password flow.

### 2. Tech Stack

#### **Frontend**

* **React (v19)** - Core UI framework
* **TailwindCSS** - Utility-first CSS framework for fast styling
* **PostCSS** - CSS processor to compile Tailwind directives
* **Autoprefixer** - Ensures cross-browser CSS compatibility
* **Axios** - HTTP client to call Django REST APIs
* **React-Spring & Zdog** - For animations of floating characters and rockets

#### **Backend**

* **Python 3.10**
* **Django** - Web framework for REST API and authentication
* **Django REST Framework (DRF)** - RESTful API endpoints
* **SQLite** - Database for storing user credentials

### 3. Features

* **Login Form**: Username & password input with validation
* **Animated Background**: Stars, planets, and space objects floating
* **Floating Characters**: Astronauts, rockets, aliens with smooth animations
* **Mini Space Game**: Rocket moves according to typing progress
* **Password Strength Meter**: Visual feedback for password strength
* **Animated Error/Success Messages**: Shaking red text for errors, green text for success
* **Forgot Password Flow**: Prompts for email and sends reset instructions

### 4. Folder Structure

```
space-login-frontend/
├── src/
│   ├── App.jsx
│   ├── index.js
│   ├── index.css
│   ├── components/
│   │   ├── AnimatedBackground.jsx
│   │   ├── FloatingCharacters.jsx
│   │   ├── MiniSpaceGame.jsx
│   │   └── LottieAnimations.jsx

space_login_backend/
├── users/
│   ├── views.py
│   ├── urls.py
│   └── models.py
├── manage.py
└── settings.py
```

### 5. Dependencies & Installation Links

| Dependency          | Purpose                      | Install                                            | Documentation                                              |
| ------------------- | ---------------------------- | -------------------------------------------------- | ---------------------------------------------------------- |
| TailwindCSS         | Styling & utility classes    | `npm install -D tailwindcss`                       | [Tailwind Docs](https://tailwindcss.com/docs/installation) |
| PostCSS             | Compiles Tailwind directives | `npm install -D postcss`                           | [PostCSS](https://postcss.org/)                            |
| Autoprefixer        | Cross-browser CSS            | `npm install -D autoprefixer`                      | [Autoprefixer](https://github.com/postcss/autoprefixer)    |
| Axios               | API calls to backend         | `npm install axios`                                | [Axios Docs](https://axios-http.com/docs/intro)            |
| React-Spring / Zdog | Animations                   | `npm install @react-spring/web @react-spring/zdog` | [React-Spring](https://www.react-spring.io/)               |

### 6. API Endpoints

#### **Login**

```
POST /api/login/
Body: { username, password }
Response: { success: true/false, message: "Login message" }
```

#### **Forgot Password**

```
POST /api/forgot-password/
Body: { email }
Response: { success: true/false, message: "Reset email sent or error" }
```

### 7. Notes

* Tailwind CLI is **not required**; React dev server with PostCSS will handle styles.
* All animations and mini-game are handled in frontend React components.
* The project is fully responsive and interactive for a unique login experience.

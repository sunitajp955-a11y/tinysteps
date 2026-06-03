# TinySteps 🌱

> Turn big goals into manageable steps. A calm, minimal goal-planning app that helps you start smaller and build consistency without pressure.

![TinySteps](https://img.shields.io/badge/React-18-blue?logo=react) ![Vite](https://img.shields.io/badge/Vite-8-purple?logo=vite) ![Tailwind](https://img.shields.io/badge/Tailwind-CSS-06B6D4?logo=tailwindcss) ![License](https://img.shields.io/badge/license-MIT-green)

## 🎯 What is TinySteps?

TinySteps is a thoughtful goal-planning app designed for people who feel overwhelmed by large goals. Instead of pushing productivity, it helps you:

- **Think clearly** about what you actually need
- **Break things down** into smaller, more manageable pieces
- **Start smaller** than expected to avoid burnout
- **Build consistency** at a sustainable pace
- **Stay connected** to what matters through a vision board

The app is **completely offline** — all your data stays private in your browser. No account needed.

## ✨ Core Features

### 🎯 Goal Creation & Clarification
Create goals in plain language and let the app help you think them through before planning.

### 📊 Hierarchical Breakdown
Organize any goal into:
- **Smaller Goals** — More manageable versions
- **Milestones** — Progress checkpoints
- **Tiny Steps** — Daily actions that actually feel doable

### 📱 Home Screen
Your daily focus page showing:
- Current goal and why it matters
- Today's tiny step
- Quick progress stats
- Fast actions

### 🎨 Vision Board
Visualize your goals with:
- Images for inspiration
- Personal notes and reminders
- Quotes that motivate you
- Connection to your goals

### 📈 Progress Tracking
Lightweight tracking that celebrates:
- Completed steps
- Goal milestones
- Consistency over perfection
- Overall completion rate

### ⚙️ Settings & Preferences
- Theme (light/dark)
- Notification preferences
- Data management

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/sunitajp955-a11y/tinysteps.git
cd tinysteps

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit **http://localhost:5173** in your browser.

## 🏗️ Project Structure

```
tinysteps/
├── src/
│   ├── components/
│   │   ├── common/        # Reusable UI components
│   │   └── screens/       # App screens
│   ├── data/
│   │   ├── storage.js     # localStorage utilities
│   │   ├── models.js      # Data models
│   │   └── DataContext.jsx # State management
│   ├── hooks/
│   │   └── useData.js     # Custom data hooks
│   ├── App.jsx            # Main app component
│   └── main.jsx           # Entry point
├── index.html
├── tailwind.config.js     # Tailwind configuration
├── vite.config.js         # Vite configuration
└── package.json
```

## 🛠️ Technology Stack

- **React 18** — UI framework
- **Vite** — Fast build tool
- **Tailwind CSS** — Utility-first styling
- **localStorage** — Offline data persistence
- **Context API** — State management

## 💾 Data & Privacy

All your data is stored in your browser's **localStorage**:
- No server uploads
- No tracking
- No cookies
- Completely private

## 🎨 Design Philosophy

TinySteps feels:
- ✅ **Calm** — No overwhelming UI or notifications
- ✅ **Clear** — Straightforward and intuitive
- ✅ **Lightweight** — Focused on what matters
- ✅ **Personal** — Space for your own thinking
- ✅ **Sustainable** — No guilt or all-or-nothing

## 📖 Usage

### Create a Goal
1. Go to **Goals** screen
2. Click **+ New Goal**
3. Enter your goal title and description
4. Create smaller goals, milestones, and tiny steps

### Plan Your Steps
1. Break goals into **Smaller Goals**
2. Define **Milestones** for progress
3. Create **Tiny Steps** for daily actions
4. Focus on what's realistic, not perfect

### Track Progress
1. Visit **Progress** screen
2. See overall completion rate
3. Track individual goal progress
4. View completed goals

### Use Your Vision Board
1. Go to **Vision** screen
2. Add images, notes, or quotes
3. Connect items to your goals
4. Use it as a visual reminder

## 🔄 Available Scripts

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
```

## 📝 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

## 💬 Philosophy

> Most people don't struggle because they lack goals. They struggle because the goal feels too large to start.

TinySteps is built on the belief that **smaller is better** when it comes to sustainable progress. We're here to help you move forward at a pace that works for your real life.

---

**TinySteps** — One small step at a time. 🌱

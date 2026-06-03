import { useState, useEffect } from 'react';
import { DataProvider } from './data/DataContext';
import HomeScreen from './components/screens/HomeScreen';
import GoalsScreen from './components/screens/GoalsScreen';
import VisionBoardScreen from './components/screens/VisionBoardScreen';
import ProgressScreen from './components/screens/ProgressScreen';
import ProfileScreen from './components/screens/ProfileScreen';
import './App.css';

const themes = {
  light: {
    '--ts-bg': '#f7f9f5',
    '--ts-card': '#ffffff',
    '--ts-card-alt': 'linear-gradient(135deg, #f2f7ee, #edf5f0)',
    '--ts-border': '#d8e8d0',
    '--ts-heading': '#1a2e1a',
    '--ts-muted': '#6b8f6b',
    '--ts-accent': 'linear-gradient(90deg, #5a9e6f, #3d7a5a)',
    '--ts-accent-text': '#3d7a5a',
    '--ts-track': '#d8e8d0',
    '--ts-btn': '#3d7a5a',
    '--ts-step-bg': 'linear-gradient(135deg, #f2f7ee, #eaf4ec)',
    '--ts-step-border': '#b8d8c0',
    '--ts-done-bg': 'linear-gradient(135deg, #eafaf1, #d5f5e3)',
    '--ts-done-border': '#a3d9b1',
    '--ts-done-btn': '#2e7d52',
    '--ts-nav-bg': '#ffffff',
    '--ts-nav-border': '#d8e8d0',
    '--ts-nav-active': '#3d7a5a',
    '--ts-nav-active-text': '#ffffff',
    '--ts-nav-text': '#5a7a5a',
    '--ts-body-bg': '#f7f9f5',
  },
  dark: {
    '--ts-bg': '#0f1a0f',
    '--ts-card': '#1a2e1a',
    '--ts-card-alt': 'linear-gradient(135deg, #1a2e1a, #162614)',
    '--ts-border': '#2d4a2d',
    '--ts-heading': '#d4e8d0',
    '--ts-muted': '#7aaa7a',
    '--ts-accent': 'linear-gradient(90deg, #5a9e6f, #3d7a5a)',
    '--ts-accent-text': '#7acc8a',
    '--ts-track': '#2d4a2d',
    '--ts-btn': '#4a8a5a',
    '--ts-step-bg': 'linear-gradient(135deg, #1a2e1a, #1e3320)',
    '--ts-step-border': '#3a5a3a',
    '--ts-done-bg': 'linear-gradient(135deg, #1a3a2a, #1e4030)',
    '--ts-done-border': '#3a6a4a',
    '--ts-done-btn': '#3a7a4a',
    '--ts-nav-bg': '#111e11',
    '--ts-nav-border': '#2d4a2d',
    '--ts-nav-active': '#4a8a5a',
    '--ts-nav-active-text': '#ffffff',
    '--ts-nav-text': '#7aaa7a',
    '--ts-body-bg': '#0f1a0f',
  },
};

function AppContent() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [theme, setTheme] = useState(() => localStorage.getItem('ts-theme') || 'light');

  useEffect(() => {
    const vars = themes[theme];
    Object.entries(vars).forEach(([key, val]) => {
      document.documentElement.style.setProperty(key, val);
    });
    document.body.style.background = themes[theme]['--ts-body-bg'];
    localStorage.setItem('ts-theme', theme);
  }, [theme]);

  const screens = {
    home: HomeScreen,
    goals: GoalsScreen,
    visionBoard: VisionBoardScreen,
    progress: ProgressScreen,
    profile: ProfileScreen,
  };

  const CurrentScreen = screens[currentScreen];

  const navItems = [
    { key: 'home', label: 'Home' },
    { key: 'goals', label: 'Goals' },
    { key: 'visionBoard', label: 'Vision' },
    { key: 'progress', label: 'Progress' },
    { key: 'profile', label: 'Profile' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--ts-body-bg)', transition: 'background 0.3s ease' }}>
      <nav style={{
        borderBottom: '1px solid var(--ts-nav-border)',
        background: 'var(--ts-nav-bg)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        transition: 'background 0.3s ease',
      }}>
        <div style={{ maxWidth: 640, margin: '0 auto', padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: 4 }}>
          {navItems.map(item => (
            <button
              key={item.key}
              onClick={() => setCurrentScreen(item.key)}
              style={{
                padding: '6px 12px',
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 500,
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                background: currentScreen === item.key ? 'var(--ts-nav-active)' : 'transparent',
                color: currentScreen === item.key ? 'var(--ts-nav-active-text)' : 'var(--ts-nav-text)',
              }}
            >
              {item.label}
            </button>
          ))}

          <button
            onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
            style={{
              marginLeft: 'auto',
              background: 'transparent',
              border: '1px solid var(--ts-border)',
              borderRadius: 8,
              padding: '5px 10px',
              cursor: 'pointer',
              fontSize: 16,
              color: 'var(--ts-nav-text)',
              transition: 'all 0.2s ease',
            }}
            title="Toggle theme"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </nav>

      <main style={{ maxWidth: 640, margin: '0 auto', padding: '1.5rem 1rem' }}>
        {CurrentScreen && <CurrentScreen />}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <DataProvider>
      <AppContent />
    </DataProvider>
  );
}

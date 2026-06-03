import { useState } from 'react';
import { DataProvider } from './data/DataContext';
import HomeScreen from './components/screens/HomeScreen';
import GoalsScreen from './components/screens/GoalsScreen';
import VisionBoardScreen from './components/screens/VisionBoardScreen';
import ProgressScreen from './components/screens/ProgressScreen';
import ProfileScreen from './components/screens/ProfileScreen';
import './App.css';

function AppContent() {
  const [currentScreen, setCurrentScreen] = useState('home');

  const screens = {
    home: HomeScreen,
    goals: GoalsScreen,
    visionBoard: VisionBoardScreen,
    progress: ProgressScreen,
    profile: ProfileScreen,
  };

  const CurrentScreen = screens[currentScreen];

  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-calm-100 bg-white sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-1">
          <button
            onClick={() => setCurrentScreen('home')}
            className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
              currentScreen === 'home'
                ? 'bg-calm-500 text-white'
                : 'text-calm-700 hover:bg-calm-50'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => setCurrentScreen('goals')}
            className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
              currentScreen === 'goals'
                ? 'bg-calm-500 text-white'
                : 'text-calm-700 hover:bg-calm-50'
            }`}
          >
            Goals
          </button>
          <button
            onClick={() => setCurrentScreen('visionBoard')}
            className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
              currentScreen === 'visionBoard'
                ? 'bg-calm-500 text-white'
                : 'text-calm-700 hover:bg-calm-50'
            }`}
          >
            Vision
          </button>
          <button
            onClick={() => setCurrentScreen('progress')}
            className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
              currentScreen === 'progress'
                ? 'bg-calm-500 text-white'
                : 'text-calm-700 hover:bg-calm-50'
            }`}
          >
            Progress
          </button>
          <button
            onClick={() => setCurrentScreen('profile')}
            className={`px-3 py-2 rounded text-sm font-medium transition-colors ml-auto ${
              currentScreen === 'profile'
                ? 'bg-calm-500 text-white'
                : 'text-calm-700 hover:bg-calm-50'
            }`}
          >
            Profile
          </button>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-6">
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

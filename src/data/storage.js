// localStorage utilities for TinySteps data persistence

const STORAGE_KEYS = {
  GOALS: 'tinysteps_goals',
  PROGRESS: 'tinysteps_progress',
  VISION_BOARD: 'tinysteps_vision_board',
  SETTINGS: 'tinysteps_settings',
};

export const storage = {
  // Goals
  getGoals: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.GOALS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Error loading goals:', e);
      return [];
    }
  },

  saveGoals: (goals) => {
    try {
      localStorage.setItem(STORAGE_KEYS.GOALS, JSON.stringify(goals));
    } catch (e) {
      console.error('Error saving goals:', e);
    }
  },

  // Progress
  getProgress: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PROGRESS);
      return data ? JSON.parse(data) : {};
    } catch (e) {
      console.error('Error loading progress:', e);
      return {};
    }
  },

  saveProgress: (progress) => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress));
    } catch (e) {
      console.error('Error saving progress:', e);
    }
  },

  // Vision Board
  getVisionBoard: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.VISION_BOARD);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Error loading vision board:', e);
      return [];
    }
  },

  saveVisionBoard: (board) => {
    try {
      localStorage.setItem(STORAGE_KEYS.VISION_BOARD, JSON.stringify(board));
    } catch (e) {
      console.error('Error saving vision board:', e);
    }
  },

  // Settings
  getSettings: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return data ? JSON.parse(data) : { theme: 'light', notifications: true };
    } catch (e) {
      console.error('Error loading settings:', e);
      return { theme: 'light', notifications: true };
    }
  },

  saveSettings: (settings) => {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.error('Error saving settings:', e);
    }
  },

  // Clear all data (for testing)
  clearAll: () => {
    Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
  },
};

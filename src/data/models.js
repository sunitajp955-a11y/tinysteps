const KEYS = {
  GOALS: 'ts_goals',
  VISION_BOARD: 'ts_vision_board',
  SETTINGS: 'ts_settings',
};

const DEFAULT_SETTINGS = {
  theme: 'light',const KEYS = {
  GOALS: 'ts_goals',
  VISION_BOARD: 'ts_vision_board',
  SETTINGS: 'ts_settings',
};

const DEFAULT_SETTINGS = {
  theme: 'light',
  notifications: true,
};

function safeGet(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function safeSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('TinySteps: failed to save to localStorage', e);
  }
}

export const storage = {
  getGoals() { return safeGet(KEYS.GOALS, []); },
  saveGoals(goals) { safeSet(KEYS.GOALS, goals); },
  getVisionBoard() { return safeGet(KEYS.VISION_BOARD, []); },
  saveVisionBoard(board) { safeSet(KEYS.VISION_BOARD, board); },
  getSettings() { return { ...DEFAULT_SETTINGS, ...safeGet(KEYS.SETTINGS, {}) }; },
  saveSettings(settings) { safeSet(KEYS.SETTINGS, settings); },
  clearAll() { Object.values(KEYS).forEach(key => localStorage.removeItem(key)); },
};
  notifications: true,
};

function safeGet(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function safeSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('TinySteps: failed to save to localStorage', e);
  }
}

export const storage = {
  getGoals() { return safeGet(KEYS.GOALS, []); },
  saveGoals(goals) { safeSet(KEYS.GOALS, goals); },
  getVisionBoard() { return safeGet(KEYS.VISION_BOARD, []); },
  saveVisionBoard(board) { safeSet(KEYS.VISION_BOARD, board); },
  getSettings() { return { ...DEFAULT_SETTINGS, ...safeGet(KEYS.SETTINGS, {}) }; },
  saveSettings(settings) { safeSet(KEYS.SETTINGS, settings); },
  clearAll() { Object.values(KEYS).forEach(key => localStorage.removeItem(key)); },
};
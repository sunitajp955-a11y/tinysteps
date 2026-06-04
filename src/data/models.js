function generateId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export function createGoal({ title, description = '', why = '', difficulty = '', realistic = '', easier = '' }) {
  return {
    id: generateId(),
    title, description, why, difficulty, realistic, easier,
    status: 'active',
    smallerGoals: [],
    milestones: [],
    tinySteps: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    completedAt: null,
  };
}

export function createSmallerGoal({ goalId, title, description = '' }) {
  return {
    id: generateId(), goalId, title, description,
    status: 'active',
    createdAt: new Date().toISOString(),
    completedAt: null,
  };
}

export function createMilestone({ goalId, title, description = '' }) {
  return {
    id: generateId(), goalId, title, description,
    status: 'pending',
    createdAt: new Date().toISOString(),
    reachedAt: null,
  };
}

export function createTinyStep({ goalId, title, description = '' }) {
  return {
    id: generateId(), goalId, title, description,
    status: 'pending',
    createdAt: new Date().toISOString(),
    completedAt: null,
  };
}

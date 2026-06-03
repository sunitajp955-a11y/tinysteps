// Data models for TinySteps

export const createGoal = (data = {}) => ({
  id: data.id || generateId(),
  title: data.title || '',
  description: data.description || '',
  
  // Clarification responses
  why: data.why || '',
  progress: data.progress || '',
  difficulty: data.difficulty || '',
  realistic: data.realistic || '',
  easier: data.easier || '',
  
  // Breakdown
  smallerGoals: data.smallerGoals || [],
  milestones: data.milestones || [],
  tinySteps: data.tinySteps || [],
  
  // Metadata
  createdAt: data.createdAt || new Date().toISOString(),
  updatedAt: data.updatedAt || new Date().toISOString(),
  status: data.status || 'active', // active, paused, completed
  completedAt: data.completedAt || null,
});

export const createSmallerGoal = (data = {}) => ({
  id: data.id || generateId(),
  goalId: data.goalId || '',
  title: data.title || '',
  description: data.description || '',
  order: data.order || 0,
  status: data.status || 'pending', // pending, in_progress, completed
  completedAt: data.completedAt || null,
});

export const createMilestone = (data = {}) => ({
  id: data.id || generateId(),
  goalId: data.goalId || '',
  title: data.title || '',
  description: data.description || '',
  order: data.order || 0,
  status: data.status || 'pending',
  completedAt: data.completedAt || null,
});

export const createTinyStep = (data = {}) => ({
  id: data.id || generateId(),
  goalId: data.goalId || '',
  title: data.title || '',
  description: data.description || '',
  order: data.order || 0,
  status: data.status || 'pending', // pending, completed
  completedAt: data.completedAt || null,
  createdAt: data.createdAt || new Date().toISOString(),
  dueDate: data.dueDate || null,
});

export const createVisionBoardItem = (data = {}) => ({
  id: data.id || generateId(),
  type: data.type || 'note', // note, image, quote
  content: data.content || '',
  imageUrl: data.imageUrl || '',
  relatedGoalIds: data.relatedGoalIds || [],
  position: data.position || { x: 0, y: 0 },
  size: data.size || { width: 200, height: 200 },
  createdAt: data.createdAt || new Date().toISOString(),
});

export const createProgressEntry = (data = {}) => ({
  id: data.id || generateId(),
  goalId: data.goalId || '',
  stepId: data.stepId || '',
  type: data.type || 'step_completed', // step_completed, goal_completed, reflection
  reflection: data.reflection || '',
  date: data.date || new Date().toISOString(),
});

function generateId() {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

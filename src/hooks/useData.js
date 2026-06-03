import { useContext, useCallback } from 'react';
import { DataContext } from '../data/DataContext';

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within DataProvider');
  }
  return context;
}

export function useGoals() {
  const { goals, dispatch, actions } = useData();

  const addGoal = useCallback((goalData) => {
    dispatch({
      type: actions.ADD_GOAL,
      payload: goalData,
    });
  }, [dispatch, actions]);

  const updateGoal = useCallback((goalId, goalData) => {
    dispatch({
      type: actions.UPDATE_GOAL,
      payload: { id: goalId, data: goalData },
    });
  }, [dispatch, actions]);

  const deleteGoal = useCallback((goalId) => {
    dispatch({
      type: actions.DELETE_GOAL,
      payload: goalId,
    });
  }, [dispatch, actions]);

  const setCurrentGoal = useCallback((goalId) => {
    dispatch({
      type: actions.SET_CURRENT_GOAL,
      payload: goalId,
    });
  }, [dispatch, actions]);

  const getGoalById = useCallback((goalId) => {
    return goals.find(g => g.id === goalId);
  }, [goals]);

  return {
    goals,
    addGoal,
    updateGoal,
    deleteGoal,
    setCurrentGoal,
    getGoalById,
  };
}

export function useSmallerGoals(goalId) {
  const { dispatch, actions } = useData();
  const { getGoalById } = useGoals();

  const goal = getGoalById(goalId);
  const smallerGoals = goal?.smallerGoals || [];

  const addSmallerGoal = useCallback((data) => {
    dispatch({
      type: actions.ADD_SMALLER_GOAL,
      payload: { ...data, goalId },
    });
  }, [dispatch, actions, goalId]);

  const updateSmallerGoal = useCallback((smallerGoalId, data) => {
    dispatch({
      type: actions.UPDATE_SMALLER_GOAL,
      payload: { id: smallerGoalId, goalId, data },
    });
  }, [dispatch, actions, goalId]);

  const deleteSmallerGoal = useCallback((smallerGoalId) => {
    dispatch({
      type: actions.DELETE_SMALLER_GOAL,
      payload: { id: smallerGoalId, goalId },
    });
  }, [dispatch, actions, goalId]);

  return {
    smallerGoals,
    addSmallerGoal,
    updateSmallerGoal,
    deleteSmallerGoal,
  };
}

export function useMilestones(goalId) {
  const { dispatch, actions } = useData();
  const { getGoalById } = useGoals();

  const goal = getGoalById(goalId);
  const milestones = goal?.milestones || [];

  const addMilestone = useCallback((data) => {
    dispatch({
      type: actions.ADD_MILESTONE,
      payload: { ...data, goalId },
    });
  }, [dispatch, actions, goalId]);

  const updateMilestone = useCallback((milestoneId, data) => {
    dispatch({
      type: actions.UPDATE_MILESTONE,
      payload: { id: milestoneId, goalId, data },
    });
  }, [dispatch, actions, goalId]);

  const deleteMilestone = useCallback((milestoneId) => {
    dispatch({
      type: actions.DELETE_MILESTONE,
      payload: { id: milestoneId, goalId },
    });
  }, [dispatch, actions, goalId]);

  return {
    milestones,
    addMilestone,
    updateMilestone,
    deleteMilestone,
  };
}

export function useTinySteps(goalId) {
  const { dispatch, actions } = useData();
  const { getGoalById } = useGoals();

  const goal = getGoalById(goalId);
  const tinySteps = goal?.tinySteps || [];

  const addTinyStep = useCallback((data) => {
    dispatch({
      type: actions.ADD_TINY_STEP,
      payload: { ...data, goalId },
    });
  }, [dispatch, actions, goalId]);

  const updateTinyStep = useCallback((stepId, data) => {
    dispatch({
      type: actions.UPDATE_TINY_STEP,
      payload: { id: stepId, goalId, data },
    });
  }, [dispatch, actions, goalId]);

  const deleteTinyStep = useCallback((stepId) => {
    dispatch({
      type: actions.DELETE_TINY_STEP,
      payload: { id: stepId, goalId },
    });
  }, [dispatch, actions, goalId]);

  return {
    tinySteps,
    addTinyStep,
    updateTinyStep,
    deleteTinyStep,
  };
}

export function useVisionBoard() {
  const { visionBoard, dispatch, actions } = useData();

  const addItem = useCallback((itemData) => {
    dispatch({
      type: actions.ADD_VISION_ITEM,
      payload: itemData,
    });
  }, [dispatch, actions]);

  const updateItem = useCallback((itemId, data) => {
    dispatch({
      type: actions.UPDATE_VISION_ITEM,
      payload: { id: itemId, data },
    });
  }, [dispatch, actions]);

  const deleteItem = useCallback((itemId) => {
    dispatch({
      type: actions.DELETE_VISION_ITEM,
      payload: itemId,
    });
  }, [dispatch, actions]);

  return {
    visionBoard,
    addItem,
    updateItem,
    deleteItem,
  };
}

export function useSettings() {
  const { settings, dispatch, actions } = useData();

  const updateSettings = useCallback((newSettings) => {
    dispatch({
      type: actions.UPDATE_SETTINGS,
      payload: newSettings,
    });
  }, [dispatch, actions]);

  return {
    settings,
    updateSettings,
  };
}

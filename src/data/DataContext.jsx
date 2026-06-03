import React, { createContext, useReducer, useCallback, useEffect } from 'react';
import { storage } from './storage';
import { createGoal, createSmallerGoal, createMilestone, createTinyStep } from './models';

export const DataContext = createContext();

const initialState = {
  goals: [],
  visionBoard: [],
  settings: { theme: 'light', notifications: true },
  currentGoalId: null,
};

const actions = {
  LOAD_DATA: 'LOAD_DATA',
  
  // Goals
  ADD_GOAL: 'ADD_GOAL',
  UPDATE_GOAL: 'UPDATE_GOAL',
  DELETE_GOAL: 'DELETE_GOAL',
  SET_CURRENT_GOAL: 'SET_CURRENT_GOAL',
  
  // Smaller Goals
  ADD_SMALLER_GOAL: 'ADD_SMALLER_GOAL',
  UPDATE_SMALLER_GOAL: 'UPDATE_SMALLER_GOAL',
  DELETE_SMALLER_GOAL: 'DELETE_SMALLER_GOAL',
  
  // Milestones
  ADD_MILESTONE: 'ADD_MILESTONE',
  UPDATE_MILESTONE: 'UPDATE_MILESTONE',
  DELETE_MILESTONE: 'DELETE_MILESTONE',
  
  // Tiny Steps
  ADD_TINY_STEP: 'ADD_TINY_STEP',
  UPDATE_TINY_STEP: 'UPDATE_TINY_STEP',
  DELETE_TINY_STEP: 'DELETE_TINY_STEP',
  
  // Vision Board
  ADD_VISION_ITEM: 'ADD_VISION_ITEM',
  UPDATE_VISION_ITEM: 'UPDATE_VISION_ITEM',
  DELETE_VISION_ITEM: 'DELETE_VISION_ITEM',
  
  // Settings
  UPDATE_SETTINGS: 'UPDATE_SETTINGS',
};

function dataReducer(state, action) {
  switch (action.type) {
    case actions.LOAD_DATA:
      return {
        ...state,
        goals: action.payload.goals,
        visionBoard: action.payload.visionBoard,
        settings: action.payload.settings,
      };

    case actions.ADD_GOAL: {
      const newGoal = createGoal(action.payload);
      const updatedGoals = [...state.goals, newGoal];
      storage.saveGoals(updatedGoals);
      return { ...state, goals: updatedGoals, currentGoalId: newGoal.id };
    }

    case actions.UPDATE_GOAL: {
      const updatedGoals = state.goals.map(g =>
        g.id === action.payload.id ? { ...g, ...action.payload.data, updatedAt: new Date().toISOString() } : g
      );
      storage.saveGoals(updatedGoals);
      return { ...state, goals: updatedGoals };
    }

    case actions.DELETE_GOAL: {
      const updatedGoals = state.goals.filter(g => g.id !== action.payload);
      storage.saveGoals(updatedGoals);
      const newCurrentId = state.currentGoalId === action.payload ? null : state.currentGoalId;
      return { ...state, goals: updatedGoals, currentGoalId: newCurrentId };
    }

    case actions.SET_CURRENT_GOAL:
      return { ...state, currentGoalId: action.payload };

    case actions.ADD_SMALLER_GOAL: {
      const updatedGoals = state.goals.map(g =>
        g.id === action.payload.goalId
          ? { ...g, smallerGoals: [...g.smallerGoals, createSmallerGoal(action.payload)] }
          : g
      );
      storage.saveGoals(updatedGoals);
      return { ...state, goals: updatedGoals };
    }

    case actions.UPDATE_SMALLER_GOAL: {
      const updatedGoals = state.goals.map(g =>
        g.id === action.payload.goalId
          ? {
              ...g,
              smallerGoals: g.smallerGoals.map(sg =>
                sg.id === action.payload.id ? { ...sg, ...action.payload.data } : sg
              ),
            }
          : g
      );
      storage.saveGoals(updatedGoals);
      return { ...state, goals: updatedGoals };
    }

    case actions.DELETE_SMALLER_GOAL: {
      const updatedGoals = state.goals.map(g =>
        g.id === action.payload.goalId
          ? { ...g, smallerGoals: g.smallerGoals.filter(sg => sg.id !== action.payload.id) }
          : g
      );
      storage.saveGoals(updatedGoals);
      return { ...state, goals: updatedGoals };
    }

    case actions.ADD_MILESTONE: {
      const updatedGoals = state.goals.map(g =>
        g.id === action.payload.goalId
          ? { ...g, milestones: [...g.milestones, createMilestone(action.payload)] }
          : g
      );
      storage.saveGoals(updatedGoals);
      return { ...state, goals: updatedGoals };
    }

    case actions.UPDATE_MILESTONE: {
      const updatedGoals = state.goals.map(g =>
        g.id === action.payload.goalId
          ? {
              ...g,
              milestones: g.milestones.map(m =>
                m.id === action.payload.id ? { ...m, ...action.payload.data } : m
              ),
            }
          : g
      );
      storage.saveGoals(updatedGoals);
      return { ...state, goals: updatedGoals };
    }

    case actions.DELETE_MILESTONE: {
      const updatedGoals = state.goals.map(g =>
        g.id === action.payload.goalId
          ? { ...g, milestones: g.milestones.filter(m => m.id !== action.payload.id) }
          : g
      );
      storage.saveGoals(updatedGoals);
      return { ...state, goals: updatedGoals };
    }

    case actions.ADD_TINY_STEP: {
      const updatedGoals = state.goals.map(g =>
        g.id === action.payload.goalId
          ? { ...g, tinySteps: [...g.tinySteps, createTinyStep(action.payload)] }
          : g
      );
      storage.saveGoals(updatedGoals);
      return { ...state, goals: updatedGoals };
    }

    case actions.UPDATE_TINY_STEP: {
      const updatedGoals = state.goals.map(g =>
        g.id === action.payload.goalId
          ? {
              ...g,
              tinySteps: g.tinySteps.map(ts =>
                ts.id === action.payload.id ? { ...ts, ...action.payload.data } : ts
              ),
            }
          : g
      );
      storage.saveGoals(updatedGoals);
      return { ...state, goals: updatedGoals };
    }

    case actions.DELETE_TINY_STEP: {
      const updatedGoals = state.goals.map(g =>
        g.id === action.payload.goalId
          ? { ...g, tinySteps: g.tinySteps.filter(ts => ts.id !== action.payload.id) }
          : g
      );
      storage.saveGoals(updatedGoals);
      return { ...state, goals: updatedGoals };
    }

    case actions.ADD_VISION_ITEM: {
      const updatedBoard = [...state.visionBoard, action.payload];
      storage.saveVisionBoard(updatedBoard);
      return { ...state, visionBoard: updatedBoard };
    }

    case actions.UPDATE_VISION_ITEM: {
      const updatedBoard = state.visionBoard.map(item =>
        item.id === action.payload.id ? { ...item, ...action.payload.data } : item
      );
      storage.saveVisionBoard(updatedBoard);
      return { ...state, visionBoard: updatedBoard };
    }

    case actions.DELETE_VISION_ITEM: {
      const updatedBoard = state.visionBoard.filter(item => item.id !== action.payload);
      storage.saveVisionBoard(updatedBoard);
      return { ...state, visionBoard: updatedBoard };
    }

    case actions.UPDATE_SETTINGS: {
      const updatedSettings = { ...state.settings, ...action.payload };
      storage.saveSettings(updatedSettings);
      return { ...state, settings: updatedSettings };
    }

    default:
      return state;
  }
}

export function DataProvider({ children }) {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  // Load data on mount
  useEffect(() => {
    const goals = storage.getGoals();
    const visionBoard = storage.getVisionBoard();
    const settings = storage.getSettings();
    
    dispatch({
      type: actions.LOAD_DATA,
      payload: { goals, visionBoard, settings },
    });
  }, []);

  const contextValue = {
    ...state,
    dispatch,
    actions,
  };

  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  );
}

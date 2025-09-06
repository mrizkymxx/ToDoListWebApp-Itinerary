import React, { createContext, useReducer, useEffect } from 'react';
import type { Task, Project, AppState, ViewMode } from '../types';
import { isToday, isTomorrow, isThisWeek } from 'date-fns';

interface SavedTask {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  projectId: string;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
  labels: string[];
}

interface SavedProject {
  id: string;
  name: string;
  color: string;
  icon?: string;
  tasksCount: number;
  createdAt: string;
}

interface AppContextType extends AppState {
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
  addProject: (project: Omit<Project, 'id' | 'createdAt' | 'tasksCount'>) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  setSelectedView: (view: ViewMode, projectId?: string, filterId?: string) => void;
  getFilteredTasks: () => Task[];
}

type AppAction =
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'UPDATE_TASK'; payload: { id: string; updates: Partial<Task> } }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'TOGGLE_TASK'; payload: string }
  | { type: 'ADD_PROJECT'; payload: Project }
  | { type: 'UPDATE_PROJECT'; payload: { id: string; updates: Partial<Project> } }
  | { type: 'DELETE_PROJECT'; payload: string }
  | { type: 'SET_VIEW'; payload: { view: ViewMode; projectId?: string; filterId?: string } }
  | { type: 'LOAD_DATA'; payload: Partial<AppState> };

const initialState: AppState = {
  tasks: [],
  projects: [
    {
      id: 'inbox',
      name: 'Inbox',
      color: '#3b82f6',
      tasksCount: 0,
      createdAt: new Date(),
    },
  ],
  filters: [
    {
      id: 'today',
      name: 'Today',
      icon: 'Calendar',
      query: 'today',
      count: 0,
    },
    {
      id: 'upcoming',
      name: 'Upcoming',
      icon: 'CalendarDays',
      query: 'upcoming',
      count: 0,
    },
  ],
  selectedView: 'today',
  selectedProjectId: undefined,
  selectedFilterId: 'today',
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'ADD_TASK': {
      const newTasks = [...state.tasks, action.payload];
      return {
        ...state,
        tasks: newTasks,
        projects: state.projects.map(p => 
          p.id === action.payload.projectId 
            ? { ...p, tasksCount: p.tasksCount + 1 }
            : p
        ),
      };
    }
    case 'UPDATE_TASK': {
      const updatedTasks = state.tasks.map(task =>
        task.id === action.payload.id
          ? { ...task, ...action.payload.updates, updatedAt: new Date() }
          : task
      );
      return { ...state, tasks: updatedTasks };
    }
    case 'DELETE_TASK': {
      const taskToDelete = state.tasks.find(t => t.id === action.payload);
      const newTasks = state.tasks.filter(task => task.id !== action.payload);
      return {
        ...state,
        tasks: newTasks,
        projects: state.projects.map(p => 
          taskToDelete && p.id === taskToDelete.projectId 
            ? { ...p, tasksCount: Math.max(0, p.tasksCount - 1) }
            : p
        ),
      };
    }
    case 'TOGGLE_TASK': {
      const updatedTasks = state.tasks.map(task =>
        task.id === action.payload
          ? { ...task, completed: !task.completed, updatedAt: new Date() }
          : task
      );
      return { ...state, tasks: updatedTasks };
    }
    case 'ADD_PROJECT': {
      return {
        ...state,
        projects: [...state.projects, action.payload],
      };
    }
    case 'UPDATE_PROJECT': {
      return {
        ...state,
        projects: state.projects.map(project =>
          project.id === action.payload.id
            ? { ...project, ...action.payload.updates }
            : project
        ),
      };
    }
    case 'DELETE_PROJECT': {
      const newTasks = state.tasks.filter(task => task.projectId !== action.payload);
      return {
        ...state,
        tasks: newTasks,
        projects: state.projects.filter(project => project.id !== action.payload),
      };
    }
    case 'SET_VIEW': {
      return {
        ...state,
        selectedView: action.payload.view,
        selectedProjectId: action.payload.projectId,
        selectedFilterId: action.payload.filterId,
      };
    }
    case 'LOAD_DATA': {
      return { ...state, ...action.payload };
    }
    default:
      return state;
  }
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export { AppContext };

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('itinerary-data');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        // Convert date strings back to Date objects
        const tasks = parsed.tasks?.map((task: SavedTask) => ({
          ...task,
          createdAt: new Date(task.createdAt),
          updatedAt: new Date(task.updatedAt),
          dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
        })) || [];
        
        const projects = parsed.projects?.map((project: SavedProject) => ({
          ...project,
          createdAt: new Date(project.createdAt),
        })) || initialState.projects;

        dispatch({
          type: 'LOAD_DATA',
          payload: { ...parsed, tasks, projects },
        });
      } catch (error) {
        console.error('Failed to load saved data:', error);
      }
    }
  }, []);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('itinerary-data', JSON.stringify(state));
  }, [state]);

  const addTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    dispatch({ type: 'ADD_TASK', payload: newTask });
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    dispatch({ type: 'UPDATE_TASK', payload: { id, updates } });
  };

  const deleteTask = (id: string) => {
    dispatch({ type: 'DELETE_TASK', payload: id });
  };

  const toggleTask = (id: string) => {
    dispatch({ type: 'TOGGLE_TASK', payload: id });
  };

  const addProject = (projectData: Omit<Project, 'id' | 'createdAt' | 'tasksCount'>) => {
    const newProject: Project = {
      ...projectData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      tasksCount: 0,
    };
    dispatch({ type: 'ADD_PROJECT', payload: newProject });
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    dispatch({ type: 'UPDATE_PROJECT', payload: { id, updates } });
  };

  const deleteProject = (id: string) => {
    dispatch({ type: 'DELETE_PROJECT', payload: id });
  };

  const setSelectedView = (view: ViewMode, projectId?: string, filterId?: string) => {
    dispatch({ type: 'SET_VIEW', payload: { view, projectId, filterId } });
  };

  const getFilteredTasks = (): Task[] => {
    const { selectedView, selectedProjectId } = state;
    
    switch (selectedView) {
      case 'today':
        return state.tasks.filter(task => 
          !task.completed && 
          (task.dueDate ? isToday(task.dueDate) : false)
        );
      case 'upcoming':
        return state.tasks.filter(task => 
          !task.completed && 
          task.dueDate && 
          (isTomorrow(task.dueDate) || isThisWeek(task.dueDate))
        );
      case 'project':
        return selectedProjectId 
          ? state.tasks.filter(task => task.projectId === selectedProjectId)
          : [];
      default:
        return state.tasks;
    }
  };

  const value: AppContextType = {
    ...state,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
    addProject,
    updateProject,
    deleteProject,
    setSelectedView,
    getFilteredTasks,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

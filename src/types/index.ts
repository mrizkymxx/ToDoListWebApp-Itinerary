export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  projectId: string;
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  labels: string[];
}

export interface Project {
  id: string;
  name: string;
  color: string;
  icon?: string;
  tasksCount: number;
  createdAt: Date;
}

export interface Filter {
  id: string;
  name: string;
  icon: string;
  query: string;
  count: number;
}

export type ViewMode = 'today' | 'upcoming' | 'project' | 'label' | 'filter';

export interface AppState {
  tasks: Task[];
  projects: Project[];
  filters: Filter[];
  selectedView: ViewMode;
  selectedProjectId?: string;
  selectedFilterId?: string;
}

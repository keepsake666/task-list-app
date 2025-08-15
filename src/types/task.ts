export interface Task {
  id: string;
  text: string;
  completed: boolean;
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type FilterType = 'all' | 'active' | 'completed';

export interface TaskState {
  tasks: Task[];
  filter: FilterType;
}
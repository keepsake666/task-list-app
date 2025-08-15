import { useState, useEffect, useCallback, useMemo } from 'react';
import { Task, FilterType, TaskState } from '../types/task';

const STORAGE_KEY = 'taskList';

export const useTasks = () => {
  const [state, setState] = useState<TaskState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          tasks: parsed.tasks.map((task: any) => ({
            ...task,
            createdAt: new Date(task.createdAt),
            updatedAt: new Date(task.updatedAt),
          })),
          filter: parsed.filter || 'all',
        };
      } catch {
        return { tasks: [], filter: 'all' as FilterType };
      }
    }
    return { tasks: [], filter: 'all' as FilterType };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const addTask = useCallback((text: string, dueDate?: Date) => {
    const newTask: Task = {
      id: Date.now().toString(),
      text: text.trim(),
      completed: false,
      dueDate,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setState(prev => ({
      ...prev,
      tasks: [newTask, ...prev.tasks],
    }));
  }, []);

  const toggleTask = useCallback((id: string) => {
    setState(prev => ({
      ...prev,
      tasks: prev.tasks.map(task =>
        task.id === id
          ? { ...task, completed: !task.completed, updatedAt: new Date() }
          : task
      ),
    }));
  }, []);

  const deleteTask = useCallback((id: string) => {
    setState(prev => ({
      ...prev,
      tasks: prev.tasks.filter(task => task.id !== id),
    }));
  }, []);

  const editTask = useCallback((id: string, newText: string) => {
    setState(prev => ({
      ...prev,
      tasks: prev.tasks.map(task =>
        task.id === id
          ? { ...task, text: newText.trim(), updatedAt: new Date() }
          : task
      ),
    }));
  }, []);

  const setFilter = useCallback((filter: FilterType) => {
    setState(prev => ({ ...prev, filter }));
  }, []);

  const clearCompleted = useCallback(() => {
    setState(prev => ({
      ...prev,
      tasks: prev.tasks.filter(task => !task.completed),
    }));
  }, []);

  const filteredTasks = useMemo(() => {
    switch (state.filter) {
      case 'active':
        return state.tasks.filter(task => !task.completed);
      case 'completed':
        return state.tasks.filter(task => task.completed);
      default:
        return state.tasks;
    }
  }, [state.tasks, state.filter]);

  const activeCount = useMemo(
    () => state.tasks.filter(task => !task.completed).length,
    [state.tasks]
  );

  const completedCount = useMemo(
    () => state.tasks.filter(task => task.completed).length,
    [state.tasks]
  );

  return {
    tasks: filteredTasks,
    filter: state.filter,
    activeCount,
    completedCount,
    totalCount: state.tasks.length,
    addTask,
    toggleTask,
    deleteTask,
    editTask,
    setFilter,
    clearCompleted,
  };
};
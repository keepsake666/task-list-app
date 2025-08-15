import React, { memo } from 'react';
import { CheckSquare } from 'lucide-react';
import { Task, FilterType } from '../../types/task';
import { TaskItem } from '../TaskItem/TaskItem';
import styles from './TaskList.module.css';

interface TaskListProps {
  tasks: Task[];
  filter: FilterType;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onEditTask: (id: string, text: string) => void;
}

const getEmptyMessage = (filter: FilterType) => {
  switch (filter) {
    case 'active':
      return {
        title: 'Все дела выполнены!',
        description: 'У вас нет активных задач. Время добавить новые или заслуженно отдохнуть.',
      };
    case 'completed':
      return {
        title: 'Пока нет выполненных задач',
        description: 'Выполните несколько задач, чтобы увидеть их здесь. Каждое путешествие начинается с одного шага.',
      };
    default:
      return {
        title: 'Ваш список задач пуст',
        description: 'Добавьте свою первую задачу выше, чтобы начать путь к продуктивности.',
      };
  }
};

export const TaskList: React.FC<TaskListProps> = memo(({
  tasks,
  filter,
  onToggleTask,
  onDeleteTask,
  onEditTask,
}) => {
  if (tasks.length === 0) {
    const { title, description } = getEmptyMessage(filter);
    
    return (
      <div className={styles.container}>
        <div className={styles.emptyState}>
          <CheckSquare className={styles.emptyIcon} />
          <h3 className={styles.emptyTitle}>{title}</h3>
          <p className={styles.emptyDescription}>{description}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggleTask}
          onDelete={onDeleteTask}
          onEdit={onEditTask}
        />
      ))}
    </div>
  );
});

TaskList.displayName = 'TaskList';
import React, { useState, memo, useCallback } from 'react';
import { Check, Edit3, Trash2 } from 'lucide-react';
import { Task } from '../../types/task';
import styles from './TaskItem.module.css';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = memo(({
  task,
  onToggle,
  onDelete,
  onEdit,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleToggle = useCallback(() => {
    onToggle(task.id);
  }, [task.id, onToggle]);

  const handleDelete = useCallback(() => {
    onDelete(task.id);
  }, [task.id, onDelete]);

  const handleEdit = useCallback(() => {
    setIsEditing(true);
    setEditText(task.text);
  }, [task.text]);

  const handleSave = useCallback(() => {
    const trimmedText = editText.trim();
    if (trimmedText && trimmedText !== task.text) {
      onEdit(task.id, trimmedText);
    }
    setIsEditing(false);
  }, [editText, task.id, task.text, onEdit]);

  const handleCancel = useCallback(() => {
    setIsEditing(false);
    setEditText(task.text);
  }, [task.text]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  }, [handleSave, handleCancel]);

  const formatDate = useCallback((date: Date) => {
    return new Intl.RelativeTimeFormat('ru', { numeric: 'auto' }).format(
      Math.ceil((date.getTime() - Date.now()) / (1000 * 60 * 60 * 24)),
      'day'
    );
  }, []);

  const formatDueDate = useCallback((date: Date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const isToday = date.toDateString() === today.toDateString();
    const isTomorrow = date.toDateString() === tomorrow.toDateString();
    const isOverdue = date < today && !isToday;
    
    if (isToday) return { text: 'Сегодня', className: styles.dueDateToday };
    if (isTomorrow) return { text: 'Завтра', className: styles.dueDateUpcoming };
    if (isOverdue) return { text: 'Просрочено', className: styles.dueDateOverdue };
    
    return { 
      text: date.toLocaleDateString('ru-RU', { 
        day: 'numeric', 
        month: 'short' 
      }), 
      className: styles.dueDateUpcoming 
    };
  }, []);

  return (
    <div
      className={`${styles.taskItem} ${task.completed ? styles.completed : ''} ${
        isEditing ? styles.editing : ''
      }`}
    >
      <div
        className={`${styles.checkbox} ${task.completed ? styles.completed : ''}`}
        onClick={handleToggle}
      >
        <Check size={14} className={styles.checkmark} />
      </div>

      <div className={styles.taskContent}>
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            className={styles.input}
            autoFocus
            maxLength={200}
          />
        ) : (
          <>
            <div className={`${styles.taskText} ${task.completed ? styles.completed : ''}`}>
              {task.text}
            </div>
            <div className={styles.taskMeta}>
              <span>Создано {formatDate(task.createdAt)}</span>
              {task.updatedAt.getTime() !== task.createdAt.getTime() && (
                <span>Обновлено {formatDate(task.updatedAt)}</span>
              )}
              {task.dueDate && (
                <span className={`${styles.dueDate} ${formatDueDate(task.dueDate).className}`}>
                  {formatDueDate(task.dueDate).text}
                </span>
              )}
            </div>
          </>
        )}
      </div>

      <div className={styles.actions}>
        <button
          onClick={handleEdit}
          className={`${styles.actionButton} ${styles.editButton}`}
          title="Редактировать задачу"
        >
          <Edit3 size={16} />
        </button>
        <button
          onClick={handleDelete}
          className={`${styles.actionButton} ${styles.deleteButton}`}
          title="Удалить задачу"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
});

TaskItem.displayName = 'TaskItem';
import React, { memo } from 'react';
import { FilterType } from '../../types/task';
import styles from './FilterButtons.module.css';

interface FilterButtonsProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  onClearCompleted: () => void;
  completedCount: number;
}

const filters: { key: FilterType; label: string }[] = [
  { key: 'all', label: 'Все' },
  { key: 'active', label: 'Активные' },
  { key: 'completed', label: 'Выполненные' },
];

export const FilterButtons: React.FC<FilterButtonsProps> = memo(({
  currentFilter,
  onFilterChange,
  onClearCompleted,
  completedCount,
}) => {
  return (
    <div className={styles.filters}>
      {filters.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => onFilterChange(key)}
          className={`${styles.button} ${currentFilter === key ? styles.active : ''}`}
        >
          {label}
        </button>
      ))}
      <button
        onClick={onClearCompleted}
        disabled={completedCount === 0}
        className={styles.clearButton}
      >
        Очистить выполненные
      </button>
    </div>
  );
});

FilterButtons.displayName = 'FilterButtons';
import React, { memo } from 'react';
import styles from './Header.module.css';

interface HeaderProps {
  activeCount: number;
  completedCount: number;
  totalCount: number;
}

export const Header: React.FC<HeaderProps> = memo(({ activeCount, completedCount, totalCount }) => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Список Задач</h1>
      <p className={styles.subtitle}>Организуйте свои задачи стильно</p>
      
      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.statNumber}>{totalCount}</span>
          <span className={styles.statLabel}>Всего</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statNumber}>{activeCount}</span>
          <span className={styles.statLabel}>Активных</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statNumber}>{completedCount}</span>
          <span className={styles.statLabel}>Готово</span>
        </div>
      </div>
    </header>
  );
});

Header.displayName = 'Header';
import React, { useState, memo, useCallback } from "react";
import { Plus } from "lucide-react";
import styles from "./TaskForm.module.css";

interface TaskFormProps {
  onAddTask: (text: string, dueDate?: Date) => void;
}

export const TaskForm: React.FC<TaskFormProps> = memo(({ onAddTask }) => {
  const [text, setText] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const trimmedText = text.trim();
      if (trimmedText) {
        const dueDateObj = dueDate ? new Date(dueDate) : undefined;
        onAddTask(trimmedText, dueDateObj);
        setText("");
        setDueDate("");
      }
    },
    [text, dueDate, onAddTask]
  );

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  }, []);

  const handleDateChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setDueDate(e.target.value);
    },
    []
  );

  const today = new Date().toISOString().split("T")[0];

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputRow}>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            value={text}
            onChange={handleChange}
            placeholder="Что нужно сделать?"
            className={styles.input}
            maxLength={200}
          />
        </div>
        <div className={styles.dateWrapper}>
          <input
            type="date"
            value={dueDate}
            onChange={handleDateChange}
            min={today}
            className={styles.dateInput}
          />
        </div>
      </div>
      <button type="submit" disabled={!text.trim()} className={styles.button}>
        <Plus size={20} />
        Добавить задачу
      </button>
    </form>
  );
});

TaskForm.displayName = "TaskForm";

import { Header } from "./components/Header/Header";
import { TaskForm } from "./components/TaskForm/TaskForm";
import { FilterButtons } from "./components/FilterButtons/FilterButtons";
import { TaskList } from "./components/TaskList/TaskList";
import { useTasks } from "./hooks/useTasks";
import styles from "./App.module.css";

function App() {
  const {
    tasks,
    filter,
    activeCount,
    completedCount,
    totalCount,
    addTask,
    toggleTask,
    deleteTask,
    editTask,
    setFilter,
    clearCompleted,
  } = useTasks();

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <Header
          activeCount={activeCount}
          completedCount={completedCount}
          totalCount={totalCount}
        />

        <TaskForm onAddTask={addTask} />

        <FilterButtons
          currentFilter={filter}
          onFilterChange={setFilter}
          onClearCompleted={clearCompleted}
          completedCount={completedCount}
        />

        <TaskList
          tasks={tasks}
          filter={filter}
          onToggleTask={toggleTask}
          onDeleteTask={deleteTask}
          onEditTask={editTask}
        />
      </div>
    </div>
  );
}

export default App;

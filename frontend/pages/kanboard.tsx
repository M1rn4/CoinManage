import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';

const KanbanBoard: NextPage = () => {
  const [taskName, setTaskName] = useState('');
  const [todoTasks, setTodoTasks] = useState<string[]>([]);
  const [inProgressTasks, setInProgressTasks] = useState<string[]>([]);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const router = useRouter();

  const moveTaskToInProgress = (task: string) => {
    setTodoTasks(todoTasks.filter((t) => t !== task));
    setInProgressTasks([...inProgressTasks, task]);
  };

  const moveTaskToCompleted = (task: string) => {
    setInProgressTasks(inProgressTasks.filter((t) => t !== task));
    setCompletedTasks([...completedTasks, task]);
  };

  const renderTasks = (tasks: string[], onMove: (task: string) => void) => {
    return tasks.map((task, index) => (
      <div key={index} className={styles.task} onClick={() => onMove(task)}>
        {task}
      </div>
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(todoTasks, inProgressTasks, completedTasks);
    router.push('/dashboard');
  };

  return (
    <div className={`${styles.container} ${styles.whiteBackground}`}>
      <nav className={`${styles.sidebar} ${styles.whiteBackground}`}>
        <h2 className={styles.blackText}>Menu</h2>
        <ul className={`${styles.menuList} ${styles.blackText}`}>
          <li>
            <Link href="/profile">Profile</Link>
          </li>
          <li>
            <Link href="/new-project">New Project</Link>
          </li>
        </ul>
      </nav>

      <main className={`${styles.content} ${styles.whiteBackground}`}>
        <h2 className={styles.blackText}>Kanban Board</h2>

        <div className={styles.columnsContainer}>
          <div className={styles.column}>
            <h3>Todo</h3>
            {renderTasks(todoTasks, moveTaskToInProgress)}
          </div>
          <div className={styles.column}>
            <h3>In Progress</h3>
            {renderTasks(inProgressTasks, moveTaskToCompleted)}
          </div>
          <div className={styles.column}>
            <h3>Completed</h3>
            {renderTasks(completedTasks, () => {})}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <h3 className={styles.blackText}>Add Task</h3>
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className={styles.formInput}
            placeholder="Enter task name"
          />
          <button type="submit" className={`${styles.formButton} ${styles.blackText}`}>
            Add
          </button>
        </form>
      </main>
    </div>
  );
};

export default KanbanBoard;

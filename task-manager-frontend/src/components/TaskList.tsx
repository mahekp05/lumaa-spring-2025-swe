import api from "../services/api";

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

interface TaskListProps {
  tasks: Task[];
  onTaskUpdated: () => void;
  onTaskDeleted: () => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onTaskUpdated, onTaskDeleted }) => {
  const toggleComplete = async (task: Task) => {
    try {
      await api.put(`/tasks/${task.id}`, { isComplete: !task.isComplete });
      onTaskUpdated();
    } catch (error) {
      console.error(" Error updating task:", error);
    }
  };

  const deleteTask = async (id: number) => {
    try {
      await api.delete(`/tasks/${id}`);
      onTaskDeleted();
    } catch (error) {
      console.error(" Error deleting task:", error);
    }
  };

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <span style={{ textDecoration: task.isComplete ? "line-through" : "none" }}>
            {task.title}
          </span>
          <button onClick={() => toggleComplete(task)}>Toggle Complete</button>
          <button onClick={() => deleteTask(task.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;

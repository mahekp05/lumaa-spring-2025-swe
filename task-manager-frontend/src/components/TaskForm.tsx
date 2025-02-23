import { useState } from "react";
import api from "../services/api";

interface TaskFormProps {
  onTaskAdded: () => void; // Function that gets called when a task is added
}

const TaskForm: React.FC<TaskFormProps> = ({ onTaskAdded }) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await api.post("/tasks", { title, description });
      setTitle("");
      setDescription("");
      onTaskAdded(); // Notify parent component that a new task is added
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;

import { useEffect, useState } from "react";
import api from "../services/api";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import { useNavigate } from "react-router-dom";

// ✅ Define the expected Task type
interface Task {
  id: number;
  title: string;
  description: string;
  isComplete: boolean;
}

const Dashboard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await api.get<Task[]>("/tasks");
      setTasks(response.data);
    } catch (error) {
      alert("Failed to fetch tasks. Please log in again.");
      navigate("/login");
    }
  };

  return (
    <div>
      <h2>Task Manager</h2>
      <button onClick={() => { localStorage.removeItem("token"); navigate("/login"); }}>Logout</button>
      <TaskForm onTaskAdded={fetchTasks} />
      <TaskList tasks={tasks} onTaskUpdated={fetchTasks} onTaskDeleted={fetchTasks} />
    </div>
  );
};

export default Dashboard;

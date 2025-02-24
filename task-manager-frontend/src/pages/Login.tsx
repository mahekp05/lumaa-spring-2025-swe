import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  interface AuthResponse {
    token: string;
  }  

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post<{ token: string }>("/auth/login", { username, password });
      
      localStorage.setItem("token", response.data.token); // ✅ Store token in localStorage
      alert("Login successful!");
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Login Error:", error.response?.data || error.message);
      alert(error.response?.data?.error || "Login failed. Check credentials.");
    }
  };
  
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import axios from "axios";
import "./index.css";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/login/", {
        username,
        password,
      });
      setMessage(res.data.message);
    } catch (err) {
  console.log(err.response);
  setMessage(err.response?.data?.message || "Server Error");
}
  };

  const progress = Math.min((username.length + password.length) * 5, 100);

  return (
    <div className="space-container">
      {/* Floating Rocket */}
      <div
        className="rocket"
        style={{ left: `${progress}%` }}
      >
        🚀
      </div>

      {/* Login Card */}
      <div className="login-card">
        <h1>🌌 Space Login</h1>

        <input
          type="text"
          placeholder="Astronaut Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Secret Code"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Launch</button>

        {message && (
          <p className={message.includes("success") ? "success" : "error"}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
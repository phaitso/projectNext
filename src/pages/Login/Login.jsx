// ===== Login Page =====
// Floating-label form pattern.

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";
import { useApp } from "../../context/AppContext";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const { login } = useApp();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [studentId, setStudentId] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const result = login(email, password);
    if (result.success) {
      if (remember) localStorage.setItem("sm_remember", "true");
      navigate("/");
    } else {
      setError(result.message || "Invalid credentials");
    }
  };

  return (
    <div className="login page-fade">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h1 className="login-title">Welcome Back</h1>
            <p className="login-subtitle">Sign in to your student account</p>
          </div>

          {error && <div className="login-error">{error}</div>}

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="floating-field">
              <input
                type="text"
                id="login-studentid"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder="x"
              />
              <label htmlFor="login-studentid">Student ID</label>
            </div>

            <div className="floating-field">
              <input
                type="email"
                id="login-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="x"
                required
              />
              <label htmlFor="login-email">Email *</label>
            </div>

            <div className="floating-field">
              <input
                type="password"
                id="login-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="x"
                required
              />
              <label htmlFor="login-password">Password *</label>
            </div>

            <div className="login-options">
              <label className="login-remember">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                <span>Remember me</span>
              </label>
              <a href="#" className="login-forgot">Forgot password?</a>
            </div>

            <button type="submit" className="login-btn">
              <FaSignInAlt /> Login
            </button>
          </form>

          <p className="login-register-text">
            Don't have an account? <Link to="/register" className="login-register-link">Register here</Link>
          </p>

          <div className="login-demo-hint">
            <p>Demo: Use any registered email with password "123456"</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
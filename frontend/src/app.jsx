import { useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const [view, setView] = useState("home");
  const [token, setToken] = useState(localStorage.getItem("token"));

  function handleLoginSuccess(t) {
    localStorage.setItem("token", t);
    setToken(t);
    setView("dashboard");
  }

  function goHome() {
    setView("home");
  }

  function goLogin() {
    setView("login");
  }

  if (token) {
    return <Dashboard token={token} />;
  }

  if (view === "login") {
    return (
      <Login
        onLoginSuccess={handleLoginSuccess}
        onBackHome={goHome}
      />
    );
  }

  return <Home onShowLogin={goLogin} />;
}
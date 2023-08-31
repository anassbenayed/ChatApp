import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Chat from "./screens/Chat";
import Login from "./screens/Login";
import "./App.css";
import { useSelector } from "react-redux";

function App() {
  const { isAuthenticated } = useSelector((state) => state.UserReducer);
  return (
    <div className="app">
      <Router>
        {isAuthenticated ? (
          <div className="app_body">
            <Sidebar />
            <Routes>
              <Route path="/" element={<Navigate to="/rooms" />} />
              <Route path="/rooms/:roomId" element={<Chat />} />
            </Routes>
          </div>
        ) : (
          <Login />
        )}
      </Router>
    </div>
  );
}

export default App;

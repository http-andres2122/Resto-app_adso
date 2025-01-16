//app.jsx
import React from "react";
import AppRoutes from "./routes/AppRoutes";
import AuthContextProvider from "./context/AuthContext";

export default function App() {
  return (
    <div className="App">
      <AppRoutes />
    </div>
  );
}
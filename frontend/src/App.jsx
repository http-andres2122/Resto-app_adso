import React from "react";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  console.log("Renderizando app.jsx", { location: window.location.pathname });
  return (
    <div className="App">
      <AppRoutes />
    </div>
  );
}
import app from "./app.js";
import os from "os";

// Función para obtener la IP local
function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const interfaceName in interfaces) {
    for (const iface of interfaces[interfaceName]) {
      if (iface.family === "IPv4" && !iface.internal) {
        return iface.address;
      }
    }
  }
  return "127.0.0.1"; // Dirección IP por defecto si no se encuentra otra
}

// Configuración del servidor
const PORT = process.env.PORT || 5000;
const localIP = getLocalIP();

app.listen(PORT, () => {
  console.log(`Servidor corriendo en:
  - Local: http://localhost:${PORT}
  - Red:  http://${localIP}:${PORT}`);
});

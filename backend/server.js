// backend/server.js
const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000; // Puerto para el back-end

app.use(cors()); // Habilita CORS
app.use(express.json()); // Para parsear JSON en las solicitudes

// Ruta de ejemplo
app.get('/api', (req, res) => {
  res.json({ message: '¡Hola desde el servidor Express!' });
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor Express escuchando en http://localhost:${port}`);
});
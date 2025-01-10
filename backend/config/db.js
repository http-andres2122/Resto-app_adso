// backend/db.js
import "dotenv/config";
import mysql from "mysql2";

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((error) => {
  if (error) {
    console.error("Error de conexión: " + error.stack);
    return;
  }
  console.log("Conexión MySQL exitosa");
});

// Exporta la conexión para usarla en otros archivos
export default db;

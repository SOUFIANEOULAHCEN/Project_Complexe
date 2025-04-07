// config/db.js
import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export const connectDB = () => {
  db.getConnection((err, connection) => {
    if (err) {
      console.error("Error connecting to the database:", err.message);
      return;
    }
    console.log("Database connected successfully");
    connection.release(); // Libère la connexion après la vérification
  });
};
export default db.promise();

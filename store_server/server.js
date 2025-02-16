import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import pkg from 'pg'; 
const { Pool } = pkg;  
import productRoutes from "./routes/productRoutes.js";

dotenv.config(); // Load environment variables from .env file

const app = express();

// Middleware
app.use(express.json()); // Parses incoming JSON requests
app.use(cors()); // Allows frontend to communicate with backend

dotenv.config();

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DB,
  password: process.env.PASSWORD,
  port: process.env.DBPORT
});

pool.connect()
  .then(client => {
    console.log('Connected to PostgreSQL');
    console.log(process.env.USER);  // Should print your PostgreSQL username

    client.release();
  })
  .catch(e => console.error('Error connecting to PostgreSQL', e));


// API Routes
app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 8000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


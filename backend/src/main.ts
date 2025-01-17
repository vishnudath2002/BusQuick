import express from "express";
import { connectToDatabase } from "./api/infrastructure/db/database";
import dotenv from "dotenv";
import cors from 'cors';
import userRoutes from "./api/routes/userRoutes";
// import adminRoutes from "./api/routes/adminRoutes"
import authRoutes from "./api/routes/authRoutes"
import postRoutes from "./api/routes/postRoutes"
import adminRoutes from "./api/routes/adminRoutes"

import morgan from 'morgan';

dotenv.config();

const app = express();

const corsOptions = {
    origin: 'http://localhost:5173', // Frontend URL (React app)
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true,
  };

app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan('dev'))

app.use('/', authRoutes);
app.use("/admin",adminRoutes)
// app.use('/admin',adminRoutes)
app.use('/user',userRoutes);
app.use("/media",postRoutes)


connectToDatabase();
app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
});

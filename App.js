import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";

import UserRoutes from "./Users/routes.js";

const CONNECTION_STRING =
    process.env.DB_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas";

mongoose.connect(CONNECTION_STRING, { dbName: "movie-app" });

const app = express();
app.use(cors());
app.use(express.json());

app.listen(process.env.port || 4000);

// console.log(process.env.FRONTEND_URL);

UserRoutes(app);

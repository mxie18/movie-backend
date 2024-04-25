import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import session from "express-session";
import "dotenv/config";

import UserRoutes from "./Users/routes.js";
import LikesRoutes from "./Likes/routes.js";
import FollowRoutes from "./Follow/routes.js";
import MoviesRoutes from "./Movies/routes.js";
import ShowsRoutes from "./Shows/routes.js";

const CONNECTION_STRING =
    process.env.DB_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas";

mongoose.connect(CONNECTION_STRING, { dbName: "movie-app" });

const app = express();
app.use(
    cors({
        credentials: true,
        origin: [process.env.FRONTEND_URL, "https://movie-hub-999.netlify.app"],
    })
);

console.log(process.env);

const sessionOptions = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
    };
}

app.use(session(sessionOptions));
app.use(express.json());
app.listen(process.env.port || 4000);

UserRoutes(app);
LikesRoutes(app);
FollowRoutes(app);
MoviesRoutes(app);
ShowsRoutes(app);

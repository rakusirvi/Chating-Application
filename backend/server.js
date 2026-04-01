import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
dotenv.config();

import AuthRoutes from "./src/routes/auth.route.js";
import { connectDB } from "./src/lib/db.js";
import MessageRoutes from "./src/routes/message.route.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
//
//

app.use("/api/auth", AuthRoutes);
app.use("/api/message", MessageRoutes);

//
//

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`server is Running on port no ${PORT}`);
  connectDB();
});

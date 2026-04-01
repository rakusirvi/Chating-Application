import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import {
  getMessages,
  getUsersForSidebar,
  sendMessage,
} from "../controllers/message.controller.js";

const MessageRoutes = express.Router();

MessageRoutes.get("/users", protectRoute, getUsersForSidebar);
MessageRoutes.get("/:id", protectRoute, getMessages);
MessageRoutes.post("/send/:id", protectRoute, sendMessage);

export default MessageRoutes;

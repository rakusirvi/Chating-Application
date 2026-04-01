import { Router } from "express";
import {
  LoginAuth,
  LogoutAuth,
  SignUpAuth,
  UpdateAuth,
  checkAuth,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const AuthRoutes = Router();

AuthRoutes.post("/signup", SignUpAuth);

AuthRoutes.post("/login", LoginAuth);

AuthRoutes.post("/logout", LogoutAuth);

AuthRoutes.put("/update-profile", protectRoute, UpdateAuth);

AuthRoutes.get("/check", protectRoute, checkAuth);

export default AuthRoutes;

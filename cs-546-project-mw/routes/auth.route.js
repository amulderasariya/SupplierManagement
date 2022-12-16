import { Router } from "express";
import { userInfo, login, logout, refreshToken, register, getUsers } from "../controllers/auth.controller.js";
import { requireRefreshToken, requireToken } from "../middlewares/token.js";
import { validateAuth } from "../utils/validation.js";

const authRouter = Router();

authRouter.post("/register", validateAuth.register, register);
authRouter.post("/login", validateAuth.login, login);

authRouter.get("/userInfo", requireToken(), userInfo);
authRouter.get("/refresh", requireRefreshToken, refreshToken);
authRouter.get("/users/:role", requireToken(), validateAuth.users, getUsers);
authRouter.get("/logout", logout);

export default authRouter;

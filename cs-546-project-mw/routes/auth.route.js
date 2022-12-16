import { Router } from "express";
import { userInfo, login, logout, refreshToken, register, getUsers, updateUser } from "../controllers/auth.controller.js";
import { requireRefreshToken, requireToken } from "../middlewares/token.js";
import { validateAuth } from "../utils/validation.js";

const authRouter = Router();

authRouter.post("/register", validateAuth.register, register);
authRouter.post("/login", validateAuth.login, login);

authRouter.get("/user", requireToken(), userInfo);
authRouter.post("/user", requireToken(), validateAuth.user, updateUser);
authRouter.get("/refresh", requireRefreshToken, refreshToken);
authRouter.get("/users/suppliers", requireToken(["OWNER"]), getUsers);
authRouter.get("/logout", logout);

export default authRouter;

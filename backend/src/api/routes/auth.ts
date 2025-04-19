import { Router } from "express";
import AuthMiddleware from "../middlewares/auth";
import AuthController from "src/controllers/auth";

const authRouter = Router();

authRouter
  .post("/signUp", AuthController.signUp)
  .post("/signIn", AuthController.signIn)
  .post("/signOut", AuthMiddleware.verify, AuthController.signOut);

export default authRouter;

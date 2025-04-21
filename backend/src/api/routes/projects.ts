import { Router } from "express";
import AuthMiddleware from "../middlewares/auth";
import ProjectController from "../../controllers/project";

const projectsRouter = Router();

projectsRouter
  .get("/", AuthMiddleware.verify, ProjectController.get)
  .post("/", AuthMiddleware.verify, ProjectController.create)
  .put("/:id", AuthMiddleware.verify, ProjectController.update)
  .delete("/:id", AuthMiddleware.verify, ProjectController.delete);

export default projectsRouter;

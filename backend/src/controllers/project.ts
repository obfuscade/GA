import { NextFunction, Response } from "express";
import catchAsync from "../utils/catchAsync";
import Project from "../models/project";
import GithubProvider from "../providers/github";
import { DEFAULT_PROJECTS_LIMIT, MAX_PROJECTS_LIMIT } from "../constants";
import AppError from "../utils/HttpError";
import { ICustomRequest } from "../types";

class ProjectController {
  static get = catchAsync(async (req: ICustomRequest, res: Response) => {
    const { lastItemId = null, limit = DEFAULT_PROJECTS_LIMIT } = req.query;
    const userId = req.userId || null;
    // Restrict the max limit for the items
    const maxProjectsLimit = Math.min(Number(limit), MAX_PROJECTS_LIMIT);

    const data = await Project.get({
      userId,
      limit: maxProjectsLimit,
      lastItemId: lastItemId as string,
    });

    return res.status(200).json(data);
  });

  static create = catchAsync(
    async (req: ICustomRequest, res: Response, next: NextFunction) => {
      const { owner = "", repository = "" } = req.body;
      const userId = req.userId || null;

      if (!owner.length || !repository.length) {
        return next(new AppError("Please provide correct url", 400));
      }

      const data = await GithubProvider.getProject({
        url: `${owner}/${repository}`,
      });

      if (!data) {
        return next(
          new AppError("Failed to fetch project data from GitHub", 500),
        );
      }

      const isExistsProject = Boolean(
        await Project.getBySourceId({
          sourceId: data.sourceId,
          userId,
        }),
      );

      if (isExistsProject) {
        return next(new AppError("This project does already exists", 400));
      }

      const result = await Project.create({ ...data, userId });

      return res.status(201).json(result);
    },
  );

  static update = catchAsync(
    async (req: ICustomRequest, res: Response, next: NextFunction) => {
      const { id } = req.params;

      const project = await Project.getById(id);

      if (!project) {
        return next(new AppError("The project not found", 404));
      }

      const data = await GithubProvider.getProject({
        sourceId: project.sourceId,
      });

      if (!data) {
        return next(
          new AppError("Failed to fetch project data from GitHub", 500),
        );
      }

      const result = await Project.update({ ...data, id });

      return res.status(201).json(result);
    },
  );

  static delete = catchAsync(async (req: ICustomRequest, res: Response) => {
    const { id } = req.params;

    await Project.delete(id);

    return res.status(200).json({ message: "success" });
  });
}

export default ProjectController;

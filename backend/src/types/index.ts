import { Request } from "express";

export interface ICustomRequest extends Request {
  userId?: string;
}

export interface IProject {
  id: string;
  sourceId: string;
  userId: string;
  owner: string;
  name: string;
  url: string;
  stars: number;
  forks: number;
  issues: number;
  createdAt: string;
}

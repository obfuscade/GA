import { IProject } from "../../types";
import { api } from "../axios";
import { API_ENDPOINTS } from "../../constants";

export const getProjects = async ({
  lastItemId,
  limit,
}: {
  lastItemId: string | null;
  limit: number;
}): Promise<{ data: IProject[]; hasMore: boolean }> => {
  return (
    await api.get(API_ENDPOINTS.PROJECTS, {
      params: { lastItemId, limit },
    })
  ).data;
};

export const refreshProject = async (projectId: string): Promise<IProject> => {
  return (await api.put(`${API_ENDPOINTS.PROJECTS}/${projectId}`)).data;
};

export const createProject = async ({
  owner,
  repository,
}: {
  owner: string;
  repository: string;
}): Promise<IProject> => {
  return (await api.post(`${API_ENDPOINTS.PROJECTS}`, { owner, repository }))
    .data;
};

export const deleteProject = async (projectId: string): Promise<void> => {
  await api.delete(`${API_ENDPOINTS.PROJECTS}/${projectId}`);
};

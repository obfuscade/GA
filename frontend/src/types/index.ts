export interface IUser {
  email: string;
  password: string;
}

export interface IProjectCreation {
  owner: string;
  repository: string;
}

export interface IProject {
  id: string;
  owner: string;
  name: string;
  url: string;
  stars: number;
  forks: number;
  issues: number;
  createdAt: string;
}

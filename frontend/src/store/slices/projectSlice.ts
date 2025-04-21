import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { IProject } from "../../types";

interface ProjectState {
  projects: IProject[];
}

const initialState: ProjectState = {
  projects: [],
};

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    updateProject: (state: ProjectState, action: PayloadAction<IProject>) => {
      const item = action.payload;

      state.projects = state.projects.map((value) =>
        value.id === item.id ? item : value,
      );
    },
    addProjects: (state: ProjectState, action: PayloadAction<IProject[]>) => {
      const items = action.payload;

      state.projects = [...state.projects, ...items];
    },
    addProject: (state: ProjectState, action: PayloadAction<IProject>) => {
      const item = action.payload;

      state.projects = [item, ...state.projects];
    },
    removeProject: (state: ProjectState, action: PayloadAction<string>) => {
      const itemId = action.payload;

      state.projects = state.projects.filter((value) => value.id !== itemId);
    },
    removeProjects: (state) => {
      state.projects = initialState.projects;
    },
  },
});

export const {
  addProjects,
  updateProject,
  addProject,
  removeProject,
  removeProjects,
} = projectSlice.actions;

export const selectProject = (state: RootState): ProjectState => state.project;

export default projectSlice.reducer;

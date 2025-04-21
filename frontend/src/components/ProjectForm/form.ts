import { object, string } from "yup";
import { IProjectCreation } from "../../types";

export const defaultValues: IProjectCreation = {
  owner: "",
  repository: "",
};

export const validation = object().shape({
  owner: string().required(),
  repository: string().required(),
});

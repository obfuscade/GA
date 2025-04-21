import { IUser } from "../../types";
import { api } from "../axios";
import { API_ENDPOINTS } from "../../constants";

export const signIn = async ({ email, password }: IUser): Promise<void> => {
  await api.post(API_ENDPOINTS.SIGNIN, { email, password });
};

export const signUp = async ({ email, password }: IUser): Promise<void> => {
  await api.post(API_ENDPOINTS.SIGNUP, { email, password });
};

export const signOut = async (): Promise<void> => {
  await api.post(API_ENDPOINTS.SIGNOUT);
};

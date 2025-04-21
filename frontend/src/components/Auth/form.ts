import { object, string } from "yup";
import { MAX_PASSWORD_UNIT, MIN_PASSWORD_UNIT } from "../../constants";
import { IUser } from "../../types";

export const defaultValues: IUser = {
  email: "",
  password: "",
};

export const validation = object().shape({
  email: string().email().required(),
  password: string().required().min(MIN_PASSWORD_UNIT).max(MAX_PASSWORD_UNIT),
});

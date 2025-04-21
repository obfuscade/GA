import {
  Input as MUIInput,
  FormHelperText,
  FormControl,
  TextFieldProps,
} from "@mui/material";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import { JSX } from "react";

type Props<T extends FieldValues> = {
  name: Path<T>;
  placeholder: string;
  autocomplete?: TextFieldProps["autoComplete"];
  type: TextFieldProps["type"];
  register: UseFormRegister<T>;
  error?: string;
  disabled?: boolean;
  autofocus?: boolean;
};

function Input<T extends FieldValues>({
  name,
  placeholder,
  type,
  error,
  register,
  disabled,
  autocomplete,
  autofocus,
}: Props<T>): JSX.Element {
  return (
    <FormControl fullWidth error={!!error} disabled={disabled}>
      <MUIInput
        type={type}
        size="medium"
        placeholder={placeholder}
        autoComplete={autocomplete || "off"}
        autoFocus={autofocus || false}
        {...register(name)}
      />
      <FormHelperText>{error || " "}</FormHelperText>
    </FormControl>
  );
}

export default Input;

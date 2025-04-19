import { Input as MUIInput, FormHelperText, FormControl } from "@mui/material";
import { UseFormRegister } from "react-hook-form";
import { User } from "../../types";
import { JSX } from "react";

type Props = {
  name: keyof User;
  placeholder: string;
  autocomplete?: "email";
  type: "text" | "password" | "email";
  register: UseFormRegister<User>;
  error?: string;
  disabled?: boolean;
};

function Input({
  name,
  placeholder,
  type,
  error,
  register,
  disabled,
  autocomplete,
}: Props): JSX.Element {
  return (
    <FormControl fullWidth error={!!error} disabled={disabled}>
      <MUIInput
        size="medium"
        id={name}
        type={type}
        placeholder={placeholder}
        aria-describedby={error ? `${name}-error` : undefined}
        aria-invalid={!!error}
        {...register(name)}
        autoComplete={autocomplete || "off"}
      />
      <FormHelperText id={`${name}-error`} aria-live="polite">
        {error || " "}
      </FormHelperText>
    </FormControl>
  );
}

export default Input;

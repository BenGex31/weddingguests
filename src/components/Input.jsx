import React from "react";
import TextField from "@material-ui/core/TextField";

export default function BasicTextFields({
  id,
  label,
  variant,
  defaultValue,
  size,
  color,
  onChange,
  type,
  value,
}) {
  return (
    <form noValidate autoComplete='on'>
      <TextField
        required
        fullWidth
        id={id}
        label={label}
        variant={variant}
        defaultValue={defaultValue}
        size={size}
        color={color}
        onChange={onChange}
        type={type}
        value={value}
      />
    </form>
  );
}

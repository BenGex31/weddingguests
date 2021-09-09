import React from "react";
import TextField from "@material-ui/core/TextField";

export default function BasicTextFields({ id, label, variant, defaultValue, size, color }) {
  return (
    <form noValidate autoComplete='off'>
      <TextField
        required
        fullWidth
        id={id}
        label={label}
        variant={variant}
        defaultValue={defaultValue}
        size={size}
        color={color}
      />
    </form>
  );
}

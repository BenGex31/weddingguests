import React from "react";
import Button from "@material-ui/core/Button";

export default function ContainedButtons({
  text,
  variant,
  color,
  onClick,
  disabled,
}) {
  return (
    <Button
      onClick={onClick}
      variant={variant}
      color={color}
      disabled={disabled}
    >
      {text}
    </Button>
  );
}

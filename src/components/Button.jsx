import React from "react";
import Button from "@material-ui/core/Button";

export default function ContainedButtons({
  text,
  variant,
  color,
  onClick,
  startIcon,
  disabled,
  style,
  type,
}) {
  return (
    <Button
      onClick={onClick}
      variant={variant}
      color={color}
      disabled={disabled}
      startIcon={startIcon}
      style={style}
      type={type}
    >
      {text}
    </Button>
  );
}

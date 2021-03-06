import React from "react";
import Button from "@material-ui/core/Button";

export default function ContainedButtons({
  text,
  variant,
  color,
  onClick,
  startIcon,
  endIcon,
  disabled,
  style,
  type,
  size,
}) {
  return (
    <Button
      onClick={onClick}
      variant={variant}
      color={color}
      disabled={disabled}
      startIcon={startIcon}
      endIcon={endIcon}
      style={style}
      type={type}
      size={size}
    >
      {text}
    </Button>
  );
}

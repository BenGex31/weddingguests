import React from "react";
import Button from "@material-ui/core/Button";

export default function ContainedButtons({ text, variant, color, onClick }) {
  return (
    <Button onClick={onClick} variant={variant} color={color}>
      {text}
    </Button>
  );
}

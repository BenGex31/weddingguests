import React from "react";

const ErrorMessage = ({ error, visible }) => {
  if (!error || !visible) {
    return null;
  }
  return (
    <div
      style={{
        color: "red",
        fontSize: 15,
        textAlign: "center",
        marginBottom: 10,
        fontWeight: "600",
      }}
    >
      {error}
    </div>
  );
};

export default ErrorMessage;

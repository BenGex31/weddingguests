import React from "react";
import weddingLogo from "../assets/weddingLogo.png";

const LogoWedding = () => {
  return (
    <div>
      <img
        style={{ width: 100, height: 100 }}
        src={weddingLogo}
        alt='logo mariage'
      />
    </div>
  );
};

export default LogoWedding;

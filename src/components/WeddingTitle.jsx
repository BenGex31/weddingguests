import React from "react";

const WeddingTitle = ({ size }) => {
  return (
    <h1
      style={{
        textAlign: "center",
        fontFamily: "Allison",
        fontSize: size,
        color: "#708d23",
        marginBottom: 15,
        marginTop: 15,
      }}
    >
      Mariage
      <br />
      Camille et Benjamin
    </h1>
  );
};

export default WeddingTitle;

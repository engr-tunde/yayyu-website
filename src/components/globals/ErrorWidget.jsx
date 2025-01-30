import React from "react";
import BounceLoader from "react-spinners/BounceLoader";

const ErrorWidget = ({ error }) => {
  return (
    <div
      style={{
        height: "50vh",
        width: "70%",
        margin: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <p className="text-lg font-semibold">Error: {error}</p>
    </div>
  );
};

export default ErrorWidget;

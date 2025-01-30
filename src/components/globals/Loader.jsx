import React from "react";
import BounceLoader from "react-spinners/BounceLoader";

const Loader = () => {
  return (
    <div
      style={{
        height: "70vh",
        width: "70vw",
        margin: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <BounceLoader
        color="#000"
        loading={true}
        size={60}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loader;

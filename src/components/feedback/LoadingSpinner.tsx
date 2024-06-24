import React from "react";

const LoadingSpinner = ({ size }: { size: string }) => {
  return (
    <div
      className="animate-spin self-center rounded-full border-2 border-solid border-blue-500 border-t-transparent"
      style={{ height: size, width: size }}
    ></div>
  );
};

export default LoadingSpinner;

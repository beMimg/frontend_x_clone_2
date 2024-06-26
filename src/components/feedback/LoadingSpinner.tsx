import React from "react";

const LoadingSpinner = ({ size, color }: { color: string; size: string }) => {
  const finalColor =
    color === "blue" ? "border-blue-500" : color === "white" && "border-white";
  return (
    <div
      className={`animate-spin self-center rounded-full border-2 border-solid border-t-transparent ${finalColor}`}
      style={{ height: size, width: size, color: color }}
    ></div>
  );
};

export default LoadingSpinner;

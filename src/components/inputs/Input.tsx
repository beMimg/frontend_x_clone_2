import React from "react";
import { IInput } from "../../interfaces/input.interface";

const Input = ({ value, setter, placeholder, type }: IInput) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      onChange={(e) => setter(e.target.value)}
      value={value}
      className="w-full rounded-md border bg-black p-4 text-white placeholder:text-white focus:border-[3px] focus:border-sky-400 focus:outline-none"
    />
  );
};

export default Input;

import React from "react";
import { BASE_URL } from "../../api/axios";
import { FaGithub } from "react-icons/fa";

const GithubLoginLink = () => {
  return (
    <a
      href={`${BASE_URL}/auth/github`}
      className="flex w-full flex-row items-center justify-center gap-3 rounded-full bg-white p-3 px-10 text-center font-semibold text-black"
    >
      <FaGithub /> Sign in with GitHub
    </a>
  );
};

export default GithubLoginLink;

import React from "react";
import CreatePost from "../forms/CreatePost";
import { IoMdArrowBack } from "react-icons/io";

const CreatePostModal = ({
  setRerender,
  setIsCreatePostOpen,
}: {
  setRerender: React.Dispatch<React.SetStateAction<number>>;
  setIsCreatePostOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="absolute left-0 top-0 z-50 flex h-screen w-screen flex-col gap-4 bg-black p-4">
      <button
        className="flex flex-row items-center gap-2"
        onClick={() => setIsCreatePostOpen(false)}
      >
        <IoMdArrowBack /> Back
      </button>
      <CreatePost setRerender={setRerender} close={true} />
    </div>
  );
};

export default CreatePostModal;

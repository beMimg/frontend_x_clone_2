import React from "react";
import CreatePost from "../forms/CreatePost";

const CreatePostModal = ({
  setRerender,
}: {
  setRerender: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <div className="absolute left-0 top-0 z-50 flex h-screen w-screen justify-center bg-black p-4">
      <CreatePost setRerender={setRerender} close={true} />
    </div>
  );
};

export default CreatePostModal;

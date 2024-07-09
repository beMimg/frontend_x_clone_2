import React from "react";
import Avatar from "../layout/Avatar";

import { IUser } from "../../interfaces/User.interface";
import CreatePost from "../forms/CreatePost";

const DashboardHeader = ({
  user,
  setRerender,
}: {
  user: IUser;
  setRerender: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <div className="flex w-full flex-col">
      <div className="grid w-full lg:grid-cols-2">
        <button className="border-b-2 border-sky-500 pb-1">For you</button>
        <button className="secondary-text hidden cursor-not-allowed lg:block">
          Following
        </button>
      </div>
      <div className="flex w-full flex-col gap-2 border-y border-gray-700 p-2 px-4">
        <div className="flex flex-row items-center justify-center gap-4">
          <div className="flex self-start">
            <Avatar user={user} size="45px" />
          </div>
          <CreatePost setRerender={setRerender} close={false} />
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;

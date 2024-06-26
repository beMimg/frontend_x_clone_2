import React from "react";
import Avatar from "../layout/Avatar";

import { IUser } from "../../interfaces/User.interface";
import DashboardHeaderForm from "../forms/DashboardHeaderForm";

const DashboardHeader = ({
  user,
  setRerender,
}: {
  user: IUser;
  setRerender: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <section className="flex w-full flex-col">
      <div className="grid w-full p-2 py-4 lg:grid-cols-2">
        <button className="border-b-2 border-sky-500 pb-1">For you</button>
        <button className="hidden cursor-not-allowed text-neutral-500 lg:block">
          Following
        </button>
      </div>
      <div className="flex w-full flex-col gap-2 border-y border-gray-700 p-2">
        <div className="flex flex-row items-center justify-center gap-4">
          <div className="flex self-start">
            <Avatar user={user} size="40px" />
          </div>
          <DashboardHeaderForm setRerender={setRerender} />
        </div>
      </div>
    </section>
  );
};

export default DashboardHeader;

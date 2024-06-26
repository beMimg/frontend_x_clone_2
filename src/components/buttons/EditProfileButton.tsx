import { useState } from "react";
import EditProfileModal from "../modals/EditProfileModal";
import { IUser } from "../../interfaces/User.interface";

const EditProfileBtn = ({ user }: { user: IUser }) => {
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsEditProfileModalOpen(true)}
        className="text-md mr-4 mt-4 w-[100px] self-end rounded-full border border-gray-700 bg-black py-2 text-sm font-semibold text-white transition-all hover:bg-gray-600"
      >
        Edit Profile
      </button>
      {isEditProfileModalOpen && (
        <EditProfileModal
          user={user}
          setIsEditProfileModalOpen={setIsEditProfileModalOpen}
        />
      )}
    </>
  );
};

export default EditProfileBtn;

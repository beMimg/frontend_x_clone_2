import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutModal = ({
  setIsLogoutModalOpen,
}: {
  setIsLogoutModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const navigate = useNavigate();

  function handleLogoutBtn() {
    localStorage.removeItem("accessToken");
    navigate("/", { replace: true });
    window.location.reload();
  }

  return (
    <div className="absolute left-0 top-0 z-40 flex h-screen w-screen items-center justify-center bg-gray-800">
      <div className="flex max-w-[300px] flex-col gap-4 rounded-xl bg-black p-8">
        <h1 className="self-center">X</h1>
        <div className="flex flex-col gap-2">
          <h4 className="">Log out of X?</h4>
          <p className="secondary-text">
            Ready to log out? Remember, you can log in again whenever you like.
          </p>
        </div>
        <button onClick={handleLogoutBtn} className="white-button">
          Log out
        </button>
        <button
          onClick={() => setIsLogoutModalOpen(false)}
          className="sky-button"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default LogoutModal;

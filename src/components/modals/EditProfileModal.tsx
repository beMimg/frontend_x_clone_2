import React, { useState } from "react";
import { MdAddAPhoto } from "react-icons/md";
import { IoIosClose } from "react-icons/io";
import Avatar from "../layout/Avatar";
import useAxiosPrivate from "../../api/useAxiosPrivate";
import LoadingSpinner from "../feedback/LoadingSpinner";
import { IUser } from "../../interfaces/User.interface";
import ErrorText from "../feedback/ErrorText";

const EditProfileModal = ({
  user,
  setIsEditProfileModalOpen,
}: {
  user: IUser;
  setIsEditProfileModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [image, setImage] = useState<any>(null);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [loading, setloading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  function handleImageChange(e: any) {
    // This function is responsible for displaying the selected photo in the modal
    // before saving, providing the user with a preview of the chosen image.

    // setImage is used to store the selected image for the HTTP request to save the image.
    // imageUrl is used to display the photo without requiring an additional HTTP request.
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
    setImageUrl(URL.createObjectURL(selectedImage));
  }

  async function handleSubmit() {
    try {
      setloading(true);
      setError(false);
      const formData = new FormData();
      formData.append("image", image);

      const response = await axiosPrivate.put(`/users/profile_pic`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        setIsSuccess(true);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (err) {
      setError(true);
    } finally {
      setloading(false);
    }
  }

  return (
    <div className="absolute left-0 top-0 z-30 flex h-screen w-screen items-center justify-center bg-gray-700 bg-opacity-40">
      <div className="flex w-[300px] flex-col gap-6 rounded-xl bg-black p-6 lg:w-[400px]">
        <div className="grid grid-cols-3">
          <button
            onClick={() => setIsEditProfileModalOpen(false)}
            className="text-4xl"
          >
            <IoIosClose />
          </button>
          <h4 className="text-center">Edit profile</h4>
          <button
            disabled={loading || !imageUrl}
            onClick={handleSubmit}
            className="flex items-center justify-center place-self-end self-center rounded-md bg-white px-3 py-2 font-semibold text-black disabled:cursor-not-allowed"
          >
            {loading ? <LoadingSpinner size={"20px"} color="blue" /> : "Save"}
          </button>
        </div>
        <div className="relative flex w-full items-center justify-center">
          <div className="bg-black bg-opacity-50 opacity-60">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="selected"
                className="flex h-[100px] w-[100px] rounded-full object-cover object-center"
              />
            ) : (
              <Avatar user={user} size={"100px"} />
            )}
          </div>
          <div className="absolute lg:left-[163px] lg:top-[40px]">
            <label htmlFor="file-input" className="relative inline-block">
              <input
                type="file"
                id="file-input"
                className="absolute h-0 w-0 overflow-hidden"
                accept="image/png, image/jpeg"
                onChange={handleImageChange}
              />
              <MdAddAPhoto className="relative h-5 w-5 cursor-pointer transition-all hover:scale-105" />
            </label>
          </div>
        </div>
        <div className="flex items-center justify-center">
          {isSuccess ? (
            <p className="text-sky-500">
              You've successfully changed profile picture
            </p>
          ) : (
            error && <ErrorText text="Something went wrong" />
          )}
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;

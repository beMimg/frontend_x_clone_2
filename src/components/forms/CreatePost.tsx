import React, { useEffect, useState } from "react";
import { GrGallery } from "react-icons/gr";
import { IoIosClose } from "react-icons/io";
import LoadingSpinner from "../feedback/LoadingSpinner";
import useAxiosPrivate from "../../api/useAxiosPrivate";
import ErrorText from "../feedback/ErrorText";

const CreatePost = ({
  setRerender,
}: {
  setRerender: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [text, setText] = useState("");
  const [charactersLeft, setCharactersLeft] = useState(300);
  const [imageUrl, setImageUrl] = useState<string | null>();
  const [image, setImage] = useState<string | null | undefined>();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  async function handleSubmit(e: any) {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      if (!image) {
        const response = await axiosPrivate.post("/posts", { text: text });
        if (response.status === 200) {
          setText("");
          setRerender((prevRender) => prevRender + 1);
          return;
        }
      } else {
        const formData = new FormData();
        formData.append("image", image);
        formData.append("text", text);
        const response = await axiosPrivate.post(`/posts`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (response.status === 200) {
          setText("");
          setRerender((prevRender) => prevRender + 1);
          deleteImage();

          return;
        }
      }
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }
  function handleImageChange(e: any) {
    // This function is responsible for displaying the selected photo in the modal
    // before saving, providing the user with a preview of the chosen image.

    // setImage is used to store the selected image for the HTTP request to save the image.
    // imageUrl is used to display the photo without requiring an additional HTTP request.
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
    setImageUrl(URL.createObjectURL(selectedImage));
  }

  function deleteImage() {
    setImage(null);
    setImageUrl(null);
  }

  useEffect(() => {
    setCharactersLeft(300 - text.length);
  }, [text]);

  const disabledButton = charactersLeft < 0;

  return (
    <div className="flex w-full flex-col gap-2">
      <form className="relative flex w-full flex-col gap-2">
        <textarea
          placeholder="What is happening?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={400}
          className="w-full resize-none rounded-lg bg-transparent p-2 pr-9 text-base focus:border focus:border-neutral-900 focus:outline-none"
        />
        <p
          className={`${
            disabledButton ? "text-red-500" : "secondary-text"
          } absolute right-3 top-0`}
        >
          {charactersLeft}
        </p>
        {/* If the usuer wants to post an image, place it above the post button */}
        {imageUrl && (
          <div className="relative flex self-center">
            <button
              type="button"
              onClick={deleteImage}
              className="absolute right-2 top-2 cursor-pointer rounded-full bg-neutral-800 text-3xl"
            >
              <IoIosClose className="text-white" />
            </button>
            <img
              className="max-h-[400px] rounded-2xl border border-gray-700"
              src={imageUrl}
            ></img>
          </div>
        )}
        <div className="flex-crow flex w-full items-center justify-between">
          <label htmlFor="file-input" className="relative inline-block">
            <input
              type="file"
              id="file-input"
              className="absolute h-0 w-0 overflow-hidden"
              accept="image/png, image/jpeg"
              onChange={handleImageChange}
            />
            <GrGallery className="relative h-5 w-5 cursor-pointer text-sky-500 transition-all hover:scale-105" />
          </label>
          {/* If it's loading, content inside the button must be the loadingspinner otherwise "Post" */}
          <button
            onClick={handleSubmit}
            disabled={disabledButton || loading}
            className="sky-button max-w-[200px] disabled:cursor-not-allowed"
          >
            {loading ? (
              <LoadingSpinner size={"20px"} color={"white"} />
            ) : (
              "Post"
            )}
          </button>
        </div>
      </form>
      {error && (
        <ErrorText text="Something went wrong, please try again later" />
      )}
    </div>
  );
};

export default CreatePost;

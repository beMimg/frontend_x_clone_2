import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { LiaRandomSolid } from "react-icons/lia";
import { useState } from "react";
import ErrorText from "../feedback/ErrorText";
import LoadingSpinner from "../feedback/LoadingSpinner";

const GuestLoginButton = () => {
  const { setAccessToken } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function handleGuest() {
    try {
      setLoading(true);
      const response = await axios.post("/auth/guest");
      if (response.status === 200) {
        const accessToken = response.data.token;
        setAccessToken(accessToken);
      }
      navigate("/", { replace: true });
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  if (error) {
    return <ErrorText text="Something went wrong!" />;
  }

  return (
    <button onClick={handleGuest} className="white-button">
      {loading ? (
        <LoadingSpinner color="blue" size="30px" />
      ) : (
        <>
          <LiaRandomSolid />
          <p>Sign in as a guest</p>
        </>
      )}
    </button>
  );
};

export default GuestLoginButton;

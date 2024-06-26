import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { LiaRandomSolid } from "react-icons/lia";

const GuestLoginButton = () => {
  const { setAccessToken } = useAuth();
  const navigate = useNavigate();

  async function handleGuest() {
    try {
      const response = await axios.post("/auth/guest");
      if (response.status === 200) {
        const accessToken = response.data.token;
        setAccessToken(accessToken);
        navigate("/dashboard", { replace: true });
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <button onClick={handleGuest} className="white-button">
      <LiaRandomSolid /> Sign in as a guest
    </button>
  );
};

export default GuestLoginButton;

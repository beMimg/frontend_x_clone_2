// Assuming you are using functional component syntax
import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const OAuth = () => {
  const { setAccessToken } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");
    if (accessToken) {
      setAccessToken(accessToken);
      navigate("/", { replace: true });
      window.location.reload();
    }
  }, [searchParams, setAccessToken]);

  return <div>OAuth Component</div>;
};

export default OAuth;

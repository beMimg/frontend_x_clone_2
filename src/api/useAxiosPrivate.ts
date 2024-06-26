import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import { useAuth } from "../context/authContext";

// This is a custom hook that sets up Axios interceptors for authenticated requests.
const useAxiosPrivate = () => {
  // Get the refresh function from the useRefreshToken hook.
  // This function is used to refresh the access token when it expires.
  // Get the auth state from the useAuth hook.
  // This state contains the current access token.
  const { accessToken } = useAuth();

  // Use the useEffect hook to set up the interceptors when the component mounts,
  // and remove them when the component unmounts.
  useEffect(() => {
    // Set up a request interceptor.
    // This function is called before each request is sent.
    // It adds the Authorization header to the request if it's not already present.

    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
      },
      // This function is called if an error occurs before the request is sent.
      (error) => Promise.reject(error),
    );

    // Set up a response interceptor.
    // This function is called after a response is received.
    const responseIntercept = axiosPrivate.interceptors.response.use(
      // If the response is successful, it's returned as is.
      (response) => response,
      // If an error occurs, this function is called.
      async (error) => {
        // The config of the request that caused the error is stored in error.config.
        const prevRequest = error.config;
        // If the error status is 401 (Unauthorized) and the request hasn't been retried yet,
        // the access token is refreshed and the request is retried.
        if (error.response.status === 401 && !prevRequest.sent) {
          prevRequest.sent = true;
          console.log("now");
        }
        // If the error status is not 401 or the request has already been retried,
        // a rejected Promise with the error is returned.
        return Promise.reject(error);
      },
    );

    // Return a cleanup function that removes the interceptors when the component unmounts.
    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
    // The useEffect hook depends on the auth state and the refresh function.
    // It's called again whenever one of these dependencies changes.
  }, [accessToken]);

  // Return the axiosPrivate instance, which can be used to send authenticated requests.
  return axiosPrivate;
};
// Export the useAxiosPrivate hook for use in other components.

export default useAxiosPrivate;

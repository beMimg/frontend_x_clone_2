import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import useAxiosPrivate from "../api/useAxiosPrivate";

const UserContext = createContext<any | undefined>(undefined);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const accessToken = localStorage.getItem("accessToken");
  const [user, setUser] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    if (accessToken) {
      const getUser = async () => {
        try {
          setLoading(true);
          setError(false);
          const response = await axiosPrivate.get("/users/self");
          setUser(response.data.user);
        } catch (err) {
          setError(true);
        } finally {
          setLoading(false);
        }
      };
      getUser();
    }
  }, [accessToken]);

  return (
    <UserContext.Provider value={{ user, error, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export function useUser() {
  return useContext(UserContext);
}

export default UserProvider;

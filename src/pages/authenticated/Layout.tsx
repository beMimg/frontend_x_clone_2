import { Outlet } from "react-router-dom";
import Nav from "../../components/layout/Nav";
import { useUser } from "../../context/userContext";
import LoadingSpinner from "../../components/feedback/LoadingSpinner";
import ErrorText from "../../components/feedback/ErrorText";
import AsideLayout from "../../components/layout/AsideLayout";

export const Layout = () => {
  const { user, loading, error } = useUser();

  return user ? (
    <div className="h-screen bg-black text-white lg:flex lg:justify-center">
      <div className="flex h-full flex-col text-white lg:grid lg:w-[70%] lg:grid-cols-[25%,50%,25%]">
        <div className="w-full lg:h-full">
          <Nav user={user} />
        </div>
        <div className="overflow-auto pb-[60px] lg:pb-0">
          <Outlet />
        </div>
        <div className="hidden lg:flex">
          <AsideLayout />
        </div>
      </div>
    </div>
  ) : (
    <div className="flex h-screen w-full items-center justify-center bg-black">
      {loading && <LoadingSpinner color="blue" size="50px" />}
      {error && (
        <ErrorText text="Something went wrong, please try again later" />
      )}
    </div>
  );
};

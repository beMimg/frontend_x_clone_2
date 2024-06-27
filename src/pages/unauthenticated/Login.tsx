import { Link } from "react-router-dom";
import DivisionOr from "../../components/layout/DivisionOr";
import LoginForm from "../../components/forms/LoginForm";
import GuestLoginButton from "../../components/buttons/GuestLoginButton";
import GithubLoginLink from "../../components/buttons/GithubLogin";

const Login = () => {
  return (
    <section className="absolute left-0 top-0 h-screen w-screen bg-gray-900 lg:flex lg:items-center lg:justify-center">
      <div className="relative flex h-full flex-col items-center justify-evenly bg-black text-white lg:h-[70%] lg:w-[50%] lg:rounded-xl">
        <Link to="/" className="absolute left-4 top-2 text-2xl font-bold">
          x
        </Link>
        <h2>Login to X</h2>
        <div className="flex w-[70%] flex-col gap-4">
          <GithubLoginLink />
          <GuestLoginButton />
        </div>
        <div className="w-[70%]">
          <DivisionOr />
        </div>
        <div className="w-[70%]">
          <LoginForm />
        </div>
      </div>
    </section>
  );
};

export default Login;

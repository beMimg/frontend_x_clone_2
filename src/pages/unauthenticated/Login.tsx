import { Link } from "react-router-dom";
import { LiaRandomSolid } from "react-icons/lia";
import DivisionOr from "../../components/DivisionOr";
import LoginForm from "../../components/forms/LoginForm";

const Login = () => {
  return (
    <section className="absolute left-0 top-0 h-screen w-screen bg-gray-900 lg:flex lg:items-center lg:justify-center">
      <div className="relative flex h-full flex-col items-center justify-evenly bg-black text-white lg:h-[70%] lg:w-[50%] lg:rounded-xl">
        <Link to="/" className="absolute left-4 top-2 text-2xl font-bold">
          x
        </Link>
        <h2>Login to X</h2>
        <button className="button w-[70%]">
          <LiaRandomSolid /> Sign in as a guest
        </button>
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

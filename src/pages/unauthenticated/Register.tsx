import { Link } from "react-router-dom";
import RegisterForm from "../../components/forms/RegisterForm";

const Register = () => {
  return (
    <div className="absolute left-0 top-0 h-screen w-screen bg-gray-900 md:flex md:items-center md:justify-center">
      <main className="relative flex min-h-full flex-col justify-evenly gap-8 bg-black p-6 text-white md:w-[60%] md:rounded-xl lg:h-min lg:min-h-0 lg:w-[50%]">
        <Link to="/" className="absolute left-4 top-2 text-2xl font-bold">
          x
        </Link>
        <h3 className="text-center">Sign in to X</h3>
        <RegisterForm />
      </main>
    </div>
  );
};

export default Register;

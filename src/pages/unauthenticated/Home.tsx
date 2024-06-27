import { Link } from "react-router-dom";
import GuestLoginButton from "../../components/buttons/GuestLoginButton";
import DivisionOr from "../../components/layout/DivisionOr";
import GithubLoginLink from "../../components/buttons/GithubLogin";

const Home = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-evenly bg-black text-white lg:grid lg:h-screen lg:grid-cols-2 lg:grid-rows-[95%,40px] lg:items-center lg:justify-center lg:gap-0">
      <div className="hidden lg:relative lg:grid lg:place-self-center">
        <h1 className="text-center font-medium lg:text-[600px]">X</h1>
      </div>
      <div className="flex h-full flex-col justify-evenly gap-8 p-6 lg:gap-0 lg:p-10">
        <h1>Happening now</h1>
        <h2>Join today.</h2>
        <div className="flex w-full flex-col items-center gap-6 lg:w-[400px]">
          <GithubLoginLink />
          <GuestLoginButton />
          <DivisionOr />
          <div className="flex w-full flex-col items-center gap-1">
            <Link to="/register" className="sky-button">
              Create account
            </Link>
            <p className="secondary-text">
              By signing up, you agree that{" "}
              <span className="text-sky-600">you're a great person.</span>
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4 lg:w-[400px]">
          <h4>Already have an account?</h4>
          <Link
            to="/login"
            className="flex w-full flex-row items-center justify-center rounded-full border border-gray-500 bg-black p-3 font-bold text-sky-600 transition-all hover:bg-sky-950"
          >
            Sign in
          </Link>
        </div>
      </div>
      <footer className="col-start-1 col-end-3 flex w-full flex-row items-center justify-between p-4 uppercase text-white opacity-70 lg:p-0 lg:px-4">
        <a href="https://www.bemimg.com" target="a_blank">
          Creator
        </a>
        <a href="https://github.com/beMimg/x-clone-frontend" target="a_blank">
          Github
        </a>
        <a href="https://linkedin/in/bemimg" target="a_blank">
          LinkedIn
        </a>
        <a href="mailto:bemimg.dev@gmail.com">EMAIL</a>
      </footer>
    </main>
  );
};

export default Home;

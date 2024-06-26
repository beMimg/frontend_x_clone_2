import { useState } from "react";
import axios from "../../api/axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface FormData {
  first_name: string;
  email: string;
  username: string;
  password: string;
  password_confirmation: string;
}

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormData>(); // Specify the FormData interface for useForm

  const [submitErrors, setSubmitErrors] = useState<string | boolean>(false); // Correct type for submitErrors
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const requiredMessage = "This field is required.";
  const errorMessageStyle = "text-red-500";

  const onSubmit = async (data: FormData) => {
    try {
      setSubmitErrors(false);
      setIsLoading(true);
      const response = await axios.post("/users", {
        first_name: data.first_name,
        email: data.email,
        username: data.username,
        password: data.password,
        password_confirmation: data.password_confirmation,
      });

      if (response.status === 201) {
        setIsSuccess(true);
        setTimeout(() => {
          navigate("/login", { replace: true });
        }, 2000);
      }
    } catch (err: any) {
      setSubmitErrors("An error occurred. Please try again."); // Set a specific error message
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex h-full flex-col justify-evenly gap-6 text-black"
    >
      <div className="flex flex-col">
        <input
          type="text"
          placeholder="First Name"
          maxLength={12}
          autoComplete="off"
          className={`rounded-md border border-gray-700 bg-black p-2 py-5 text-white transition-all focus:outline-none ${
            errors.first_name ? "border-red-500" : "focus:border-sky-500"
          }`}
          {...register("first_name", {
            required: requiredMessage,
          })}
        />
        {errors.first_name && (
          <span className={errorMessageStyle}>{errors.first_name.message}</span>
        )}
      </div>
      <div className="flex flex-col">
        <input
          type="email"
          placeholder="Email"
          autoComplete="off"
          className={`rounded-md border border-gray-700 bg-black p-2 py-5 text-white transition-all focus:outline-none ${
            errors.email ? "border-red-500" : "focus:border-sky-500"
          }`}
          {...register("email", {
            required: requiredMessage,
            pattern: {
              value: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
              message: "Please insert a valid email.",
            },
          })}
        />
        {errors.email && (
          <span className={errorMessageStyle}>{errors.email.message}</span>
        )}
      </div>
      <div className="flex flex-col">
        <input
          type="text"
          placeholder="Username"
          autoComplete="off"
          className={`rounded-md border border-gray-700 bg-black p-2 py-5 text-white transition-all focus:outline-none ${
            errors.username ? "border-red-500" : "focus:border-sky-500"
          }`}
          {...register("username", {
            required: requiredMessage,
            pattern: {
              value: /^(?=.{1,12}$)\S+$/,
              message:
                "Must be 1 to 12 characters long and cannot contain any spaces or whitespace.",
            },
          })}
        />
        {errors.username && (
          <span className={errorMessageStyle}>{errors.username.message}</span>
        )}
      </div>
      <div className="flex flex-col">
        <input
          type="password"
          placeholder="Password"
          autoComplete="off"
          className={`rounded-md border border-gray-700 bg-black p-2 py-5 text-white transition-all focus:outline-none ${
            errors.password ? "border-red-500" : "focus:border-sky-500"
          }`}
          {...register("password", {
            required: requiredMessage,
            pattern: {
              value:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
              message:
                "Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character",
            },
          })}
        />
        {errors.password && (
          <span className={errorMessageStyle}>{errors.password.message}</span>
        )}
      </div>
      <div className="flex flex-col">
        <input
          type="password"
          placeholder="Password Confirmation"
          autoComplete="off"
          className={`rounded-md border border-gray-700 bg-black p-2 py-5 text-white transition-all focus:outline-none ${
            errors.password_confirmation
              ? "border-red-500"
              : "focus:border-sky-500"
          }`}
          {...register("password_confirmation", {
            required: requiredMessage,
            validate: (value) =>
              value === getValues("password") || "Passwords do not match.",
          })}
        />
        {errors.password_confirmation && (
          <span className={errorMessageStyle}>
            {errors.password_confirmation.message}
          </span>
        )}
      </div>
      {submitErrors && (
        <span className={errorMessageStyle}>{submitErrors}</span>
      )}
      {isSuccess && (
        <span className="text-sky-500">
          You will be redirected, please wait.
        </span>
      )}
      <button
        type="submit"
        className="w-full rounded-full bg-white p-3 text-center font-medium text-black"
      >
        {isLoading ? "Loading..." : "Register"}
      </button>
    </form>
  );
};

export default RegisterForm;

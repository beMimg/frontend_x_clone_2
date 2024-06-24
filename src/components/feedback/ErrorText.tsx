import { ITextError } from "../../interfaces/errorText.interface";

const ErrorText = ({ text }: ITextError) => {
  return <p className="text-center text-red-500">{text}</p>;
};

export default ErrorText;

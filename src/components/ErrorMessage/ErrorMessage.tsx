/* eslint-disable react/prop-types */
import { BiSolidError } from "react-icons/bi";

const ErrorMessage = ({ message }:{message: string}) => {
   return (
      <div className="flex gap-1 items-center text-xs justify-start capitalize text-red-600">
         <BiSolidError></BiSolidError>
         <p>{message}</p>
      </div>
   );
};

export default ErrorMessage;

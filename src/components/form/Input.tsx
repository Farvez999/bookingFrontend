import React from "react";
import { useFormContext } from "react-hook-form";

interface Iinput {
   name: string;
   type?: string;
   placeholder?: string;
   label?: string;
   defaultValue?: any;
   validation?: any;
}
const Input = ({
   name,
   type,
   label,
   placeholder,
   defaultValue,
   validation,
}: Iinput) => {
   const { register, formState } = useFormContext();
   console.log(formState);
   const { errors } = formState;
   console.log(errors);
   console.log("name" , name);
   return (
      <div className="flex flex-col gap-1 w-full">
         {label && <label htmlFor={name}>{label}</label>}

         <input
            type={type}
            placeholder={placeholder}
            defaultValue={defaultValue}
            {...register(name, validation)}
            className=" border border-gray-800 px-3 py-[6px]   rounded-lg w-full "
         />
         {}
      </div>
   );
};

export default Input;

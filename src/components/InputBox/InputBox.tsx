/* eslint-disable react/prop-types */
import { ChangeEvent } from "react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { InputTextProps } from "@/types";

const InputText = ({
  type,
  name,
  onChange,
  placeholder,
  error,
  label,
  initialValue,
  styles,
  min,
  labelStyles,
  max,
}: InputTextProps) => {
  return (
    <div className="w-full flex flex-col gap-1">
      <div className="flex-col  flex  justify-start w-full gap-1 ">
        <label
          className={`font-semibold text-sm capitalize ${labelStyles}`}
          htmlFor={name}
        >
          {label}
        </label>

        <input
          type={type}
          name={name}
          id={name}
          placeholder={placeholder}
          onChange={onChange}
          defaultValue={initialValue}
          className={`text-sm placeholder:text-gray-700 border-[1.5px]  border-gray-800 outline-none w-full h-full placeholder:capitalize  py-2 pl-1 gap-2  rounded-md  ${styles}`}
          max={max}
          min={min}
        />
      </div>
      {error && <ErrorMessage message={error}></ErrorMessage>}
    </div>
  );
};

export default InputText;

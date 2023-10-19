import React from "react";

const UserInput = ({
  label,
  name,
  inputType,
  customInputStyle,
  customLabelStyle,
  required,
  register,
  formState,
  defaultValue,
  readOnly,
  fileSize,
}: any) => {
  const isError = formState.errors[name];
  return (
    <div>
      <label className={`font-medium text-sm text-[#444] ${customLabelStyle}`}>
        {label} {required && <span className="text-red-600">*</span>}
      </label>
      <br />
      <input
        type={inputType || "text"}
        className={`w-[75%] h-[25px] p-2 border-[1px] border-black rounded-md mt-1 ${customInputStyle} ${
          isError ? "border-red-500" : ""
        }`}
        defaultValue={defaultValue}
        readOnly={readOnly}
        {...register(name, { required })}
      />
      {isError && <p className="text-red-500">this field is required</p>}
    </div>
  );
};

export default UserInput;

/* eslint-disable react/prop-types */
"use client";
import { useState, ChangeEvent } from "react";

interface InputSelectionProps {
  label?: string;
  data: any;
  setData: any;
  field: string;
  options: string[];
  selectOp: string;
  labelStyles?: any;
}

const InputSelection = ({
  label,
  data,
  setData,
  field,
  options,
  selectOp,
  labelStyles,
}: InputSelectionProps) => {
  const [selected, setSelected] = useState("");

  const handleSelection = (e: ChangeEvent<HTMLSelectElement>) => {
    const items: string = e.target.value;
    const name: string = e.target.name;
    if (!items) {
      return;
    }

    console.log(data);
    setSelected(items);
    setData({ ...data, [name]: items });
    return;
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      <label
        className={`text-sm capitalize font-semibold text-black ${labelStyles}`}
      >
        {label}
      </label>
      <select
        className="w-full rounded-md border  border-black  -mb-1 p-2  text-black placeholder:text-black font-normal text-sm"
        onChange={handleSelection}
        name={field}
      >
        <option className="text-xs capitalize" value="" selected>
          {selectOp}
        </option>
        {options?.map((option: string, idx: any) => (
          <option
            className="text-xs capitalize"
            selected={selected === option}
            key={idx}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default InputSelection;

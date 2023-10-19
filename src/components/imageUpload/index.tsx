/* eslint-disable react/prop-types */
import { FiUpload } from "react-icons/fi";
import styles from "./ImageUpload.module.css";
import { ChangeEventType, ImageUploadProps } from "@/types";
import Image from "next/image";

const ImageUpload = ({
  id,
  onChange,
  image,
  error,
  imageStyles,
  isMultiple,
}: ImageUploadProps) => {
  return (
    <div className=" image w-full">
      <div className="flex items-center md:flex-row flex-col  gap-3">
        <div className="w-full md:w-1/2">
          <label
            htmlFor={id}
            className={`px-5 relative  h-24 md:h-44  border-dashed border-2 border-black flex justify-center items-center flex-col gap-1  rounded-xl `}
          >
            <FiUpload className="text-5xl text-black order-2  "></FiUpload>
            <p className="text-base   text-black order-3 ">Choose File</p>
            <input
              id={id}
              name={id}
              className={`text-xl absolute top-0 left-0  order-1 text-center m-auto invisible text-white ${styles}`}
              onChange={onChange}
              type="file"
              accept="image/*"
              multiple={isMultiple}
            />
          </label>
        </div>
        <div className="px-5py-2 border-dashed border-2 border-black flex justify-center items-center h-24 md:h-44 flex-wrap gap-1 text-base  text-accent  rounded-xl w-full md:w-1/2 ">
          {image?.length ? (
            image.map((i) => (
              <Image
                key={i.url}
                src={i.url}
                alt="image"
                width={100}
                height={18}
                className={`${imageStyles}   object-contain p-3`}
              />
            ))
          ) : (
            <p>Preview </p>
          )}
        </div>
      </div>
      {error && (
        <p className="text-secondary text-xl ps-5 capitalize">
          {error && error}
        </p>
      )}
    </div>
  );
};

export default ImageUpload;

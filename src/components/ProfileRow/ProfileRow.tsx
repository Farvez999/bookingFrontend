import { ProductRowProps } from "@/types";

const ProfileRow = ({
   propertyName,
   propertyValue,
   containerStyles,
}: ProductRowProps) => {
   return (
      <div
         className={`py-3 px-5 flex justify-between rounded-lg w-full ${containerStyles}`}
      >
         <span>{propertyName}</span> <span>{propertyValue}</span>
      </div>
   );
};

export default ProfileRow;

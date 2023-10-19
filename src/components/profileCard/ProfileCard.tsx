import { ProductCardProps } from "@/types";
import Image from "next/image";

const ProfileCard = ({ name, email, location, image }: ProductCardProps) => {
   return (
      <div className="flex flex-col gap-3 justify-center w-[240px]">
         <div className="w-[150px] h-[150px] mx-auto border-blue-500 border-2 rounded-full overflow-hidden flex items-center justify-center ">
            <Image
               src={image}
               width={200}
               height={200}
               alt="profile-image"
               className=" object-cover w-full h-full rounded-full"
            ></Image>
            
         </div>
         <div className="text-center">
            <h2 className="text-lg font-medium capitalize">{name}</h2>
            <h3 className="text-sm lowercase">{email}</h3>
            <p className="text-sm lowercase">{location}</p>
         </div>
      </div>
   );
};

export default ProfileCard;

"use client";

import ImageUpload from "@/components/imageUpload";
import { ChangeEventType, ImageType } from "@/types";
import { uploadCouldinary } from "@/utiles/uploadCouldinary";
import { useState } from "react";

const Page = () => {
   // const [images, setImages] = useState<any>(null);
   const [links, setLinks] = useState<ImageType[]>([]);
   const [errors, setErrors] = useState<string>("");

   const handleImage: ChangeEventType = async (e) => {
      const images: any = e.target.files;
      let arr: ImageType[] = [];
      if (images.length === 1) {
         const link = await uploadCouldinary(images[0]);
         arr.push(link);
      } else if (images?.length > 0) {
         for (const i of images) {
            const link: ImageType = await uploadCouldinary(i);
            arr.push(link);
         }
      }

      setLinks(arr);
   };
   console.log(links);
   return (
      <div>
         <ImageUpload
            id="images"
            image={links}
            error={errors}
            onChange={handleImage}
            isMultiple={true}
         ></ImageUpload>
      </div>
   );
};

export default Page;

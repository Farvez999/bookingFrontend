export const uploadCouldinary = async (image: any) => {
   const formData = new FormData();
   formData.append("file", image);
   formData.append("upload_preset", "assignment");
   const uploadImage = await fetch(
      `https://api-ap.cloudinary.com/v1_1/dmtto8o5m/image/upload`,
      {
         method: "POST",
         body: formData,
      }
   );
   const data: any = await uploadImage.json();
   return { publicLink: data.public_id, url: data.secure_url };
};

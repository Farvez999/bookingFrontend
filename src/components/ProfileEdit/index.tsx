import {
  ChangeEventType,
  ImageType,
  UserEditInfoType,
  userEditErrorType,
} from "@/types";
import InputText from "../InputBox/InputBox";
import { uploadCouldinary } from "@/utiles/uploadCouldinary";
import { useState } from "react";
import Image from "next/image";
import profileImage from "../../assest/profile.jpg";
import InputSelection from "../InputSelection/inputSelection";
import SubmitButton from "../Buttons/SubmitButton";
import { errorToJSON } from "next/dist/server/render";
import swal from "sweetalert2";
import Swal from "sweetalert2";
import { useUpdateUserMutation } from "@/redux/api/authApi";
import { useRouter } from "next/navigation";
const ProfileEdit = ({ datas, setShow }: any) => {
  const router = useRouter();
  const [user, setUser] = useState<any>({});
  const [updateuser, { error, isError, isLoading }] = useUpdateUserMutation();

  const {
    name,
    email,
    phoneNumber,
    profileImg,
    gender,
    dob,
    language,
    nationality,
    address,
    _id,
  } = datas || {};

  const { url, public_id } = profileImg || {};
  const [formData, setFormData] = useState<UserEditInfoType>({
    name: name,
    email: email,
    phoneNumber: phoneNumber,
    profileImg: {
      url: url,
      public_id: public_id,
    },

    nationality: nationality,
    language: language,
    address: address,

    gender: gender,
    dob: dob,
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    profileImage: "",
    imgPublicId: "",
    nationality: "",
    language: "",
    address: "",
    gender: "",
    dob: "",
  });
  const handleImageUpload: ChangeEventType = async (e) => {
    if (e.target?.files) {
      const image = e.target.files[0];
      const link: ImageType = await uploadCouldinary(image);
      if (link.publicLink && link.url) {
        console.log(link);
        setFormData({
          ...formData,
          profileImg: {
            url: link.url,
            public_id: link.publicLink,
          },
        });
      } else {
        setFormData({
          ...formData,
          profileImg: { url: "", public_id: "" },
        });
        setErrors({
          ...errors,
          profileImage: "please upload  image again",
        });
      }
    } else {
      setFormData({
        ...formData,
        profileImg: { url: "", public_id: "" },
      });
      setErrors({ ...errors, profileImage: "please select an image" });
    }
    console.log(formData);
  };

  const handleName: ChangeEventType = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (!value?.length) {
      setErrors({ ...errors, [name]: `${name} shouldn't be empty` });
      setFormData({ ...formData, [name]: "" });
    } else {
      setErrors({ ...errors, [name]: `` });
      setFormData({ ...formData, [name]: value });
    }
  };
  const handleEmail: ChangeEventType = (e) => {
    const name = e?.target?.name;
    const value = e.target.value.trim();
    if (!value.length) {
      setErrors({ ...errors, [name]: "email shouldn't be empty" });
      setFormData({ ...formData, [name]: "" });
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
    ) {
      setErrors({ ...errors, [name]: "Please provide a email" });
      setFormData({ ...formData, [name]: "" });
    } else {
      setErrors({ ...errors, [name]: "" });
      setFormData({ ...formData, [name]: value });
    }
  };

  const handlePhone: ChangeEventType = (e) => {
    const phone: string = e.target.value;
    if (phone === "") {
      setErrors({ ...errors, phoneNumber: "phone number should't be empty" });
      setFormData({ ...formData, phoneNumber: "" });
    } else if (!/^(((\+|00)?880)|0)(\d){10}$/.test(phone)) {
      setErrors({ ...errors, phoneNumber: "number should be valid" });
      setFormData({ ...formData, phoneNumber: "" });
    } else {
      setErrors({ ...errors, phoneNumber: "" });
      setFormData({ ...formData, phoneNumber: phone });
    }
  };

  const handleEdit = async (e: any) => {
    e.preventDefault();
    console.log("formData", formData);
    const res = await updateuser({ id: _id, body: formData }).unwrap();
    console.log(res);
    if (res?.email) {
      Swal.fire("Good job!", "profile updated successfully", "success");
      router.push("/dashboard");
      setShow(false);
    } else if (isError) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "something went wrong",
      });
    }
  };

  return (
    <div>
      <div className="w-[150px] h-[150px] p-1 rounded-md  border border-primary flex flex-col  justify-center">
        {/* <label htmlFor="profile" className="text-xs block mb-3">
               Upload profile
            </label> */}
        <div className="flex items-center justify-center">
          <Image
            src={
              formData?.profileImg?.url
                ? formData?.profileImg?.url
                : profileImage
            }
            alt="image"
            width={150}
            height={150}
            className="w-[100px] h-[100px] rounded-full"
          ></Image>
        </div>
        <InputText
          type="file"
          name="profile"
          // label="upload profile"
          placeholder=""
          onChange={handleImageUpload}
          styles="w-full border-0 text-xs border-0  flex flex-col"
          error={errors.profileImage}
        ></InputText>
      </div>
      <div>
        <form
          onSubmit={handleEdit}
          className="grid md:grid-cols-2  grid-cols-1 gap-2 mt-5"
        >
          <h2 className="text-lg font-semibold  capitalize lg:col-span-2 ">
            Personal Information
          </h2>
          <InputText
            type="text"
            name="name"
            label="Your name"
            placeholder="your name"
            initialValue={name}
            error={errors.name}
            onChange={handleName}
          ></InputText>
          <InputText
            type="email"
            name="email"
            label="Your email"
            placeholder="your email"
            initialValue={email}
            error={errors.email}
            onChange={handleEmail}
          ></InputText>
          <InputText
            type="text"
            name="phone"
            label="Your phone"
            placeholder="your phone"
            initialValue={phoneNumber}
            error={errors.phoneNumber}
            onChange={handlePhone}
          ></InputText>
          <InputText
            type="date"
            name="dob"
            label="birth day"
            // placeholder="your phone"
            // initialValue={user.phone}
            error={datas?.dob}
            onChange={handleName}
          ></InputText>
          <h2 className="text-lg font-semibold  capitalize lg:col-span-2 ">
            Preference
          </h2>
          <InputText
            type="text"
            name="nationality"
            label="Your nationality"
            placeholder="your nationality"
            initialValue={nationality}
            error={errors.nationality}
            onChange={handleName}
          ></InputText>
          <InputText
            type="language"
            name="language"
            label="Your language"
            placeholder="your language"
            initialValue={language}
            error={errors.language}
            onChange={handleName}
          ></InputText>
          <InputText
            type="text"
            name="address"
            label="Your address"
            placeholder="your address"
            initialValue={address}
            error={errors.address}
            onChange={handleName}
          ></InputText>
          <InputSelection
            label="Gender"
            data={formData}
            setData={setFormData}
            field="gender"
            options={["male", "female", "others"]}
            selectOp="select gender"
          ></InputSelection>
          <SubmitButton
            text="save"
            containerStyles="w-[1/2]   ml-auto lg:col-span-2"
            disabled={
              !formData.name ||
              !formData.address ||
              !formData.email ||
              !formData.dob ||
              !formData.language ||
              !formData.phoneNumber ||
              !formData.nationality ||
              !formData.profileImg.url
            }
          ></SubmitButton>
        </form>
      </div>
    </div>
  );
};

export default ProfileEdit;

import { ChangeEvent, FormEvent, MouseEvent } from "react";

export interface ProductCardProps {
  name: string;
  email: string;
  location: string;
  image: string;
}

export interface ProductRowProps {
  propertyName: string;
  propertyValue: string;
  containerStyles?: string;
}

export interface ActionButtonProps {
  children: React.ReactNode;
  containerStyles?: string;
  disabled?: boolean;
  handleAction: (e: MouseEvent<HTMLButtonElement>) => void;
}

export type ChangeEventType = (e: ChangeEvent<HTMLInputElement>) => void;
export type OnSubmitType = (e: FormEvent<HTMLFormElement>) => void;

export interface InputTextProps {
  type: string;
  name: string;
  onChange: ChangeEventType;
  placeholder?: string;
  error?: string;
  label?: string;
  styles?: string;
  initialValue?: any;
  min?: number;
  max?: number;
  labelStyles?: any;
}

export interface loginType {
  email: string;
  password: string;
}

export interface loginError extends loginType {
  general?: string;
}
export interface SubmitButtonProps {
  text: string;
  containerStyles?: string;
  disabled?: boolean;
}

export interface registerType extends loginType {
  firstName: string;
  lastName: string;
  phone: string;
  confirm: string;
}

export interface registerErrorType extends loginError {
  firstName: string;
  lastName: string;
  phone: string;
  confirm: string;
}

export interface ImageUploadProps {
  id: string;
  onChange: ChangeEventType;
  image?: ImageType[];
  error: string;
  imageStyles?: string;
  isMultiple: boolean;
}

export interface ImageType {
  publicLink: string;
  url: string;
}

export interface UserEditInfoType {
  name: string;
  email: string;
  phoneNumber: string;
  profileImg: {
    url: string;
    public_id: string;
  };

  nationality: string;
  language: string;
  address: string;

  gender: "male" | "female" | "others";
  dob: string;
}
export interface userEditErrorType {
  name: string;
  email: string;
  phone: string;
  profileImage: string;
  nationality: string;
  language: string;
  address: string;
  gender: string;
  dob: "";
}

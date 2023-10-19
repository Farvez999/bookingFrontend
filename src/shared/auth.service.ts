import { getFromCookie, setToCookies } from "@/utiles/Cookie";
import { decodedToken } from "@/utiles/jwtDecode";
import Cookies from "universal-cookie";
import { instance } from "./axiosInstance";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/userSlice/userSlice";
export const storeUserInfo = (key: string, value: string) => {
  return setToCookies(key, value);
};

export const GetUserInfo = () => {
  const authToken = getFromCookie("accessToken");
  // console.log(authToken);
  if (authToken) {
    const decodedData: any = decodedToken(authToken);
    const { role, userId, email } = decodedData;

    return {
      role,
      email,
      userId,
    };
  } else {
    return "";
  }
};

export const isLoggedIn = () => {
  const authToken = getFromCookie("accessToken");

  return !!authToken;
};

export const removeUserInfo = (key: string) => {
  const cookie = new Cookies();
  cookie.remove(key);
  GetUserInfo();
  return;
};

export const getNewAccessToken = async () => {
  return await instance({
    url: `http://localhost:5000/api/v1/auth/refresh-token`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
};

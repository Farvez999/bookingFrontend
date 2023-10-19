import Cookies from "universal-cookie";
export const setToCookies = (key: string, token: string) => {
  const cookie = new Cookies();
  if (!key || typeof window === "undefined") {
    return "";
  }
  return cookie.set(key, token);
};

export const getFromCookie = (key: string) => {
  const cookie = new Cookies();
  if (!key || typeof window === "undefined") {
    return "";
  }
  return cookie.get(key);
};

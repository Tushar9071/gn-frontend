import { Cookies } from "react-cookie";
const cookies = new Cookies();
export const CookieService = {
  get: (key: string): any => {
    return cookies.get(key);
  },
  set: (key: string, val: string, options?: any): void => {
    cookies.set(key, val, options || {});
  },
  remove: (key: string): void => {
    cookies.remove(key);
  },
};

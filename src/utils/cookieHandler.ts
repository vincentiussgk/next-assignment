import { IUser } from "@/types/dataTypes";
import { Role } from "@/types/dropdownValues";
import Cookies from "js-cookie";

export const setUserCookie = (user: IUser): void => {
  const { id, role } = user;
  Cookies.set("userId", id?.toString() ?? "", { path: "/" });
  Cookies.set("role", Role[role], { path: "/" });
};

export const getUserId = (): string | undefined => {
  return Cookies.get("userId");
};

export const getName = (): string | undefined => {
  return Cookies.get("role");
};

export const removeCookies = (): void => {
  Cookies.remove("userId", { path: "/" });
  Cookies.remove("role", { path: "/" });
};

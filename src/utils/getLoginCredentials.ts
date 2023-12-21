// @ts-nocheck
import { doesUserExist } from "./doesUserExist";
import { ILoginBody } from "@/types";

export const getLoginCredentials = async ({ email, password }: ILoginBody) => {
  const user = await doesUserExist(email);
  if (!user) {
    throw new Error("User not found.");
  }

  const loginCredentialsValid = user.password === password;

  if (!loginCredentialsValid) {
    throw new Error("Password does not match.");
  } else return user;
};

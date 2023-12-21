import { fetchBaseUrl } from "@/lib/fetch";
import { ILoginBody } from "@/types";

export const doesUserExist = async (email: string) => {
  const res = await fetchBaseUrl("users", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const resJson = await res.json();

  const userExists = resJson?.find(
    (userData: ILoginBody) => userData.email === email
  );

  return userExists;
};

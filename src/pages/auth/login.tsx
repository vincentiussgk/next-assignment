// @ts-nocheck
import AuthButton from "@/components/AuthButton";
import React, { FormEventHandler, useState } from "react";
import AuthLayout from "./layout";
import InputField from "../admin/components/InputField";
import { handleInputChange } from "@/utils/admin/formHandlers";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { manipWithFetch } from "@/lib/fetch";
import { setUserCookie } from "@/utils/cookieHandler";
import { IUser } from "@/types/dataTypes";
import { Role } from "@/types/dropdownValues";
import Link from "next/link";
import {
  getLoginCredentials,
  isLoginCredentialsValid,
} from "@/utils/getLoginCredentials";

interface LoginState {
  email: string;
  password: string;
}

interface LoginValidationState {
  email: string | boolean;
  password: string | boolean;
}

const Login = () => {
  const router = useRouter();
  const [authFormState, setAuthFormState] = useState<LoginState>(
    {} as LoginState
  );

  const [validationState, setValidationState] = useState<LoginValidationState>(
    {} as LoginValidationState
  );

  const handleFormSubmit = async (e: FormEventHandler<HTMLInputElement>) => {
    try {
      e.preventDefault();

      const user = await getLoginCredentials(authFormState);
      if (!user) {
        return;
      }
      toast.success("👋 Hey, welcome back!", {
        position: "top-center",
        autoClose: 3000,
      });

      setUserCookie(user);

      if (Role[user.role] === "admin") {
        router.push("/admin/dashboard");
      } else {
        router.push("/events");
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <AuthLayout>
      <form className="flex flex-col gap-y-[10px]" onSubmit={handleFormSubmit}>
        <InputField
          value={authFormState.email}
          fieldName="email"
          label="Email"
          handleChange={handleInputChange}
          stateHandler={setAuthFormState}
          validation={(value: string) => /@.*\./.test(value)}
          isFormValid={validationState.email}
          inputType="text"
          placeholder="Your email here..."
          errorMessage="Please input a correct email."
        />
        <InputField
          value={authFormState.password}
          fieldName="password"
          label="Password"
          handleChange={handleInputChange}
          stateHandler={setAuthFormState}
          validation={(value: string) => value.length > 0}
          isFormValid={validationState.password}
          inputType="password"
          placeholder="Your password here..."
          errorMessage="Please enter your password."
        />

        <div
          className={`justify-end text-[12px] items-center flex text-secondary-text`}
        >
          <input className={`mr-[5px]`} type="checkbox" />
          Remember Me
        </div>

        <AuthButton buttonStyle={"primary"} submitButton>
          Login
        </AuthButton>

        <div className="mt-3 text-[12px]">
          <Link href="/events">Browse without account {">"}</Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Login;

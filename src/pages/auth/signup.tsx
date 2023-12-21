// @ts-nocheck
import React, { FormEventHandler, useState } from "react";
import AuthLayout from "./layout";
import InputField from "../admin/components/InputField";
import { handleInputChange } from "@/utils/admin/formHandlers";
import AuthButton from "@/components/AuthButton";
import { manipWithFetch } from "@/lib/fetch";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { doesUserExist } from "@/utils/doesUserExist";

interface RegisterState {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
  pin: number;
}

interface RegisterValidationState {
  email: string | boolean;
  name: string | boolean;
  password: string | boolean;
  pin: number;
}

const Login = () => {
  const router = useRouter();
  const [authFormState, setAuthFormState] = useState<RegisterState>(
    {} as RegisterState
  );

  const [validationState, setValidationState] =
    useState<RegisterValidationState>({} as RegisterValidationState);

  const handleFormSubmit = async (e: FormEventHandler<HTMLInputElement>) => {
    try {
      e.preventDefault();
      const { email, name, password, confirmPassword, pin } = authFormState;

      if (password !== confirmPassword) {
        throw new Error("Passwords do not match.");
      }

      const userExists = await doesUserExist(email);

      if (userExists) {
        throw new Error("User already exists.");
      }

      await manipWithFetch("users", {
        email,
        name,
        password,
        pin,
        balance: 0,
        image: "",
        role: 2,
        membership: 0,
      });

      toast.success("User successfully registered!", {
        position: "top-center",
        autoClose: 3000,
      });

      router.push("/auth/login");
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
          value={authFormState.name}
          fieldName="name"
          label="Full Name"
          handleChange={handleInputChange}
          stateHandler={setAuthFormState}
          validation={(value: string) => value.length >= 5}
          isFormValid={validationState.name}
          inputType="text"
          placeholder="Your full name here..."
          errorMessage="Please enter a minimum of 5 characters."
        />
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
          validation={(value: string, validationComparator: string) =>
            value === validationComparator
          }
          isFormValid={validationState.password}
          inputType="password"
          placeholder="Your password here..."
          errorMessage="Passwords do not match."
        />
        <InputField
          value={authFormState.confirmPassword}
          fieldName="confirmPassword"
          label="Confirm Password"
          handleChange={handleInputChange}
          stateHandler={setAuthFormState}
          validation={(value: string, validationComparator: string) =>
            value === validationComparator
          }
          isFormValid={validationState.password}
          inputType="password"
          placeholder="Confirmation password..."
          errorMessage="Passwords do not match."
        />
        <InputField
          value={authFormState.pin}
          fieldName="pin"
          label="PIN Number"
          handleChange={handleInputChange}
          stateHandler={setAuthFormState}
          validation={(value: string, validationComparator: string) =>
            value === validationComparator
          }
          isFormValid={validationState.pin}
          inputType="password"
          placeholder="PIN Number..."
          errorMessage="Passwords do not match."
        />

        <AuthButton buttonStyle={"primary"} submitButton>
          Sign Up
        </AuthButton>
      </form>
    </AuthLayout>
  );
};

export default Login;

// @ts-nocheck
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import SelectInput from "../../components/SelectInput";
import { Membership, Role } from "@/types/dropdownValues";
import InputField from "../../components/InputField";
import { IUsersValidationState } from "@/types/inputInterfaces";
import Image from "next/image";
import Spinner from "../../components/Spinner";
import Button from "../../components/Button";
import {
  handleFormSubmit,
  handleImageUpload,
  handleInputChange,
} from "@/utils/admin/formHandlers";

interface IUsersFormState {
  image: null;
  email: string;
  name: string;
  role: string | number;
  membership: string | number;
  balance: number | string;
}

const UserForm = () => {
  const router = useRouter();

  const [userFormState, setUserFormState] = useState<IUsersFormState>(
    {} as IUsersFormState
  );
  const [userFormValidation, setUserFormValidation] =
    useState<IUsersValidationState>({} as IUsersValidationState);

  const [imageLoading, setImageLoading] = useState(false);

  const { data, error, isLoading } = useSWR<IUsersFormState>(
    `users/${router.query.itemId}`,
    fetcher
  );

  useEffect(() => {
    if (data && Object.keys(data).length && router.query.itemId) {
      setUserFormState(data);
    }
  }, [data, router.query.itemId]);

  return (
    <div className="flex flex-col gap-y-[10px]">
      <div className={`flex justify-center`}>
        <label htmlFor={`uploader`} className={`cursor-pointer`}>
          {imageLoading ? (
            <Spinner />
          ) : (
            <div className={`avatar cursor-pointer`}>
              <div className="rounded-full border-[#333] border-[1px] mb-[10px]">
                {userFormState?.image ? (
                  <Image
                    className="m-0 p-0"
                    src={userFormState?.image}
                    width={150}
                    height={150}
                    alt="Profile Picture"
                  />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="70"
                    width="70"
                    className="m-[80px]"
                    viewBox="0 0 448 512"
                  >
                    <path
                      fill="#202c40"
                      d="M246.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 109.3V320c0 17.7 14.3 32 32 32s32-14.3 32-32V109.3l73.4 73.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-128-128zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64c0 53 43 96 96 96H352c53 0 96-43 96-96V352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V352z"
                    />
                  </svg>
                )}
              </div>
            </div>
          )}
        </label>
        <input
          className={`hidden`}
          type="file"
          id="uploader"
          name="avatar"
          accept="image/png, image/jpeg"
          onChange={(e) =>
            handleImageUpload(e, setImageLoading, setUserFormState)
          }
        />
      </div>
      <div className={`flex gap-5 justify-between gap-x-[15px]`}>
        <InputField
          value={userFormState.email}
          fieldName="email"
          label="Email"
          handleChange={handleInputChange}
          stateHandler={setUserFormState}
          validation={(value: string) => /@.*\./.test(value)}
          isFormValid={userFormValidation.email}
          inputType="text"
          placeholder="Your email here..."
          errorMessage="Please input a correct email."
        />
        <InputField
          value={userFormState.name}
          fieldName="name"
          label="Full Name"
          handleChange={handleInputChange}
          stateHandler={setUserFormState}
          validation={(value: string) => value.length > 5}
          isFormValid={userFormValidation.email}
          inputType="text"
          placeholder="Your full name here..."
          errorMessage="Please enter a minimum of 5 characters."
        />
      </div>
      <div className={`flex w-full gap-5 justify-between gap-x-[15px]`}>
        <div className="w-full">
          <SelectInput
            handleSelectChange={handleInputChange}
            stateHandler={setUserFormState}
            label="Role"
            fieldName="role"
            options={Object.values(Role)}
            value={userFormState.role}
          />
        </div>
        <SelectInput
          handleSelectChange={handleInputChange}
          stateHandler={setUserFormState}
          label="Membership"
          fieldName="membership"
          options={Object.values(Membership)}
          value={userFormState.membership}
        />
      </div>
      <div className={`flex w-full justify-between gap-x-[15px]`}>
        <InputField
          value={userFormState.balance}
          fieldName="balance"
          label="Balance"
          handleChange={handleInputChange}
          stateHandler={setUserFormState}
          validation={(value: number) => value > 0}
          isFormValid={userFormValidation.balance}
          inputType="number"
          placeholder="Your full name here..."
          errorMessage="Please enter a minimum of 5 characters."
        />
      </div>
      <div className="mt-5">
        <Button
          disabled={imageLoading}
          onClick={() => {
            handleFormSubmit(userFormState, "users", router?.query?.itemId);
            router.back();
          }}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default UserForm;

// @ts-nocheck
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
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
import TextArea from "../../components/TextArea";
import AdminCombobox from "../../components/AdminCombobox";

interface IMerchFormstate {
  id: number;
  price: number;
  image: string;
  name: string;
  desc: string;
  stock: number;
  eventId: number;
}

const MerchForm = () => {
  const router = useRouter();

  const [merchFormState, setMerchFormState] = useState<IMerchFormstate>(
    {} as IMerchFormstate
  );
  const [merchFormValidation, setmerchFormValidation] =
    useState<IUsersValidationState>({} as IUsersValidationState);

  const [imageLoading, setImageLoading] = useState(false);

  const { data, error, isLoading } = useSWR<IMerchFormstate>(
    `merch/${router.query.itemId}`,
    fetcher
  );

  const {
    data: eventData,
    error: eventError,
    isLoading: eventLoading,
  } = useSWR<IMerchFormstate>(`events?id_like=&name_like=`, fetcher);

  useEffect(() => {
    if (data && Object.keys(data).length && router.query.itemId) {
      setMerchFormState(data);
    }
  }, [data, router.query.itemId]);

  const handleComboboxChange = (eventId: number) => {
    setMerchFormState((prevState) => ({ ...prevState, eventId }));
  };

  return (
    <div className="flex flex-col gap-y-[10px]">
      <div className={`flex justify-center`}>
        <label htmlFor={`uploader`} className={`cursor-pointer`}>
          {imageLoading ? (
            <Spinner />
          ) : (
            <div className={`avatar cursor-pointer`}>
              <div className="rounded-full border-[#333] border-[1px] mb-[10px]">
                {merchFormState?.image ? (
                  <Image
                    className="m-0 p-0"
                    src={merchFormState?.image}
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
            handleImageUpload(e, setImageLoading, setMerchFormState)
          }
        />
      </div>

      <div className={`flex gap-5`}>
        <InputField
          value={merchFormState.name}
          fieldName="name"
          label="Merch Name"
          handleChange={handleInputChange}
          stateHandler={setMerchFormState}
          validation={(value: string) => value.length > 5}
          isFormValid={merchFormValidation.name}
          inputType="text"
          placeholder="Your full name here..."
          errorMessage="Please enter a minimum of 5 characters."
        />

        <InputField
          value={merchFormState.price}
          fieldName="price"
          label="Price"
          handleChange={handleInputChange}
          stateHandler={setMerchFormState}
          validation={(value: number) => value > 5}
          isFormValid={merchFormValidation.email}
          inputType="number"
          placeholder="Merch price..."
          errorMessage="Please input a correct email."
        />
      </div>
      <div className={`flex gap-5`}>
        {eventData && (
          <div className={`flex flex-col w-full`}>
            <label>Associated Event</label>
            <AdminCombobox
              data={eventData?.map((data) => ({
                name: data.name,
                id: data.id,
              }))}
              onChange={handleComboboxChange}
              initialValue={merchFormState.eventId}
            />
          </div>
        )}

        <InputField
          value={merchFormState.stock}
          fieldName="stock"
          label="Merch Stock"
          handleChange={handleInputChange}
          stateHandler={setMerchFormState}
          validation={(value: string) => value.length > 5}
          isFormValid={merchFormValidation.stock}
          inputType="number"
          placeholder="Your full name here..."
          errorMessage="Please enter a minimum of 5 characters."
        />
      </div>
      <div className={`flex gap-5`}>
        <TextArea
          value={merchFormState.desc}
          fieldName="desc"
          label="Merch Description"
          handleChange={handleInputChange}
          stateHandler={setMerchFormState}
          validation={(value: string | boolean) =>
            value?.length >= 5 && value?.length <= 500
          }
          isFormValid={merchFormValidation.desc}
          errorMessage="Please enter between 5 and 500 characters."
          placeholder="ex: kayu jati mod"
        />
      </div>
      <div className="mt-5">
        <Button
          disabled={imageLoading}
          onClick={() => {
            handleFormSubmit(merchFormState, "merch", router.query.itemId);
            router.back();
          }}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default MerchForm;

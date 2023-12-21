// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import SelectInput from "../../components/SelectInput";
import { Category } from "@/types/dropdownValues";
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
import { timeToString } from "@/utils/timeToString";
import { emptyEventForm } from "@/types/defaultFormValues";

export interface IEventsFormState {
  name: string;
  date: string;
  location: string;
  duration: number | string;
  category: number | string;
  price: number | string;
  image: string;
  description: string;
  capacity: number | string;
  current: number | string;
}

const EventForm = () => {
  const router = useRouter();
  const firstInputRef = useRef<HTMLElement>();

  const [eventFormState, setEventFormState] =
    useState<IEventsFormState>(emptyEventForm);
  const [eventFormValidation, setEventFormValidation] =
    useState<IUsersValidationState>({} as IUsersValidationState);

  const [imageLoading, setImageLoading] = useState(false);

  const { data, error, isLoading } = useSWR<IEventsFormState>(
    `events/${router.query.itemId}`,
    fetcher
  );

  useEffect(() => {
    if (data && Object.keys(data).length && router.query.itemId) {
      setEventFormState(data);
    }
  }, [data, router.query.itemId]);

  useEffect(() => {
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, [firstInputRef]);

  return (
    <div>
      <div></div>
      <div className={`flex justify-center`}>
        <label htmlFor={`uploader`} className={`cursor-pointer`}>
          {imageLoading ? (
            <Spinner />
          ) : (
            <div className={`avatar cursor-pointer`}>
              <div className="rounded-full border-[#333] border-[1px] mb-[10px]">
                {eventFormState?.image ? (
                  <Image
                    className="m-0 p-0"
                    src={eventFormState?.image}
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
            handleImageUpload(e, setImageLoading, setEventFormState)
          }
        />
      </div>
      <div className="flex flex-col gap-y-[10px]">
        <div className={`flex w-full justify-between gap-x-[15px]`}>
          <InputField
            ref={firstInputRef}
            value={eventFormState.name}
            fieldName="name"
            label="Event Name"
            handleChange={handleInputChange}
            stateHandler={setEventFormState}
            validation={(value: string) => /@.*\./.test(value)}
            isFormValid={eventFormValidation.name}
            inputType="text"
            placeholder="Your email here..."
            errorMessage="Please input a correct email."
          />
          <SelectInput
            handleSelectChange={handleInputChange}
            stateHandler={setEventFormState}
            label="Category"
            fieldName="category"
            options={Object.values(Category)}
            value={eventFormState.category}
          />
        </div>

        <div className={`flex w-full justify-between gap-x-[15px]`}>
          <InputField
            value={eventFormState.location}
            fieldName="location"
            label="Event Location"
            handleChange={handleInputChange}
            stateHandler={setEventFormState}
            validation={(value: string) => /@.*\./.test(value)}
            isFormValid={eventFormValidation.location}
            inputType="text"
            placeholder="Your email here..."
            errorMessage="Please input a correct email."
          />

          <div className={`w-full`}>
            <label htmlFor="datepicker">Event Date</label>
            <input
              onChange={(e) => {
                handleInputChange(e.target.value, "date", setEventFormState);
              }}
              value={eventFormState.date}
              id="datepicker"
              placeholder="dd/mm/yyyy"
              className="w-full mt-2 p-[15px] border-[1px] rounded-[8px] border-[#e5e5e5]"
              type="datetime-local"
            />
          </div>
        </div>
        <div
          className={`flex w-full justify-between gap-x-[15px] items-center`}
        >
          <div className={`flex flex-col w-full`}>
            <InputField
              value={eventFormState.duration}
              fieldName="duration"
              label="Event Duration"
              handleChange={handleInputChange}
              stateHandler={setEventFormState}
              validation={(value: number) => value > 5}
              isFormValid={eventFormValidation.duration}
              inputType="number"
              placeholder="Enter duration in hours..."
              errorMessage="Please enter a minimum of 5 characters."
            />

            <span className={`text-[14px]`}>
              Equivalent to: {timeToString(eventFormState.duration)}
            </span>
          </div>
        </div>
        <div className={`flex w-full justify-between gap-x-[15px]`}>
          <InputField
            value={eventFormState.price}
            fieldName="price"
            label="Event Price"
            handleChange={handleInputChange}
            stateHandler={setEventFormState}
            validation={(value: string) => /@.*\./.test(value)}
            isFormValid={eventFormValidation.price}
            inputType="text"
            placeholder="Your email here..."
            errorMessage="Please input a correct email."
          />
          <InputField
            value={eventFormState.capacity}
            fieldName="capacity"
            label="Event Capacity"
            handleChange={handleInputChange}
            stateHandler={setEventFormState}
            validation={(value: string) => value.length > 5}
            isFormValid={eventFormValidation.capacity}
            inputType="number"
            placeholder="Your full name here..."
            errorMessage="Please enter a minimum of 5 characters."
          />
        </div>
        <div className={`flex w-full justify-between`}>
          <TextArea
            value={eventFormState.description}
            fieldName="description"
            label="Event Description"
            handleChange={handleInputChange}
            stateHandler={setEventFormState}
            validation={(value: string | boolean) =>
              value?.length >= 5 && value?.length <= 500
            }
            isFormValid={eventFormValidation.description}
            errorMessage="Please enter between 5 and 500 characters."
            placeholder="ex: kayu jati mod"
          />
        </div>
        <div className="mt-5">
          <Button
            disabled={imageLoading}
            onClick={() => {
              handleFormSubmit(eventFormState, "events", router.query.itemId);
              router.back();
            }}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventForm;

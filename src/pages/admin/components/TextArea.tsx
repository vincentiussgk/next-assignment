import { TValidation } from "@/types";
import { ChangeEvent } from "react";

interface InputProps<T> {
  placeholder: string;
  handleChange: (
    e: ChangeEvent<HTMLTextAreaElement>,
    fieldName: string,
    validation: TValidation<T>
  ) => void;
  fieldName: string;
  label: string;
  value: string | number | undefined;
  validation: TValidation<T>;
  isFormValid: boolean | string;
  errorMessage: string;
}

const TextArea = ({
  placeholder,
  fieldName,
  value,

  stateHandler,

  label,
  handleChange,
  validation,
  isFormValid,
  errorMessage,
}: InputProps) => {
  const isFormInvalid = isFormValid === false;
  return (
    <div className={`flex flex-col text-left w-full`}>
      <label className={`${isFormInvalid && "text-danger-text"} mb-[5px]`}>
        {label}
      </label>
      <textarea
        className={`p-[16px]
        text-[16px] h-[160px] w-full resize-none
        placeholder:text-secondary-text rounded-[8px] border-[1px] box-border border-solid
        focus:border-primary outline-none
        ${isFormInvalid && "border-danger-text"}`}
        name={fieldName}
        value={value}
        onChange={(e) =>
          handleChange(e.target.value, fieldName, stateHandler, validation)
        }
        onBlur={(e) =>
          handleChange(e.target.value, fieldName, stateHandler, validation)
        }
        placeholder={placeholder}
        minLength={5}
        maxLength={500}
      />
      <div
        className={`bg-[#FFE3E3] py-[8px] px-[12px] w-full text-danger-text
      ${isFormInvalid ? "block" : "hidden"}`}
      >
        {errorMessage}
      </div>
    </div>
  );
};

export default TextArea;

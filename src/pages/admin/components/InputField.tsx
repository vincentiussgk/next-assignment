import { IInputProps, TInputType } from "@/types/inputInterfaces";

const InputField = <T extends TInputType>({
  label,

  placeholder,
  inputType,
  fieldName,
  value,

  stateHandler,

  handleChange,
  validation,
  isFormValid,
  errorMessage,

  ref = null,
  disabled = false,
}: IInputProps<T>): JSX.Element => {
  const isFormInvalid = isFormValid === false;
  return (
    <div className={`flex flex-col w-full`}>
      <label
        className={`text-left mb-2
      ${isFormInvalid && "text-danger-text"} `}
      >
        {label}
      </label>
      <input
        className={`p-[15px] text-[16px] text-primary-text
        placeholder:text-secondary-text rounded-[8px]  ${
          disabled ? "cursor-not-allowed bg-[#e4e4e4]" : "bg-white"
        }
        border-[1px] border-[#0000001a] `}
        ref={ref}
        name={fieldName}
        value={value}
        type={inputType}
        disabled={disabled}
        onChange={(e) => handleChange(e.target.value, fieldName, stateHandler)}
        onBlur={(e) => handleChange(e.target.value, fieldName, stateHandler)}
        placeholder={placeholder}
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

export default InputField;

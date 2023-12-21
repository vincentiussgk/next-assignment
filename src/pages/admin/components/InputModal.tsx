// @ts-nocheck
import { ChangeEvent } from "react";

interface InputProps {
  placeholder: string;
  inputType: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>, fieldName: string) => void;
  fieldName: string;
  value: string | number | undefined;
}

const Input = ({
  placeholder,
  inputType,
  fieldName,
  value,
  handleChange,
}: InputProps) => {
  return (
    <input
      className="bg-zinc-200 rounded py-5 px-2"
      name={fieldName}
      value={value}
      type={inputType}
      onChange={(e) => handleChange(e, fieldName)}
      placeholder={placeholder}
    />
  );
};

export default Input;

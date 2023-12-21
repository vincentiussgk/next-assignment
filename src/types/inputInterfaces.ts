export type TValidation<T> = (value: T | boolean) => boolean;

export type TInputType = string | number | boolean;

export interface IInputProps<T> {
  label: string;

  placeholder: string;
  inputType: string;
  fieldName: string;
  value: string | number | undefined;

  handleChange: (
    fieldName: string,
    inputValue: T,
    validation: TValidation<T>
  ) => void;

  validation?: TValidation<T>;
  isFormValid?: boolean | string;
  errorMessage?: string;

  // notation?: any
}

export interface IUsersFormState {
  image: string;
  email: string;
  fullName: string;
  role: number;
  membership: number;
  balance: number;
}

export interface IUsersValidationState {
  image: string;
  email: string;
  fullName: string;
  role: string | number;
  membership: string | number;
  balance: string | number;
}

import { IEventsFormState } from "@/pages/admin/layout/form/EventForm";
import { IUsersFormState, IUsersValidationState } from "./inputInterfaces";

export const emptyUserForm: IUsersFormState = {
  image: "",
  email: "",
  fullName: "",
  role: 0,
  membership: 0,
  balance: 0,
};

export const emptyUserValidation: IUsersValidationState = {
  image: "",
  email: "",
  fullName: "",
  role: "",
  membership: "",
  balance: "",
};

export const emptyEventForm: IEventsFormState = {
  name: "",
  date: "",
  location: "",
  duration: 1,
  category: "",
  price: "",
  image: "",
  description: "",
  capacity: "",
  current: 0,
};

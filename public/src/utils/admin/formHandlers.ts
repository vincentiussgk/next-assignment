import { manipWithFetch } from "@/lib/fetch";
import { ChangeEvent, SetStateAction } from "react";
import { toast } from "react-toastify";

export const handleInputChange = <T, U>(
  inputValue: number | string,
  fieldName: string,
  setFormState: React.Dispatch<SetStateAction<T>>
) => {
  setFormState((prevFormState) => {
    return { ...prevFormState, [fieldName]: inputValue };
  });
};

export const handleImageUpload = async <T>(
  e: ChangeEvent<HTMLInputElement>,
  loadingSetter: React.Dispatch<SetStateAction<boolean>>,
  stateSetter: React.Dispatch<SetStateAction<T>>
) => {
  try {
    loadingSetter(true);
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "vgukcerv");

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dp9xqtibm/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const resJson = await response.json();

      stateSetter((prevState) => ({
        ...prevState,
        image: resJson.url,
      }));

      toast.success(`🖼️ Image succesfully uploaded!`, {
        position: "top-center",
        autoClose: 3000,
      });
    }
  } catch (err: Error) {
    toast.error(err?.message ?? "Error occured.");
  } finally {
    loadingSetter(false);
  }
};

export const handleFormSubmit = async <T>(
  formData: T,
  table?: string | undefined,
  editId?: string | undefined
) => {
  if (!editId) {
    editId = "";
  }
  const method = editId ? "PUT" : "POST";
  await manipWithFetch(`${table}/${editId}`, formData, method);
  toast.success(
    editId
      ? `${formData.name} successfully edited!`
      : `${formData.name} successfully posted!`,
    {
      position: "top-center",
      autoClose: 3000,
    }
  );
};

export const handleSelectClientChange = <T>(
  inputValue: T,
  setFormState: React.Dispatch<SetStateAction<T>>
) => {
  setFormState(inputValue);
};

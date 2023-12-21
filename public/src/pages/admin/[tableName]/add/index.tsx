import React from "react";
import AdminLayout from "../../layout";
import UserForm from "../../layout/form/UserForm";
import { useRouter } from "next/router";
import FormLayout from "../../layout/form/FormLayout";
import MerchForm from "../../layout/form/MerchForm";
import EventForm from "../../layout/form/EventForm";

const Add = () => {
  const router = useRouter();
  return (
    <AdminLayout>
      <FormLayout>
        {router?.query?.tableName === "users" && <UserForm />}
        {router?.query?.tableName === "merch" && <MerchForm />}
        {router?.query?.tableName === "events" && <EventForm />}
      </FormLayout>
    </AdminLayout>
  );
};

export default Add;

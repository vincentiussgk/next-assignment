import React, { ReactNode } from "react";
import AdminLayout from "./layout";

const Admin = ({ children }: { children: ReactNode }) => {
  return <AdminLayout>{children}</AdminLayout>;
};

export default Admin;

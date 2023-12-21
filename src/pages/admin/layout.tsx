import React, { ReactNode } from "react";
import Sidebar from "./layout/Sidebar";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={`flex w-screen`}>
      <div className={`w-[12vw]`}>
        <Sidebar />
      </div>
      <div
        className={`w-[100%] px-[80px] py-[120px] flex 
        justify-center items-center transition-all transition-duration-700`}
      >
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;

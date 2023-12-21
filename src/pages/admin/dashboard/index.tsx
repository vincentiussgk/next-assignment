import React, { useState } from "react";
import AdminLayout from "../layout";
import Chart from "../components/Chart";

const Earnings = () => {
  return (
    <AdminLayout>
      <div className="flex flex-col w-full gap-5">
        <div className="flex w-full gap-10 ">
          <div className="w-full bg-red-300 rounded-lg px-5 h-40">
            <h1 className="text-[30px] font-bold">EARNINGS</h1>
          </div>
          <div className="w-full bg-amber-100 rounded-lg px-5">
            <h1 className="text-[30px] font-bold"> PROFIT</h1>
          </div>

          <div className="w-full bg-green-200 rounded-lg px-5 ">
            <h1 className="text-[30px] font-bold"> NET PROFIT</h1>
          </div>
        </div>
        <div className="flex bg-white items-center justify-center p-2">
          <Chart />
        </div>
      </div>
    </AdminLayout>
  );
};

export default Earnings;

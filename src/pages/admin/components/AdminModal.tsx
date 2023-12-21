// @ts-nocheck
import React from "react";
import Button from "./Button";

const AdminModal = ({ handleDeleteRow, closeModal, itemName }) => {
  return (
    <>
      <div
        className={`bg-[rgba(0,_0,_0,_0.2)] w-screen h-screen z-0
        top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2
        transition-opacity ease-in-out duration-300 
        absolute`}
        onClick={closeModal}
      ></div>
      <div
        className={`fixed top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2
        transition-opacity ease-in-out duration-300`}
      >
        <div
          className={`flex flex-col 
          bg-white text-white
          z-10 rounded-[16px]
          shadow-[0 5px 20px 0 rgba(0, 0, 0, 0.04)] `}
        >
          <div
            className={`flex text-black justify-between px-[25px] py-[15px]`}
          >
            <h2>Confirm Delete</h2>
            <h2 onClick={closeModal} className={`cursor-pointer`}>
              X
            </h2>
          </div>
          <div
            className={`text-[14px] py-[20px] px-[50px]
            text-black
            text-left gap-y-[10px]
            border-t-[1px] border-b-[1px] border-[#BABABA]`}
          >
            Are you sure want to delete{" "}
            <span>
              <strong>{itemName}</strong>
            </span>
            ?
          </div>
          <div className={`flex justify-end w-full py-[10px] px-[20px]`}>
            <Button onClick={handleDeleteRow}>Delete</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminModal;

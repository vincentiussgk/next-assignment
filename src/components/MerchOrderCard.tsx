import { IMerch, IMerchOrder } from "@/types/dataTypes";
import Image from "next/image";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  decrementItem,
  removeItem,
} from "@/stores/cartSlice/cartSlice";
import { RootState } from "@/stores/store";

const MerchOrderCard = ({ merch }: { merch: IMerchOrder }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.cart);

  const handleAddItem = (merch: IMerchOrder) => {
    dispatch(addItem(merch));
  };
  const handleSubtractItem = (merch: IMerchOrder) => {
    dispatch(decrementItem(merch));
  };
  const handleRemoveItem = (merch: IMerchOrder) => {
    dispatch(removeItem(merch));
  };

  console.log(cart);

  return (
    <div
      className={`flex bg-white justify-between items-center px-[24px] py-[10px] rounded-lg shadow-lg hover:bg-zinc-100`}
    >
      <div className="flex gap-10">
        <Image src={merch?.image} width={60} height={60} alt={merch?.name} />
        <div className="flex flex-col">
          <div className="my-auto font-bold text-[20px]">{merch?.name}</div>
          <div className="my-auto">${merch?.price}</div>
        </div>
      </div>
      <div className={``}>
        <div className={`flex justify-between items-center gap-5 w-[300px]`}>
          <div className="flex items-center gap-x-[10px]">
            <button
              className={`btn ${merch?.qty === 1 && "btn-disabled"}`}
              onClick={() => handleSubtractItem(merch)}
            >
              <svg
                fill={`${merch?.qty === 1 && "#e4e4e4"}`}
                xmlns="http://www.w3.org/2000/svg"
                height="16"
                width="14"
                viewBox="0 0 448 512"
              >
                <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" />
              </svg>
            </button>
            <div>{merch?.qty}</div>
            <button
              className={`btn ${merch?.qty === merch.stock && "btn-disabled"}`}
              onClick={() => handleAddItem(merch)}
            >
              <svg
                fill={`${merch?.qty === merch.stock && "#e4e4e4"}`}
                xmlns="http://www.w3.org/2000/svg"
                height="16"
                width="14"
                viewBox="0 0 448 512"
              >
                <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
              </svg>
            </button>
          </div>
          <div>
            <p className="text-black font-bold">
              $ {merch?.qty * merch?.price}
            </p>
          </div>
          <button
            className={`btn bg-red-200`}
            onClick={() => handleRemoveItem(merch)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="16"
              width="14"
              viewBox="0 0 448 512"
            >
              <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MerchOrderCard;
150;

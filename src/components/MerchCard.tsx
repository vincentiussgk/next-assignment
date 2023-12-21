import { IMerch } from "@/types/dataTypes";
import Image from "next/image";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "@/stores/cartSlice/cartSlice";
import { RootState } from "@/stores/store";

const MerchCard = ({ merchData }: { merchData: IMerch }) => {
  const cart = useSelector((state: RootState) => state.cart.cart);

  const dispatch = useDispatch();
  return (
    <div className="card card-compact w-1/3 bg-base-100 shadow-xl cursor-pointer group">
      <figure className={`relative`}>
        <Image
          src={merchData.image}
          alt="event image"
          width={200}
          height={200}
        />
      </figure>
      <div className="card-body z-20">
        <h2 className="card-title">{merchData.name}</h2>
        <p>{merchData.desc}</p>
        <div className="flex justify-between">
          <div>${merchData.price}</div>
          <div>Stock: {merchData.stock}</div>
        </div>
        <button
          className={`btn ${
            (merchData?.stock === 0 ||
              cart[merchData?.id]?.qty === merchData?.stock) &&
            "btn-disabled"
          }`}
          onClick={() => dispatch(addItem(merchData))}
        >
          Add Item
        </button>
      </div>
    </div>
  );
};

export default MerchCard;

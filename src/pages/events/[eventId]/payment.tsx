import MerchCard from "@/components/MerchCard";
import { fetcher } from "@/lib/fetcher";
import { IEvent, IMerchOrder, IUser } from "@/types/dataTypes";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import MerchOrderCard from "@/components/MerchOrderCard";
import Image from "next/image";
import { roleDiscount, roleStyles } from "@/types/roleStyles";
import { emptyCart } from "@/stores/cartSlice/cartSlice";
import PaymentModal from "@/pages/admin/components/PaymentModal";
import TopUpModal from "@/pages/admin/components/TopUpModal";
import useBalance from "@/hooks/useBalance";
import { manipWithFetch } from "@/lib/fetch";
import { toast } from "react-toastify";

const Payment = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.cart);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isTopupModalOpen, setIsTopupModalOpen] = useState(false);

  const { currentUser, refetchBalance } = useBalance();

  const {
    data: eventData,
    error: eventError,
    isLoading: eventIsLoading,
  } = useSWR<IEvent>(`events/${router.query.eventId}?_embed=merch`, fetcher);

  useEffect(() => {
    return () => {
      dispatch(emptyCart());
    };
  }, []);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const purchaseItem = await (
        await fetch(
          `http://localhost:8080/purchases?eventId=${router.query.eventId}&userId=${currentUser?.id}`
        )
      ).json();

      const purchaseId = purchaseItem[0].id;

      await manipWithFetch(
        `purchases/${purchaseId}`,
        {
          purchaseDate: new Date(Date.now()).toISOString(),
          merch: Object.values(cart),
          paymentTotal: totalPayment,
          paymentStatus: true,
        },
        "PATCH"
      );

      await manipWithFetch(
        `users/${currentUser?.id}`,
        {
          balance: currentUser.balance - totalPayment,
        },
        "PATCH"
      );

      await Promise.all(
        Object.values(cart).map(async (cartItem) => {
          return await manipWithFetch(
            `merch/${cartItem.id}`,
            {
              stock: cartItem.stock - cartItem.qty,
            },
            "PATCH"
          );
        })
      );

      toast.success("Payment successful!", {
        position: "top-center",
        autoClose: 3000,
      });

      setIsPaymentModalOpen(false);

      refetchBalance();

      router.back();
    } catch (err) {
      toast.error(err.message, {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  const merchPrice =
    Object.values(cart).reduce(
      (acc: number, curr: IMerchOrder) => acc + curr.price * curr.qty,
      0
    ) ?? 0;

  const subtotal = merchPrice + eventData?.price;
  const totalPayment =
    subtotal * (1.11 - roleDiscount[currentUser?.membership] / 100);

  return (
    <div>
      <div className={`flex`}>
        <div
          className={`flex flex-col w-3/5 px-[30px] pt-[20px] border-r border-solid border-[#ddd]`}
        >
          <h1 className={`text-[32px]`}>
            <strong>Checkout</strong>
          </h1>
          <h2 className={`text-[28px]`}>Cart</h2>
          <h2 className="font-bold text-2xl">Your Orders</h2>
          <div className={`flex gap-5`}>
            <div className="my-5">
              <Image
                src={eventData?.image}
                width={100}
                height={100}
                alt={eventData?.name}
              />
            </div>
            <div className="my-auto">
              <p className="text-[20px] font-bold">{eventData?.name}</p>
              <p className="text-[15px]">${eventData?.price}</p>
            </div>
          </div>
          <div className={`flex flex-col gap-y-[15px]`}>
            <div className="font-bold mt-3 text-[20px]">Add-Ons</div>

            {Object.values(cart).length > 0 ? (
              Object.values(cart).map((merch) => {
                return <MerchOrderCard key={merch.id} merch={merch} />;
              })
            ) : (
              <div className={`bg-white py-2 rounded-lg px-2`}>
                Nothing here yet. Add some fun to the mix!
              </div>
            )}
          </div>
          <dl className="my-5 text-sm text-gray-700 mb-2">
            <div className="flex justify-between mb-2 mx-2">
              <p className="text-[18px]">Subtotal</p>
              <p className="text-[18px]">${subtotal}</p>
            </div>

            <div className="flex justify-between mb-2 mx-2">
              <p className="text-[18px]">Taxes (11%)</p>
              <p className="text-[18px]">${subtotal * 0.11}</p>
            </div>

            {currentUser?.membership > 0 && (
              <div className="flex justify-between mx-2">
                <p className="text-[18px]">Discount</p>

                <dd className={`flex`}>
                  <span
                    className={`inline-flex items-center justify-center rounded-full px-2.5 py-0.5 mr-3 ${
                      roleStyles[currentUser?.membership]
                    } `}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="-ms-1 me-1.5 h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
                      />
                    </svg>

                    <p className="whitespace-nowrap text-md">
                      {roleDiscount[currentUser?.membership]}% Membership
                      Discount
                    </p>
                  </span>
                  <p className="text-[18px] text-red-700">
                    - $
                    {subtotal * (roleDiscount[currentUser?.membership] / 100)}
                  </p>
                </dd>
              </div>
            )}

            <div className="flex justify-between !text-base font-medium my-2 bg-zinc-200 rounded-lg py-2">
              <p className="text-[18px] font-bold mx-2">TOTAL</p>
              <p className="text-[18px] font-bold mx-2">
                ${" "}
                {subtotal *
                  (1.11 - roleDiscount[currentUser?.membership] / 100)}
              </p>
            </div>
          </dl>
          <div className="flex justify-end">
            {currentUser?.balance > totalPayment ? (
              <button
                className={`btn`}
                onClick={() => setIsPaymentModalOpen(true)}
              >
                Proceed To Payment
              </button>
            ) : (
              <div className={`flex flex-col`}>
                Insufficient balance. Top up now!
                <button
                  className={`btn`}
                  onClick={() => setIsTopupModalOpen(true)}
                >
                  Top Up
                </button>
              </div>
            )}
          </div>
        </div>

        <div
          className={`flex flex-col w-2/5 px-[30px] pt-[20px] bg-zinc-100 h-screen`}
        >
          <h2 className={`text-[28px]`}>Enhance Your Experience!</h2>
          <h3 className={`text-[16px]`}>
            We're bringing you a new booking experience where you have all the
            flexibility to customise your own event experience!
          </h3>

          <div
            className={`flex flex-row gap-y-[10px] gap-2 py-[12px]
          max-h-[70vh] overflow-y-scroll `}
          >
            {eventData?.merch?.map((merchData, idx) => (
              <MerchCard key={idx} merchData={merchData} />
            ))}
          </div>

          <div></div>
        </div>
      </div>

      {isPaymentModalOpen && (
        <PaymentModal
          setIsOpen={setIsPaymentModalOpen}
          totalPayment={totalPayment}
          submitModal={handleSubmit}
        />
      )}
      {isTopupModalOpen && <TopUpModal setIsOpen={setIsTopupModalOpen} />}
    </div>
  );
};

export default Payment;

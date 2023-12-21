import React, { useEffect, useState } from "react";
import PaymentModal from "./admin/components/PaymentModal";
import useBalance from "@/hooks/useBalance";
import TopUpModal from "./admin/components/TopUpModal";
import { manipWithFetch } from "@/lib/fetch";
import Modal from "./admin/components/Modal";
import { toast } from "react-toastify";

const Membership = () => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isTopupModalOpen, setIsTopupModalOpen] = useState(false);
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
  const [paymentTotal, setPaymentTotal] = useState(0);
  const [selectedMembership, setSelectedMembership] = useState();

  const { currentUser, refetchBalance } = useBalance();

  const handlePurchaseMembership = async (e) => {
    e.preventDefault();
    await manipWithFetch(
      `users/${currentUser?.id}`,
      {
        membership: selectedMembership, // TODO
        balance: currentUser?.balance - paymentTotal, //TODO
      },
      "PATCH"
    );

    toast.success("Membership purchase complete", {
      position: "top-center",
      autoClose: 3000,
    });

    setIsPaymentModalOpen(false);

    refetchBalance();
  };

  return (
    <div className={`flex flex-col text-black p-[150px]`}>
      <h1 className={`font-bold text-[28px]`}>Membership Plans</h1>
      <h2 className={`text-[20px] text-black`}>
        Supercharge your shopping experience with these exciting lifetime
        offers!
      </h2>
      <div className={`grid grid-cols-3 text-[#000] gap-x-[20px] mt-[20px]`}>
        <div
          onClick={() => {
            if (currentUser?.membership > 0) {
              setIsMemberModalOpen(true);
              return;
            }
            if (currentUser?.balance < 200000) {
              setIsTopupModalOpen(true);
              return;
            }
            setPaymentTotal(200000);
            setSelectedMembership(1);
            setIsPaymentModalOpen(true);
          }}
          className="group relative block h-64 sm:h-80 lg:h-96 cursor-pointer"
        >
          <span className="absolute inset-0 border-2 border-dashed border-[#AAA9AD]"></span>

          <div className="relative flex h-full transform items-end border-2 border-black bg-white transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2">
            <div className="p-4 !pt-0 transition-opacity group-hover:absolute group-hover:opacity-0 sm:p-6 lg:p-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 sm:h-12 sm:w-12"
                viewBox="0 0 384 512"
              >
                <path
                  fill="#aaa9ad"
                  d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H64zm96 320h64c44.2 0 80 35.8 80 80c0 8.8-7.2 16-16 16H96c-8.8 0-16-7.2-16-16c0-44.2 35.8-80 80-80zm-32-96a64 64 0 1 1 128 0 64 64 0 1 1 -128 0zM144 64h96c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16s7.2-16 16-16z"
                />
              </svg>

              <div className={`flex justify-between items-center`}>
                <h2 className="mt-4 text-xl font-medium sm:text-2xl">
                  Silver Membership
                </h2>
                <h4 className="mt-4 ml-4 text-[#333] text-l font-medium sm:text-xl">
                  Rp. 200.000,-
                </h4>
              </div>
            </div>

            <div className="absolute p-4 opacity-0 transition-opacity group-hover:relative group-hover:opacity-100 sm:p-6 lg:p-8">
              <h3 className="mt-4 text-xl font-medium sm:text-2xl">
                Silver Membership
              </h3>

              <ul className="mt-4 text-sm sm:text-base">
                <li>
                  Enjoy <strong>10% discounts</strong> on ALL purchases!
                </li>
                <li>Support for 35+ Frameworks</li>
                <li>A cool badge!</li>
              </ul>

              <p className="mt-8 font-bold">Apply Now!</p>
            </div>
          </div>
        </div>

        <div
          onClick={() => {
            if (currentUser?.membership > 0) {
              setIsMemberModalOpen(true);
              return;
            }
            if (currentUser?.balance < 250000) {
              setIsTopupModalOpen(true);
              return;
            }
            setPaymentTotal(250000);
            setSelectedMembership(2);
            setIsPaymentModalOpen(true);
          }}
          className="group relative block h-64 sm:h-80 lg:h-96 cursor-pointer"
        >
          <span className="absolute inset-0 border-2 border-dashed border-[#DBAC34]"></span>

          <div className="relative flex h-full transform items-end border-2 border-black bg-white transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2">
            <div className="p-4 !pt-0 transition-opacity group-hover:absolute group-hover:opacity-0 sm:p-6 lg:p-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 sm:h-12 sm:w-12"
                viewBox="0 0 384 512"
              >
                <path
                  fill="#dbac34"
                  d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H64zm96 320h64c44.2 0 80 35.8 80 80c0 8.8-7.2 16-16 16H96c-8.8 0-16-7.2-16-16c0-44.2 35.8-80 80-80zm-32-96a64 64 0 1 1 128 0 64 64 0 1 1 -128 0zM144 64h96c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16s7.2-16 16-16z"
                />
              </svg>

              <div className={`flex justify-between items-center`}>
                <h2 className="mt-4 text-xl font-medium sm:text-2xl">
                  Gold Membership
                </h2>
                <h4 className="mt-4 ml-4 text-[#333] text-l font-medium sm:text-xl">
                  Rp. 250.000,-
                </h4>
              </div>
            </div>

            <div className="absolute p-4 opacity-0 transition-opacity group-hover:relative group-hover:opacity-100 sm:p-6 lg:p-8">
              <h3 className="mt-4 text-xl font-medium sm:text-2xl">
                Gold Membership
              </h3>

              <ul className="mt-4 text-sm sm:text-base">
                <li>
                  Enjoy <strong>15% discounts</strong> on ALL purchases!
                </li>
                <li>Support for 500+ Frameworks</li>
                <li>An even cooler badge!</li>
              </ul>

              <p className="mt-8 font-bold">Apply Now!</p>
            </div>
          </div>
        </div>

        <div
          onClick={() => {
            if (currentUser?.membership > 0) {
              setIsMemberModalOpen(true);
              return;
            }
            if (currentUser?.balance < 300000) {
              setIsTopupModalOpen(true);
              return;
            }
            setPaymentTotal(300000);
            setSelectedMembership(3);
            setIsPaymentModalOpen(true);
          }}
          className="group relative block h-64 sm:h-80 lg:h-96 cursor-pointer"
        >
          <span className="absolute inset-0 border-2 border-dashed border-[#4cc0da]"></span>

          <div className="relative flex h-full transform items-end border-2 border-black bg-white transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2">
            <div className="p-4 !pt-0 transition-opacity group-hover:absolute group-hover:opacity-0 sm:p-6 lg:p-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 sm:h-12 sm:w-12"
                viewBox="0 0 384 512"
              >
                <path
                  fill="#4cc0da"
                  d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H64zm96 320h64c44.2 0 80 35.8 80 80c0 8.8-7.2 16-16 16H96c-8.8 0-16-7.2-16-16c0-44.2 35.8-80 80-80zm-32-96a64 64 0 1 1 128 0 64 64 0 1 1 -128 0zM144 64h96c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16s7.2-16 16-16z"
                />
              </svg>

              <div className={`flex justify-between items-center`}>
                <h2 className="mt-4 text-xl font-medium sm:text-2xl">
                  Platinum Membership
                </h2>
                <h4 className="mt-4 ml-4 text-[#333] text-l font-medium sm:text-xl">
                  Rp. 300.000,-
                </h4>
              </div>
            </div>

            <div className="absolute p-4 opacity-0 transition-opacity group-hover:relative group-hover:opacity-100 sm:p-6 lg:p-8">
              <h3 className="mt-4 text-xl font-medium sm:text-2xl">
                Platinum Membership
              </h3>

              <ul className="mt-4 text-sm sm:text-base">
                <li>
                  Enjoy <strong>20% discounts</strong> on ALL purchases!
                </li>
                <li>Support for all Frameworks!</li>
                <li>The coolest badge!</li>
              </ul>

              <p className="mt-8 font-bold">Apply Now!</p>
            </div>
          </div>
        </div>
      </div>
      {isPaymentModalOpen && (
        <PaymentModal
          setIsOpen={setIsPaymentModalOpen}
          totalPayment={paymentTotal}
          submitModal={handlePurchaseMembership}
        />
      )}

      {isTopupModalOpen && <TopUpModal setIsOpen={setIsTopupModalOpen} />}

      {isMemberModalOpen && (
        <Modal setIsOpen={setIsMemberModalOpen} submitHandler={null}>
          <h1>Membership exists!</h1>

          <p>
            You already have a membership. It is good for life, unrefundable,
            and unchangeable.
          </p>
        </Modal>
      )}
    </div>
  );
};

export default Membership;

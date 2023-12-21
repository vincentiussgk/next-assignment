import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import { removeCookies } from "@/utils/cookieHandler";
import { toast } from "react-toastify";
import TopUpModal from "@/pages/admin/components/TopUpModal";
import { membershipLabels, roleStyles } from "@/types/roleStyles";
import useBalance from "@/hooks/useBalance";

const Navbar = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { currentUser } = useBalance();

  const handleLogout = () => {
    removeCookies();
    toast.success("Successfully logged out!", {
      position: "top-center",
      autoClose: 3000,
    });
    router.push("/auth/login");
  };

  return (
    <div className="navbar bg-white py-2 px-5">
      <div className="flex-1">
        <Link href="/events" className="btn btn-ghost text-xl">
          <Image src={"/icons/SiAnimeLogo.png"} height={50} width={50} />
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 gap-x-[10px]">
          <li>
            <Link href="/events">Events</Link>
          </li>
          <li>
            <Link href="/membership">Memberships</Link>
          </li>
          {currentUser?.id && (
            <>
              <li>
                <Link href="/purchases">Purchases</Link>
              </li>
              <li>
                <Link href="/saved">Saved</Link>
              </li>
            </>
          )}

          {!currentUser?.id && (
            <li>
              <Link href="/auth/login">Login</Link>
            </li>
          )}
        </ul>
      </div>
      {currentUser?.id && (
        <div className="flex-none">
          <button
            tabIndex={0}
            onClick={() => {
              setIsModalOpen(true);
            }}
            className="btn mx-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="16"
              width="16"
              viewBox="0 0 512 512"
            >
              <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V192c0-35.3-28.7-64-64-64H80c-8.8 0-16-7.2-16-16s7.2-16 16-16H448c17.7 0 32-14.3 32-32s-14.3-32-32-32H64zM416 272a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
            </svg>
            ${currentUser?.balance}
            {/* <span className="badge badge-sm indicator-item">
            </span> */}
          </button>

          <div className="dropdown dropdown-end flex ">
            <button
              tabIndex={0}
              className="btn btn-ghost btn-circle avatar flex "
            >
              <div className="w-10 rounded-full flex ">
                {currentUser?.image ? (
                  <Image
                    src={currentUser?.image}
                    width={20}
                    height={20}
                    alt="Profile picture"
                  />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="20"
                    width="20"
                    viewBox="0 0 448 512"
                    className="self-center"
                  >
                    <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                  </svg>
                )}
              </div>
            </button>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link href="/profile" className="justify-between">
                  Profile{" "}
                  <span
                    className={`badge ${roleStyles[currentUser?.membership]}`}
                  >
                    {membershipLabels[currentUser?.membership]}
                  </span>
                </Link>
              </li>
              <li
                onClick={() => {
                  setIsModalOpen(true);
                }}
              >
                <a>Top Up</a>
              </li>
              <li onClick={handleLogout}>
                <span>Logout</span>
              </li>
            </ul>
          </div>
        </div>
      )}
      {isModalOpen && <TopUpModal setIsOpen={setIsModalOpen} />}
    </div>
  );
};

export default Navbar;

import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const AUTH_LABEL = router.pathname.endsWith("login") ? "Log In" : "Sign Up";
  const SWITCH_PAGE_TARGET = router.pathname.endsWith("login")
    ? "Sign Up"
    : "Log In";
  const SWITCH_PAGE_LABEL = router.pathname.endsWith("login")
    ? "Don’t have an account?"
    : "Have an account?";

  return (
    <div
      className={`flex justify-between min-h-screen transition-all transition-duration-700 bg-[#FFF] text-primary-text`}
    >
      <div className={`hidden lg:block lg:w-1/2`}>
        <img
          className={`object-cover h-screen w-screen`}
          src="/images/loginhero.jpg"
        />
      </div>

      <div
        className={`flex flex-col w-full justify-center
        lg:w-1/2 lg:px-[250px] lg:py-[30px]
        px-[50px] py-[70px]
         `}
      >
        <div className={`flex flex-col gap-y-[25px] self-center`}>
          <h1 className={`font-semibold text-[40px]`}>{AUTH_LABEL}</h1>

          {children}

          <p>
            {SWITCH_PAGE_LABEL}{" "}
            <Link
              href={`/auth/${SWITCH_PAGE_TARGET.toLowerCase().replace(
                /\s/g,
                ""
              )}`}
              className={`font-semibold`}
            >
              {`${SWITCH_PAGE_TARGET} here`}
            </Link>
          </p>

          {router.pathname.endsWith("login") && (
            <div className={`text-right text-[12px] cursor-pointer`}>
              Forgot Password?
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

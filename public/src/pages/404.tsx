import Image from "next/image";
import React from "react";

const NotFound = () => {
  return (
    <div className="grid h-screen place-content-center px-4 dark:bg-gray-900">
      <div className="text-center">
        <Image src="/404.png" width={302} height={200} alt="404 not found" />

        <h1 className="mt-[24px] text-2xl font-bold tracking-tight text-black dark:text-white sm:text-4xl">
          ヤバイ！
        </h1>

        <p className="mt-4 text-black dark:text-gray-400">
          {"Unfortunately, we couldn't find that page."}
        </p>
      </div>
    </div>
  );
};

export default NotFound;

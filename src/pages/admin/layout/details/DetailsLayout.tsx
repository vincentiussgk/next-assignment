import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const DetailsLayout = ({ children }) => {
  const router = useRouter();

  return (
    <div>
      <h1>Item Details</h1>
      <div className={`flex`}>
        <button onClick={() => router.back()}> {"<"} Back</button>
        <Link href="">
          <button>Edit</button>
        </Link>
      </div>
      {children}
    </div>
  );
};

export default DetailsLayout;

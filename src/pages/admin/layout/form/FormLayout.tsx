// @ts-nocheck
import { useRouter } from "next/router";
import React, { ReactNode, useEffect, useState } from "react";
import Button from "../../components/Button";
import Link from "next/link";

interface FormLayoutProps {
  children: ReactNode;
}

const FormLayout = ({ children }: FormLayoutProps) => {
  const [pageType, setPageType] = useState("Add");
  const router = useRouter();

  useEffect(() => {
    if (router.query.itemId) {
      setPageType("Edit");
    }
  }, [router.query]);

  return (
    <div className="w-full p-[50px] rounded-[12px] bg-white">
      <div className="flex justify-between">
        <h1 className="text-[20px]">{pageType} Item</h1>
        <div className={`flex justify-between`}>
          <Button onClick={() => router.back()}> Back</Button>
        </div>
      </div>
      <div className="bg-white">{children}</div>
    </div>
  );
};

export default FormLayout;

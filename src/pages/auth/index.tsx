/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Auth = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/auth/login");
  }, []);
  return;
};

export default Auth;

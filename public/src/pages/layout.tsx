import Footer from "@/components/Footer";
import Sidebar from "./admin/layout/Sidebar";
import Navbar from "@/components/Navbar";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  const role = Cookies.get("role");
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (role === "admin") {
      setIsAdmin(true);
    }
  }, [role]);
  if (router.pathname.startsWith("/auth")) return children;

  if (router.pathname.startsWith("/admin")) {
    return (
      <>
        <Sidebar />
        <main>{children}</main>
      </>
    );
  }

  return (
    <main>
      <Navbar />

      {children}
      <Footer />
    </main>
  );
};

export default Layout;

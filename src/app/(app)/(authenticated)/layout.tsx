import { redirect } from "next/navigation";
import React, { FC, ReactNode } from "react";
import { getUser } from "./_actions/getUser";
import Navbar from "./_components/Navbar";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = async ({ children }) => {
  const user = await getUser();
  if (!user) {
    redirect("/login");
    return null;
  }
  return <div>
    <Navbar/>
    {children}
    </div>;
};

export default Layout;


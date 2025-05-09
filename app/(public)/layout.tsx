import Footer from "@/components/homepage/Footer";
import Header from "@/components/homepage/Header";
import React from "react";

const layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default layout;

import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar Fixed และอยู่บนสุด */}
      <div className="fixed top-0 left-0 w-full z-50 shadow-md bg-white">
        <Navbar />
      </div>

      {/* คอนเทนต์หลัก */}
      <div className="flex-grow container mx-auto px-5 pt-20">
        {children}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;

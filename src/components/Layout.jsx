import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import DialogflowChat from "./DialogflowChat";

const Layout = () => {
  const location = useLocation();
  const isChatbotPage = location.pathname === "/chatbot";

  return (
    <div className="min-h-screen m-0 p-0">
      <Navbar />
      <div>
        <Outlet />
      </div>
      {/* Hide floating bot icon on the dedicated chatbot page */}
      {!isChatbotPage && <DialogflowChat />}
    </div>
  );
};

export default Layout;


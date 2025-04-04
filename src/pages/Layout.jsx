import React from "react";
import { Link, Outlet } from "react-router-dom";
import "primeicons/primeicons.css";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import QuestionList from "./questions/QuestionList";
import {ModalProvider} from "../context/ModalContext";
function Layout() {
  return (
  <ModalProvider>
    <div className=" h-screen overflow-y-hidden">
        <Navbar />
        <hr />
      <div className="flex px-16 h-screen ">
      <aside className="w-2/12">
        <Sidebar />
      </aside>

        <main className="w-full px-12 overflow-y-scroll">
         <Outlet/>
        </main>
      </div>
    </div>
  </ModalProvider>
  );
}

export default Layout;

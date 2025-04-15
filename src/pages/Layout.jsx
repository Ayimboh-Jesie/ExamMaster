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
      <div className="flex h-screen ">
      <aside className="w-3/12">
        <Sidebar />
      </aside>

        <main className="w-full px-3 overflow-y-scroll">
         <Outlet/>
        </main>
      </div>
    </div>
  </ModalProvider>
  );
}

export default Layout;

import React from "react";
import { Link } from "react-router-dom";
import "primeicons/primeicons.css";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import QuestionList from "./questions/QuestionList";
import {ModalProvider} from "../context/ModalContext";
function Home() {
  return (
  <ModalProvider>
    <div className=" h-screen overflow-y-hidden">
        <Navbar />
        <hr />
      <div className="flex px-16 h-screen ">
      <aside className="w-2/12">
        <Sidebar />
      </aside>

        <main style={{padding:"24px 24px"}} className="w-full px-12 mt-1 overflow-y-scroll">
          <QuestionList />
        </main>
      </div>
    </div>
  </ModalProvider>
  );
}

export default Home;

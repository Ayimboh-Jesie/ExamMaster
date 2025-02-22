import React from "react";
import { Link } from "react-router-dom";
import "primeicons/primeicons.css";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import QuestionList from "./questions/QuestionList";
function Home() {
  return (
    <div className=" h-screen">
        <Navbar />
      <div className="flex">
      <aside className="w-2/12">
        <Sidebar />
      </aside>

        <main style={{padding:"24px 24px"}} className="w-full px-12 my-12">
          <QuestionList />
        </main>
      </div>
    </div>
  );
}

export default Home;

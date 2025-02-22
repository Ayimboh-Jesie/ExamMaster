import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Users() {
  return (
    <div>
      <div className=" h-screen">
        <Navbar />
        <div className="flex">
          <aside className="w-2/12">
            <Sidebar />
          </aside>
        </div>
      </div>
    </div>
  );
}
export default Users;

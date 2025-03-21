import React from "react";
import { SidebarItems } from "../constants/SidebarItems";
function Sidebar() {
  return (
      <div
        className="text-left flex flex-col gap-y-8 w-full h-screen border-r border-gray-300 p-6"
      >
        {SidebarItems.map((item) => (
          <div key={item.id} className="w-full flex gap-2 items-center rounded-lg cursor-pointer hover:bg-blue-100 p-3 px-3 hover:text-blue-700">
            <i className={`${item.icon}`}></i>
            <p>{item.label}</p>
          </div>
        ))}
      </div>
  );
}

export default Sidebar;

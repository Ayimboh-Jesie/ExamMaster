import React from "react";
import { SidebarItems } from "../constants/SidebarItems";
function Sidebar() {
  return (
      <div
        style={{ padding: "12px" }}
        className="text-left flex flex-col gap-y-8 w-full h-screen border-r border-gray-300"
      >
        {SidebarItems.map((item) => (
          <div key={item.id} style={{paddingLeft:'12px', padding:'5px',hover:'red'}} className="w-full flex gap-2 items-center rounded-lg cursor-pointer">
            <i className={`${item.icon}`}></i>
            <p>{item.label}</p>
          </div>
        ))}
      </div>
  );
}

export default Sidebar;

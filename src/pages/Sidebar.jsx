import React from "react";
import { NavLink } from "react-router-dom";
import { SidebarItems } from "../constants/SidebarItems";
import {useAuth} from "../context/AuthContext.jsx";


function Sidebar() {
const {user} = useAuth();

    const filteredItems = SidebarItems.filter((item) => {
        const adminOnlyTabs = ["Users", "Examiners", "Course", "Field of Study"];
        if (adminOnlyTabs.includes(item.label)) {
            return user?.role === "admin";
        }
        return true;
    });

    return (
        <div className="text-left flex flex-col gap-y-4 w-full h-screen border-r border-gray-300 p-6">
            {filteredItems.map((item) => (
                <NavLink
                    to={item.path}
                    key={item.id}
                    className={({ isActive }) =>
                        `flex items-center gap-2 w-full p-3 px-3 rounded-lg cursor-pointer transition-colors ${
                            isActive
                                ? "bg-blue-100 text-blue-700 font-medium hover:bg-blue-200"
                                : "hover:bg-blue-200 hover:text-blue-700"
                        }`
                    }
                >
                    <i className={item.icon}></i>
                    <p>{item.label}</p>
                </NavLink>
            ))}
        </div>
    );
}

export default Sidebar;

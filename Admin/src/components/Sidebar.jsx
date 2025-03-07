import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Airplay, LogOut } from "lucide-react";
import { sidemenu } from "../assets/assets";

const Sidebar = ({expanded, setToken, role}) => {
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState(location.pathname);

  useEffect(() => {
    setActiveMenu(location.pathname);
  }, [location.pathname]);

  return (
    <aside
      className={`fixed top-0 left-0 h-screen transition-all duration-300 ease-in-out bg-BG hidden md:flex flex-col flex-grow-0 border-r-[1px] border-Text/10 ${
        expanded ? 'w-64' : 'w-24'
      }`}
    >

      {/* Menu */}
      <div className="flex-1 flex flex-col p-3 gap-3 text-Text mt-20 overflow-y-auto">
        {sidemenu
          .filter((item) => item.role === "all" || item.role === role)
          .map((item, index) => {
          const Icon = item.icon;
          return (
            <Link
              key={index}
              to={item.path}
              className={`flex gap-4 pl-4 p-3 items-center rounded-xl transition-colors hover:bg-Text/20 ${
                activeMenu === item.path ? "text-Highlight bg-Text/20" : ""
              }`}
            >
              <Icon className="size-8" />
              {expanded && <span>{item.title}</span>}
            </Link>
          );
        })}
      </div>

      {/* Log Out Button */}
      <div onClick={() => setToken("")} className="cursor-pointer flex items-center gap-4 m-3 font-medium text-Text mt-auto rounded-xl hover:bg-Text/20">
        <div className="p-3">
          <LogOut className="size-11" />
        </div>
        {expanded && <h1 className="text-Text text-xl font-semibold">Log Out</h1>}
      </div>
    </aside>
  );
};

export default Sidebar;


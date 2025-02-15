import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Airplay, LogOut } from "lucide-react";
import { sidemenu } from "../assets/assets";

const Sidebar = ({ expanded }) => {
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState(location.pathname);

  useEffect(() => {
    setActiveMenu(location.pathname);
  }, [location.pathname]);

  return (
    <div>
      <div
        className={`hidden sm:flex transition-all duration-300 ease-in-out overflow-hidden border-r-[1px]  ${
          expanded ? "w-64" : "w-24"
        } min-h-full bg-BG flex flex-col`}
      >
        {/* Sidebar Header */}
        <Link to="/" className="flex items-center gap-4 p-3 font-medium text-Text">
          <div className="p-3">
            <Airplay className="size-11" />
          </div>
          {expanded && <h1 className="text-Text text-xl font-semibold">QuickBites</h1>}
        </Link>

        {/* Menu */}
        <div className="flex-1 flex flex-col p-3 gap-3 text-Text">
          {sidemenu.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link
                key={index}
                to={item.path}
                className={`flex gap-4 pl-4 p-3 items-center rounded transition-colors hover:bg-Text/30 ${
                  activeMenu === item.path ? "text-Highlight" : ""
                }`}
              >
                <Icon className="size-8" />
                {expanded && <span>{item.title}</span>}
              </Link>
            );
          })}
        </div>


        {/* Log Out Button at Bottom */}
        <Link to="/logout" className="flex items-center gap-4 p-3 font-medium text-Text mt-auto rounded">
          <div className="p-3">
            <LogOut className="size-11" />
          </div>
          {expanded && <h1 className="text-Text text-xl font-semibold">Log Out</h1>}
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;

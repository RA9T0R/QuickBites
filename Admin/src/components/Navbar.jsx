import React, { useContext, useState, useEffect } from 'react';
import { DashboardContext } from "../context/DashboardContext";
import { Link,useLocation } from "react-router-dom";
import { sidemenu } from "../assets/assets";
import { Sun, Moon ,AlignLeft , AlignJustify ,User,Bell,Airplay,LogOut  } from 'lucide-react';

const Navbar = ({ expanded, setExpanded, setToken, role }) => {
  const location = useLocation();
  const {tables} = useContext(DashboardContext);
  const [activeMenu, setActiveMenu] = useState(location.pathname);
  const [darkMode, setDarkMode] = useState(false);
  const [visible, setVisible] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    setActiveMenu(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const savedTheme = localStorage.getItem('themeMode');
    if (savedTheme === 'dark') {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('themeMode', darkMode ? 'dark' : 'light');

    if (darkMode) {
      document.body.classList.add('dark');
      document.body.classList.remove('light');
    } else {
      document.body.classList.add('light');
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
      if (visible) {
        document.body.style.overflow = "hidden"; 
      } else {
        document.body.style.overflow = "auto"; 
      }
    
      return () => {
        document.body.style.overflow = "auto"; 
      };
    }, [visible]);

  return (
    <nav className="fixed top-0 left-0 w-full h-20 bg-BG z-50 flex items-center px-6 border-b-[1px] border-Text/10">
      <button
        onClick={() => {
          if (window.innerWidth < 768) { //md
            setVisible(true);
          } else {
            setExpanded((curr) => !curr);
          }
        }}
        className="flex p-2 rounded-lg text-Text hover:bg-Text/30"
      >
        {expanded ? <AlignLeft className="size-8" /> : <AlignJustify className="size-8" />}
      </button>


      <Link to="/" className="flex items-center gap-4 font-medium text-Text">
        <div className="p-3">
          <Airplay className="size-8 md:size-11" />
        </div>
        <h1 className="hidden sm:block text-Text text-xl font-semibold">QuickBites</h1>
      </Link>

      <div className="flex items-center gap-4 ml-auto">
        {role === "admin" && <h1 className="md:text-2xl font-bold text-Text md:mr-10">Admin Dashboard</h1> || <h1 className="md:text-2xl font-bold text-Text md:mr-10">Employee Dashboard</h1>}
        <div onClick={() => setDarkMode(!darkMode)} className="cursor-pointer">
          <div className="size-9 md:size-12 bg-BG rounded-full shadow-lg shadow-Text/20 flex items-center justify-center">
            {darkMode ? <Sun className="md:size-8 text-Text" /> : <Moon className="md:size-8 text-Text" />}
          </div>
        </div>
        <div onClick={() => setShowNotifications(!showNotifications)} className="cursor-pointer">
        <div className="size-9 md:size-12 bg-BG rounded-full shadow-lg shadow-Text/20 flex items-center justify-center">
          <Bell className="md:size-8 text-Text" />
        </div>
      </div>

      {/* Notifications dropdown */}
      {showNotifications && (
        <div className="absolute top-16 right-4 bg-Text text-BG rounded-lg shadow-lg p-4 w-64 mt-3 max-h-80 overflow-y-auto">
          <h3 className="font-bold text-lg mb-2">Notifications</h3>
          {tables.map((table) => (
            table.callWaiter && (
              <div key={table.table} className="flex justify-between items-center mb-3 p-4 border-t-4 border-BG rounded-lg shadow-md">
                <span className="text-sm font-medium">{`Table ${table.table}: Call Waiter`}</span>
                <span className="text-sm">Need assistance</span>
              </div>
            )
          ))}
        </div>
      )}
      </div>

      {/* SideBar menu for small screens */}
      <div className={`z-50 fixed top-0 left-0 bottom-0 overflow-hidden bg-BG transition-all  ${visible ? 'w-full' : 'w-0'}`}>
        <div className='flex flex-col px-4 sm:px-9 text-Text'>
          <div className="flex items-center gap-4 h-20 p-2">
            <button onClick={() => setVisible(false)}  className='flex p-2 rounded-lg text-Text hover:bg-Text/30'>
              <AlignLeft className='size-8 cursor-pointer rotate-180 text-Text'/>
            </button>
            <p className='cursor-pointer w-36 text-xl sm:text-2xl'>Back</p>
          </div>

          <hr />

          {/* Menu */}
          <div onClick={() => setVisible(false)} className="flex-1 flex flex-col p-3 gap-3 ">
            {sidemenu
              .filter((item) => item.role === "all" || item.role === role)
              .map((item, index) => {
              const Icon = item.icon;
              return (
                <Link
                  key={index}
                  to={item.path}
                  className={`flex gap-4 pl-4 p-3 items-center rounded transition-colors hover:bg-Text/20 ${
                    activeMenu === item.path ? "text-Highlight bg-Text/20" : ""
                  }`}
                >
                  <Icon className="size-8"/>
                  <span>{item.title}</span>
                </Link>
              );
            })}
          </div>

          <hr />
          
          {/* Log Out Button */}
          <div onClick={() => setToken("")} className="cursor-pointer flex items-center gap-4 p-3 font-medium text-Text mt-auto rounded">
            <div className="pl-4 p-3">
              <LogOut className="size-8" />
            </div>
            <h1 className="text-Text text-xl font-semibold">Log Out</h1>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


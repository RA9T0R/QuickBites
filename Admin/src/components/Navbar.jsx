import React, { useContext, useState, useEffect } from 'react';
import { Link,useLocation } from "react-router-dom";
import { sidemenu } from "../assets/assets";
import { Sun, Moon ,AlignLeft , AlignJustify ,User,Bell,Airplay,LogOut  } from 'lucide-react';

const Navbar = ({ expanded, setExpanded, setToken }) => {
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState(location.pathname);
  const [darkMode, setDarkMode] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setActiveMenu(location.pathname);
  }, [location.pathname]);

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


      <Link to="/" className="flex items-center gap-4 p-3 font-medium text-Text">
        <div className="p-3">
          <Airplay className="size-11" />
        </div>
        <h1 className="hidden sm:block text-Text text-xl font-semibold">QuickBites</h1>
      </Link>

      <div className="flex items-center gap-4 ml-auto">
        <div onClick={() => setDarkMode(!darkMode)} className="cursor-pointer">
          <div className="w-12 h-12 bg-BG rounded-full shadow-lg shadow-Text/20 flex items-center justify-center">
            {darkMode ? <Sun className="size-8 text-Text" /> : <Moon className="size-8 text-Text" />}
          </div>
        </div>
        <div className="cursor-pointer">
          <div className="w-12 h-12 bg-BG rounded-full shadow-lg shadow-Text/20 flex items-center justify-center">
            <Bell className="size-8 text-Text" />
          </div>
        </div>
        <div className="cursor-pointer">
          <div className="w-12 h-12 bg-BG rounded-full shadow-lg shadow-Text/20 flex items-center justify-center">
            <User className="size-8 text-Text" />
          </div>
        </div>
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
            {sidemenu.map((item, index) => {
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


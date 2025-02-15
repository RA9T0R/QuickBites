import React, { useContext, useState, useEffect } from 'react';

import { Sun, Moon ,GripVertical ,User,Bell  } from 'lucide-react';

const Navbar = ({ expanded, setExpanded }) => {
  const [darkMode, setDarkMode] = useState(false);

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

  return (
    <div className="flex items-center justify-between py-4 px-6 bg-BG font-medium">
      <button onClick={() => setExpanded((curr) => !curr)}className="p-2 rounded-lg text-Text hover:bg-Text/30">
        <GripVertical className="size-8"  />
      </button>

      <div className="flex items-center gap-2 sm:gap-4 md:gap-6 justify-end">
        <div  className="cursor-pointer">
          <div className='w-9 h-9 sm:w-12 sm:h-12 bg-BG rounded-full shadow-lg shadow-Text/20 flex items-center justify-center'>
            <Bell  className="size-6 sm:size-8 text-Text" alt="User"/>
          </div>
        </div>
        <div  className="cursor-pointer">
          <div className='w-9 h-9 sm:w-12 sm:h-12 bg-BG rounded-full shadow-lg shadow-Text/20 flex items-center justify-center'>
            <User className="size-6 sm:size-8 text-Text" alt="User"/>
          </div>
        </div>
        <div onClick={() => setDarkMode(!darkMode)} className="cursor-pointer">
          <div className="w-9 h-9 sm:w-12 sm:h-12 bg-BG rounded-full shadow-lg shadow-Text/20 flex items-center justify-center">
            {darkMode ? <Sun className="size-6 sm:size-8 text-Text" /> : <Moon className="size-6 sm:size-8 text-Text" />}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Navbar;

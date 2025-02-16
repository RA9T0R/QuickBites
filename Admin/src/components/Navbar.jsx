import React, { useContext, useState, useEffect } from 'react';

import { Sun, Moon ,AlignLeft , AlignJustify ,User,Bell  } from 'lucide-react';

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
    <div className={`fixed top-0 h-20 bg-BG shadow-md z-50 flex items-center px-6 transition-all duration-300 ${
      expanded ? 'w-[calc(100%-16rem)] left-64' : 'w-[calc(100%-6rem)] left-24'
    }`}>
      <button onClick={() => setExpanded((curr) => !curr)} className="p-2 rounded-lg text-Text hover:bg-Text/30">
        {expanded ? <AlignLeft className="size-8"/> : <AlignJustify className="size-8"/>}
      </button>

      <div className="flex items-center gap-2 sm:gap-4 md:gap-6 justify-end flex-1">
        <div onClick={() => setDarkMode(!darkMode)} className="cursor-pointer">
          <div className="w-9 h-9 sm:w-12 sm:h-12 bg-BG rounded-full shadow-lg shadow-Text/20 flex items-center justify-center">
            {darkMode ? <Sun className="size-6 sm:size-8 text-Text" /> : <Moon className="size-6 sm:size-8 text-Text" />}
          </div>
        </div>
        <div className="cursor-pointer">
          <div className='w-9 h-9 sm:w-12 sm:h-12 bg-BG rounded-full shadow-lg shadow-Text/20 flex items-center justify-center'>
            <Bell className="size-6 sm:size-8 text-Text" />
          </div>
        </div>
        <div className="cursor-pointer">
          <div className='w-9 h-9 sm:w-12 sm:h-12 bg-BG rounded-full shadow-lg shadow-Text/20 flex items-center justify-center'>
            <User className="size-6 sm:size-8 text-Text" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

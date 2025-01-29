import React, { useContext, useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';
import { assets } from '../assets/assets';

import { Sun,Moon,ShoppingBag,AlignLeft,ArrowLeft } from 'lucide-react';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { getTotalFoodCount } = useContext(StoreContext);
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const savedMode = localStorage.getItem('themeMode');
    if (savedMode === 'dark') {
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

  return (
    <div className="flex items-center justify-between pt-4 sm:py-5 px-4 sm:px-8 font-medium">
      {location.pathname === '/' ? (
        <div className='flex gap-4 pt-2'>
          {/* <img onClick={() => setVisible(true)} src={assets.menu} className='w-5 cursor-pointer sm:hidden' alt="" /> */}
          <AlignLeft onClick={() => setVisible(true)} className='size-6 cursor-pointer sm:hidden text-Text'/>
          <Link to='/'>
            <h1 className='w-36 text-xl sm:text-2xl text-Text'>Quick Bites</h1>
          </Link>
        </div>
      ) : (
        <div>
          <Link to='/' className='flex gap-4'>
            {/* <img src={assets.left} className='w-7 cursor-pointer md:hidden' alt="" /> */}
            <ArrowLeft className='size-7 cursor-pointer md:hidden text-Text'/>
            <h1 className='hidden md:block w-36 text-xl sm:text-2xl text-Text'>Quick Bites</h1>
          </Link>
        </div>
      )}

      <ul className="hidden md:flex pr-8 gap-5 text-sm text-Text">
        <NavLink to="/" className={({ isActive }) => `flex flex-col items-center gap-1 px-3 py-2 rounded ${isActive ? 'bg-BG_sec text-white shadow-lg' : ''}`}>
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/table" className={({ isActive }) => `flex flex-col items-center gap-1 px-3 py-2 rounded ${isActive ? 'bg-BG_sec text-white shadow-lg' : ''}`}>
          <p>TABLE</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => `flex flex-col items-center gap-1 px-3 py-2 rounded ${isActive ? 'bg-BG_sec text-white shadow-lg' : ''}`}>
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/contact" className={({ isActive }) => `flex flex-col items-center gap-1 px-3 py-2 rounded ${isActive ? 'bg-BG_sec text-white shadow-lg' : ''}`}>
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>

      <div className="flex items-center gap-6">
        <Link to="/orderSummary" className="relative">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-BG rounded-full shadow-lg shadow-Text/20 flex items-center justify-center">
            {/* <img src={assets.shoppingBag} className="w-6 h-6 sm:w-8 sm:h-8" alt="Shopping Bag" /> */}
            <ShoppingBag className="size-6 sm:size-8 text-Text" alt="Shopping Bag" />
          </div>
          <p className="absolute right-0 bottom-0 transform translate-x-1/6 translate-y-1/6 w-4 text-center leading-4 bg-BG_Black text-BG aspect-square rounded-full text-[8px] shadow-md">{getTotalFoodCount()}</p>
        </Link>
        <div onClick={() => setDarkMode(!darkMode)} className="cursor-pointer">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-BG rounded-full shadow-lg shadow-Text/20 flex items-center justify-center">
            {/* <img src={darkMode ? assets.sun : assets.moon} className="w-6 h-6 sm:w-8 sm:h-8" alt="Dark Mode Toggle" /> */}
            {darkMode ? <Sun className="size-6 sm:size-8 text-Text" /> : <Moon  className="size-6 sm:size-8 text-Text" />}
          </div>
        </div>
      </div>

      {/* SideBar menu for small screens */}
      <div className={`z-50 absolute top-0 left-0 bottom-0 overflow-hidden bg-BG transition-all ${visible ? 'w-full' : 'w-0'}`}>
        <div className='flex flex-col py-4 sm:py-5 px-4 text-Text'>
          <div onClick={() => setVisible(false)} className="flex items-center gap-4 p-2">
            {/* <img src={assets.menu} className='w-6 cursor-pointer rotate-180' alt="" /> */}
            <AlignLeft className='w-6 cursor-pointer rotate-180 text-Text'/>
            <p className='cursor-pointer w-36 text-xl sm:text-2xl'>Back</p>
          </div>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/'>HOME</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/table'>TABLE</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/about'>ABOUT</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/contact'>CONTACT</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

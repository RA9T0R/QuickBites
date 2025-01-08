import React, { useContext, useState } from 'react';
import { NavLink,Link,useLocation } from 'react-router-dom';

import { StoreContext } from '../context/StoreContext';
import { assets } from '../assets/assets';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const {getTotalFoodCount} = useContext(StoreContext);
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();

  return (
    <div className="flex items-center justify-between pt-4 sm:py-5 px-4 sm:px-8 font-medium">
      {/* Left Section: Logo */}
      {location.pathname === '/'
      ? <div className='flex gap-4'>
          <img onClick={() => setVisible((true))} src={assets.menu} className='w-5 cursor-pointer sm:hidden' alt="" />
          <Link to='/'>
              <h1  className='w-36 text-xl sm:text-2xl' >Quick Bites</h1>
              {/* <img src={assets.QuickBLogo} className='h-14 w-36' alt="" /> */}
          </Link>
        </div>
      : <div >
          <Link to='/' className='flex gap-4'> 
              <img src={assets.left} className='w-7 cursor-pointer md:hidden' alt="" />
              <h1  className='hidden md:block w-36 text-xl sm:text-2xl' >Quick Bites</h1>
              {/* <img src={assets.QuickBLogo} className='h-14 w-36' alt="" /> */}
          </Link>
        </div>
      }
      

      {/* Center Section: Table */}
      <ul className="hidden md:flex pr-8 gap-5 text-sm text-gray-700">
        <NavLink to="/" className={({ isActive }) =>`flex flex-col items-center gap-1 px-3 py-2 rounded 
        ${isActive ? 'bg-orange-400 text-white shadow-lg' : ''}`}>
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink> 
        <NavLink to="/collection" className={({ isActive }) =>`flex flex-col items-center gap-1 px-3 py-2 rounded 
        ${isActive ? 'bg-orange-400 text-white shadow-lg' : ''}`}>
          <p>COLLECTION</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/about" className={({ isActive }) =>`flex flex-col items-center gap-1 px-3 py-2 rounded 
        ${isActive ? 'bg-orange-400 text-white shadow-lg' : ''}`}>
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/contact" className={({ isActive }) =>`flex flex-col items-center gap-1 px-3 py-2 rounded 
        ${isActive ? 'bg-orange-400 text-white shadow-lg' : ''}`}>
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>


      {/* Right Section: Icons */}
      <div className="flex items-center gap-6">
        <Link to="/orderSummary" className="relative">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-lg flex items-center justify-center">
            <img src={assets.shoppingBag} className="w-6 h-6 sm:w-8 sm:h-8" alt="Shopping Bag"/>
          </div>
          <p className="absolute right-0 bottom-0 transform translate-x-1/6 translate-y-1/6 w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px] shadow-md">{getTotalFoodCount()}</p>
        </Link>
        <div onClick={() => setDarkMode(!darkMode)} className="cursor-pointer">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-lg flex items-center justify-center">
            <img src={darkMode ? assets.sun : assets.moon}className="w-6 h-6 sm:w-8 sm:h-8" alt="Dark Mode Toggle"/>
          </div>
        </div>
      </div>

      {/* SideBar menu for small screens */}
      <div className={`z-50 absolute top-0 left-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
            <div className='flex flex-col py-4 sm:py-5 px-4 text-gray-600'>
                <div onClick={() => setVisible(false)} className="flex items-center gap-4 p-2">
                    <img src={assets.menu} className='w-6 cursor-pointer rotate-180' alt="" />
                    <p className='cursor-pointer w-36 text-xl sm:text-2xl'>Back</p>
                </div>
                <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/' >HOME</NavLink>
                <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/collection' >COLLECTION</NavLink>
                <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/about' >ABOUT</NavLink>
                <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/contact' >CONTACT</NavLink>
            </div>
        </div>
    </div>
  );
};

export default Navbar;

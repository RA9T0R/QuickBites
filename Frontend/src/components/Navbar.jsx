import {useContext,useState,useEffect} from 'react';
import {NavLink, Link, useLocation} from 'react-router-dom';
import {StoreContext} from '../context/StoreContext';
import {assets} from '../assets/assets';
import {toast} from 'react-toastify'; 
import axios from 'axios';

import { Sun, Moon, ShoppingBag, AlignLeft, ArrowLeft, ConciergeBell } from 'lucide-react';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const {totalFoodCount, tableNumber,userID,backendURL} = useContext(StoreContext);
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();
  
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

  const handleCall = async () => {
    try {
      const response = await axios.post(backendURL + '/api/table/call' , {table : tableNumber});
      if (response.data.success) {
        toast.success(response.data.message, {
          position: "top-center", 
          autoClose: 3000, 
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
        });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

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
    <nav className="flex items-center justify-between pt-4 sm:py-5 px-4 sm:px-8 font-medium">
      {location.pathname === '/' ? (
        <div className='flex gap-4 pt-2 '>
          <AlignLeft onClick={() => setVisible(true)} className='size-6 sm:size-10 cursor-pointer md:hidden text-Text'/>
          <Link to='/' className='flex md:flex-col lg:flex-row items-center gap-3'>
            <img className='w-16 sm:w-24 md:w-32 ' src={assets.logo} alt="" />
            <h1 className='w-36 text-sm xl:text-md sm:text-lg md:text-2xl text-Text md:text-center whitespace-nowrap'>Table : {tableNumber}</h1>
          </Link>
        </div>
      ) : (
        <div>
          <Link to='/' className='flex md:flex-col lg:flex-row items-center gap-3'>
            <ArrowLeft className='size-7 sm:size-10 cursor-pointer md:hidden text-Text'/>
            <img className='w-16 sm:w-24 md:w-32 ' src={assets.logo} alt="" />
            <h1 className='w-36 text-sm xl:text-md sm:text-lg md:text-2xl text-Text text-center whitespace-nowrap'>Table : {tableNumber}</h1>
          </Link>
        </div>
      )}

      <ul className="hidden md:flex gap-5 text-sm text-Text justify-center w-full mx-auto">
        <NavLink to="/" className={({ isActive }) => `flex flex-col items-center gap-1 px-3 py-2 rounded ${isActive ? 'bg-BG_sec text-white shadow-lg' : ''}`}>
          <p>HOME</p>
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


      <div className="flex items-center gap-2 sm:gap-4 md:gap-6 justify-end">
        <div onClick={handleCall} className="cursor-pointer">
          <div className='w-9 h-9 sm:w-12 sm:h-12 bg-BG rounded-full shadow-lg shadow-Text/20 flex items-center justify-center'>
            <ConciergeBell className="size-6 sm:size-8 text-Text" alt="Concierge Bell"/>
          </div>
        </div>
        <Link to="/orderSummary" className="relative">
          <div className="w-9 h-9 sm:w-12 sm:h-12 bg-BG rounded-full shadow-lg shadow-Text/20 flex items-center justify-center">
            <ShoppingBag className="size-6 sm:size-8 text-Text" alt="Shopping Bag" />
          </div>
          <p className="absolute right-0 bottom-0 transform translate-x-1/6 translate-y-1/6 w-4 text-center leading-4 bg-BG_Black text-BG aspect-square rounded-full text-[8px] shadow-md">{totalFoodCount}</p>
        </Link>
        <div onClick={() => setDarkMode(!darkMode)} className="cursor-pointer">
          <div className="w-9 h-9 sm:w-12 sm:h-12 bg-BG rounded-full shadow-lg shadow-Text/20 flex items-center justify-center">
            {darkMode ? <Sun className="size-6 sm:size-8 text-Text" /> : <Moon className="size-6 sm:size-8 text-Text" />}
          </div>
        </div>
      </div>

      {/* SideBar menu for small screens */}
      <div className={`z-50 absolute top-0 left-0 bottom-0 overflow-hidden bg-BG transition-all  ${visible ? 'w-full' : 'w-0'}`}>
        <div className='flex flex-col py-4 sm:py-5 px-4 sm:px-9 text-Text'>
          <div onClick={() => setVisible(false)} className="flex items-center gap-4 p-2 ">
            <AlignLeft className='size-6 sm:size-10 cursor-pointer rotate-180 text-Text'/>
            <p className='cursor-pointer w-36 text-xl sm:text-2xl'>Back</p>
          </div>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border border-Text' to='/'>HOME</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border border-Text' to='/about'>ABOUT</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border border-Text' to='/contact'>CONTACT</NavLink>

          {/* Table data */}
          <div className="flex flex-col gap-2 mt-6 text-center p-4 bg-BG border border-Text rounded-lg shadow-lg">
            <img className='w-16 sm:w-24 md:w-32 mx-auto' src={assets.logo} alt="" />
            <h1 className="text-lg sm:text-xl font-semibold text-Text">🪑 Table : <span className="font-bold">{tableNumber}</span></h1>
            <h1 className="text-lg sm:text-xl font-semibold text-Text">😇 UserID : <span className="font-bold">{userID}</span></h1>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

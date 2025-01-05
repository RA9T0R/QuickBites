import React, { useContext, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { BiSolidFoodMenu } from "react-icons/bi";
import { MdDarkMode } from "react-icons/md";
import { FaConciergeBell } from "react-icons/fa";
import Table from './Table';
import { StoreContext } from '../context/StoreContext';


const Navbar = () => {

  const [visible,setVisible] = useState(false);
  const {getCartCount} = useContext(StoreContext);

  return (
    
    <div className='flex items-center justify-between py-5 font-medium'>
        <Link to='/'>
            <h1 className='uppercase text-xl sm:text-4xl font-extrabold'>Quick Bites</h1>
            {/* <img src={Healthy.healthy} className='w-36' alt="" /> */}
        </Link>
        
        <Table Number={1}/>

        <div className='flex items-center gap-6'>
            <button>
              <FaConciergeBell className='size-5 sm:size-8 fill-slate-500' />
            </button>
            <Link to='/cart' className='relative'>
              <BiSolidFoodMenu className='size-5 sm:size-8 fill-slate-500'/>
              <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]
                ">{getCartCount()}</p>
            </Link>
            <button>
              <MdDarkMode className='size-5 sm:size-8 fill-slate-500'/>
            </button>
        </div>
    </div>
  )
}

export default Navbar

import React, { useContext, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Healthy } from '../assets/img/assets';

const Navbar = () => {

  const [visible,setVisible] = useState(false);

  return (
    
    <div className='flex items-center justify-between py-5 font-medium'>
        <Link to='/'>
            <img src={Healthy.healthy} className='w-36' alt="" />
        </Link>
        <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
            <NavLink to='/' className='flex flex-col items-center gap-1'>
                <p className='text-'>HOME</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden '/>
            </NavLink>
        </ul>

        <div className='flex items-center gap-6'>
          
        </div>
    </div>
  )
}

export default Navbar

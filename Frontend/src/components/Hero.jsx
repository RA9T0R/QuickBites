import React from 'react';
import { assets } from '../assets/assets';
import { menu_list } from '../assets/assets';

const Hero = ({ category}) => {

  const menuItem = menu_list.find(item => item.menu_name === category);

  return (
    <div className='flex flex-col sm:flex-row border border-gray-400'>
      <div className='hidden md:flex w-full sm:w-1/2 items-center justify-center py-10 sm:py-0'>
        <div className='text-[#414141]'>
          <div className='flex-items-center gap-2'>
            <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
            <p className='font-medium text-sm md:text-base'>OUR BESTSELLERS</p>
          </div>
          <h1 className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed'>Quick Bites</h1>
          <div className='flex items-center gap-2'>
            <p className='font-semibold text-sm md:text-base'>EATS NOW</p>
            <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
          </div>
        </div>
      </div>

      <img
        src={menuItem ? menuItem.menu_main : assets.Home}
        className='w-full sm:w-1/2 max-h-[530px]'
        alt=""
      />
    </div>
  );
};

export default Hero;

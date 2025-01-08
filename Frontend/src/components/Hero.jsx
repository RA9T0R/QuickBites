import React from 'react';
import { assets } from '../assets/assets';
import { menu_list } from '../assets/assets';



const Hero = ({ category }) => {
  const menuItem = menu_list.find(item => item.menu_name === category);

  return (
    <div className="hidden md:flex relative flex-col sm:flex-row shadow-lg shadow-Text/20  rounded-lg overflow-hidden">
      {/* Image Section */}
      <img
        src={menuItem ? menuItem.menu_main : assets.Home}
        className="w-full h-56 sm:h-96 md:h-[40vh] object-cover"
        alt=""
      />

      {/* Overlay Section */}
      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">

        <div className="text-center text-white px-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-wide drop-shadow-lg">
            Quick Bites
          </h1>
          <p className="mt-4 text-base sm:text-lg font-light tracking-wide drop-shadow-md">
            Satisfy your cravings with our bestsellers!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;

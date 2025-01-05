import React from 'react';
import { menu_list } from '../assets/assets';

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className="flex flex-col gap-2 mt-2">
      {/* Header */}
      <div className='w-full sm:w-1/2 mt-5 text-center sm:text-start'>
        <h2 className='mb-5 font-bold sm:font-semibold text-2xl sm:text-4xl'>สำรวจเมนูของเรา</h2>
        <p className='hidden sm:block mb-5 font-medium text-lg'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis repellendus reiciendis architecto, earum perferendis veniam soluta ut minus tenetur rerum?</p>
      </div>

      {/* Scrollable Menu */}
      <div className="flex w-full overflow-x-auto py-2">
        <div className="flex gap-6 sm:gap-8 lg:gap-10 mx-auto max-w-screen-xl">
          {menu_list.map((item, index) => (
            <div onClick={() =>setCategory((prev) => (prev === item.menu_name ? 'All' : item.menu_name))}
              key={index} className="flex flex-col text-center gap-4 flex-shrink-0 w-20 sm:w-36 md:w-40">
              {/* Image Container */}
              <div className="relative w-full h-20 sm:h-36 md:h-40 overflow-hidden rounded-full">
                <img
                  className={`${category === item.menu_name ? 'border-4 border-rose-700' : ''} transition-all ease-in-out hover:scale-110 w-full h-full object-cover rounded-full`}
                  src={item.menu_image}
                  alt={item.menu_name}
                />
              </div>
              <p className="text-xs sm:text-sm md:text-base lg:text-lg uppercase font-bold text-gray-700">{item.menu_name}</p>
            </div>
          ))}
        </div>
      </div>
      <hr className='my-5 border-none h-[1.5px] w-full bg-gray-800'/>
    </div>
  );
};

export default ExploreMenu;

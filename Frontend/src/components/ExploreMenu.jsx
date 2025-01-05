import React from 'react';
import { menu_list } from '../assets/assets';

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className="flex flex-col gap-2 mt-2">
      {/* Header */}
      <div className="text-base font-semibold">เลือกประเภทอาหาร</div>

      {/* Scrollable Menu */}
      <div className="flex w-full overflow-x-auto py-2">
        <div className="flex gap-6 sm:gap-8 lg:gap-10 mx-auto max-w-screen-xl">
          {menu_list.map((item, index) => (
            <div
              onClick={() =>
                setCategory((prev) => (prev === item.menu_name ? 'All' : item.menu_name))
              }
              key={index}
              className="flex flex-col text-center gap-4 flex-shrink-0 w-32 sm:w-36 md:w-40"
            >
              {/* Image Container */}
              <div className="relative w-full h-32 sm:h-36 md:h-40 overflow-hidden rounded-full">
                <img
                  className={`${
                    category === item.menu_name ? 'border-rose-700' : ''
                  } w-full h-full object-cover rounded-full border-8`}
                  src={item.menu_image}
                  alt={item.menu_name}
                />
              </div>
              <p className="text-xs sm:text-sm md:text-base lg:text-lg uppercase font-extrabold">
                {item.menu_name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExploreMenu;

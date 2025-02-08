import React,{useContext} from 'react';
import { menu_list,assets } from '../assets/assets';
import { StoreContext } from '../context/StoreContext';

import {ChefHat } from 'lucide-react' 

const ExploreMenu = ({ category, setCategory }) => {

  const {search,setSearch} = useContext(StoreContext)

  return (
    <div className="flex flex-col gap-2 sm:py-5 px-4 sm:px-8 ">
      {/* Header */}
      <div className='w-full my-5 gap-5 sm:font-semibold text-4xl sm:text-7xl text-start sm:text-center text-Text'>
        <p className=''>Discover The <br/> <b>Best</b>  <b>Food</b></p>
      </div>

      {/* Search Bar */}
      <div className="flex items-center justify-center sm:py-5">
        <div className="flex items-center bg-gray-100 shadow-lg shadow-Text/20 rounded-full overflow-hidden w-full max-w-2xl">
          <input
            value={search} onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search for food..."
            className="flex-grow px-4 py-2 sm:px-6 sm:py-4 bg-gray-100 text-gray-700 text-lg focus:outline-none"
          />
          {/* <div className="px-4 py-2 sm:px-6 sm:py-4 bg-orange-500 text-white text-lg font-semibold rounded-full flex items-center justify-center">
            <img className='w-6 sm:w-10' src={assets.glass} alt="Search" />
          </div> */}
        </div>
      </div>


      <div className='w-full my-5 gap-5 font-bold sm:font-semibold text-xl sm:text-5xl text-start sm:text-center text-Text'>
        <p >No waiters, no waiting <b> Just great food!</b></p>
      </div>

      {/* Scrollable Menu */}
      <div className="flex w-full overflow-x-auto">
        <div className="flex gap-6 sm:gap-8 lg:gap-10 mx-auto max-w-screen-xl">
          {menu_list.map((item, index) => (
            <div
              key={index}
              onClick={() => setCategory((prev) => (prev === item.menu_name ? 'All' : item.menu_name))}
              className={`flex items-center gap-2 bg-BG px-2 py-1 rounded-xl shadow-lg shadow-Text/20  transition-all ease-in-out cursor-pointer  ${
                category === item.menu_name ? 'bg-BG_Black text-BG' : 'text-Text'
              }`}
            >
              {/* Icon Section */}
              <div className="hover:scale-105 relative w-12 h-12 overflow-hidden rounded-full shrink-0">
                {React.createElement(item.menu_image || ChefHat, { className: `w-full h-full object-center ${item.color}` })} 
              </div>

              {/* Text Section */}
              <div className="flex flex-col">
                <p className="text-md sm:lg md:text-xl font-bold uppercase">{item.menu_name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExploreMenu;

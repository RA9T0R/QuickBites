import React, { useContext,useEffect } from 'react'
import { Link } from 'react-router-dom'
import { StoreContext } from '../context/StoreContext'
import { menu_list } from '../assets/assets'
import FoodItem from './FoodItem'

import AOS from 'aos';
import 'aos/dist/aos.css';

import { ShoppingCart , ChefHat } from 'lucide-react'

const FoodDisplay = ({ category }) => {
  const { foods_list, getCartCount, currency, getCartAmount, search } = useContext(StoreContext)

  // Filter foods based on search term and selected category
  const filteredFoods = foods_list.filter(item => 
    item.name.toLowerCase().includes(search.toLowerCase()) &&
    (category === 'All' || category === item.category || (item.recommend && category === 'Recommend'))
  );

  // Group items by category
  const groupedFoods = filteredFoods.reduce((categories, item) => {
    const cat = item.category || 'Uncategorized'; 
    if (!categories[cat]) {
      categories[cat] = [];
    }
    categories[cat].push(item);
    return categories;
  }, {});

  useEffect(() => {
      AOS.init();
  },[]);

  return (
    <div className="flex flex-col gap-2">
      {Object.keys(groupedFoods).map((categoryName) => (
        <div key={categoryName}>
          {/* Category Header with Icon */}
          <h2 className="text-xl sm:text-3xl mt-5 sm:mt-1 font-bold text-Text px-4 sm:px-8 flex items-center gap-2">
            <div className="hover:scale-105 relative w-12 h-12 overflow-hidden rounded-full shrink-0">
              {(() => {
                const item = menu_list.find(item => item.menu_name === categoryName) || {};
                return React.createElement(item.menu_image || ChefHat, {
                  className: `w-full h-full object-center ${item.color || ''}`
                });
              })()}
            </div>
            {categoryName}
          </h2>


          {/* Food Items data-aos="fade-up"*/}
          <div  className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 gap-y-6 sm:py-5 px-4 sm:px-8'>
            {groupedFoods[categoryName].map((item, index) => (
              <FoodItem
                key={index}
                id={item._id}
                time={item.time}
                Kcal={item.Kcal}
                name={item.name}
                price={item.price}
                image={item.image[0]}
              />
            ))}
          </div>
        </div>
      ))}

      {getCartCount() > 0 && (
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full p-5 pb-8 md:p-10 bg-BG shadow-xl shadow-t shadow-Text/20 rounded-lg">
          <Link to='/cart' className='flex items-center justify-center'>
            <button
              className="flex items-center justify-between w-full md:w-[50%] bg-Button text-BG px-6 sm:px-8 py-3 text-sm sm:text-base rounded-lg hover:bg-orange-500 active:bg-orange-700 transition duration-300"
            > 
              <div className='flex gap-2 md:gap-8 items-center'>
                <ShoppingCart className='size-12' />
                <p className='text-xl md:text-2xl lg:text-3xl'>{getCartCount()} In cart</p>
              </div>
              <p className='text-xl md:text-2xl lg:text-3xl'>{currency} {getCartAmount()}.00</p>
            </button>
          </Link>
        </div>
      )}
    </div>
  )
}

export default FoodDisplay

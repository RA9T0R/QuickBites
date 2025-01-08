import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { StoreContext } from '../context/StoreContext'
import { assets } from '../assets/assets'
import FoodItem from './FoodItem'

const FoodDisplay = ({ category }) => {
  const { foods_list, getCartCount,currency,getCartAmount } = useContext(StoreContext)

  return (
    <div className="flex flex-col gap-2">
      <div className='grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 gap-y-6 sm:py-5 px-4 sm:px-8'>
        {foods_list.map((item, index) => {
          if (category === 'All' || category === item.category || (item.recommend && category === 'Recommend')) {
            return (
              <FoodItem
                key={index}
                id={item._id}
                time={item.time}
                Kcal={item.Kcal}
                name={item.name}
                price={item.price}
                image={item.image[0]}
              />
            )
          }
        })}
      </div>

      {/* Add to Cart Button at the bottom center with shadow */}
      {getCartCount() > 0 && (
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full p-5 pb-8 md:p-10 border bg-white shadow-xl rounded-lg">
          <Link to='/cart' className='flex items-center justify-center'>
            <button
              className="flex items-center justify-between w-full md:w-[50%] bg-orange-400 text-white px-6 sm:px-8 py-3 text-sm sm:text-base rounded-lg hover:bg-orange-500 active:bg-orange-700 transition duration-300"
            > 
              <div className='flex gap-2 md:gap-8 items-center'>
                <img className='w-12' src={assets.cart} alt="" />
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

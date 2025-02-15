import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';
import { AlarmClock, Flame } from 'lucide-react';

const FoodItem = ({ id, name, time, Kcal, price, image }) => {
  const { cartItems } = useContext(StoreContext);

  return (
    <Link className="shadow-lg shadow-Text/20 text-Text cursor-pointer mt-4 rounded-3xl" to={`/food/${id}`}>
      <div className="relative rounded-t-3xl overflow-hidden">
        <img src={image} className="w-full h-40 sm:h-52 hover:scale-110 transition-all ease-in-out" alt={name} />
        {cartItems[id] && (
          <div className="absolute top-2 start-1/2 transform -translate-x-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-BG rounded-full border shadow-lg flex items-center justify-center">
            <p className="text-xl font-black text-Text">{cartItems[id]?.quantity || 0}</p>  {/* Display quantity  */}
             
          </div>
        )}
      </div>

      <div className="p-4 gap-3 text-base flex flex-col items-center justify-center sm:text-2xl">
        {/* Name */}
        <p className="pb-2 font-semibold text-center">{name}</p>
        
        {/* Details Section */}
        <div className="flex text-center justify-between w-full px-0 lg:px-5 ">
          <p className="text-xs font-light flex items-center gap-1 text-center justify-center">
            <AlarmClock className='size-5' /> {time[0]} - {time[1]} min
          </p>
          <p className="text-xs font-light flex items-center gap-1 text-center justify-center">
            <Flame className='size-5' /> {Kcal} Kcal
          </p>
        </div>
        
        {/* Price */}
        <p className="text-2xl sm:text-3xl font-semibold">
          <b>฿</b> {price}
        </p>
      </div>
    </Link>
  );
};

export default FoodItem;

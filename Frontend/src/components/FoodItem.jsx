import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';

const FoodItem = ({ id, name, price, image }) => {
  const { cartItems } = useContext(StoreContext);

  return (
    <Link className="shadow-lg text-gray-700 cursor-pointer" to={`/food/${id}`}>
      <div className="rounded-t-3xl overflow-hidden">
        <img
          src={image}
          className="h-40 sm:h-52 hover:scale-110 transition-all ease-in-out"
          alt={name}
        />
      </div>
      <div className="p-4 text-base sm:text-2xl">
        <p className="pb-3">{name}</p>
        <div className="flex justify-between">
          <p className="text-xl text-orange-500 font-semibold">฿ {price}</p>
          {!cartItems[id]
              ? <></>
              : <p className="text-xl text-gray-700">x {cartItems[id]}</p>
          }
        </div>
      </div>
    </Link>
  );
};

export default FoodItem;

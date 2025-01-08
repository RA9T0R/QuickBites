import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../context/StoreContext';

import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';
import { Link } from 'react-router-dom';

const Cart = () => {
  const {foods_list, cartItems, updateQuantity, removeItem,placeOrder } = useContext(StoreContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (foods_list.length > 0) {
      const tempData = Object.keys(cartItems)
        .map((id) => {
          const product = foods_list.find((food) => food._id === id);
          if (product) {
            return {
              id,
              name: product.name,
              price: product.price,
              image: product.image,
              quantity: cartItems[id],
            };
          }
          return null;
        })
        .filter((item) => item !== null);
      setCartData(tempData);
    }
  }, [cartItems, foods_list]);

  return (
    <div className="flex flex-col max-w-full p-6 space-y-4 sm:p-8 ">
      <div className="w-full font-bold sm:font-semibold text-2xl sm:text-5xl text-start sm:text-center mb-3">
        <h1><b>My</b> Cart List</h1>
      </div>

      <div>
        {cartData.length > 0 ? (
          <div>
            {cartData.map((item, index) => (
              <div key={index}
                className="py-4 border-t border-b text-gray-700 flex justify-between items-center gap-2">
                <div className="flex gap-3 md:gap-6 w-full">
                  <img src={item.image[0]} className="w-28 sm:w-44 rounded-lg" alt="" />
                  <div className='flex flex-col justify-center'>
                    <p className="text-md md:text-2xl font-bold">{item.name}</p>
                    <div className="flex items-center text-md md:text-2xl gap-5 mt-2">
                      <p>฿ {item.price}</p>
                    </div>
                  </div>
                </div>
                
                <div className='md:w-[25%] p-2 flex flex-col items-center'>
                  <p className='text-lg md:text-2xl '>{item.quantity*item.price}</p>
                  <img className='w-4 md:w-10 cursor-pointer' onClick={() => removeItem(item.id)}  src={assets.bin}alt="Bin" />
                </div>

                <div className='md:w-[25%] flex flex-col gap-2 items-center justify-center'>
                  <div className='flex flex-col gap-3 items-center'>
                    <div className='size-6 md:size-10 bg-white shadow-lg rounded-full p-2'>
                      <img onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-10 cursor-pointer" src={assets.add} alt="" />
                    </div>

                    <div className="flex items-center justify-center size-6 md:size-8 bg-black shadow-lg rounded-md md:rounded-xl">
                      <p className="text-lg md:text-2xl text-white font-bold">{item.quantity}</p>
                    </div>

                    <div className='size-6 md:size-10 bg-white shadow-lg rounded-full p-2'>
                      <img src={assets.minus} onClick={() =>
                        item.quantity > 1 && updateQuantity(item.id, item.quantity - 1)
                      }
                      className="w-10 cursor-pointer" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        )}
      </div>

      <div className="flex justify-center">
        <div className="w-full sm:w-[450px] mt-10">
          <CartTotal/>
          <div className="w-full flex justify-center text-end">
            <Link onClick={() => placeOrder()} to="/orderSummary" className="w-[90%] text-center select-none rounded-lg bg-orange-400 text-white text-sm my-8 px-8 py-3">
                CHECKOUT
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

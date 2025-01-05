import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../context/StoreContext';
import { FaCirclePlus } from "react-icons/fa6";
import { FaMinusCircle } from "react-icons/fa";
import { IoTrashBinSharp } from "react-icons/io5";

const Cart = () => {
  const { foods_list, cartItems, updateQuantity, removeItem } = useContext(StoreContext);
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
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <h1>Your Cart</h1>
      </div>

      <div>
        {cartData.length > 0 ? (
          <div>
            {cartData.map((item, index) => (
              <div key={index}
                className="py-4 border-t border-b text-gray-700 flex justify-between items-center gap-4"
              >
                <div className="flex justify-between gap-6">
                  <img src={item.image[0]} className="w-16 sm:w-20" alt="" />
                </div>
                <div>
                  <p className="text-sm sm:text-lg font-medium">{item.name}</p>
                  <div className="flex items-center gap-5 mt-2">
                    <p>฿ {item.price}</p>
                    <FaCirclePlus
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="text-2xl cursor-pointer text-green-500 hover:text-green-700"
                    />
                    <p className="select-none px-2 sm:px-3 sm:py-1 border bg-slate-50">{item.quantity}</p>
                    <FaMinusCircle
                      onClick={() =>
                        item.quantity > 1 && updateQuantity(item.id, item.quantity - 1)
                      }
                      className="text-2xl cursor-pointer text-red-500 hover:text-red-700"
                    />
                  </div>
                </div>
                <div className='flex gap-5 items-center'>
                    <p className='text-2xl '>{item.quantity*item.price}</p>
                    <IoTrashBinSharp onClick={() => removeItem(item.id)} className="text-2xl cursor-pointer text-gray-500 hover:text-gray-700" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        )}
      </div>

      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <div className="w-full text-end">
            <button className="select-none bg-black text-white text-sm my-8 px-8 py-3">
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

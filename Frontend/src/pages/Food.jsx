import React, { useContext, useEffect, useState } from 'react';
import { useParams,Link } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';

import { assets } from '../assets/assets';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const Food = () => {
  const { foodId } = useParams();
  const { foods_list, setToCart, cartItems} = useContext(StoreContext);
  const [itemsCount, setItemsCount] = useState(cartItems[foodId] || 1);
  const [productData, setProductData] = useState(false);

  const fetchProductData = async () => {
    foods_list.map((item) => {
      if (item._id == foodId) {
        setProductData(item);
        return null;
      }
    });
  };
  
  useEffect(() => {
    fetchProductData();
  }, [foodId, foods_list]);

  return productData ? (
    <div className="my-2 transition-opacity ease-in duration-500 opacity-100">
      {/* Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12">
        {/* Swiper for Product Images */}
        <div className="relative rounded-2xl overflow-hidden">
          <Swiper
            pagination={{
              dynamicBullets: true,
            }}
            modules={[Pagination]}
            spaceBetween={10}
            slidesPerView={1}
            className="flex items-center justify-center"
          >
            {productData.image.map((item, index) => (
              <SwiperSlide key={index}>
                <img
                  src={item}
                  className="object-cover"
                  alt={`Product Image ${index + 1}`}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Fixed Controls */}
          <div className="absolute top-3 left-1/2 transform -translate-x-1/2 flex items-center gap-4 bg-white/80 px-4 py-2 rounded-full shadow-md z-10 sm:gap-4 sm:px-4 sm:py-2">
            <div className='size-8 md:size-12 bg-white shadow-lg rounded-full p-2'>
              <img
                src={assets.minus}
                alt="Minus Button"
                onClick={() => {
                  itemsCount > 0 && setItemsCount((prev) => prev - 1);
                }}
                className="bg w-12 text-2xl cursor-pointer text-red-500 hover:text-red-700"
              />
            </div>
            <div className="flex items-center justify-center w-8 h-8 md:w-12 md:h-12 bg-black shadow-lg rounded-xl">
              <p className="text-lg md:text-2xl text-white font-extrabold">{itemsCount || 0}</p>
            </div>

            <div className='size-8 md:size-12 bg-white shadow-lg rounded-full p-2'>
              <img
                src={assets.add}
                alt="Add Button"
                onClick={() => setItemsCount((prev) => prev + 1)}
                className="w-12 text-2xl cursor-pointer text-green-500 hover:text-green-700"
              />
            </div>
            
          </div>
        </div>

        {/* Product Information */}
        <div>
          <h1 className="font-bold text-3xl sm:text-4xl mt-2 text-Text">{productData.name} : ฿ {productData.price}</h1>
          <p className="mt-5 text-Text/50">{productData.description}</p>

          <div className="flex text-center justify-around w-full mt-5">
            <p className="text-sm sm:text-lg flex items-center gap-1 text-center justify-center text-Text">
              <img className="w-8 sm:w-10" src={assets.star} alt="" /> {productData.rate}
            </p>
            <p className="text-sm sm:text-lg flex items-center gap-1 text-center justify-center text-Text">
              <img className="w-10 sm:w-12" src={assets.pan} alt="" /> {productData.time[0]} - {productData.time[1]} min
            </p>
            <p className="text-sm sm:text-lg flex items-center gap-1 text-center justify-center text-Text">
              <img className="w-10 sm:w-12" src={assets.fire} alt="" /> {productData.Kcal} Kcal
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-[1fr_4fr] gap-4 sm:gap-6 mt-5">
            {/* Total Price Section */}
            <div className="flex flex-col text-center justify-center">
              <p className="text-sm sm:text-base text-Text/50">Total Price</p>
              <p className="text-4xl sm:text-5xl font-medium text-Highlight">
                ฿ {productData.price * itemsCount || 0}
              </p>
            </div>
            
            {/* Add to Cart Button */}
            <Link to={`/`} className='flex'>
              <button
                onClick={() => setToCart(productData._id, itemsCount)}
                className="w-full bg-Button text-white px-6 sm:px-8 py-3 text-lg sm:text-xl rounded-lg hover:bg-orange-500 active:bg-orange-700 transition duration-300 "
              >
                ADD TO CART
              </button>
            </Link>
          </div>


        </div>
      </div>
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Food;

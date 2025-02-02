import React, { useContext, useEffect, useState } from 'react';
import { useParams,Link } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';

import { Star,AlarmClock,Flame   } from 'lucide-react';

import { assets } from '../assets/assets';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import AOS from 'aos';
import 'aos/dist/aos.css';

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
    AOS.init();
  }, [foodId, foods_list]);

  return productData ? (
    <div className="my-2 transition-opacity ease-in duration-500 opacity-100">
      {/* Product Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-12">
        {/* Swiper for Product Images */}
        <div data-aos="fade-right" className="relative rounded-2xl overflow-hidden">
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
        </div>

        {/* Product Information */}
        <div data-aos="fade-left">
          <h1 className="font-bold text-3xl sm:text-4xl mt-2 text-Text">{productData.name} : ฿ {productData.price}</h1>
          <p className="mt-5 text-Text/50">{productData.description}</p>

          <div className="flex text-center justify-around w-full mt-5">
            <p className="text-sm sm:text-lg flex items-center gap-1 text-center justify-center text-Text">
              <Star className="size-8 sm:size-10 mr-2" />{productData.rate}
              {/* <img className="w-8 sm:w-10" src={assets.star} alt="" />  */}
            </p>
            <p className="text-sm sm:text-lg flex items-center gap-1 text-center justify-center text-Text">
              <AlarmClock className="size-8 sm:size-10"/>  {productData.time[0]} - {productData.time[1]} min
              {/* <img className="w-10 sm:w-12" src={assets.pan} alt="" /> */}
            </p>
            <p className="text-sm sm:text-lg flex items-center gap-1 text-center justify-center text-Text">
              <Flame className="size-8 sm:size-10" /> {productData.Kcal} Kcal
              {/* <img className="w-10 sm:w-12" src={assets.fire} alt="" /> {productData.Kcal} Kcal */}
            </p>
          </div>
          <div className="grid grid-cols-[1fr_4fr] gap-4 sm:gap-6 mt-5 ">

            <div className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full shadow-md z-10 sm:gap-4 sm:px-4 sm:py-2">
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
            
            {/* Add to Cart Button */}
            <Link to={`/`} className='flex'>
              <button
                onClick={() => setToCart(productData._id, itemsCount)}
                className="flex items-center justify-between w-full bg-Button text-white px-3 sm:px-5 xl:px-7 2xl:px-9 py-3 text-lg sm:text-xl rounded-full hover:bg-orange-500 active:bg-orange-700 transition duration-300"
              >
                <p className="text-md sm:text-2xl md:text-3xl xl:text-2xl font-medium text-white">
                  ฿ {productData.price * itemsCount || 0}
                </p>
                <p className='text-md sm:text-2xl md:text-3xl xl:text-2xl font-medium text-white'>
                   ADD TO CART
                </p>
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

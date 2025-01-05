import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { StoreContext } from '../context/StoreContext'
import { FaCirclePlus } from "react-icons/fa6";
import { FaMinusCircle } from "react-icons/fa";

const Food = () => {
  const {foodId} = useParams();
  const {foods_list,addToCart} = useContext(StoreContext)
  const [itemsCount,setItemsCount] = useState(0);
  const [productData, setProductData] = useState(false);
  const [image,setImage] = useState('');

  const fetchProductData = async () => {
    foods_list.map((item) => {
      if(item._id == foodId){
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    })
  }

  useEffect(() => {
    fetchProductData();
  },[foodId,foods_list])

  return( productData  ?  (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* Product Data */}
      <div className='flex gap-2 sm:gap-12 flex-col sm:flex-row'>
        {/* Product Image */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scrool justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {
              productData.image.map((item,index) => (
                  <img onClick={() => setImage(item)} src={item} key={index} className = 'w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer hover:border-2 border-gray-400' alt="" />
              ))
            }
          </div>
          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-auto' src={image} alt="" />
          </div>
        </div>

        {/* Product Information */}
        <div className="flex-1">
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            {/* Something */}
          </div>
          <p className='mt-5 text-3xl font-medium text-orange-500'>฿{productData.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
          <div className='flex flex-col gap-4 my-2'>
              {/* Something */}
          </div>
          <div className='flex gap-5'>
            <div className='flex gap-5 justify-center items-center'>
              <FaCirclePlus
                onClick={() => setItemsCount(prev => prev+1)}
                className='text-2xl cursor-pointer text-green-500 hover:text-green-700'
              />
              <p className="select-none">{itemsCount || 0}</p>
              <FaMinusCircle
                onClick={() => {
                  itemsCount > 0 && setItemsCount(prev => prev-1);
                }}
                className='text-2xl cursor-pointer text-red-500 hover:text-red-700'
              />
            </div>
            <button onClick={() => addToCart(productData._id,itemsCount)} className='select-none bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>
          </div>
          <hr className='my-5 border-none h-[1.5px] w-full bg-gray-800'/>
        </div>
      </div>
    </div>  
  ) : <div className='opacity-0'></div>)
}

export default Food

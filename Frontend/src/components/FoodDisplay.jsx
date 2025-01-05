import React, { useContext } from 'react'
import { StoreContext } from '../context/StoreContext'
import FoodItem from './FoodItem'

const FoodDisplay = ({category}) => {

  const {foods_list} = useContext(StoreContext)

  return (
    <div className="flex flex-col gap-2 ">
      <h2 className='text-center sm:text-start mb-5 font-bold sm:font-semibold text-2xl sm:text-4xl'>เมนูเด็ดใกล้ตัวคุณ</h2>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {foods_list.map((item,index)=>{
            if(category === 'All' || category === item.category || (item.recommend && category === 'Recommend')){
                return <FoodItem key={index} id={item._id} name={item.name} price={item.price} image={item.image} />
            }
        })}
      </div>
    </div>
  )
}

export default FoodDisplay

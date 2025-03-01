import React,{useState,useEffect} from 'react'
import { assets } from "../assets/assets.js"
import axios from 'axios'
import { backendURL } from '../App';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import { Trash,Pencil,CookingPot,Star  } from 'lucide-react';

const Menu = () => {

  const [foodList, setFoodList] = useState([]);

  const fetchFood = async () => {
    try{
      const response = await axios.get(backendURL + '/api/product/list');
      if(response.data.success){
        setFoodList(response.data.product);
      }
    }catch(error){
      toast.error("Failed to fetch food list");
    }
  }

  useEffect(() => {
    fetchFood();
  },[])


  return (
    <div className="w-full flex flex-col items-center text-Text p-2 sm:p-8">
      <div className='flex flex-col sm:flex-row gap-4 items-center justify-between w-full'>
        <h1 className="text-2xl sm:text-4xl font-bold self-start ml-1">Employee</h1>
        <Link to="/create" className='flex items-center justify-center self-start w-full sm:w-auto h-full p-4 gap-3 text-white hover:bg-green-400 bg-green-600 rounded-2xl '>
          <CookingPot/>
          <p>Add new menu</p>
        </Link>
      </div>

      <div className="w-full mt-4 rounded-xl bg-BG p-5">
        {/* Wrap the content inside a scrollable container */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="uppercase text-left text-Text border-b border-Text/10">
                <th className="py-3 px-4">ID</th>
                <th className="py-3 px-4">Image</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Rate</th>
                <th className="py-3 px-4">Time</th>
                <th className="py-3 px-4">Calorie</th>
                <th className="py-3 px-4">Action</th>
              </tr>
            </thead>

            {/* foodList List */}
            <tbody>
              {foodList.map((food, index) => (
                <tr
                  className="border-b border-Text/10 text-Text/80"
                  key={index}
                >
                  {/* ID */}
                  <td  className="py-3 px-4 text-center">
                    <div>{food.recommend ? <Star className='fill-yellow-400 text-yellow-400'/> : ' '} </div>
                    <div>{index} </div>
                  </td>
                  {/* Image */}
                  <td className="py-3 px-4 min-w-60 flex">
                    {food.image && food.image.length > 0 ? (
                      food.image.map((image, imgIndex) => (
                        <img
                          key={imgIndex}
                          src={image}
                          alt={`Food Image ${imgIndex}`}
                          className="size-16 rounded-lg object-cover mr-2"
                        />
                      ))
                    ) : (
                      <span>No images available</span>
                    )}
                  </td>

                  {/* Name */}
                  <td className="py-3 px-4 min-w-52">{food.name} </td>

                  {/* description */}
                  <td className="py-3 px-4 min-w-72">{food.description}</td>

                  {/* price */}
                  <td className="py-3 px-4">{food.price}</td>

                  
                  {/* Rate */}
                  <td className="py-3 px-4">{food.rate}</td>
                  {/* Time */}
                  <td className="py-3 px-4 min-w-24">{food.time[0]} - {food.time[1]}</td>
                  {/* Kcal */}
                  <td className="py-3 px-4 text-center">{food.Kcal}</td>

                  {/* Actions */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <Link to={`/edit_menu/${food._id}`}>
                        <Pencil className="cursor-pointer" />
                      </Link>
                      <Trash
                        className="cursor-pointer"
                        // onClick={() => removeEmployee(food._id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Menu

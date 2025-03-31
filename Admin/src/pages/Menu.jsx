import React, { useState, useContext } from 'react'
import { menu_list } from "../assets/assets.js"
import { DashboardContext } from '../context/DashboardContext'
import { backendURL } from '../App';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import axios from 'axios'

import { Trash, Pencil, CookingPot, Star } from 'lucide-react';

const Menu = ({ token }) => {
  const { foodList, fetchFood } = useContext(DashboardContext);
  const [category, setCategory] = useState('All');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [MenuToDelete, setMenuToDelete] = useState(null);
  const [nameMenu, setNameMenu] = useState("");

  const handleDeleteClick = (id,name) => {
    setNameMenu(name);
    setMenuToDelete(id);
    setDeleteModalOpen(true);
  };
  
  const cancelDelete = () => {
    setDeleteModalOpen(false);
    setMenuToDelete(null);
    setNameMenu(null);
  };

  const removeFood = async () => {
    try {
      const response = await axios.post(backendURL + '/api/product/remove', { id: MenuToDelete }, { headers: { token } });
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchFood();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    cancelDelete();
  }

  const filteredFoodList = category === 'All'
    ? foodList
    : category === 'Recommend'
      ? foodList.filter(food => food.recommend)
      : foodList.filter(food => food.category === category);

  return (
    <div className="w-full flex flex-col items-center text-Text p-2 sm:p-8">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between w-full">
        <h1 className="text-2xl sm:text-4xl font-bold self-start ml-1">Menu</h1>
        <Link to="/create" className="flex items-center justify-center self-start w-full sm:w-auto h-full p-4 gap-3 text-white hover:bg-green-400 bg-green-600 rounded-2xl">
          <CookingPot />
          <p>Add new menu</p>
        </Link>
      </div>

      {/* Scrollable Menu */}
      <div className="flex w-full overflow-x-auto mt-5">
        <div className="flex gap-6 sm:gap-8 lg:gap-10 mx-auto max-w-screen-xl">
          {menu_list.map((item, index) => (
            <div key={index} onClick={() => setCategory(prev => prev === item.menu_name ? 'All' : item.menu_name)}
              className={`flex items-center gap-2 bg-BG px-2 py-1 rounded-xl shadow-lg shadow-Text/20 transition-all ease-in-out cursor-pointer ${
                category === item.menu_name ? 'bg-BG_Black text-BG' : 'text-Text'
              }`}
            >
              {/* Icon Section */}
              <div className="hover:scale-105 relative w-12 h-12 overflow-hidden rounded-full shrink-0">
                {React.createElement(item.menu_image, { className: `w-full h-full object-center ${item.color}` })}
              </div>

              {/* Text Section */}
              <div className="flex flex-col">
                <p className="text-md sm:lg md:text-xl font-bold uppercase">{item.menu_name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Food List */}
      <div className="w-full mt-4 rounded-xl bg-BG p-5">
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="uppercase text-left text-Text border-b border-Text/10">
                <th className="py-3 px-4">No.</th>
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

            {/* Filtered Food List */}
            <tbody>
              {filteredFoodList.map((food, index) => (
                <tr className="border-b border-Text/10 text-Text/80" key={index}>
                  {/* ID */}
                  <td className="py-3 px-4 text-center">
                    <div>{food.recommend ? <Star className="fill-yellow-400 text-yellow-400" /> : ' '}</div>
                    <div>{index + 1}</div>
                  </td>

                  {/* Image */}
                  <td className="py-3 px-4 min-w-80 flex">
                    {food.image &&
                    Array.isArray(food.image) &&
                    food.image.filter((img) => img && img !== "null").length > 0 ? (
                      food.image
                        .filter((img) => img && img !== "null")
                        .map((image, imgIndex) => (
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
                  <td className="py-3 px-4 min-w-52">{food.name}</td>

                  {/* Description */}
                  <td className="py-3 px-4 min-w-72">{food.description}</td>

                  {/* Price */}
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
                      <Trash onClick={() => handleDeleteClick(food._id,food.name)} className="cursor-pointer" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* If no food matches the category */}
          {filteredFoodList.length === 0 && (
            <p className="text-center text-gray-500 mt-4">No items available in this category.</p>
          )}
        </div>
      </div>

      {/* Confirmation Modal for deleting a table */}
      {deleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-Text p-6 rounded-lg shadow-lg w-96 text-center">
            <h2 className="text-xl font-bold mb-4 text-BG">
              Are you sure you want to delete <br />{nameMenu}?
            </h2>
            <div className="flex justify-between text-white">
              <button onClick={cancelDelete} className="px-4 py-2 bg-red-700 rounded">
                Cancel
              </button>
              <button onClick={removeFood} className="px-4 py-2 bg-green-600 rounded">
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;

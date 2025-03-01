import React, { useState } from 'react'
import axios from 'axios'
import { backendURL } from '../App';
import { toast } from 'react-toastify';
import { assets } from "../assets/assets.js"

const CreateMenu = ({ token, role }) => {
  if (role !== "admin") {
    return (
      <div className="flex justify-center items-center mt-6">
        <div className="bg-red-100 text-red-700 border border-red-500 rounded-lg px-6 py-4">
          <p className="text-center font-semibold">Access Denied</p>
          <p className="text-center text-sm">Admins only.</p>
        </div>
      </div>
    );
  }

  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [rate, setRate] = useState('');
  const [calories, setCalories] = useState('');
  const [category, setCategory] = useState('MainDish');
  const [bestseller, setBestseller] = useState(false);
  const [timeRange, setTimeRange] = useState([0, 60]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('rate', rate);
      formData.append('Kcal', calories);
      formData.append('category', category);
      formData.append('recommend', bestseller);
      formData.append('time', JSON.stringify(timeRange));

      image1 && formData.append('image1', image1);
      image2 && formData.append('image2', image2);
      image3 && formData.append('image3', image3);
      image4 && formData.append('image4', image4);

      const response = await axios.post(backendURL + '/api/product/add', formData, { headers: { token } });

      if (response.data.success) {
        toast.success(response.data.message);
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setName('');
        setDescription('');
        setPrice('');
        setRate("");
        setCalories("");
        setCategory("MainDish");
        setBestseller(false);
        setTimeRange([0, 60])
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  return (
    <div className="flex text-Text">
    <form onSubmit={onSubmitHandler} className="flex flex-col w-full items-start gap-7 p-7 bg-BG rounded-xl">

      <h1 className="text-2xl md:text-4xl font-bold self-start ml-1">Create Menu</h1>

      <div className="w-full flex flex-col">
        <p className="mb-2">Dish Name</p>
        <input onChange={(e) => setName(e.target.value)} value={name} className="w-full max-w-[575px] px-3 py-2 rounded-2xl bg-gray-100 border" type="text" placeholder="Name" required />
      </div>

      <div className="w-full flex flex-col">
        <p className="mb-2">Description</p>
        <textarea onChange={(e) => setDescription(e.target.value)} value={description} className="w-full max-h-[125px] max-w-[575px] px-3 py-2 rounded-2xl bg-gray-100 border" type="text" placeholder="Description" required />
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">

        <div>
          <p className="mb-2 w-full flex flex-col">Category</p>
          <select 
          onChange={(e) => setCategory(e.target.value)} 
          value={category} 
          className="w-full px-3 py-2 rounded-2xl bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-100 border">
            <option value="MainDish">MainDish</option>
            <option value="Healthy">Healthy</option>
            <option value="Drinks">Drinks</option>
            <option value="Dessert">Dessert</option>
            <option value="Appitizer">Appitizer</option>
          </select>
        </div>

        <div>
          <p className="mb-2 w-full flex flex-col">Price</p>
          <input onChange={(e) => setPrice(e.target.value)} value={price} className="w-full px-3 py-2 sm:w-[120px] rounded-2xl bg-gray-100 border no-spinner" type="Number" placeholder="0" />
        </div>

        <div>
          <p className="mb-2 w-full flex flex-col">Rating</p>
          <input onChange={(e) => setRate(e.target.value)} value={rate} className="w-full px-3 py-2 sm:w-[120px] rounded-2xl bg-gray-100 border no-spinner" type="Number" step={0.01} placeholder="0.0" />
        </div>

        <div>
          <p className="mb-2 w-full flex flex-col">Calories (Kcal)</p>
          <input onChange={(e) => setCalories(e.target.value)} value={calories} className="w-full px-3 py-2 sm:w-[120px] rounded-2xl bg-gray-100 border no-spinner" type="Number" step={0.01} placeholder="0" />
        </div>

      </div>

      <div>
        <p className="mb-2 w-full flex flex-col">Cooking Time (minutes)</p>
        <div className="flex gap-4 items-center">
          <div className="flex flex-col items-center">
            <label className="mb-1 text-sm w-full flex flex-col">Min Time</label>
            <input
              type="Number"
              value={timeRange[0]}
              min={0}
              placeholder="0"
              max={timeRange[1]}
              onChange={(e) =>
                setTimeRange([Number(e.target.value), timeRange[1]])
              }
              className="w-20 px-2 py-1 border rounded-2xl bg-gray-100 no-spinner"
            />
          </div>
          <span>_</span>
          <div className="flex flex-col items-center">
            <label className="mb-1 text-sm w-full flex flex-col">Max Time</label>
            <input
              type="Number"
              value={timeRange[1]}
              min={timeRange[0]}
              placeholder="60"
              onChange={(e) =>
                setTimeRange([timeRange[0], Number(e.target.value)])
              }
              className="w-20 px-2 py-1 border rounded-2xl bg-gray-100 no-spinner"
            />
          </div>
        </div>

        <div className="mt-7 mb-7">
          <p className="mb-2">Upload Image</p>
          <div className="flex gap-2">
            <label htmlFor="image1">
              <img className="w-20 cursor-pointer" src={!image1 ? assets.upload : URL.createObjectURL(image1)} alt="" />
              <input onChange={(e) => setImage1(e.target.files[0])} type="file" id='image1' hidden />
            </label>
            <label htmlFor="image2">
              <img className="w-20 cursor-pointer" src={!image2 ? assets.upload : URL.createObjectURL(image2)} alt="" />
              <input onChange={(e) => setImage2(e.target.files[0])} type="file" id='image2' hidden />
            </label>
          </div>
        </div>

        <div className="mt-7">
          <div className="flex gap-2">
            <label htmlFor="image3">
              <img className="w-20 cursor-pointer" src={!image3 ? assets.upload : URL.createObjectURL(image3)} alt="" />
              <input onChange={(e) => setImage3(e.target.files[0])} type="file" id='image3' hidden />
            </label>
            <label htmlFor="image4">
              <img className="w-20 cursor-pointer" src={!image4 ? assets.upload : URL.createObjectURL(image4)} alt="" />
              <input onChange={(e) => setImage4(e.target.files[0])} type="file" id='image4' hidden />
            </label>
          </div>
        </div>

      </div>

      <label class="inline-flex items-center cursor-pointer" htmlFor="bestseller">
        <input 
        onChange={(e) => setBestseller(prev => !prev)} 
        checked={bestseller} 
        type="checkbox" 
        id='bestseller' 
        class="sr-only peer"
        />
        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600 dark:peer-checked:bg-green-600"></div>
        <span className="ms-3 text-sm font-medium text-Text">
          Add to Recommendation
        </span>
      </label>

      <button type="submit" className="w-28 py-3 mt-4 bg-Button text-BG active:bg-Button/75 rounded-xl">Add Menu</button>
    </form>
    </div>
  )
}

export default CreateMenu
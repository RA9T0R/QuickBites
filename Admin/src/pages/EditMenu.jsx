import React, { useState, useEffect,useContext } from 'react';
import axios from 'axios';
import {DashboardContext} from '../context/DashboardContext'
import { backendURL } from '../App';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from "react-router-dom";
// Import the icon from lucide-react:
import { ImageUp } from 'lucide-react';

const EditMenu = ({ token, role }) => {
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
  const {fetchFood} = useContext(DashboardContext);
  const navigate = useNavigate();
  const { productId } = useParams();

  // Local file states
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  // Existing data from DB
  const [food1, setFood1] = useState('');
  const [food2, setFood2] = useState('');
  const [food3, setFood3] = useState('');
  const [food4, setFood4] = useState('');

  // Other fields
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [rate, setRate] = useState('');
  const [calories, setCalories] = useState('');
  const [category, setCategory] = useState('MainDish');
  const [bestseller, setBestseller] = useState(false);
  const [timeRange, setTimeRange] = useState([0, 60]);

  const fetchFoodSingle = async () => {
    try {
      const response = await axios.post(backendURL + '/api/product/single', { productId });
      if (response.data.success) {
        const product = response.data.product;

        setName(product.name || '');
        setDescription(product.description || '');
        setPrice(product.price || '');
        setRate(product.rate || '');
        setCalories(product.Kcal || '');
        setCategory(product.category || 'MainDish');
        setBestseller(product.recommend || false);
        setTimeRange(product.time || [0, 60]);

        // Existing DB images
        setFood1(product.image?.[0] || '');
        setFood2(product.image?.[1] || '');
        setFood3(product.image?.[2] || '');
        setFood4(product.image?.[3] || '');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchFoodSingle();
  }, [productId]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append('productId', productId);
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('rate', rate);
      formData.append('Kcal', calories);
      formData.append('category', category);
      formData.append('recommend', bestseller);
      formData.append('time', JSON.stringify(timeRange));

      if (image1) formData.append('image1', image1);
      if (image2) formData.append('image2', image2);
      if (image3) formData.append('image3', image3);
      if (image4) formData.append('image4', image4);

      const response = await axios.post(
        backendURL + '/api/product/update',
        formData,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        fetchFood()
        navigate('/view_menu');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full flex flex-col items-center text-Text p-2 sm:p-8">
      <h1 className="text-2xl md:text-4xl font-bold self-start ml-1">
        Edit Menu
      </h1>

      <form
        onSubmit={onSubmitHandler}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full h-full mt-4 rounded-xl items-stretch"
      >
        {/* Left Column: Basic Info & Attributes */}
        <div className="bg-BG rounded-xl p-7 shadow flex flex-col h-full">
          <h1 className="text-2xl font-bold mb-5 text-Text">
            Basic Information
          </h1>

          {/* Basic Info Section */}
          <div>
            {/* Dish Name */}
            <div className="flex flex-col w-full mb-5">
              <p className="mb-2 text-Text">Dish Name</p>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="w-full px-3 py-2 rounded-2xl text-Text bg-Text/10 placeholder-Text/50"
                type="text"
                placeholder="Name"
                required
              />
            </div>

            {/* Dish Description */}
            <div className="flex flex-col w-full mb-7">
              <p className="mb-2 text-Text">Description</p>
              <textarea
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                className="w-full h-28 px-3 py-2 mb-1 rounded-2xl text-Text bg-Text/10 placeholder-Text/50 resize-none"
                placeholder="Description"
                required
              />
            </div>
          </div>

          {/* Attributes Section */}
          <h1 className="text-2xl font-bold mb-5 text-Text">Attributes</h1>
          <div className="grid grid-rows-4 gap-2 w-full">
            {/* Category */}
            <div>
              <p className="flex w-full text-Text mb-2">Category</p>
              <select
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                className="w-full px-3 py-2 rounded-xl text-Text bg-Text/10 placeholder-Text/50"
              >
                <option value="MainDish">MainDish</option>
                <option value="Healthy">Healthy</option>
                <option value="Drinks">Drinks</option>
                <option value="Dessert">Dessert</option>
                <option value="Appitizer">Appitizer</option>
              </select>
            </div>

            {/* Price */}
            <div>
              <p className="flex mb-2 w-full text-Text">Price</p>
              <input
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                min={0}
                className="w-full px-3 py-2 rounded-xl text-Text bg-Text/10 placeholder-Text/50 no-spinner"
                type="Number"
                placeholder="0"
                step={0.01}
              />
            </div>

            {/* Rating */}
            <div>
              <p className="mb-2 w-full text-Text">Rating</p>
              <input
                onChange={(e) => setRate(e.target.value)}
                value={rate}
                min={0}
                className="w-full px-3 py-2 rounded-xl text-Text bg-Text/10 placeholder-Text/50 no-spinner"
                type="Number"
                placeholder="0.0"
                step={0.1}
              />
            </div>

            {/* Calories */}
            <div>
              <p className="mb-2 w-full text-Text">Calories (Kcal)</p>
              <input
                onChange={(e) => setCalories(e.target.value)}
                value={calories}
                min={0}
                className="w-full px-3 py-2 rounded-xl text-Text bg-Text/10 placeholder-Text/50 no-spinner"
                type="Number"
                placeholder="0"
              />
            </div>

            {/* Cooking Time & Recommendation in one row */}
            <div className="grid grid-cols-1 md:grid-cols-2 items-center">
              {/* Cooking Time */}
              <div>
                <p className="mb-2 w-full text-Text">Cooking Time</p>
                <div className="flex gap-4 items-end">
                  {/* Min Time */}
                  <div className="flex flex-col">
                    <label className="mb-1 text-sm text-Text">Min Time</label>
                    <input
                      type="number"
                      value={timeRange[0]}
                      min={0}
                      placeholder="0"
                      max={timeRange[1]}
                      onChange={(e) =>
                        setTimeRange([Number(e.target.value), timeRange[1]])
                      }
                      className="w-20 px-2 py-1 rounded-xl text-Text bg-Text/10 placeholder-Text/50 no-spinner"
                    />
                  </div>
                  <span className="text-Text">‾</span>
                  {/* Max Time */}
                  <div className="flex flex-col">
                    <label className="mb-1 text-sm text-Text">Max Time</label>
                    <input
                      type="number"
                      value={timeRange[1]}
                      min={timeRange[0]}
                      placeholder="60"
                      onChange={(e) =>
                        setTimeRange([timeRange[0], Number(e.target.value)])
                      }
                      className="w-20 px-2 py-1 rounded-xl text-Text bg-Text/10 placeholder-Text/50 no-spinner"
                    />
                  </div>
                  <span className="text-Text">mins</span>
                </div>
              </div>

              {/* Recommendation */}
              <div className="mt-5">
                <label className="inline-flex items-center" htmlFor="bestseller">
                  <span className="mr-5 font-medium text-Text">
                    Add to Recommendation (Optional)
                  </span>
                  <input
                    onChange={() => setBestseller((prev) => !prev)}
                    checked={bestseller}
                    type="checkbox"
                    id="bestseller"
                    className="sr-only peer"
                  />
                  <div
                    className="
                      cursor-pointer relative w-11 h-6 rounded-full peer
                      dark:bg-gray-700 peer-checked:after:translate-x-full
                      rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white
                      after:content-[''] after:absolute after:top-[2px] after:start-[2px]
                      after:bg-white after:border-gray-300 after:border after:rounded-full
                      after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600
                      dark:peer-checked:bg-green-600
                    "
                  ></div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Upload Images & Button */}
        <div className="bg-BG rounded-xl p-7 shadow flex flex-col h-full">
          <h1 className="text-2xl font-bold text-Text">Upload Images</h1>

          {/* Main content area grows to fill space */}
          <div className="flex-grow w-full">
            {/* Row 1 of images */}
            <div className="grid grid-cols-2 gap-4 my-5">
              {/* Image 1 */}
              <label htmlFor="image1">
                {image1 ? (
                  <img
                    className="size-80 cursor-pointer rounded-xl"
                    src={URL.createObjectURL(image1)}
                    alt=""
                  />
                ) : food1 ? (
                  <img
                    className="size-80 cursor-pointer rounded-xl"
                    src={food1}
                    alt=""
                  />
                ) : (
                  <ImageUp className="w-full h-full cursor-pointer rounded-xl text-Text" />
                )}
                <input
                  onChange={(e) => setImage1(e.target.files[0])}
                  type="file"
                  id="image1"
                  hidden
                />
              </label>

              {/* Image 2 */}
              <label htmlFor="image2">
                {image2 ? (
                  <img
                    className="size-80 cursor-pointer rounded-xl"
                    src={URL.createObjectURL(image2)}
                    alt=""
                  />
                ) : food2 ? (
                  <img
                    className="size-80 cursor-pointer rounded-xl"
                    src={food2}
                    alt=""
                  />
                ) : (
                  <ImageUp className="w-full h-full cursor-pointer rounded-xl text-Text" />
                )}
                <input
                  onChange={(e) => setImage2(e.target.files[0])}
                  type="file"
                  id="image2"
                  hidden
                />
              </label>
            </div>

            {/* Row 2 of images */}
            <div className="grid grid-cols-2 gap-4">
              {/* Image 3 */}
              <label htmlFor="image3">
                {image3 ? (
                  <img
                    className="size-80 cursor-pointer rounded-xl"
                    src={URL.createObjectURL(image3)}
                    alt=""
                  />
                ) : food3 ? (
                  <img
                    className="size-80 cursor-pointer rounded-xl"
                    src={food3}
                    alt=""
                  />
                ) : (
                  <ImageUp className="w-full h-full cursor-pointer rounded-xl text-Text" />
                )}
                <input
                  onChange={(e) => setImage3(e.target.files[0])}
                  type="file"
                  id="image3"
                  hidden
                />
              </label>

              {/* Image 4 */}
              <label htmlFor="image4">
                {image4 ? (
                  <img
                    className="size-80 cursor-pointer rounded-xl"
                    src={URL.createObjectURL(image4)}
                    alt=""
                  />
                ) : food4 ? (
                  <img
                    className="size-80 cursor-pointer rounded-xl"
                    src={food4}
                    alt=""
                  />
                ) : (
                  <ImageUp className="w-full h-full cursor-pointer rounded-xl text-Text" />
                )}
                <input
                  onChange={(e) => setImage4(e.target.files[0])}
                  type="file"
                  id="image4"
                  hidden
                />
              </label>
            </div>
          </div>

          {/* Button at bottom of right column */}
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="w-32 md:p-5 py-3 bg-Button text-BG active:bg-Button/75 rounded-xl shadow"
            >
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditMenu;

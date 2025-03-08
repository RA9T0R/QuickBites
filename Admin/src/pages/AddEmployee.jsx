import React, { useState,useContext } from 'react'
import axios from 'axios'
import {DashboardContext} from '../context/DashboardContext'
import { backendURL } from '../App';
import { toast } from 'react-toastify';
import { SquareUserRound } from 'lucide-react';

const AddEmployee = ({ token, role }) => {
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
  const {fetchEmployee} = useContext(DashboardContext);
  const [image, setImage] = useState(false);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('THA');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      const Fulladdress = `${address}, ${city}, ${country}, ${postalCode}`;

      formData.append('firstName', firstname);
      formData.append('lastName', lastname);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('phone', phone);
      formData.append('address', Fulladdress);

      image && formData.append('profilePic', image);

      const response = await axios.post(backendURL + '/api/employee/registerStaff', formData, { headers: { token } });
      console.log(response)
      if (response.data.success) {
        fetchEmployee();
        toast.success(response.data.message);
        setFirstname('');
        setLastname('');
        setEmail('');
        setPassword('');
        setPhone('');
        setCountry('');
        setAddress('');
        setCity('');
        setPostalCode('');
        setImage(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  return (
    <div className="w-full flex flex-col items-center text-Text p-2 sm:p-8">
      <h1 className="text-2xl md:text-4xl font-bold self-start ml-1">Add Employee</h1>

      {/* Container Bento Grid */}
      <form onSubmit={onSubmitHandler} className="grid h-full w-full grid-cols-1 lg:grid-cols-4 gap-4 mt-4">
        {/* 1 Section */}
        <div className="cols-span-4 lg:col-span-3 grid rounded-xl gap-3">
          <div className='rounded-xl bg-BG flex flex-col items-center justify-center p-5'>
            <h1 className="text-2xl font-bold self-start mb-5">Overview</h1>
            <div className="flex gap-4 w-full mb-4">
              <div className='w-full'>
                <p className='mb-2'>First Name</p>
                <input onChange={(e) => setFirstname(e.target.value)} value={firstname} type="text" className="w-full rounded-lg p-2 bg-Text/20 placeholder-Text/50" placeholder='First Name' required />
              </div>
              <div className='w-full'>
                <p className='mb-2'>Last Name</p>
                <input onChange={(e) => setLastname(e.target.value)} value={lastname} type="text" className="w-full rounded-lg p-2 bg-Text/20 placeholder-Text/50" placeholder='Last Name' required />
              </div>
            </div>
            <div className="flex gap-4 w-full mb-4">
              <div className='w-full mb-4'>
                <p className='mb-2'>Email</p>
                <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className="w-full rounded-lg p-2 bg-Text/20 placeholder-Text/50" placeholder='Email' required />
              </div>
              <div className='w-full'>
                <p className='mb-2'>Password</p>
                <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" className="w-full rounded-lg p-2 bg-Text/20 placeholder-Text/50" placeholder='Password' required />
              </div>
            </div>

            <div className='w-full mb-4'>
              <p className='mb-2'>Phone Number</p>
              <input onChange={(e) => setPhone(e.target.value)} value={phone} type="text" className="w-full rounded-lg p-2 bg-Text/20 placeholder-Text/50" placeholder='Phone Number' required />
            </div>
          </div>

          <div className='rounded-xl bg-BG flex flex-col items-center justify-center p-5'>
            <h1 className="text-2xl font-bold self-start mb-5">Address Information</h1>
            <div className='w-full mb-4'>
              <p className='mb-2'>Country</p>
              <select onChange={(e) => setCountry(e.target.value)} value={country} className="w-full rounded-lg p-2 bg-Text/20 text-Text/80 placeholder-Text/50">
                <option value="" disabled className="text-BG/80">Select a country</option>
                <option value="THA" className="bg-BG text-Text/90 hover:bg-Text/30">Thailand</option>
                <option value="USA" className="bg-BG text-Text/90 hover:bg-Text/30">United States</option>
                <option value="UK" className="bg-BG text-Text/90 hover:bg-Text/30">United Kingdom</option>
                <option value="Canada" className="bg-BG text-Text/90 hover:bg-Text/30">Canada</option>
                <option value="Australia" className="bg-BG text-Text/90 hover:bg-Text/30">Australia</option>
                <option value="Germany" className="bg-BG text-Text/90 hover:bg-Text/30">Germany</option>
              </select>
            </div>
            <div className='w-full mb-4'>
              <p className='mb-2'>Address</p>
              <input onChange={(e) => setAddress(e.target.value)} value={address} type="text" className="w-full rounded-lg p-2 bg-Text/20 placeholder-Text/50" placeholder='Address' required />
            </div>
            <div className="flex gap-4 w-full mb-4">
              <div className='w-full'>
                <p className='mb-2'>City</p>
                <input onChange={(e) => setCity(e.target.value)} value={city} type="text" className="w-full rounded-lg p-2 bg-Text/20 placeholder-Text/50" placeholder='City' required />
              </div>
              <div className='w-full'>
                <p className='mb-2'>Postal Code</p>
                <input onChange={(e) => setPostalCode(e.target.value)} value={postalCode} type="text" className="w-full rounded-lg p-2 bg-Text/20 placeholder-Text/50" placeholder='Postal Code' required />
              </div>
            </div>
          </div>
        </div>

        <div className="cols-span-4 lg:cols-span-1 grid md:grid-cols-1 rounded-xl gap-3">
          <div className="rounded-xl bg-BG flex flex-col items-center justify-center p-5">
            <h1 className="text-2xl font-bold self-start mb-5">Profile Image</h1>
            <label htmlFor="image1">
              {!image ? (
                // Render your icon if there's no uploaded image
                <SquareUserRound className="w-[375px] h-[375px] cursor-pointer rounded-xl text-Text" />
              ) : (
                // Otherwise, display the uploaded image preview
                <img
                  className="w-full rounded-2xl cursor-pointer"
                  src={URL.createObjectURL(image)}
                  alt="Uploaded"
                />
              )}
              <input
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
                id="image1"
                hidden
              />
            </label>
          </div>
          <button
            type="submit"
            className="rounded-xl bg-Button flex flex-col items-center justify-center p-5 text-3xl md:text-5xl lg:text-4xl xl:text-5xl text-BG active:bg-Button/75 hover:bg-Button/90"
          >
            Add Employee
          </button>
        </div>

      </form>
    </div>
  )
}

export default AddEmployee

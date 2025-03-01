import React, { useState, useEffect } from 'react';
import { assets } from "../assets/assets.js";
import axios from 'axios';
import { backendURL } from '../App';
import { toast } from 'react-toastify';
import { useParams,useNavigate } from "react-router-dom";

const EditEmployee = ({ token, role}) => {
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
  const navigate = useNavigate();
  const { staffId } = useParams();
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
  const [profilePic, setProfilePic] = useState('');

  const fetchEmployee = async () => {
    try {
      const response = await axios.post(backendURL + '/api/employee/singleStaff', { staffId });
  
      if (response.data.success) {
        const staff = response.data.staff;
        const addressParts = staff.address ? staff.address.split(', ') : ['', '', '', ''];
        
        setFirstname(staff.firstName || '');
        setLastname(staff.lastName || '');
        setEmail(staff.email || '');
        setPhone(staff.phone || '');
        setCountry(addressParts[2] || 'THA');
        setAddress(addressParts[0] || '');
        setCity(addressParts[1] || '');
        setPostalCode(addressParts[3] || '');
        setProfilePic(staff.profilePic || '');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  
  useEffect(() => {
    fetchEmployee();
  }, []);
  
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      const Fulladdress = `${address}, ${city}, ${country}, ${postalCode}`;

      formData.append('staffId', staffId);
      formData.append('firstName', firstname);
      formData.append('lastName', lastname);
      formData.append('email', email);
      if (password) formData.append('password', password);
      formData.append('phone', phone);
      formData.append('address', Fulladdress);
      
      image && formData.append('profilePic',image);

      const response = await axios.post(backendURL + '/api/employee/updateStaff',formData,{headers:{token}});

      if (response.data.success) {
        toast.success(response.data.message);
        navigate('/list_employee')
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
      <h1 className="text-2xl md:text-4xl font-bold self-start ml-1">Edit Employee</h1>

      <form onSubmit={onSubmitHandler} className="grid h-full w-full grid-cols-1 lg:grid-cols-4 gap-4 mt-4">
        <div className="cols-span-4 lg:col-span-3 grid rounded-xl gap-3">
          <div className="rounded-xl bg-BG flex flex-col items-center justify-center p-5">
            <h1 className="text-2xl font-bold self-start mb-5">Overview</h1>
            <div className="flex gap-4 w-full mb-4">
              <div className="w-full">
                <p className="mb-2">First Name</p>
                <input onChange={(e) => setFirstname(e.target.value)} value={firstname} type="text" className="w-full rounded-lg p-2 bg-Text/20" required />
              </div>
              <div className="w-full">
                <p className="mb-2">Last Name</p>
                <input onChange={(e) => setLastname(e.target.value)} value={lastname} type="text" className="w-full rounded-lg p-2 bg-Text/20" required />
              </div>
            </div>
            <div className="flex gap-4 w-full mb-4">
              <div className="w-full">
                <p className="mb-2">Email</p>
                <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className="w-full rounded-lg p-2 bg-Text/20" required />
              </div>
              <div className="w-full">
                <p className="mb-2">New Password (Optional)</p>
                <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" className="w-full rounded-lg p-2 bg-Text/20" placeholder="Leave blank to keep current password" />
              </div>
            </div>
            <div className="w-full mb-4">
              <p className="mb-2">Phone Number</p>
              <input onChange={(e) => setPhone(e.target.value)} value={phone} type="text" className="w-full rounded-lg p-2 bg-Text/20" required />
            </div>
          </div>

          <div className="rounded-xl bg-BG flex flex-col items-center justify-center p-5">
            <h1 className="text-2xl font-bold self-start mb-5">Address Information</h1>
            <div className="w-full mb-4">
              <p className="mb-2">Country</p>
              <select onChange={(e) => setCountry(e.target.value)} value={country} className="w-full rounded-lg p-2 bg-Text/20">
                <option value="THA">Thailand</option>
                <option value="USA">United States</option>
                <option value="UK">United Kingdom</option>
                <option value="Canada">Canada</option>
                <option value="Australia">Australia</option>
                <option value="Germany">Germany</option>
              </select>
            </div>
            <div className="w-full mb-4">
              <p className="mb-2">Address</p>
              <input onChange={(e) => setAddress(e.target.value)} value={address} type="text" className="w-full rounded-lg p-2 bg-Text/20" required />
            </div>
            <div className="flex gap-4 w-full mb-4">
              <div className="w-full">
                <p className="mb-2">City</p>
                <input onChange={(e) => setCity(e.target.value)} value={city} type="text" className="w-full rounded-lg p-2 bg-Text/20" required />
              </div>
              <div className="w-full">
                <p className="mb-2">Postal Code</p>
                <input onChange={(e) => setPostalCode(e.target.value)} value={postalCode} type="text" className="w-full rounded-lg p-2 bg-Text/20" required />
              </div>
            </div>
          </div>
        </div>

        <div className="cols-span-4 lg:cols-span-1 grid rounded-xl gap-3">
          <div className="rounded-xl bg-BG flex flex-col items-center justify-center p-5">
            <h1 className="text-2xl font-bold self-start mb-5">Profile Picture</h1>
            <label htmlFor="image1">
              <img className="w-full rounded-2xl cursor-pointer" src={image ? URL.createObjectURL(image) : profilePic || assets.upload} alt="" />
              <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image1" hidden />
            </label>
          </div>
          <button type="submit" className="rounded-xl bg-Button p-5 text-3xl text-BG hover:bg-Button/90">Update Employee</button>
        </div>
      </form>
    </div>
  );
};

export default EditEmployee;
import React,{useEffect,useState} from 'react'
import { UserPlus } from 'lucide-react'
import { toast } from 'react-toastify'
import { backendURL } from '../App'
import { Link } from 'react-router-dom'
import axios from 'axios'

import { Trash,Pencil  } from 'lucide-react';


const Employee = ({token,role}) => {
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

  const [employeeList, setEmployeeList] = useState([]);

  const removeEmployee = async (id) => {
    try{
      const response = await axios.post(backendURL + '/api/employee/removeStaff',{id},{headers:{token}});
      if(response.data.success){
        toast.success(response.data.message);
        await fetchEmployee();
      }else{
        toast.error(response.data.message);
      }
    }catch(error){
      console.log(error);
      toast.error(error.message);
    }
  }

  const fetchEmployee = async () => {
    try{
      const response = await axios.get(backendURL + '/api/employee/listStaff');
      if(response.data.success){
        setEmployeeList(response.data.staff);
      }
    }catch(error){
      toast.error("Failed to fetch employee list");
    }
  }

  useEffect(() => {
    fetchEmployee();
  },[])

  return (
    <div className="w-full flex flex-col items-center text-Text p-2 sm:p-8">
      <div className='flex flex-col sm:flex-row gap-4 items-center justify-between w-full'>
        <h1 className="text-2xl sm:text-4xl font-bold self-start ml-1">Employee</h1>
        <Link to="/add_employee" className='flex items-center justify-center self-start w-full sm:w-auto h-full p-4 gap-3 text-white hover:bg-green-400 bg-green-600 rounded-2xl '>
          <UserPlus/>
          <p>Add new</p>
        </Link>
      </div>
      <div className="w-full mt-4 rounded-xl bg-BG p-5">
        {/* Wrap the content inside a scrollable container */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="uppercase text-left text-Text border-b border-Text/10">
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Phone</th>
                <th className="py-3 px-4">Address</th>
                <th className="py-3 px-4">Action</th>
              </tr>
            </thead>

            {/* Employee List */}
            <tbody>
              {employeeList.map((employee, index) => (
                <tr
                  className="border-b border-Text/10 text-Text/80"
                  key={index}
                >
                  {/* Profile Pic & Name */}
                  <td className="py-3 px-4 min-w-52">
                    <div className="flex items-center gap-3">
                      <img
                        src={employee.profilePic}
                        alt="profile"
                        className="w-12 h-12 rounded-2xl"
                      />
                      <p>{employee.firstName} {employee.lastName}</p>
                    </div>
                  </td>

                  {/* Email */}
                  <td className="py-3 px-4">{employee.email}</td>

                  {/* Phone */}
                  <td className="py-3 px-4">{employee.phone}</td>

                  {/* Address */}
                  <td className="py-3 px-4 min-w-60">{employee.address}</td>

                  {/* Actions */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <Link to={`/edit_employee/${employee._id}`}>
                        <Pencil className="cursor-pointer" />
                      </Link>
                      <Trash
                        className="cursor-pointer"
                        onClick={() => removeEmployee(employee._id)}
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

export default Employee

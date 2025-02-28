import { RollerCoaster } from 'lucide-react'
import React from 'react'

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

  return (
    <div className="w-full flex flex-col items-center text-Text p-8">
      <h1 className="text-2xl md:text-4xl font-bold self-start ml-1">Employee</h1>



    </div>
  )
}

export default Employee

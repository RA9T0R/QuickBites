import React from 'react'

const Analytics = ({ role }) => {
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
    <div className="w-full flex flex-col items-center text-Text p-2 sm:p-8">
      <h1 className="text-2xl md:text-4xl font-bold self-start ml-1">Analytics</h1>
      {/* Container Bento Grid */}
      <div className="grid h-full w-full grid-cols-1 md:grid-cols-3 gap-4 mt-4"> 
        {/* 1 Section */}
        <div className="h-48 md:col-span-3 grid md:grid-cols-3 rounded-xl gap-3">
          <div className='rounded-xl bg-BG flex flex-col items-center justify-center'>
            <h2 className="text-lg">Orders</h2>
          </div>
          <div className='rounded-xl bg-BG flex items-center justify-center'>
            <h2 className="text-lg">Customer</h2>
          </div>
          <div className='rounded-xl bg-BG flex items-center justify-center'>
            <h2 className="text-lg">Menu</h2>
          </div> 
        </div>

        {/* 2 Section */}
        <div className="h-96 md:col-span-3 md:row-span-2 grid md:grid-cols-3 rounded-xl gap-3">
          <div className='md:col-span-2 rounded-xl bg-BG flex items-center justify-center'>
            <h2 className="text-lg">Sales Figures</h2>
          </div>
          <div className='md:col-span-1 rounded-xl bg-BG flex items-center justify-center'>
            <h2 className="text-lg">Popular Food</h2>
          </div>
        </div>


      </div>
    </div>
  )
}

export default Analytics

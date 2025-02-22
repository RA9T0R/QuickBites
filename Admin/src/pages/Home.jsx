import React from 'react';

const Home = () => {
  return (
    <div className="w-full flex flex-col items-center text-Text p-8">
      <h1 className="text-2xl md:text-4xl font-bold self-start ml-1">Home Pages</h1>

      {/* Container Bento Grid */}
      <div className="grid h-full w-full grid-cols-1 md:grid-cols-3 gap-4 mt-4"> 
        {/* 1 Section */}
        <div className="md:col-span-3 grid md:grid-cols-4 rounded-xl gap-3">
          <div className='rounded-xl bg-BG flex flex-col items-center justify-center'>
            <h2 className="text-lg">Orders</h2>
          </div>
          <div className='rounded-xl bg-BG flex items-center justify-center'>
            <h2 className="text-lg">Customer</h2>
          </div>
          <div className='rounded-xl bg-BG flex items-center justify-center'>
            <h2 className="text-lg">Menu</h2>
          </div> 
          <div className='rounded-xl bg-BG flex items-center justify-center'>
            <h2 className="text-lg">Income</h2>
          </div> 
        </div>

        {/* 2 Section */}
        <div className="md:col-span-3 md:row-span-2 grid md:grid-cols-3 rounded-xl gap-3">
          <div className='md:col-span-2 rounded-xl bg-BG flex items-center justify-center'>
            <h2 className="text-lg">Sales Figures</h2>
          </div>
          <div className='md:col-span-1 rounded-xl bg-BG flex items-center justify-center'>
            <h2 className="text-lg">Popular Food</h2>
          </div>
        </div>

        {/* 3 Section */}
        <div className="md:col-span-3 md:row-span-2 grid md:grid-cols-3 rounded-xl gap-3 ">
          <div className='md:col-span-1 rounded-xl bg-BG flex items-center justify-center'>
            <h2 className="text-lg">Daily Target Income</h2>
          </div>
          <div className='md:col-span-2 rounded-xl bg-BG flex items-center justify-center'>
            <h2 className="text-lg">Most Favourite Items</h2>
          </div>
        </div>

        {/* 4 Section */}
        <div className="md:col-span-3 md:row-span-3 grid md:grid-cols-3 rounded-xl gap-3">
          <div className='md:col-span-2 rounded-xl bg-BG flex items-center justify-center'>
            <h2 className="text-lg">Recent Order Request</h2>
          </div>
          <div className='md:col-span-1 rounded-xl bg-BG flex items-center justify-center'>
            <h2 className="text-lg">Daily Trending Menus</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

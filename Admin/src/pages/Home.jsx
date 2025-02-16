import React from 'react';

const Home = () => {
  return (
    <div className='h-screen w-full flex items-center justify-center text-Text'>
      <div className="grid h-full w-full grid-cols-1 md:grid-cols-12 md:grid-rows-16 gap-4 p-8"> 
        <div className='cols-span-1 md:col-span-3 md:row-span-2 bg-BG rounded-xl flex items-center justify-center'>
          <h2 className="text-lg">Orders</h2>
        </div>
        <div className='cols-span-1 md:col-span-3 md:row-span-2 bg-BG rounded-xl flex items-center justify-center'>
          <h2 className="text-lg">Customer</h2>
        </div>
        <div className='cols-span-1 md:col-span-3 md:row-span-2 bg-BG rounded-xl flex items-center justify-center'>
          <h2 className="text-lg">Menu</h2>
        </div>
        <div className='cols-span-1 md:col-span-3 md:row-span-2 bg-BG rounded-xl flex items-center justify-center'>
          <h2 className="text-lg">Income</h2>
        </div>
        <div className='cols-span-1 md:col-span-8 md:row-span-4 bg-BG rounded-xl flex items-center justify-center'>
          <h2 className="text-lg">Sales Figures</h2>
        </div>
        <div className='cols-span-1 md:col-span-4 md:row-span-4 bg-BG rounded-xl flex items-center justify-center'>
          <h2 className="text-lg">Popular Food</h2>
        </div>
        <div className='cols-span-1 md:col-span-4 md:row-span-4 bg-BG rounded-xl flex items-center justify-center'>
          <h2 className="text-lg">Daily Target Income</h2>
        </div>
        <div className='cols-span-1 md:col-span-8 md:row-span-4 bg-BG rounded-xl flex items-center justify-center'>
          <h2 className="text-lg">Most Favourite Items</h2>
        </div>
        <div className='cols-span-1 md:col-span-8 md:row-span-5 bg-BG rounded-xl flex items-center justify-center'>
          <h2 className="text-lg">Recent Order Request</h2>
        </div>
        <div className='cols-span-1 md:col-span-4 md:row-span-5 bg-BG rounded-xl flex items-center justify-center'>
          <h2 className="text-lg">Daily Trending Menus</h2>
        </div>
      </div>
    </div>
  );
};

export default Home;

import React from 'react';

const Home = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center text-Text p-8">
      <h1 className="text-3xl md:text-4xl font-bold self-start ml-1">Home Pages</h1>

      <div className="grid h-full w-full grid-cols-1 md:grid-cols-12 md:grid-rows-16 gap-4 mt-4"> 
        <div className="col-span-1 md:col-span-3 md:row-span-2 bg-BG rounded-xl flex items-center justify-center">
          <h2 className="text-lg">Orders</h2>
        </div>
        <div className="col-span-1 md:col-span-3 md:row-span-2 bg-BG rounded-xl flex items-center justify-center">
          <h2 className="text-lg">Customer</h2>
        </div>
        <div className="col-span-1 md:col-span-3 md:row-span-2 bg-BG rounded-xl flex items-center justify-center">
          <h2 className="text-lg">Menu</h2>
        </div>
        <div className="col-span-1 md:col-span-3 md:row-span-2 bg-BG rounded-xl flex items-center justify-center">
          <h2 className="text-lg">Income</h2>
        </div>
        <div className="col-span-1 md:col-span-8 md:row-span-4 bg-BG rounded-xl flex items-center justify-center">
          <h2 className="text-lg">Sales Figures</h2>
        </div>
        <div className="col-span-1 md:col-span-4 md:row-span-4 bg-BG rounded-xl flex items-center justify-center">
          <h2 className="text-lg">Popular Food</h2>
        </div>
        <div className="col-span-1 md:col-span-4 md:row-span-4 bg-BG rounded-xl flex items-center justify-center">
          <h2 className="text-lg">Daily Target Income</h2>
        </div>
        <div className="col-span-1 md:col-span-8 md:row-span-4 bg-BG rounded-xl flex items-center justify-center">
          <h2 className="text-lg">Most Favourite Items</h2>
        </div>
        <div className="col-span-1 md:col-span-8 md:row-span-5 bg-BG rounded-xl flex items-center justify-center">
          <h2 className="text-lg">Recent Order Request</h2>
        </div>
        <div className="col-span-1 md:col-span-4 md:row-span-5 bg-BG rounded-xl flex items-center justify-center">
          <h2 className="text-lg">Daily Trending Menus</h2>
        </div>
      </div>
    </div>
  );
};

export default Home;

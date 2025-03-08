import React, { useEffect, useState,useContext } from "react";
import {DashboardContext} from '../context/DashboardContext'
import { format } from "date-fns";
import { Inbox, ContactRound, Wallet,CookingPot  } from "lucide-react";
import { Link } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Home = () => {
  const {amountMenu,totalOrders,totalCustomers,totalIncome,popularFood,analyticsData,orders} = useContext(DashboardContext);
  
  return (
    <div className="w-full flex flex-col items-center text-Text p-2 sm:p-8">
      <h1 className="text-2xl md:text-4xl font-bold self-start ml-1">
        Home Pages
      </h1>

      {/* Container Bento Grid */}
      <div className="grid h-full w-full grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
        {/* 1 Section */}
        <div className="lg:col-span-3 grid md:grid-cols-2 xl:grid-cols-4 rounded-xl gap-3">
          <div className="rounded-xl bg-BG flex justify-between px-4 2xl:px-10 py-5">
            <div className="flex flex-col gap-3 lg:gap-7">
              <h2 className="text-lg sm:text-2xl">Orders</h2>
              <p className="text-xl sm:text-2xl 2xl:text-4xl font-bold">{totalOrders}</p>
            </div>
            <div className="flex items-center justify-center">
              <Inbox className="size-14 sm:size-16 2xl:size-24" />
            </div>
          </div>
          <div className="rounded-xl bg-BG flex justify-between px-4 2xl:px-7 py-5 ">
            <div className="flex flex-col gap-3 lg:gap-7">
              <h2 className="text-lg sm:text-2xl">Customers</h2>
              <p className="text-xl sm:text-2xl 2xl:text-4xl font-bold">{totalCustomers}</p>
            </div>
            <div className="flex items-center justify-center">
              <ContactRound className="size-14 sm:size-16 2xl:size-24" />
            </div>
          </div>
          <div className="rounded-xl bg-BG flex justify-between px-4 2xl:px-7 py-5 ">
            <div className="flex flex-col gap-3 lg:gap-7">
              <h2 className="text-lg sm:text-2xl">Menu</h2>
              <p className="text-xl sm:text-2xl 2xl:text-4xl font-bold">{amountMenu}</p>
            </div>
            <div className="flex items-center justify-center">
              <CookingPot className="size-14 sm:size-16 2xl:size-24" />
            </div>
          </div>
          <div className="rounded-xl bg-BG flex justify-between px-4 2xl:px-7 py-5">
            <div className="flex flex-col gap-3 lg:gap-7">
              <h2 className="text-lg sm:text-2xl whitespace-nowrap">Total Income</h2>
              <p className="text-xl sm:text-2xl 2xl:text-4xl font-bold">฿ {totalIncome.toFixed(2)}</p>
            </div>
            <div className="flex items-center justify-center">
              <Wallet className="size-14 sm:size-16 2xl:size-24" />
            </div>
          </div>
        </div>

        {/* 2 Section */}
        <div className="lg:col-span-3 lg:row-span-2 grid xl:grid-cols-3 rounded-xl gap-3">
          <div className="min-h-96 xl:col-span-2 rounded-xl bg-BG flex flex-col p-4">
            <h2 className="text-lg sm:text-3xl px-4 2xl:px-10 py-5">Sales Figures</h2>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analyticsData} margin={{ top: 20, right: 40, bottom: 20 }}>
                <defs>
                  <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                  </linearGradient>
                </defs>
                
                <CartesianGrid strokeDasharray="2 2" strokeOpacity={0.5} />
                <XAxis 
                  dataKey="date"
                  tickFormatter={(date) => format(new Date(date), "d - MMM : HH:mm")}
                  tick={{ fontSize: 12, fill: "#888" }} 
                  tickMargin={10} 
                  angle={-15} 
                  dy={5} 
                />
                <YAxis tick={{ fontSize: 12, fill: "#888" }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#000", borderRadius: 10 }}
                  labelFormatter={(label) => format(new Date(label), "d - MMM : HH:mm")}
                />
                
                <Line 
                  type="natural" 
                  dataKey="totalIncome" 
                  stroke="#4f46e5" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: "#4f46e5" }} 
                  activeDot={{ r: 6, fill: "#4f46e5", stroke: "#fff", strokeWidth: 2 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="lg:col-span-1 rounded-xl bg-BG flex flex-col px-10 py-5">
            <div className="flex justify-between items-center mb-5 gap-2">
              <h1 className="text-lg sm:text-3xl">Popular Food</h1>
              <Link to="/view_menu" className="flex items-center justify-center self-start w-auto h-full p-4 py-2 gap-3 hover:border border-Text bg-Text/20 rounded-2xl whitespace-nowrap">
                <p>View all</p>
              </Link>
            </div>
            <ul className="flex flex-col gap-3">
              {popularFood.map((food) => (
                <div key={food.name} className="flex items-center gap-5">
                  <img className="w-28 rounded-xl" src={food.image} alt={food.name} />
                  <div>
                    <p className="font-bold">{food.name}</p>
                    <p className="font-thin">Sold : {food.quantitySold}</p>
                  </div>
                </div>
              ))}
            </ul>
          </div>
        </div>

        {/* 4 Section */}
        <div className="lg:col-span-3 lg:row-span-3 grid lg:grid-cols-3 rounded-xl gap-3">
          <div className="lg:col-span-3 rounded-xl bg-BG flex items-center justify-center">
            <div className="rounded-xl bg-BG flex flex-col justify-between px-4 2xl:px-10 py-5 w-full">
              <div className="flex justify-between items-center mb-5 gap-2">
                <h1 className="text-lg sm:text-3xl">Recent Order Request</h1>
                <Link to="/order" className="flex items-center justify-center self-start w-auto h-full p-4 py-2 gap-3 hover:border border-Text bg-Text/20 rounded-2xl whitespace-nowrap">
                  <p>View all</p>
                </Link>
              </div>
              <div className="flex flex-col items-center justify-center">
                {orders
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  .slice(0, 5) 
                  .map((order) => (
                    <div key={order._id} className="flex flex-col bg-BG p-4 border-b w-full">
                      <div className="flex gap-4 mb-2 items-center">
                        <h3 className="text-xl lg:text-3xl font-bold">Table : {order.tableNumber}</h3>
                        <p className="text-Text">{order.status}</p>
                        <p className="text-Text">Time : {format(new Date(order.createdAt), "HH:mm")}</p>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {order.products.map((product) => (
                          <div className="shadow-lg shadow-Text/20 text-Text mt-4 rounded-3xl">
                            <div className="relative rounded-t-3xl overflow-hidden">
                              <img src={product.image[0]} alt="" className="w-full transition-all ease-in-out" />
                              <div className="absolute top-2 right-2 w-10 h-10 sm:w-12 sm:h-12 bg-BG rounded-full border shadow-lg flex items-center justify-center">
                                <p className="text-xl font-black text-Text">{product.quantity}</p>
                              </div>
                            </div>
                            <div className="p-2 gap-3 text-base flex flex-col items-center justify-center sm:text-lg">
                              <p className="pb-2 font-semibold text-center">{product.name}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          {/* <div className="lg:col-span-1 rounded-xl bg-BG flex items-center justify-center">
            <h2 className="text-lg">Daily Trending Menus</h2>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Home;

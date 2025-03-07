import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { backendURL } from "../App";
import axios from "axios";
import { format } from 'date-fns';
import { Inbox ,ContactRound,Wallet   } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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

  const [analyticsData, setAnalyticsData] = useState([]);

  const fecthAnalytics = async () =>{
    try {
      const response = await axios.get(backendURL + '/api/analytics/get');
      if (response.data.success) {
        console.log(response.data.sales)
        setAnalyticsData(response.data.sales);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating order status");
    }
  }

  useEffect(() => {
    fecthAnalytics()
  },[]);

  if (analyticsData.length === 0) {
    return <div>Loading...</div>;
  }

  const totalOrders = analyticsData.reduce((sum, entry) => sum + entry.orderAmount, 0);
  const totalCustomers = analyticsData.reduce((sum, entry) => sum + entry.customerAmount, 0);
  const totalIncome = analyticsData.reduce((sum, entry) => sum + entry.totalIncome, 0);

  const foodSales = {};

  analyticsData.forEach(entry => {
    entry.OrderFood.forEach(food => {
      if (!foodSales[food.name]) {
        foodSales[food.name] = {
          quantitySold: food.quantitySold,
          image: food.image[0] // Use only the first image
        };
      } else {
        foodSales[food.name].quantitySold += food.quantitySold;
      }
    });
  });
  
  const popularFood = Object.entries(foodSales)
    .sort((a, b) => b[1].quantitySold - a[1].quantitySold)
    .slice(0, 5)
    .map(([name, { quantitySold, image }]) => ({ name, quantitySold, image }));
  
  console.log(popularFood);
  
  
  return (
    <div className="w-full flex flex-col items-center text-Text p-2 sm:px-8">
      <h1 className="text-2xl md:text-4xl font-bold self-start ml-1">Analytics</h1>

      {/* Container Grid */}
      <div className="grid h-full w-full grid-cols-1 lg:grid-cols-3 gap-4 mt-4"> 
        {/* Summary Cards */}
        <div className="lg:col-span-3 grid lg:grid-cols-3 rounded-xl gap-3">
          <div className="rounded-xl bg-BG flex justify-between px-4 2xl:px-10 py-5 ">
            <div className="flex flex-col gap-3 md:gap-7">
              <h2 className="text-lg sm:text-3xl">Orders</h2>
              <p className="text-2xl sm:text-3xl 2xl:text-5xl font-bold">{totalOrders}</p>
            </div>
            <div className="flex items-center justify-center">
              <Inbox className="size-16 sm:size-20 2xl:size-36"/>
            </div>
          </div>
          <div className="rounded-xl bg-BG flex justify-between px-4 2xl:px-10 py-5 ">
            <div className="flex flex-col gap-3 md:gap-7">
              <h2 className="text-lg sm:text-3xl">Customers</h2>
              <p className="text-2xl sm:text-3xl 2xl:text-5xl font-bold">{totalCustomers}</p>
            </div>
            <div className="flex items-center justify-center">
              <ContactRound className="size-16 sm:size-20 2xl:size-36"/>
            </div>
          </div>
          <div className="rounded-xl bg-BG flex justify-between px-4 2xl:px-10 py-5 ">
            <div className="flex flex-col gap-3 md:gap-7">
              <h2 className="text-lg sm:text-3xl whitespace-nowrap">Total Income</h2>
              <p className="text-2xl sm:text-3xl 2xl:text-5xl font-bold">$ {totalIncome.toFixed(2)}</p>
            </div>
            <div className="flex items-center justify-center">
              <Wallet className="size-16 sm:size-20 2xl:size-36"/>
            </div>
          </div>
        </div>

        {/* Sales Graph & Popular Food */}
        <div className=" lg:col-span-3 lg:row-span-2 grid lg:grid-cols-3 rounded-xl gap-3">
          {/* Sales Figures Graph */}
          <div className="min-h-96 lg:col-span-2 rounded-xl bg-BG flex flex-col p-4">
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

          {/* Popular Food List */} 
          <div className="md:col-span-1 rounded-xl bg-BG flex flex-col px-10 py-5">
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
      </div>
    </div>
  )
}

export default Analytics

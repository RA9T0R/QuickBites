import React, { useEffect, useState,useContext } from "react";
import {DashboardContext} from '../context/DashboardContext'
import { format } from 'date-fns';
import { Inbox ,ContactRound,Wallet   } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,  PieChart,Pie,Cell} from 'recharts';


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
  
  const {totalOrders,totalCustomers,totalIncome,popularFood,analyticsData,dateRange,setDateRange,latestFood} = useContext(DashboardContext);
  const [targetIncome, setTargetIncome] = useState(() => {
    const savedIncome = localStorage.getItem('targetIncome');
    return savedIncome ? parseFloat(savedIncome) : 10000;
  });

  useEffect(() => {
    localStorage.setItem('targetIncome', targetIncome);
  }, [targetIncome]);

  const targetPercentage = (totalIncome / targetIncome) * 100;
  const pieData = [
    { name: "Income Achieved", value: totalIncome },
    { name: "Remaining Income", value: targetIncome - totalIncome }
  ];
  return (
    <div className="w-full flex flex-col items-center text-Text p-2 sm:px-8">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between w-full">
        <h1 className="text-2xl md:text-4xl font-bold self-start ml-1">Analytics</h1>
        <div className="flex gap-5">
          <input
            type="number"
            value={targetIncome}
            onChange={(e) => setTargetIncome(parseFloat(e.target.value))}
            className="border-2 p-2 rounded-md bg-BG text-Text"
            placeholder="Set Target Income"
            min="0"
          />

          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="border-2 p-2 rounded-md bg-BG text-Text"
          >
            <option value="daily" >Daily</option>
            <option value="monthly" >Monthly</option>
            <option value="yearly" >Yearly</option>
          </select>
        </div>
      </div>

      {/* Container Grid */}
      <div className="grid h-full w-full grid-cols-1 lg:grid-cols-3 gap-4 mt-4"> 
        {/* Summary Cards */}
        <div className="lg:col-span-3 grid lg:grid-cols-3 rounded-xl gap-3">
          <div className="rounded-xl bg-BG flex justify-between px-4 2xl:px-10 py-5 ">
            <div className="flex flex-col gap-3 md:gap-7">
              <h2 className="text-lg md:text-2xl lg:text-3xl">Orders</h2>
              <p className="text-2xl md:text-2xl lg:text-3xl 2xl:text-5xl font-bold">{totalOrders}</p>
            </div>
            <div className="flex items-center justify-center">
              <Inbox className="size-16 sm:size-20 2xl:size-36"/>
            </div>
          </div>
          <div className="rounded-xl bg-BG flex justify-between px-4 2xl:px-10 py-5 ">
            <div className="flex flex-col gap-3 md:gap-7">
              <h2 className="text-lg md:text-2xl lg:text-3xl">Customers</h2>
              <p className="text-2xl md:text-2xl lg:text-3xl 2xl:text-5xl font-bold">{totalCustomers}</p>
            </div>
            <div className="flex items-center justify-center">
              <ContactRound className="size-16 sm:size-20 2xl:size-36"/>
            </div>
          </div>
          <div className="rounded-xl bg-BG flex justify-between px-4 2xl:px-10 py-5 ">
            <div className="flex flex-col gap-3 md:gap-7">
              <h2 className="text-lg md:text-2xl lg:text-3xl whitespace-nowrap">Total Income</h2>
              <p className="text-2xl md:text-2xl lg:text-3xl 2xl:text-5xl font-bold">฿ {totalIncome.toFixed(2)}</p>
            </div>
            <div className="flex items-center justify-center">
              <Wallet className="size-16 sm:size-20 2xl:size-36"/>
            </div>
          </div>
        </div>

        {/* Sales Graph & Popular Food */}
        <div className="lg:col-span-3 lg:row-span-2 grid xl:grid-cols-3 rounded-xl gap-3">
          {/* Sales Figures Graph */}
          <div className="min-h-96 xl:col-span-2 rounded-xl bg-BG flex flex-col p-4">
            <h2 className="text-lg sm:text-3xl px-4 2xl:px-10 py-5">Sales Figures</h2>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analyticsData} margin={{ top: 20, right: 40, bottom: 20 }}>
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
                <Bar 
                  dataKey="totalIncome" 
                  fill="#4f46e5" 
                  radius={[10, 10, 0, 0]} 
                />
              </BarChart>
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
        
        {/* 3 Section */}
        <div className="lg:col-span-3 lg:row-span-2 grid lg:grid-cols-3 rounded-xl gap-3 ">
          <div className="lg:col-span-1 rounded-xl bg-BG flex flex-col items-center justify-center p-5">
            <h2 className="text-lg sm:text-3xl self-start ml-5 mb-2">Target Income</h2>
            <ResponsiveContainer width="100%" height='100%'>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius="80%"
                  fill="#4f46e5"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? "#4f46e5" : "#e5e5e5"} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-col items-center">
              <p className="text-2xl">฿ {totalIncome.toFixed(2)}</p>
              <p className="text-md text-Text/50">{targetPercentage.toFixed(2)}% of Target Achieved</p>
            </div>
          </div>

          <div className="lg:col-span-1 rounded-xl bg-BG flex flex-col items-center justify-center p-5">
            <h2 className="text-lg sm:text-3xl self-start ml-5 mb-2">Average Order Value</h2>
            <div className="flex flex-col items-center justify-center h-full sm:gap-5 ">
              <p className="text-xl sm:text-3xl font-bold">฿ {totalIncome} / {totalOrders}</p>
              <p className="text-3xl sm:text-6xl  font-bold">฿ {(totalIncome / totalOrders).toFixed(2)}</p>
            </div>
          </div>


          <div className="lg:col-span-1 rounded-xl bg-BG flex flex-col items-center justify-center p-5">
            <h2 className="text-lg sm:text-3xl self-start ml-5">The latest new menu</h2>
            <div className="flex flex-col items-center justify-center h-full gap-5 mt-5">
              {latestFood ? (
                <div className="flex flex-col items-center justify-center h-full gap-5">
                  <div className="text-xl font-bold">{latestFood.name}</div>
                  <p className="text-md text-Text/50">{latestFood.description}</p>
                  <img
                    src={latestFood.image[0]}
                    alt={latestFood.name}
                    className="rounded-xl"
                  />
                </div>
              ) : (
                <p className="text-lg text-Text/50">No menu available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics

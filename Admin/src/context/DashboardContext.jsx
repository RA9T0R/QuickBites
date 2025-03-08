import { createContext, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from "react-toastify";
import axios from "axios";
import { backendURL } from "../App";

export const DashboardContext = createContext(null);

const DashboardContextProvider = (props) => {

  const dateRange = 'monthly';
  const [amountMenu , setAmountMenu] = useState(0);
  const [analyticsData, setAnalyticsData] = useState([]);
  const [foodList, setFoodList] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [orders,setOrders] = useState([]);
  

  const fecthAnalytics = async () => {
    try {
      const response = await axios.get(backendURL + "/api/analytics/get" , {
        params: { dateRange }
      });
  
      if (response.data.success) {
        setAnalyticsData(response.data.sales);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating order status");
    }
  };

  const fetchFood = async () => {
    try {
      const response = await axios.get(backendURL + '/api/product/list');
      if (response.data.success) {
        setAmountMenu(response.data.product.length)
        const sortedFood = response.data.product.sort((a, b) => a.category.localeCompare(b.category));
        setFoodList(sortedFood);
      }
    } catch (error) {
      toast.error("Failed to fetch food list");
    }
  };

  const fetchEmployee = async () => {
    try {
      const response = await axios.get(backendURL + "/api/employee/listStaff");
      if (response.data.success) {
        setEmployeeList(response.data.staff);
      }
    } catch (error) {
      toast.error("Failed to fetch employee list");
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get(backendURL + `/api/order/list`);
      if (response.data.success) {
        toast.success(response.data.message);
        setOrders(response.data.order);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchFood();
    fetchOrders();
    fetchEmployee();
    fecthAnalytics();
  }, []);

  const totalOrders = analyticsData.reduce((sum, entry) => sum + entry.orderAmount,0);
  const totalCustomers = analyticsData.reduce((sum, entry) => sum + entry.customerAmount,0);
  const totalIncome = analyticsData.reduce((sum, entry) => sum + entry.totalIncome,0);

  const foodSales = {};

  analyticsData.forEach((entry) => {
    entry.OrderFood.forEach((food) => {
      if (!foodSales[food.name]) {
        foodSales[food.name] = {
          quantitySold: food.quantitySold,
          image: food.image[0],
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


  const contextValue = {
    amountMenu,setAmountMenu,
    analyticsData,setAnalyticsData,foodList,
    totalOrders,totalCustomers,totalIncome,popularFood,
    employeeList,orders,fetchOrders,fecthAnalytics
  };

  return (
    <DashboardContext.Provider value={contextValue}>
      {props.children}
    </DashboardContext.Provider>
  );
};

export default DashboardContextProvider;

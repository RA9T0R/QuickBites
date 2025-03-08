import React, { useEffect, useState,useContext } from "react";
import { toast } from "react-toastify";
import {DashboardContext} from '../context/DashboardContext'
import { backendURL } from "../App";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { SkipBack, ChevronDown, ChevronUp,Eraser } from "lucide-react";
import moment from "moment";

const Table = () => {
  const {fetchOrders,fecthAnalytics} = useContext(DashboardContext);
  const { tableNumber } = useParams();
  const [orders, setOrders] = useState([]);
  const [expandedRows, setExpandedRows] = useState({});
  const [totalPrice,setTotalPrice] = useState(0);

  const toggleRow = (index) => {
    setExpandedRows((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleStatusChange = async (index, newStatus, orderId) => {
    try {
      const response = await axios.post(backendURL + `/api/order/update`, {
        id: orderId,
        status: newStatus,
      });

      if (response.data.success) {
        toast.success("Order status updated successfully");
        setOrders((prevOrders) =>
          prevOrders.map((order, i) =>
            i === index ? { ...order, status: newStatus } : order
          )
        );
        fetchOrders();
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating order status");
    }
  };

  const fetchOrder = async () => {
    try {
      const response = await axios.get(
        backendURL + `/api/order/list/${tableNumber}`
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setOrders(response.data.orders);

        const total = response.data.orders.reduce((sum, order) => {
          if (order.products && Array.isArray(order.products)) {
            return sum + order.products.reduce((productSum, product) => {
              if (product && product.hasOwnProperty('price')) {
                return productSum + (product.price * product.quantity);
              }
              return productSum;
            }, 0);
          }
          return sum;
        }, 0);

        setTotalPrice(total);  
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleClearOrder = async () =>{
    if (orders.length === 0) {
      toast.info("There are no orders to clear.");
      return;
    }
    const products = orders.reduce((acc, order) => {
      return acc.concat(order.products); 
    }, []);
    try {
      const response = await axios.post(backendURL + '/api/analytics/add',{products : products})
      if(response.data.success){
        toast.success(response.data.message);
        setOrders([]);
        setTotalPrice(0);
        await axios.post(backendURL + `/api/order/remove`,{ tableNumber: tableNumber })
        fecthAnalytics();
        fetchOrders();
      }else{
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    fetchOrder();
  }, [tableNumber]);
  
  return (
    <div className="w-full flex flex-col items-center text-Text p-2 sm:p-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-4">
        <div className="flex gap-3 md:gap-6">
          <Link
            to="/order"
            className="flex items-center text-Text hover:text-Highlight"
          >
            <SkipBack className="size-8 md:size-10" />
          </Link>
          <h1 className="text-2xl md:text-4xl font-bold ml-1">
            Table {tableNumber}
          </h1>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 md:gap-6 items-center max-sm:w-full ">
          <h1 className="text-2xl md:text-4xl font-bold ml-1">
            Total Price : {totalPrice} ฿
          </h1>
          <button
            onClick={() => handleClearOrder()}
            className="flex items-center justify-center self-start w-full sm:w-auto h-full p-4 gap-3 text-white hover:bg-red-400 bg-red-600 rounded-2xl "
          >
            <Eraser />
            <p>Clear Order</p>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="w-full mt-5 rounded-xl bg-BG p-5 ">
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="uppercase text-left text-Text border-b border-Text/10">
                <th className="py-3 px-4">No.</th>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Total Price</th>
                <th className="py-3 px-4">Time</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Show Detail</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order, index) => (
                <React.Fragment key={index}>
                  <tr className="border-b border-Text/10 text-Text/80">
                    <td className="py-3 px-4">{index + 1}</td>
                    <td className="py-3 px-4">{order.userID}</td>
                    <td className="py-3 px-4 truncate max-w-xs">
                      {order.products.reduce((acc, product) => acc + product.totalPrice, 0)}
                    </td>
                    <td className="py-3 px-4">
                      {moment(order.createdAt).format("HH:mm:ss")}
                    </td>
                    <td className="py-3 px-4">
                      {order.products.reduce((acc, product) => acc + product.quantity, 0)}
                    </td>
                    <td className="py-3 px-4">
                      <select
                        className="border rounded-lg p-2 bg-BG"
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(index, e.target.value, order._id)
                        }
                      >
                        <option value="Ordering">Ordering</option>
                        <option value="Cooking">Cooking</option>
                        <option value="Serving">Serving</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </td>
                    <td className="py-3 px-4">
                      <button
                        className="border rounded-lg"
                        onClick={() => toggleRow(index)}
                      >
                        {expandedRows[index] ? (
                          <ChevronUp className="size-8 text-red-600" />
                        ) : (
                          <ChevronDown className="size-8 text-green-600" />
                        )}
                      </button>
                    </td>
                  </tr>
                  {expandedRows[index] && (
                    <tr className="bg-Text/5">
                      <td colSpan={7} className="py-3 px-4 text-Text">
                        <table className="table-auto w-full rounded-xl">
                          <thead>
                            <tr className="border-b">
                              <th className="px-4 py-2">Images</th>
                              <th className="px-4 py-2">Product Name</th>
                              <th className="px-4 py-2">Price</th>
                              <th className="px-4 py-2">Quantity</th>
                              <th className="px-4 py-2">Requirement</th>
                              <th className="px-4 py-2">Sum Price</th>
                            </tr>
                          </thead>
                          <tbody>
                            {order.products.map((product, productIndex) => (
                              <tr key={productIndex} className="text-2xl border-b">
                                <td className="px-4 py-2 flex justify-center border-r">
                                  <img
                                    src={product.image[0]}
                                    alt={product.name}
                                    className="w-20 h-20 object-cover mt-2 rounded-xl"
                                  />
                                </td>
                                <td className="px-4 py-2 border-r">{product.name}</td>
                                <td className="px-4 py-2 text-center border-r">฿{product.price}</td>
                                <td className="px-4 py-2 text-center border-r">{product.quantity}</td>
                                <td className="px-4 py-2 w-1/3 border-r">{product.requirement || "No special requirement"}</td>
                                <td className="px-4 py-2 border-r">฿{product.totalPrice}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Table;

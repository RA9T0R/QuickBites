import React, { useContext,useEffect, useState } from 'react';
import axios from 'axios';
import { StoreContext } from '../context/StoreContext';
import { toast } from 'react-toastify'; 
import { Link } from 'react-router-dom'; 
import { X } from 'lucide-react';
import { assets } from '../assets/assets';

import AOS from 'aos';
import 'aos/dist/aos.css';

const OrderSummary = () => {
  const {currency,setTotalFoodCount,totalFoodCount, clearOrders,backendURL,tableNumber } = useContext(StoreContext);
  const [orderData, setOrderData] = useState([]);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  const calculateTotalPrice = () => {
    return orderData.reduce((total, order) => {
      return total + order.products.reduce((itemTotal, item) => itemTotal + item.totalPrice, 0);
    }, 0);
  };

  const handleCheckBill = async () => {
    clearOrders();
    const totalAmount = calculateTotalPrice().toFixed(2);
    toast.info(`Bill checked! Grand Total: ${currency} ${totalAmount} | Total Food: ${totalFoodCount}`, {
      position: "top-right", 
      autoClose: 5000, 
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get(backendURL + `/api/order/list/${tableNumber}`);
      if (response.data.success) {
        setOrderData(response.data.orders); 
        setTotalFoodCount(response.data.totalFoodCount)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  

  useEffect(() => {
    AOS.init();
  },[]);
  useEffect(() => { 
    fetchOrders();
  },[tableNumber]);

  return (
    <div className="p-6 mt-5 bg-BG shadow-xl shadow-Text/20 border-t rounded-lg relative pb-20 md:pb-28">
      <div className="w-full font-bold sm:font-semibold text-2xl sm:text-5xl text-start sm:text-center mb-3 text-Text">
        <h1><b>Order</b> Summary</h1>
      </div>
      {orderData.length === 0 ? (
        <div className='flex items-center justify-center mt-10 text-2xl text-Text/50 font-light'>
          <p>No orders placed yet.</p>
        </div>
      ) : (
        <div>
          {orderData.map((order, index) => (
            <div key={index} className="mb-4 border-b pb-4 text-Text">
              <h3 className="font-medium text-lg">Order #{index + 1}</h3>
              <ul className="mt-2">
                {order.products.map((item, idx) => {
                  return (
                    <li data-aos="fade-up"  key={idx} className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-2 md:pr-20">
                      <div className="flex items-center justify-center">
                        <img src={item.image[0]} alt={item.name} className="w-32 sm:w-44 object-cover mr-4 rounded-lg" />
                        <div className='flex flex-col gap-2'>
                          <span className='text-md md:text-lg md:w-full lg:text-2xl'>{item.name} (x{item.quantity})</span>
                          <span className={`w-24 sm:w-28 md:w-36 text-md md:text-lg lg:text-2xl text-center select-none badge-${order.status.toLowerCase()}`}>{order.status}</span>
                          <p className="text-md md:text-lg lg:text-xl truncate max-w-44 sm:max-w-60 md:max-w-80 lg:max-w-96">
                            <b>Additional  </b> : {item.requirement ? item.requirement : 'No Req'}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center mt-2 sm:justify-end max-md:w-[25%] whitespace-nowrap">
                        <p className='text-md md:text-lg lg:text-2xl'>{currency} {item.totalPrice.toFixed(2)}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-2 text-md md:text-2xl font-medium">
                <strong>Total: {currency}
                  {order.products.reduce((total, item) => total + item.totalPrice, 0).toFixed(2)}
                </strong>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Grand Total section at the bottom */}
      {totalFoodCount > 0 && (
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full p-5 pb-8 md:p-10 bg-BG shadow-xl shadow-Text/20 rounded-lg z-50">
          <div className='flex items-center justify-center'>
            <button
              onClick={() => setIsPaymentOpen(true)}
              className="flex items-center justify-between w-full md:w-[60%] lg:w-[50%] bg-Button text-white px-6 sm:px-8 py-3 text-sm sm:text-base rounded-lg hover:bg-orange-500 active:bg-orange-700 transition duration-300"
            > 
              <p className='text-xl md:text-2xl lg:text-3xl'>{totalFoodCount} Order</p>
              <p className='text-xl md:text-2xl lg:text-3xl'>Check Bill</p>
              <p className='text-xl md:text-2xl lg:text-3xl'>{currency} {calculateTotalPrice().toFixed(2)}</p>
            </button>
          </div>
        </div>
      )}

      {/* Pop up payment */}
      {isPaymentOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96">
            <div className='flex items-center justify-between mb-5'>
              <h1 className="text-3xl font-bold ">Payment Details</h1>
              <div onClick={() => setIsPaymentOpen(false)} className="w-7 h-7 sm:w-8 sm:h-8 bg-red-500 hover:bg-red-400 rounded-lg shadow-lg shadow-Text/20 flex items-center justify-center cursor-pointer">
                <X className="size-6 sm:size-7 text-white" alt="Shopping Bag" />
              </div>
            </div>

            <div className='flex flex-col items-center justify-center'>
              <img src={assets.qr_code} alt="" />
              <p className="text-xl">Table : {tableNumber}</p>
            </div>
            <hr />
            <div className="flex justify-between my-2 text-2xl">
              <p><strong>Total Amount</strong> </p>
              <b>{currency} {calculateTotalPrice().toFixed(2)}</b>
            </div>

            <div className="flex justify-between my-2 text-2xl">
              <p><strong>Total Food</strong> </p>
              <b>{totalFoodCount}</b>
            </div>
            <hr />

            <div className="flex justify-center gap-4 mt-6">
              <Link to='/ThankYou' onClick={() => handleCheckBill()} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                Confirm Payment
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderSummary;

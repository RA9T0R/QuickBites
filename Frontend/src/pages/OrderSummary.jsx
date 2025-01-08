import React, { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';
import { toast } from 'react-toastify'; 
import { Link } from 'react-router-dom'; 

const OrderSummary = () => {
  const { orderData, currency, getTotalFoodCount, clearOrders } = useContext(StoreContext);

  const calculateTotalPrice = () => {
    return orderData.reduce((total, order) => {
      return total + order.items.reduce((itemTotal, item) => itemTotal + item.totalPrice, 0);
    }, 0);
  };

  const handleCheckBill = () => {
    const totalAmount = calculateTotalPrice().toFixed(2);
    const totalFoodCount = getTotalFoodCount();

    // Display a toast message with order summary
    toast.info(`Bill checked! Grand Total: ${currency} ${totalAmount} | Total Food: ${totalFoodCount}`, {
      position: "top-right", 
      autoClose: 5000, 
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <div className="p-6 bg-white shadow-xl border-y rounded-lg relative pb-20">
      <div className="w-full font-bold sm:font-semibold text-2xl sm:text-5xl text-start sm:text-center mb-3">
        <h1><b>Order</b> Summary</h1>
      </div>
      {orderData.length === 0 ? (
        <div className='flex items-center justify-center mt-10 text-2xl font-light'>
          <p>No orders placed yet.</p>
        </div>
      ) : (
        <div>
          {orderData.map((order, index) => (
            <div key={index} className="mb-4 border-b pb-4">
              <h3 className="font-medium text-lg">Order #{index + 1}</h3>
              <ul className="mt-2">
                {order.items.map((item, idx) => {
                  const itemInfo = item;
                  return (
                    <li key={idx} className="flex justify-between py-2 md:pr-20">
                      <div className="flex items-center justify-center ">
                        <img src={itemInfo.image[0]} alt={itemInfo.name} className="w-24 sm:w-44 object-cover mr-4 rounded-lg" />
                        <span className='text-sm md:w-full md:text-2xl'>{itemInfo.name} (x{item.quantity})</span>
                      </div>
                      <div className="flex items-center justify-end max-md:w-[25%] ">
                        <p className='text-sm md:text-2xl'>{currency} {item.totalPrice.toFixed(2)}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-2 text-md md:text-2xl font-medium">
                <strong>Total: {currency}
                  {order.items.reduce((total, item) => total + item.totalPrice, 0).toFixed(2)}
                </strong>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Grand Total section at the bottom */}
      {getTotalFoodCount() > 0 && (
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full p-5 pb-8 md:p-10 border bg-white shadow-xl rounded-lg z-50">
          <Link to='/' onClick={() => clearOrders()} className='flex items-center justify-center'>
            <button
              onClick={handleCheckBill}
              className="flex items-center justify-between w-full md:w-[50%] bg-orange-400 text-white px-6 sm:px-8 py-3 text-sm sm:text-base rounded-lg hover:bg-orange-500 active:bg-orange-700 transition duration-300"
            > 
              <p className='text-xl md:text-2xl lg:text-3xl'>{getTotalFoodCount()} Order</p>
              <p className='text-xl md:text-2xl lg:text-3xl'>Check Bill</p>
              <p className='text-xl md:text-2xl lg:text-3xl'>{currency} {calculateTotalPrice().toFixed(2)}</p>
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default OrderSummary;

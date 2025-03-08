import { createContext, useState, useEffect } from 'react';
// import { foods_list } from '../assets/assets';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-toastify';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

  const currency = '฿';

  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const [cartItems, setCartItems] = useState({});
  const [orderData, setOrderData] = useState([]);
  const [totalFoodCount,setTotalFoodCount] = useState(0);
  const [search, setSearch] = useState('');
  const [tableNumber, setTableNumber] = useState(localStorage.getItem('tableNumber') || '1'); // Default to '1'
  const [userID,setUserID] = useState('AA');
  const [foods_list,setFoods_list] = useState([]);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const tableFromURL = searchParams.get('table');

    if (tableFromURL && tableNumber !== tableFromURL) {
      setTableNumber(tableFromURL);
    } else if (!tableNumber) {
      setTableNumber('1');
    }
  }, [searchParams, tableNumber]);

  useEffect(() => {
    if (tableNumber) {
      localStorage.setItem('tableNumber', tableNumber);
    }
  }, [tableNumber]);

  const setToCart = (itemId, itemsCount, requirement = '') => {
    console.log("Adding to cart:", { itemId, itemsCount, requirement });

    let cartData = structuredClone(cartItems);

    if (itemsCount === 0) {
      console.log("Removing item:", itemId);
      removeItem(itemId);
    } else {
      cartData[itemId] = { quantity:itemsCount, requirement };
      setCartItems(cartData);
    }
  };

  const getCartCount = () => {
    return Object.values(cartItems).reduce((acc, item) => acc + item.quantity, 0);
  };

  const updateQuantity = (itemId, quantity) => {
    if (cartItems[itemId]) {
      setCartItems((prevCart) => ({
        ...prevCart,
        [itemId]: { ...prevCart[itemId], quantity },
      }));
    }
  };

  const removeItem = (id) => {
    setCartItems((prevCart) => {
      const updatedCart = { ...prevCart };
      delete updatedCart[id];
      return updatedCart;
    });
  };

  const getCartAmount = () => {
    return Object.entries(cartItems).reduce((totalAmount, [itemId, { quantity }]) => {
      const itemInfo = foods_list.find((food) => food._id === itemId);
      if (itemInfo) {
        totalAmount += itemInfo.price * quantity;
      }
      return totalAmount;
    }, 0);
  };

  const placeOrder = () => {
    const order = {
        orderId: new Date().getTime(),
        tableNumber,
        items: Object.keys(cartItems).map((itemId) => {
          const itemInfo = foods_list.find((food) => food._id === itemId);
          return {
            itemId,
            name: itemInfo.name,
            price: itemInfo.price,
            image: itemInfo.image,
            quantity: cartItems[itemId].quantity,
            totalPrice: itemInfo.price * cartItems[itemId].quantity,
            requirement: cartItems[itemId]?.requirement || '',
            status: "Ordering",
          };
        }),
      };
    
      setOrderData((prevOrders) => [...prevOrders, order]);
      setCartItems({});
  };

  const updateStatus = (orderId, itemId, newStatus) => {
    const updatedOrders = orderData.map((order) => {
      if (order.orderId === orderId) {
        const updatedItems = order.items.map((item) => {
          if (item.itemId === itemId) {
            return { ...item, status: newStatus };
          }
          return item;
        });
        return { ...order, items: updatedItems };
      }
      return order;
    });

    setOrderData(updatedOrders);
  };

  const getTotalFoodCount = () => {
    return orderData.reduce((totalFoodCount, order) => {
      order.items.forEach((item) => {
        totalFoodCount += item.quantity;
      });
      return totalFoodCount;
    }, 0);
  };

  const clearOrders = () => {
    setOrderData([]);
  };

  const getFoodData = async () => {
    try {
      const response = await axios.get(backendURL + '/api/product/list')
      if(response.data.success){
        setFoods_list(response.data.product)
      }else{
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    getFoodData();
  },[])

  const contextValue = {
    foods_list,
    cartItems,
    setCartItems,
    setToCart,
    search,
    setSearch,
    getCartCount,
    updateQuantity,
    removeItem,
    getCartAmount,
    currency,
    placeOrder,
    updateStatus,
    orderData,
    getTotalFoodCount,
    clearOrders,
    tableNumber,
    setTableNumber,
    backendURL,
    totalFoodCount,
    setTotalFoodCount,
    userID,
    setUserID
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;

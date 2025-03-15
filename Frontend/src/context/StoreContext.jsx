import { createContext, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie'; // Make sure to install js-cookie

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

  const currency = '฿';
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const [cartItems, setCartItems] = useState({});
  const [orderData, setOrderData] = useState([]);
  const [totalFoodCount, setTotalFoodCount] = useState(0);
  const [search, setSearch] = useState('');
  const [tableNumber, setTableNumber] = useState(localStorage.getItem('tableNumber') || '1'); // Default to '1'
  const [userID, setUserID] = useState(getStoredUserID() || ""); // Retrieve userID from persistent storage
  const [foods_list, setFoods_list] = useState([]);
  const [available, setAvailable] = useState(false);

  const [searchParams] = useSearchParams();

  // Utility to check if localStorage is available
  function isLocalStorageAvailable() {
    try {
      const testKey = 'test';
      localStorage.setItem(testKey, 'testValue');
      localStorage.removeItem(testKey);
      return true;
    } catch (error) {
      return false;
    }
  }

  // Utility functions for persistent storage of userID
  function getStoredUserID() {
    try {
      if (isLocalStorageAvailable()) {
        return localStorage.getItem('userID');
      } else {
        return Cookies.get('userID');
      }
    } catch (err) {
      console.error("Error reading userID", err);
      return null;
    }
  }

  function storeUserID(newUserID) {
    try {
      if (isLocalStorageAvailable()) {
        localStorage.setItem('userID', newUserID);
      } else {
        Cookies.set('userID', newUserID, { expires: 7 });
      }
    } catch (err) {
      console.error("Error storing userID", err);
    }
  }

  // Update table number from URL if provided
  useEffect(() => {
    const tableFromURL = searchParams.get('table');
    if (tableFromURL && tableNumber !== tableFromURL) {
      setTableNumber(tableFromURL);
    } else if (!tableNumber) {
      setTableNumber('1');
    }
  }, [searchParams, tableNumber]);

  // Check table when tableNumber or userID changes
  useEffect(() => {
    if (tableNumber) {
      checkTable();
    }
  }, [userID, tableNumber]);

  const checkTable = async () => {
    try {
      // Retrieve userID from our helper function
      const storedUserID = getStoredUserID();
      if (storedUserID) {
        setUserID(storedUserID);

        const response = await axios.get(`${backendURL}/api/table/get`, {
          params: { table: tableNumber },
        });

        if (!response.data.success || !response.data.table.available) {
          setUserID('');
          // Clear persistent storage
          if (isLocalStorageAvailable()) {
            localStorage.removeItem('userID');
          } else {
            Cookies.remove('userID');
          }
          setAvailable(false);
        } else {
          setAvailable(true);
        }
        return;
      }

      // If no stored userID exists, proceed with API call to join the table
      const response = await axios.post(`${backendURL}/api/table/join`, { table: tableNumber });
      if (response.data.success) {
        const newUserID = response.data.userID;
        setUserID(newUserID);
        storeUserID(newUserID); // Persist userID
        setAvailable(true);
      } else {
        setAvailable(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error checking table status");
    }
  };

  const setToCart = (itemId, itemsCount, requirement = '') => {
    let cartData = structuredClone(cartItems);

    if (itemsCount === 0) {
      removeItem(itemId);
    } else {
      cartData[itemId] = { quantity: itemsCount, requirement };
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
      const response = await axios.get(`${backendURL}/api/product/list`);
      if (response.data.success) {
        setFoods_list(response.data.product);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getFoodData();
  }, []);

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
    setUserID,
    checkTable,
    available,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;

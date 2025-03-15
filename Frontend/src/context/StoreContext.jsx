import { createContext, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const currency = "฿";
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const [cartItems, setCartItems] = useState({});
  const [orderData, setOrderData] = useState([]);
  const [totalFoodCount, setTotalFoodCount] = useState(0);
  const [search, setSearch] = useState("");
  const [tableNumber, setTableNumber] = useState(localStorage.getItem("tableNumber") || null);
  const [userID, setUserID] = useState(localStorage.getItem("userID") || "");
  const [foods_list, setFoods_list] = useState([]);

  const [available, setAvailable] = useState(false);
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();

  const storeUserID = (newUserID) => {
    if (newUserID) {
      localStorage.setItem("userID", newUserID);
    }
  };

  const removeUserID = () => {
    localStorage.removeItem("userID");
  };

  useEffect(() => {
    const tableFromURL = searchParams.get("table");

    if (tableFromURL && tableNumber !== tableFromURL) {
      setTableNumber(tableFromURL);
      localStorage.setItem("tableNumber", tableFromURL);
    }
  }, [searchParams]);

  useEffect(() => {
    if (tableNumber !== null) {
      checkTable();
    }
  }, [userID, tableNumber]);

  const checkTable = async () => {
    if (!tableNumber) return;

    setLoading(true);
    try {
      if (userID) {
        const response = await axios.get(`${backendURL}/api/table/get`, {
          params: { table: tableNumber },
        });

        console.log("Checking table:", tableNumber);
        console.log(response.data);

        if (!response.data.success) {
          removeUserID();
          setUserID("");
          setAvailable(false);
        } else {
          setAvailable(true);
        }
        return;
      }

      const response = await axios.post(`${backendURL}/api/table/join`, { table: tableNumber });
      if (response.data.success) {
        setUserID(response.data.userID);
        storeUserID(response.data.userID);
        setAvailable(true);
      } else {
        setAvailable(false);
      }
    } catch (error) {
      console.error(error);
      setAvailable(false);
    } finally {
      setLoading(false);
    }
  };

  // =========== CART & ORDER FUNCTIONS ===========
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
    return orderData.reduce((count, order) => {
      order.items.forEach((item) => {
        count += item.quantity;
      });
      return count;
    }, 0);
  };

  const clearOrders = () => {
    setOrderData([]);
  };

  // =========== GET FOOD DATA ===========
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
    // Export the loading state
    loading,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;

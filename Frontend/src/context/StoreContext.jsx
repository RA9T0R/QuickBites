import { createContext, useState } from "react";
import {foods_list} from '../assets/assets'

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {
    const currency = '฿';
    const [cartItems , setCartItems] = useState({});
    const [orderData, setOrderData] = useState([]); 
    const [search,setSearch] = useState('');

    const setToCart = (itemId,itemsCount) => {
        let cartData = structuredClone(cartItems);
        if(itemsCount == 0){
            removeItem(itemId);
        }else{
            cartData[itemId] = itemsCount;
            setCartItems(cartData);
        }
    }

    const getCartCount = () => {
        let count = 0;
        for (let itemId in cartItems) {
            count += cartItems[itemId];
        }
        return count;
    }

    const updateQuantity = async(itemId,quantity) => {
        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            cartData[itemId] = quantity;
            setCartItems(cartData);
        }
    }

    const removeItem = (id) => {
        setCartItems((prevCart) => {
          const updatedCart = { ...prevCart };
          delete updatedCart[id];
          return updatedCart;
        });
      };

    const getCartAmount = () => {
        let totalAmount = 0;
    
        for (const itemId in cartItems) {
            const itemInfo = foods_list.find((food) => food._id === itemId);
    
            if (itemInfo) {
                try {
                    totalAmount += itemInfo.price * cartItems[itemId];
                } catch (e) {
                    console.error(`Error calculating total amount for item ID ${itemId}: ${e.message}`);
                }
            }
        }
        return totalAmount;
    };

    const placeOrder = () => {
        const order = {
            orderId: new Date().getTime(), // You can use a timestamp as a unique order ID
            items: Object.keys(cartItems).map(itemId => {
                const itemInfo = foods_list.find(food => food._id === itemId);
                return {
                    itemId,
                    name: itemInfo.name,
                    price: itemInfo.price,
                    image : itemInfo.image,
                    quantity: cartItems[itemId],
                    totalPrice: itemInfo.price * cartItems[itemId],
                };
            }),
        };
    
        setOrderData((prevOrders) => [...prevOrders, order]);  // Add the new order
        setCartItems({});  // Clear the cart
    };

    const getTotalFoodCount = () => {
        let totalFoodCount = 0;
      
        // Loop through each order
        orderData.forEach(order => {
          // Loop through each item in the order and add the quantity to the total
          order.items.forEach(item => {
            totalFoodCount += item.quantity;
          });
        });
      
        return totalFoodCount;
    };

    const clearOrders = () => {
        setOrderData([]);
    };
      
      
    
    
    
    const contextvalue = {
        foods_list,cartItems,setCartItems,setToCart,search,setSearch,
        getCartCount,updateQuantity,removeItem,getCartAmount,
        currency,placeOrder,orderData,getTotalFoodCount,clearOrders
    }
    return (
        <StoreContext.Provider value={contextvalue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider
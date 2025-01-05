import { createContext, useState } from "react";
import {foods_list} from '../assets/assets'

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {
    const [cartItems , setCartItems] = useState({});

    const addToCart = (itemId,itemsCount) => {
        let cartData = structuredClone(cartItems);
        if (!cartData[itemId]) {
            cartData[itemId] = itemsCount;
        } else {
            cartData[itemId] += itemsCount;
        }

        setCartItems(cartData);
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
          delete updatedCart[id]; // Remove item from cart
          return updatedCart;
        });
      };

    const contextvalue = {
        foods_list,cartItems,setCartItems,addToCart,
        getCartCount,updateQuantity,removeItem
    }
    return (
        <StoreContext.Provider value={contextvalue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider
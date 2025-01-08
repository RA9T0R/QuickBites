import React, { useContext } from 'react'
import { StoreContext } from '../context/StoreContext';

const CartTotal = () => {
  const {currency,getCartAmount} = useContext(StoreContext);

  return (
    <div className='w-full'>
      <div className='flex flex-col gap-2 mt-2 text-sm'>
        <div className='flex justify-between text-xl text-Text'>
           <p>Subtotal</p>
           <p>{currency} {getCartAmount()}.00</p>
        </div>
        <hr />
        <div className='flex justify-between text-2xl'>
            <b>Total</b>
            <b>{currency} {getCartAmount() === 0 ? 0 : getCartAmount()}.00</b>
        </div>
      </div>
    </div>
  )
}

export default CartTotal

import {Routes,Route} from 'react-router-dom'
import Navbar from './components/Navbar'

import Home from './pages/Home'
import Cart from './pages/Cart'
import OrderSummary from './pages/OrderSummary'
import Invoice from './pages/Invoice'
import Food from './pages/Food'

import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <div className='px-[2vw] sm:px-[3vw] md:px-[5vw] lg:px-[7vw] overflow-hidden'>
      <ToastContainer position='top-right' autoClose={2000}/>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/orderSummary' element={<OrderSummary/>}/>
        <Route path='/invoice' element={<Invoice/>}/>
        <Route path='/:food/:foodId' element={<Food/>}/>
      </Routes>
    </div>
  )
}

export default App

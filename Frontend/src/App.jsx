import {Routes,Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

import Home from './pages/Home'
import Cart from './pages/Cart'
import OrderSummary from './pages/OrderSummary'
import Invoice from './pages/Invoice'
import Food from './pages/Food'

import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] overflow-hidden'>
      <ToastContainer position='top-right' autoClose={2000}/>
      <Navbar />
      <hr />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/orderSummary' element={<OrderSummary/>}/>
        <Route path='/invoice' element={<Invoice/>}/>
        <Route path='/food/:foodId' element={<Food/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App

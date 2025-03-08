import { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Cart from './pages/Cart';
import OrderSummary from './pages/OrderSummary';
import Food from './pages/Food';
import Table from './pages/Table';
import About from './pages/About';
import Contact from './pages/Contact';
import Thank from './pages/Thank';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useContext } from 'react';
import { StoreContext } from './context/StoreContext'; // Import context

const encodeTableNumber = (tableNumber) => {
  return btoa(tableNumber); // Base64 encode the table number
};

const decodeTableNumber = (encodedTableNumber) => {
  return atob(encodedTableNumber); // Base64 decode the encoded table number
};

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { tableNumber,setTableNumber} = useContext(StoreContext); // Access tableNumber from context
  const hideNavbarRoutes = ["/ThankYou"];

  // Update URL and context when the table number is set or changes
  useEffect(() => {
    if (tableNumber) {
      // Update the URL to reflect the table query parameter
      const currentParams = new URLSearchParams(location.search);
      currentParams.set('table', tableNumber);
      navigate(`?${currentParams.toString()}`, { replace: true });
    }
  }, [tableNumber, location.search, navigate]);

  return (
    <div className="px-[2vw] sm:px-[3vw] md:px-[5vw] lg:px-[7vw] overflow-hidden bg-BG min-h-screen">
      <ToastContainer position="top-right" autoClose={2000} />
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/table/:tableNumber" element={<Table />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/orderSummary" element={<OrderSummary />} />
        <Route path="/:food/:foodId" element={<Food />} />
        <Route path="/ThankYou" element={<Thank />} />
      </Routes>
    </div>
  );
};

export default App;

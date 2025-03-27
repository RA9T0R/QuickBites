// App.jsx
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
import { StoreContext } from './context/StoreContext';

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { tableNumber, available, loading } = useContext(StoreContext); 
  const hideNavbarRoutes = ["/ThankYou"];

  // Update URL and context when the table number is set or changes
  useEffect(() => {
    if (tableNumber) {
      const currentParams = new URLSearchParams(location.search);
      currentParams.set('table', tableNumber);
      navigate(`?${currentParams.toString()}`, { replace: true });
    }
  }, [tableNumber, location.search, navigate]);

  return (
    <div className="px-[2vw] sm:px-[3vw] md:px-[5vw] lg:px-[7vw] overflow-hidden bg-BG min-h-screen">
      <ToastContainer position="top-right" autoClose={2000} />
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}

      {/* 
        1) If still loading, show a placeholder/spinner
        2) If not loading and the table is available, show main Routes
        3) Otherwise, show the "unavailable" message
      */}
      {loading ? (
        <div className="text-center mt-10 text-2xl font-bold text-white">
          <p>Checking table status...</p>
        </div>
      ) : available ? (
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
      ) : (
        <div className="text-center mt-10 text-2xl font-bold text-red-600">
          <p>The table is currently unavailable. Please try again later.</p>
        </div>
      )}
    </div>
  );
};

export default App;

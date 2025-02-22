import { useState, useEffect} from 'react'
import { Routes, Route } from 'react-router-dom'

import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Order from "./pages/Order"
import Analytics from "./pages/Analytics"
import Login from "./pages/Login"
import CreateMenu from "./pages/CreateMenu"

import { ToastContainer } from 'react-toastify'

export const backendURL = import.meta.env.VITE_BACKEND_URL

const App = () => {
  const [expanded, setExpanded] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token") ? localStorage.getItem("token") : "");
  useEffect(() => {
    localStorage.setItem("token", token)
  }, [token])
  
  return (
    <div className="bg-Main_BG min-h-screen">
      <ToastContainer/>
      {token === "" ? <Login setToken={setToken} /> : 
      <>
        {/* Navbar */}
        <Navbar expanded={expanded} setExpanded={setExpanded} setToken={setToken} />

        <div className="flex pt-20">
          {/* Sidebar */}
          <Sidebar expanded={expanded} setToken={setToken} />

          {/* Main Content */}
          <div
            className={`flex-1 p-4 overflow-auto transition-all duration-300 ${expanded ? 'md:ml-64' : 'md:ml-24'
              }`}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/create" element={<CreateMenu token={token} />} />
              <Route path="/order" element={<Order />} />
              <Route path="/analytics" element={<Analytics />} />
            </Routes>
          </div>
        </div>
      </>}
    </div>
  );
};

export default App;


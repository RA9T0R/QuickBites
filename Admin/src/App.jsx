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
import Table from './pages/Table'
import Employee from './pages/Employee'
import AddEmployee from './pages/AddEmployee'
import EditEmployee from './pages/EditEmployee'

import { ToastContainer } from 'react-toastify'

export const backendURL = import.meta.env.VITE_BACKEND_URL

const App = () => {
  const [expanded, setExpanded] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token") ? localStorage.getItem("token") : "");
  const [role, setRole] = useState(localStorage.getItem("role") ? localStorage.getItem("role") : "");
  useEffect(() => {
    localStorage.setItem("token", token)
    localStorage.setItem("role", role)
  }, [token,role])
  
  return (
    <div className="bg-Main_BG min-h-screen">
      <ToastContainer/>
      {token === "" ? <Login setToken={setToken} setRole={setRole} /> : 
      <>
        {/* Navbar */}
        <Navbar expanded={expanded} setExpanded={setExpanded} setToken={setToken} role={role} />

        <div className="flex pt-20">
          {/* Sidebar */}
          <Sidebar expanded={expanded} setToken={setToken} role={role} />

          {/* Main Content */}
          <div
            className={`flex-1 p-4 overflow-auto transition-all duration-300 ${expanded ? 'md:ml-64' : 'md:ml-24'
              }`}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/create" element={<CreateMenu token={token} role={role}/>} />
              <Route path="/analytics" element={<Analytics role={role}/>} />
              <Route path="/add_employee" element={<AddEmployee token={token} role={role}/>} />
              <Route path="/edit_employee/:staffId" element={<EditEmployee token={token} role={role}/>} />
              <Route path="/list_employee" element={<Employee token={token} role={role}/>} />
              <Route path="/login" element={<Login setToken={setToken} setRole={setRole} />} />
              <Route path="/view_menu" element={<Menu />} />
              <Route path="/order" element={<Order />} />
              <Route path="/Table/:tableNumber" element={<Table />} />
            </Routes>
          </div>
        </div>
      </>}
    </div>
  );
};

export default App;


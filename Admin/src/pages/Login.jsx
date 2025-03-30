import { useState, useEffect } from 'react';
import axios from 'axios';
import { backendURL } from '../App';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import scheduleImg from '../assets/picture/loginImage.jpg';

const Login = ({ setToken, setRole }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isValid = async (e) => {
    e.preventDefault();
    const endpoint = "/api/employee/login";
    try {
      const response = await axios.post(backendURL + endpoint, { email, password });
      if (response.data.success) {
        navigate("/");
        setToken(response.data.token);
        setRole(response.data.role);
        toast.success(`Logged in as ${response.data.role === "admin" ? "Admin" : "Employee"}`);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="relative flex flex-row items-center justify-center h-screen"
      style={
        isMobile
          ? {
              backgroundImage: `url(${scheduleImg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }
          : {}
      }
    >
      {/* Mobile overlay */}
      {isMobile && (
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 bg-white rounded-lg shadow-md w-fit max-w-4xl relative">
        {/* Left column: Login form */}
        <div className="p-6 flex flex-col">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Quickbites Dashboard</h2>
          <form className="flex flex-col flex-grow justify-between" onSubmit={isValid}>
            <div>
              <input onChange={(e) => setEmail(e.target.value)} value={email} type="email"
                className="block w-full bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 mt-4
                           focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Email address"
              />
              <input onChange={(e) => setPassword(e.target.value)} value={password} type="password"
                className="block w-full bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4
                           focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Password"
              />
            </div>
            <button type="submit" className="bg-gradient-to-r from-yellow-500 to-orange-300 text-white font-bold py-2 px-4 rounded-md mt-4 transition ease-in-out duration-150">
              Login
            </button>
          </form>
        </div>

        {/* Right column (image) - hidden on mobile */}
        <div className="hidden md:block w-full max-w-md">
          <img className="rounded-xl"src={scheduleImg}/>
        </div>
      </div>
    </div>
  );
};

export default Login;
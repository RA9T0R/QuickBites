import { useState } from 'react';
import axios from 'axios';
import { backendURL } from '../App';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = ({ setToken, setRole }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

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
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Login
        </h2>
        <form className="flex flex-col" onSubmit={isValid}>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Email address"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Password"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 transition ease-in-out duration-150"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

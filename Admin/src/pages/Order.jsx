import { useState, useContext } from "react";
import { DashboardContext } from "../context/DashboardContext";
import { Link } from "react-router-dom";
import { Armchair, PhoneCall,Table  } from "lucide-react";
import axios from "axios";
import { backendURL } from "../App";
import { toast } from "react-toastify";

const Order = () => {
  const { tables, fetchTable } = useContext(DashboardContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tableNumber, setTableNumber] = useState("");

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [tableToDelete, setTableToDelete] = useState(null);


  const handleAddTable = async () => {
    if (!tableNumber) return;
    try {
      const response = await axios.post(backendURL + "/api/table/add", {table: tableNumber,});
      if (response.data.success) {
        toast.success(response.data.message);
        setIsModalOpen(false);
        setTableNumber("");
        await fetchTable();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleOpenTable = async (number) => {
    try {
      const response = await axios.post(backendURL + "/api/table/available", {table: number,available: true,});
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchTable();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleCloseTable = async (number) => {
    try {
      const response = await axios.post(backendURL + '/api/table/clear',{table : number})
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchTable();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDeleteClick = (number) => {
    setTableToDelete(number);
    setDeleteModalOpen(true);
  };

  const cancelDelete = () => {
    setDeleteModalOpen(false);
    setTableToDelete(null);
  };

  const confirmDeleteTable = async () => {
    try {
      const response = await axios.post(backendURL + "/api/table/delete", {tableNumber: tableToDelete,});
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchTable();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setDeleteModalOpen(false);
      setTableToDelete(null);
    }
  };

  const handleAttendTable = async (number) => {
    try {
      const response = await axios.post(backendURL + "/api/table/attend", {table: number,});
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchTable();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full flex flex-col items-center text-Text p-2 sm:p-8">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between w-full">
        <h1 className="text-2xl sm:text-4xl font-bold self-start ml-1">Order</h1>
        <div onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center self-start w-full sm:w-auto h-full p-4 gap-3 text-white hover:bg-green-400 bg-green-600 rounded-2xl cursor-pointer"
        >
          <Table/>
          <p>Add new Table</p>
        </div>
      </div>

      {/* Grid of tables */}
      <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-4">
        {tables.map((table) => (
          <div key={table.table} className="flex justify-center">
            <div
              className="text-Text rounded-xl bg-BG flex flex-col items-center justify-center pt-3 pb-6
                         shadow-lg shadow-Text/20 transition-all duration-300 ease-in-out
                         transform hover:scale-105 hover:shadow-xl w-full"
            >
              <button onClick={() => handleDeleteClick(table.table)} className="flex items-center justify-center self-start px-4 py-2 gap-3 text-white hover:bg-red-400 bg-red-600 rounded-2xl cursor-pointer ml-3">
                X
              </button>

              <div className="space-y-4 min-w-[70%]">
                <Link to={`/table/${table.table}`} className="flex w-full justify-between items-center">
                  <Armchair className="size-16" />
                  <h2 className="text-4xl font-bold">
                    {table.available ? "Available" : "Occupied"}
                  </h2>
                </Link>

                <div className="w-full flex justify-between items-center">
                  <div className="flex gap-3 items-center">
                    <div className="flex gap-3">
                      <button onClick={() => handleOpenTable(table.table)}
                        className="flex items-center justify-center self-start w-full sm:w-auto px-4 py-2 gap-3
                                   text-white hover:bg-green-400 bg-green-600 rounded-2xl cursor-pointer"
                      >
                        Open
                      </button>
                      <button onClick={() => handleCloseTable(table.table)}
                        className="flex items-center justify-center self-start w-full sm:w-auto px-4 py-2 gap-3
                                   text-white hover:bg-red-400 bg-red-600 rounded-2xl cursor-pointer"
                      >
                        Close
                      </button>
                    </div>
                    {table.callWaiter && (
                      <div onClick={() => handleAttendTable(table.table)}
                        className="p-3 bg-Highlight hover:bg-Highlight/50 rounded-full cursor-pointer flex items-center"
                      >
                        <PhoneCall />
                      </div>
                    )}
                  </div>
                  <h1 className="text-6xl">{table.table}</h1>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for adding new table */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-Text p-6 rounded-lg shadow-lg w-96 text-center">
            <h2 className="text-xl font-bold mb-4 text-BG">Add New Table</h2>
            <input type="number" placeholder="Enter table number" value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
              className="w-full border p-2 rounded mb-4 text-BG"
            />
            <div className="flex justify-between">
              <button onClick={() => setIsModalOpen(false)}className="px-4 py-2 bg-red-700 rounded" >
                Cancel
              </button>
              <button onClick={handleAddTable}className="px-4 py-2 bg-green-600 text-white rounded">
                Add Table
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal for deleting a table */}
      {deleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-Text p-6 rounded-lg shadow-lg w-96 text-center">
            <h2 className="text-xl font-bold mb-4 text-BG">
              Are you sure you want to delete Table {tableToDelete}?
            </h2>
            <div className="flex justify-between text-white">
              <button onClick={cancelDelete} className="px-4 py-2 bg-red-700 rounded">
                Cancel
              </button>
              <button onClick={confirmDeleteTable} className="px-4 py-2 bg-green-600 rounded">
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Order;
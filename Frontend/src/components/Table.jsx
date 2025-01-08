import React, { useState } from 'react';

const Table = ({ Number }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="group relative z-10">
      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className="flex items-center justify-between w-full p-1 sm:p-2 md:p-3 border border-gray-950 rounded-md shadow-sm bg-gray-100 hover:bg-gray-200"
      >
        <div className="flex items-center">
          {/* Left Content */}
          <p className="text-xs sm:text-sm md:text-base text-left">โต๊ะ {Number}</p>

          {/* Vertical Line */}
          <div className="hidden sm:block h-2 sm:h-4 md:h-6 mx-4 border-l border-gray-700"></div>

          {/* Right Content */}
          <p className="hidden text-xs sm:block sm:text-sm md:text-base text-right text-gray-600">คุณ A</p>
        </div>

        {/* Dropdown Arrow */}
        <svg
          className={`w-4 h-4 ml-2 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-1/2 transform -translate-x-1/2 pt-4">
          <div className="flex flex-col w-56 sm:w-64 md:w-96 py-3 px-5 bg-slate-100 text-gray-500 rounded shadow-lg ">
            {/* Header Section */}
            <div className="flex flex-col items-center gap-2 border-b pb-4 mb-4 ">
              <h1 className="uppercase text-lg md:text-3xl font-extrabold text-gray-800">Quick Bites</h1>
              <p className="text-md md:text-lg text-gray-600">สาขาพระนครเหนือ</p>
            </div>

            {/* Data Section */}
            <div className="flex flex-col gap-3 text-xs sm:text-sm md:text-md lg:text-lg">
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700 ">Order #:</span>
                <span>QB12345</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700 ">Status:</span>
                <span className="text-green-500 ">Ready</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700 ">Total:</span>
                <span>฿450</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700 ">Server:</span>
                <span>คุณ A</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;

import React from "react";
import { Link } from "react-router-dom";
import { Armchair } from 'lucide-react';

const tables = [
  { id: 1, label: 'TABLE 1', number: '01'},
  { id: 2, label: 'TABLE 2', number: '02'},
  { id: 3, label: 'TABLE 3', number: '03'},
  { id: 4, label: 'TABLE 4', number: '04'},
  { id: 5, label: 'TABLE 5', number: '05'},
  { id: 6, label: 'TABLE 6', number: '06'},
  { id: 7, label: 'TABLE 7', number: '07'},
  { id: 8, label: 'TABLE 8', number: '08'},
  { id: 9, label: 'TABLE 9', number: '09'},
];

const Order = () => {
  return (
    <div className="w-full flex flex-col items-center text-Text p-8">
      <h1 className="text-2xl md:text-4xl font-bold self-start ml-1">Order</h1>

      {/* Container Bento Grid */}
      <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-4">
        {tables.map((table) => (
          <div key={table.id} className="flex justify-center ">
            <Link
              to={`/table/${table.id}`}
              className="text-Text rounded-xl bg-BG  hover:bg-Highlight/70 flex flex-col items-center justify-center py-6 shadow-lg shadow-Text/20 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl w-full "
            >
              <div className="space-y-4 min-w-[70%]">
                <Armchair className="size-16" />
                <h2 className="text-4xl font-bold">{table.label}</h2>
                <div className="w-full flex justify-end">
                  <h1 className="text-6xl">{table.number}</h1>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;

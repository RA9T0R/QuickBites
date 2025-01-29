import React from "react";

const Table = () => {
  const restaurantInfo = {
    name: "Quick Bites",
    tableType: "บุฟเฟ่ต์",
    tableNumber: 3,
    customerName: "คุณ A",
    reservationTime: "12:41 - 14:21",
    duration: "100 นาที",
  };

  return (
    <div className="bg-BG/90 p-4">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1>LOGO</h1>
          <div className="text-lg font-bold">{restaurantInfo.name}</div>
        </div>
        <button className="text-xl font-bold text-gray-500">&times;</button>
      </div>

      {/* Reservation Details */}
      <div className="bg-white rounded-lg shadow p-4 mt-4">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-700 font-semibold">
            {restaurantInfo.tableType}
          </span>
          <div>
            <span className="text-gray-500 text-sm">เวลาจอง:</span>{" "}
            <span className="font-medium text-gray-700">
              {restaurantInfo.reservationTime}
            </span>
          </div>
        </div>
        <div className="border-t pt-4">
          <div className="text-gray-500 text-sm">ระยะเวลาจอง:</div>
          <div className="font-medium text-gray-700">{restaurantInfo.duration}</div>
        </div>
      </div>

      {/* Options Section */}
      <div className="bg-white rounded-lg shadow p-4 mt-4 space-y-4">
        <div className="flex justify-between items-center cursor-pointer">
          <span className="text-gray-700 font-semibold">
            เงื่อนไขการใช้บริการ
          </span>
          <span className="text-gray-500">&gt;</span>
        </div>
        <div className="flex justify-between items-center cursor-pointer">
          <span className="text-gray-700 font-semibold">แชร์ QR ให้เพื่อน</span>
          <span className="text-gray-500">&gt;</span>
        </div>
        <div className="flex justify-between items-center cursor-pointer">
          <span className="text-gray-700 font-semibold">
            ชื่อของคุณ (แสดงในรายการที่สั่ง)
          </span>
          <span className="font-medium text-gray-500">{restaurantInfo.customerName}</span>
        </div>
      </div>
    </div>
  );
};

export default Table;

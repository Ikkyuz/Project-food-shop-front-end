// ในไฟล์ OrderItem.jsx
import React from 'react';

const OrderItem = ({ menuImage, menuName, menuDescription, quantity, menuPrice, onRemove }) => {
  return (
    <div className="border-4 border-red-300 rounded-lg flex flex-col md:flex-row">
      {/* แสดงรูปภาพของเมนู */}
      <div className="relative p-6 flex justify-center items-center w-full md:w-1/2">
        <img className="w-full h-full object-cover rounded-lg" src={menuImage} alt={menuName} />
      </div>

      {/* แสดงรายละเอียดของเมนู */}
      <div className="flex flex-col p-6 w-full md:w-1/2">
        <h1 className="text-3xl font-bold mb-4">{menuName}</h1>
        <p className="text-lg text-gray-600">{menuDescription}</p>
        <p className="text-lg">ราคา: {menuPrice} บาท</p>
        <p className="text-lg">จำนวน: {quantity}</p>
        <p className="text-lg font-bold text-red-500">รวมราคา: {menuPrice * quantity} บาท</p>

        {/* ปุ่มลบออร์เดอร์ */}
        <button onClick={onRemove} className="mt-4 px-4 py-2 bg-red-500 text-white text-lg rounded hover:bg-red-700 transition">
          ลบออร์เดอร์
        </button>
      </div>
    </div>
  );
};

// ต้องมี export default ที่นี่
export default OrderItem;

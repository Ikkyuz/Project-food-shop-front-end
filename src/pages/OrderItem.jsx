import React from 'react';

const OrderItem = ({ id, pictureUrl, name, description, price, quantity, onRemove }) => {
  // ตรวจสอบว่า pictureUrl มีค่าหรือไม่ ถ้าไม่มีให้ใช้ URL เริ่มต้น
  const imageUrl = pictureUrl || "https://via.placeholder.com/150";

  return (
    <div className="border-4 border-red-300 rounded-lg mt-4 flex flex-col md:flex-row">
      {/* ส่วนของรูปภาพสินค้า */}
      <div className="relative p-4 flex justify-center items-center w-full md:w-1/2">
        {/* ใช้ imageUrl ที่ตรวจสอบแล้ว */}
        <img className="w-full h-64 object-cover rounded-lg" src={imageUrl} alt={name} />
      </div>

      {/* ส่วนของข้อมูลสินค้า */}
      <div className="flex flex-col p-4 w-full md:w-2/3 mt-auto">
        {/* ชื่อสินค้า */}
        <h1 className="text-3xl font-bold mb-4">{name}</h1>
        
        {/* คำอธิบายสินค้า */}
        <p className="text-lg text-gray-600 mb-2">{description}</p>

        {/* ราคาต่อหน่วย */}
        <p className="text-lg mb-2">ราคา: {price} บาท</p>

        {/* จำนวนสินค้าในออร์เดอร์ */}
        <p className="text-lg mb-2">จำนวน: {quantity}</p>

        {/* คำนวณรวมราคา */}
        <p className="text-lg font-bold text-red-500 mb-4">รวมราคา: {price * quantity} บาท</p>

        {/* ปุ่มลบสินค้าออกจากออร์เดอร์ */}
        <button
          onClick={onRemove} // ฟังก์ชันที่ถูกส่งเข้ามาจากผู้ใช้ที่เรียกใช้คอมโพเนนต์นี้
          className="px-6 py-3 bg-red-500 text-white text-lg rounded hover:bg-red-700 transition ease-in-out duration-300 mt-auto"
        >
          ลบออร์เดอร์
        </button>
      </div>
    </div>
  );
};

export default OrderItem;
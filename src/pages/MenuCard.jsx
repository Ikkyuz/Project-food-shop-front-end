import React, { useState } from "react";

const MenuCard = ({ id, pictureUrl, name, price, description }) => {
  // สถานะสำหรับจัดการจำนวนที่ผู้ใช้เลือก
  const [quantity, setQuantity] = useState(1);

  // ฟังก์ชันสำหรับเพิ่มจำนวน
  const incrementQuantity = () => setQuantity((prev) => prev + 1);

  // ฟังก์ชันสำหรับลดจำนวน
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  // ฟังก์ชันสำหรับส่งออร์เดอร์ไปยัง LocalStorage
  const submitForm = (event) => {
    event.preventDefault(); // ป้องกันการรีเฟรชหน้า
    alert("สั่งอาหารเรียบร้อย!"); // แจ้งเตือนผู้ใช้

    // ดึงข้อมูลออร์เดอร์จาก LocalStorage (ถ้ามี)
    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];

    // ข้อมูลออร์เดอร์ที่ต้องการบันทึก
    const orderData = {
      id: Date.now(), // ใช้ timestamp เป็น ID ออร์เดอร์
      quantity,
      pictureUrl: pictureUrl || "https://via.placeholder.com/150", // ใช้ URL รูปภาพ ถ้าไม่มีใช้ placeholder
      name,
      price,
      description
    };

    // บันทึกออร์เดอร์ลงใน LocalStorage
    localStorage.setItem("orders", JSON.stringify([...existingOrders, orderData]));
  };

  return (
    <div className="flex flex-col items-center border-4 border-gray-200 rounded-lg p-2 shadow-lg">
      {/* ✅ รูปภาพของเมนู */}
      <img className="w-full h-48 object-cover rounded-lg" src={pictureUrl || "https://via.placeholder.com/150"} alt={name} />

      {/* ✅ ชื่อเมนู */}
      <h2 className="text-xl font-bold mt-4">{name}</h2>

      {/* ✅ รายละเอียดของเมนู */}
      <p className="text-gray-700 text-lg leading-relaxed my-4 px-4">{description}</p>

      {/* ✅ ราคาเมนู */}
      <p className="text-lg font-bold mt-4">ราคา: {price} บาท</p>

      {/* ✅ ส่วนเพิ่ม-ลดจำนวน */}
      <div className="flex items-center my-4">
        <button 
          type="button" 
          onClick={decrementQuantity} 
          className="px-4 py-2 bg-red-500 text-white text-md rounded"
        >
          -
        </button>
        {/* แสดงจำนวนที่เลือก */}
        <span className="mx-4 text-xl">{quantity}</span>
        <button 
          type="button" 
          onClick={incrementQuantity} 
          className="px-4 py-2 bg-green-500 text-white text-md rounded"
        >
          +
        </button>
      </div>

      {/* ✅ ปุ่มสำหรับยืนยันออร์เดอร์ */}
      <button 
        onClick={submitForm} 
        className="px-2 py-2 bg-blue-500 text-white text-lg rounded w-full hover:bg-blue-700"
      >
        ยืนยันออร์เดอร์
      </button>
    </div>
  );
};

export default MenuCard;
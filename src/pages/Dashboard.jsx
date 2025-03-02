import React, { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";

const Dashboard = () => {
  const [confirmedOrders, setConfirmedOrders] = useState([]);
  const navigate = useNavigate();

  // ดึงข้อมูลออร์เดอร์ที่ยืนยันจาก localStorage
  useEffect(() => {
    const storedConfirmedOrders = JSON.parse(localStorage.getItem("confirmedOrders")) || [];
    setConfirmedOrders(storedConfirmedOrders);
  }, []);

  // ฟังก์ชันลบออร์เดอร์ทั้งหมด
  const clearConfirmedOrders = () => {
    localStorage.removeItem("confirmedOrders");
    setConfirmedOrders([]); // อัปเดต state ให้เป็นออร์เดอร์ที่ว่าง
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          {/* ปุ่มย้อนกลับไปยังหน้า login */}
          <NavLink to="/login" className='hover:text-red-600'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
          </NavLink>
          <h1 className="text-2xl font-bold my-auto ml-2">รายการออร์เดอร์</h1>
        </div>
        {/* ปุ่มไปยังหน้าจัดการข้อมูล */}
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          onClick={() => navigate("/admin")}
        >
          จัดการข้อมูล
        </button>
      </div>
      
      {/* แสดงข้อมูลออร์เดอร์ที่ยืนยันแล้ว */}
      {confirmedOrders.length > 0 ? (
        <>
          <h2 className="text-xl font-bold mt-6">ออร์เดอร์ที่ยืนยันแล้ว</h2>
          <table className="w-full border-collapse shadow-lg rounded-lg overflow-hidden mt-4">
            <thead>
              <tr className="bg-gradient-to-r from-blue-500 to-blue-700 text-white text-left">
                <th className="px-6 py-3">ชื่อเมนู</th>
                <th className="px-6 py-3">จำนวน</th>
                <th className="px-6 py-3">ราคารวม</th>
              </tr>
            </thead>
            <tbody>
              {confirmedOrders.map((order, index) => (
                <tr
                  key={index}
                  className={`border-b ${index % 2 === 0 ? "bg-gray-100" : "bg-white"} hover:bg-gray-200 transition`}
                >
                  <td className="px-6 py-3">{order.name}</td>
                  <td className="px-6 py-3 text-center">{order.quantity}</td>
                  <td className="px-6 py-3 text-right">{order.price * order.quantity} บาท</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* ปุ่มลบออร์เดอร์ทั้งหมด */}
          <button
            onClick={clearConfirmedOrders}
            className="mt-4 px-4 py-2 bg-red-500 text-white text-lg rounded hover:bg-red-700 transition"
          >
            ลบออร์เดอร์ทั้งหมด
          </button>
        </>
      ) : (
        <p className="text-gray-500">ไม่มีออร์เดอร์ที่ยืนยัน</p>
      )}
    </div>
  );
};

export default Dashboard;

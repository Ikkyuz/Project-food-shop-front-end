// ในไฟล์ Order.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import OrderItem from '../pages/OrderItem';  // ไม่ต้องใช้ {} ในการ import เพราะ OrderItem มีการ export แบบ default

const Order = () => {
  // State เพื่อเก็บรายการออร์เดอร์
  const [orders, setOrders] = useState([]);

  // useEffect สำหรับโหลดข้อมูลออร์เดอร์จาก localStorage เมื่อคอมโพเนนต์ถูก mount
  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];  // ถ้าไม่มีออร์เดอร์ใน localStorage ให้ใช้เป็น array เปล่า
    setOrders(storedOrders);  // อัปเดต state ด้วยข้อมูลที่ได้จาก localStorage
  }, []);

  // ฟังก์ชันสำหรับลบออร์เดอร์ที่เลือก
  const removeOrder = (id) => {
    const updatedOrders = orders.filter((order) => order.id !== id);  // กรองเอาออร์เดอร์ที่ id ไม่ตรงกับที่ต้องการลบ
    setOrders(updatedOrders);  // อัปเดต state
    localStorage.setItem('orders', JSON.stringify(updatedOrders));  // อัปเดตข้อมูลใน localStorage
  };

  // ถ้าไม่มีออร์เดอร์ แสดงข้อความแจ้งเตือน
  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl mb-4">ไม่พบออร์เดอร์</h1>
        <Link to="/" className="text-blue-500 hover:underline">
          กลับไปหน้าแรก
        </Link>
      </div>
    );
  }

  // ฟังก์ชันสำหรับลบออร์เดอร์ทั้งหมด
  const clearOrders = () => {
    setOrders([]);  // ลบข้อมูลใน state
    localStorage.removeItem('orders');  // ลบข้อมูลจาก localStorage
  };

  return (
    <Layout>
      <div className="container mx-auto py-12 p-4">
        {/* แสดงรายการออร์เดอร์ทั้งหมด */}
        {orders.map((order) => (
          <OrderItem
            key={order.id}  // ใช้ id ของออร์เดอร์เป็น key
            menuImage={order.menuImage}
            menuName={order.menuName}
            menuDescription={order.menuDescription}
            quantity={order.quantity}
            menuPrice={order.menuPrice}
            onRemove={() => removeOrder(order.id)}  // ส่งฟังก์ชัน removeOrder เพื่อใช้ในแต่ละรายการ
          />
        ))}
        
        {/* ส่วนแสดงปุ่มสำหรับยืนยันออร์เดอร์และลบออร์เดอร์ทั้งหมด */}
        <div className="flex items-center justify-end mt-4 space-x-6">
          {/* ปุ่มลบออร์เดอร์ทั้งหมด จะแสดงก็ต่อเมื่อมีออร์เดอร์ */}
          {orders.length > 0 && (
            <button onClick={clearOrders} className="mt-4 px-4 py-2 bg-gray-500 text-white text-lg rounded hover:bg-gray-700 transition">
              ลบออร์เดอร์ทั้งหมด
            </button>
          )}
          
          {/* ปุ่มยืนยันออร์เดอร์ */}
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white text-lg rounded hover:bg-blue-700 transition">
            ยืนยันออร์เดอร์
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Order;
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import OrderItem from '../pages/OrderItem';  // นำเข้า OrderItem แบบ default

const Order = () => {
  // State สำหรับเก็บรายการออร์เดอร์ที่ดึงมาจาก localStorage
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  // useEffect สำหรับโหลดข้อมูลออร์เดอร์จาก localStorage เมื่อคอมโพเนนต์ถูก mount
  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];  // ถ้าไม่มีข้อมูลใน localStorage จะใช้เป็น array เปล่า
    setOrders(storedOrders);  // อัปเดต state ด้วยข้อมูลที่ได้จาก localStorage
  }, []);

  // ฟังก์ชันสำหรับลบออร์เดอร์ที่เลือกจากรายการ
  const removeOrder = (id) => {
    // กรองรายการออร์เดอร์ที่ไม่ตรงกับ id ที่ต้องการลบ
    const updatedOrders = orders.filter((order) => order.id !== id);
    setOrders(updatedOrders);  // อัปเดต state ด้วยข้อมูลที่กรองแล้ว
    localStorage.setItem('orders', JSON.stringify(updatedOrders));  // อัปเดตข้อมูลใน localStorage
  };

  // ถ้าไม่มีออร์เดอร์ แสดงข้อความแจ้งเตือนและปุ่มกลับหน้าแรก
  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl mb-4">ไม่พบออร์เดอร์</h1>
        <Link to="/" className="text-blue-500 hover:underline">
          กลับไปหน้าแรก
        </Link>
      </div>
    );
  }

  // ฟังก์ชันสำหรับลบออร์เดอร์ทั้งหมด
  const clearOrders = () => {
    setOrders([]);  // ลบข้อมูลจาก state
    localStorage.removeItem('orders');  // ลบข้อมูลจาก localStorage
  };

  const submitForm = () => {
    localStorage.setItem("confirmedOrders", JSON.stringify(orders)); // บันทึกข้อมูลออร์เดอร์
    setOrders([]);  // ล้างข้อมูลใน state
    localStorage.removeItem("orders"); // ลบข้อมูล orders ที่ยังไม่ได้ยืนยัน
    navigate("/");
  };

  return (
    <Layout>
      <div className="container mx-auto py-12 p-4">
        <form onSubmit={submitForm}>
          {/* แสดงรายการออร์เดอร์ทั้งหมด */}
          {orders.map((order) => (
            <OrderItem
              key={order.id}  // ใช้ id ของออร์เดอร์เป็น key เพื่อให้ React จัดการการเปลี่ยนแปลงได้อย่างถูกต้อง
              pictureUrl={order.pictureUrl}
              name={order.name}
              description={order.description}
              quantity={order.quantity}
              price={order.price}
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
            <button type='submit' className="mt-4 px-4 py-2 bg-blue-500 text-white text-lg rounded hover:bg-blue-700 transition">
              ยืนยันออร์เดอร์
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Order;
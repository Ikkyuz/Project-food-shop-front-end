import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import MenuService from "../services/menu.service";

const MenuItem = () => {
  const { id } = useParams(); // ดึงค่า id จาก URL
  const navigate = useNavigate(); // ใช้สำหรับเปลี่ยนหน้า
  const [menu, setMenu] = useState(null); // เก็บข้อมูลเมนูที่ดึงจาก API
  const [loading, setLoading] = useState(true); // สถานะโหลดข้อมูล
  const [quantity, setQuantity] = useState(1); // เก็บจำนวนที่ต้องการสั่ง

  useEffect(() => {
    // ดึงข้อมูลจาก API ตาม ID ที่ได้จาก URL
    MenuService.getById(id)
      .then((response) => {
        setMenu(response.data); // บันทึกข้อมูลเมนูที่ได้จาก API
        setLoading(false); // หยุดสถานะการโหลด
      })
      .catch((error) => {
        console.error("Error fetching menu:", error);
        setLoading(false); // หยุดสถานะการโหลดในกรณีที่เกิดข้อผิดพลาด
      });
  }, [id]);

  // ถ้ากำลังโหลดให้แสดงข้อความรอ
  if (loading) {
    return <p className="text-center py-20 text-xl">Loading...</p>;
  }

  // ถ้าไม่พบข้อมูลเมนู (เช่น ID ไม่ถูกต้อง)
  if (!menu) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl mb-4">ไม่พบเมนูนี้</h1>
        <Link to="/" className="text-blue-500 hover:underline">
          กลับไปหน้าแรก
        </Link>
      </div>
    );
  }

  // ฟังก์ชันเพิ่มจำนวน
  const incrementQuantity = () => setQuantity((prev) => prev + 1);

  // ฟังก์ชันลดจำนวน
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  // ฟังก์ชันการเพิ่มออร์เดอร์ลงใน LocalStorage
  const submitForm = (event) => {
    event.preventDefault(); // ป้องกันการรีเฟรชหน้าเมื่อส่งฟอร์ม
    alert("สั่งอาหารเรียบร้อย!");

    // ดึงข้อมูลออร์เดอร์ที่มีอยู่แล้วจาก LocalStorage
    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];

    // สร้างข้อมูลออร์เดอร์ใหม่
    const orderData = {
      id: Date.now(), // ใช้เวลาเป็น ID สำหรับออร์เดอร์
      quantity,
      menuImage: menu.imageUrl || "/default-image.jpg", // ใช้ภาพจากเมนูหรือภาพเริ่มต้น
      menuName: menu.name,
      menuDescription: menu.description,
      menuPrice: menu.price,
    };

    // เก็บออร์เดอร์ใหม่ลงใน LocalStorage
    localStorage.setItem("orders", JSON.stringify([...existingOrders, orderData]));
    navigate("/"); // กลับไปยังหน้าแรก
  };

  return (
    <div className="container mx-auto pt-10 p-4">
      <form onSubmit={submitForm} className="border-4 border-red-300 shadow-lg rounded-lg overflow-hidden text-sm max-w-full">
        <div className="flex flex-col md:flex-row">
          {/* แสดงรูปภาพเมนู */}
          <div className="p-6 flex justify-center items-center w-full md:w-1/2">
            <img className="w-full h-full object-cover" src={menu.imageUrl || "/default-image.jpg"} alt={menu.name} />
          </div>

          {/* แสดงรายละเอียดเมนู */}
          <div className="flex flex-col p-6 w-full md:w-1/2">
            <h2 className="text-3xl font-bold mb-2">{menu.name}</h2>
            <p className="text-lg py-1">ราคา: {menu.price} บาท</p>
            <p className="text-md">{menu.description}</p>

            {/* ฟังก์ชันเพิ่ม-ลดจำนวน */}
            <div className="flex items-center mt-4">
              <button type="button" onClick={decrementQuantity} className="px-4 py-2 bg-red-500 text-white text-md rounded">-</button>
              <span className="mx-4 text-xl">{quantity}</span>
              <button type="button" onClick={incrementQuantity} className="px-4 py-2 bg-green-500 text-white text-md rounded">+</button>
            </div>

            {/* ปุ่มยืนยันการสั่งซื้อ */}
            <button type="submit" className="my-4 px-4 py-2 bg-blue-500 text-white text-lg rounded">ยืนยันออร์เดอร์</button>

            {/* ปุ่มยกเลิก */}
            <button type="button" onClick={() => navigate('/')} className="px-4 py-2 bg-gray-500 text-white text-lg rounded">ยกเลิก</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MenuItem;
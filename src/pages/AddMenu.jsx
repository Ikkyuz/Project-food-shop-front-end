import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import MenuService from "../services/menu.service";

const AddMenu = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    categoryId: "",
    picture: null,
  });

  // ฟังก์ชันจัดการการเปลี่ยนแปลงของข้อมูลฟอร์ม
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ฟังก์ชันจัดการการเลือกไฟล์รูปภาพ
  const handleFileChange = (e) => {
    setFormData({ ...formData, picture: e.target.files[0] });
  };

  // ฟังก์ชันส่งข้อมูลเมนูใหม่ไปยัง API
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      // แปลงข้อมูลฟอร์มให้เป็น FormData สำหรับการอัปโหลดไฟล์
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      await MenuService.create(data); // ส่งข้อมูลไปยัง API
      alert("เพิ่มเมนูสำเร็จ!");
      navigate("/"); // ไปที่หน้าแรกหลังจากเพิ่มเมนูเสร็จ
    } catch (error) {
      console.error("เกิดข้อผิดพลาด:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white shadow-lg p-6 rounded-lg w-96">
        <NavLink to="/admin" className='hover:text-red-600'>
          {/* ปุ่มย้อนกลับไปยังหน้าจัดการเมนู */}
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-big-left"><path d="M18 15h-6v4l-7-7 7-7v4h6v6z"/></svg>
        </NavLink>
        <h1 className="text-2xl font-bold mb-4 text-center">เพิ่มเมนูใหม่</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* ฟอร์มสำหรับการกรอกข้อมูลเมนู */}
          <input type="text" name="name" placeholder="ชื่อเมนู" onChange={handleChange} required className="w-full border p-2 rounded" />
          <input type="text" name="description" placeholder="รายละเอียด" onChange={handleChange} required className="w-full border p-2 rounded" />
          <input type="number" name="price" placeholder="ราคา" onChange={handleChange} required className="w-full border p-2 rounded" />
          <input type="text" name="categoryId" placeholder="หมวดหมู่ (ID)" onChange={handleChange} required className="w-full border p-2 rounded" />
          <input type="file" name="picture" onChange={handleFileChange} className="w-full border p-2 rounded" />
          <button type="submit" className="bg-blue-500 text-white w-full py-2 rounded">เพิ่มเมนู</button>
        </form>
      </div>
    </div>
  );
};

export default AddMenu;

import React, { useEffect, useState } from "react";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import MenuService from "../services/menu.service";

const EditMenu = () => {
  const { id } = useParams(); // ดึง id ของเมนูจาก URL parameters
  const navigate = useNavigate(); // ฟังก์ชันสำหรับการนำทางไปยังหน้าอื่น
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    categoryId: "",
    picture: null,
  });

  // useEffect ใช้สำหรับการดึงข้อมูลเมนูเมื่อคอมโพเนนต์นี้โหลด
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        // ดึงข้อมูลเมนูที่ต้องการแก้ไขจาก API โดยใช้ id ที่ได้จาก useParams
        const response = await MenuService.getById(id);
        setFormData(response.data); // ตั้งค่า formData ด้วยข้อมูลที่ดึงมาจาก API
      } catch (error) {
        console.error("ไม่พบข้อมูลเมนู:", error); // ถ้าดึงข้อมูลไม่สำเร็จจะแสดง error
      }
    };
    fetchMenu();
  }, [id]); // useEffect นี้จะทำงานเมื่อค่า id เปลี่ยนแปลง

  // ฟังก์ชันที่ใช้จัดการการเปลี่ยนแปลงข้อมูลในฟอร์ม (สำหรับ input ที่ไม่ใช่ไฟล์)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value }); // อัปเดตค่าของฟอร์มที่เกี่ยวข้อง
  };

  // ฟังก์ชันที่ใช้จัดการการเลือกไฟล์ภาพ
  const handleFileChange = (e) => {
    setFormData({ ...formData, picture: e.target.files[0] }); // อัปเดต picture เป็นไฟล์ที่เลือก
  };

  // ฟังก์ชันที่ใช้ส่งข้อมูลเมนูที่ถูกแก้ไขไปยัง API
  const handleSubmit = async (e) => {
    e.preventDefault(); // ป้องกันการโหลดหน้าใหม่
    try {
      const data = new FormData();
      // แปลงข้อมูลจาก formData ให้เป็น FormData สำหรับส่งไปกับไฟล์
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]); // เพิ่มค่าทุกตัวใน formData ลงใน FormData
      });

      await MenuService.update(id, data); // ส่งข้อมูลไปยัง API เพื่ออัปเดตเมนู
      alert("อัปเดตเมนูสำเร็จ!"); // แสดงข้อความว่าอัปเดตสำเร็จ
      navigate("/"); // นำทางกลับไปยังหน้าแรกหลังจากอัปเดตสำเร็จ
    } catch (error) {
      console.error("เกิดข้อผิดพลาด:", error); // ถ้ามีข้อผิดพลาดแสดง error
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white shadow-lg p-6 rounded-lg w-96">
        {/* ปุ่มย้อนกลับไปที่หน้าจัดการเมนู */}
        <NavLink to="/admin" className="hover:text-red-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-big-left">
            <path d="M18 15h-6v4l-7-7 7-7v4h6v6z"/>
          </svg>
        </NavLink>
        <h1 className="text-2xl font-bold mb-4 text-center">แก้ไขเมนู</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* ฟอร์มสำหรับการกรอกข้อมูลเมนูที่ต้องการแก้ไข */}
          <input type="text" name="name" value={formData.name} placeholder="ชื่อเมนู" onChange={handleChange} required className="w-full border p-2 rounded" />
          <input type="text" name="description" value={formData.description} placeholder="รายละเอียด" onChange={handleChange} required className="w-full border p-2 rounded" />
          <input type="number" name="price" value={formData.price} placeholder="ราคา" onChange={handleChange} required className="w-full border p-2 rounded" />
          <input type="text" name="categoryId" value={formData.categoryId} placeholder="หมวดหมู่ (ID)" onChange={handleChange} required className="w-full border p-2 rounded" />
          <input type="file" name="picture" onChange={handleFileChange} className="w-full border p-2 rounded" />
          {/* ปุ่มสำหรับส่งข้อมูลฟอร์ม */}
          <button type="submit" className="bg-green-500 text-white w-full py-2 rounded">บันทึกการเปลี่ยนแปลง</button>
        </form>
      </div>
    </div>
  );
};

export default EditMenu;
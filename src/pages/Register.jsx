import React, { useState } from "react";
import AdminService from "../services/admin.service"; // ใช้ service สำหรับการลงทะเบียน
import { useNavigate, NavLink } from "react-router-dom"; // ใช้ useNavigate สำหรับการนำทาง, NavLink สำหรับลิงก์

const Register = () => {
  // สร้าง state สำหรับเก็บข้อมูลที่กรอกในฟอร์ม
  const [name, setName] = useState(""); // เก็บชื่อ
  const [email, setEmail] = useState(""); // เก็บอีเมล
  const [password, setPassword] = useState(""); // เก็บรหัสผ่าน
  const navigate = useNavigate(); // ฟังก์ชันสำหรับการนำทางหลังจากการลงทะเบียน

  // ฟังก์ชันสำหรับการลงทะเบียนผู้ใช้
  const handleRegister = async (e) => {
    e.preventDefault(); // ป้องกันการรีโหลดหน้าจอเมื่อฟอร์มถูกส่ง
    try {
      // เรียกใช้ AdminService เพื่อส่งข้อมูลการลงทะเบียน
      await AdminService.register({ name, email, password });
      alert("สมัครสมาชิกสำเร็จ! กรุณาเข้าสู่ระบบ"); // แสดงข้อความเมื่อการลงทะเบียนสำเร็จ
      navigate("/login"); // นำทางไปยังหน้าล็อกอินหลังจากสมัครสมาชิกสำเร็จ
    } catch (error) {
      // ถ้ามีข้อผิดพลาดในการลงทะเบียน จะแสดงข้อความผิดพลาด
      alert(error.response?.data?.error || "เกิดข้อผิดพลาด");
    }
  };

  return (
    <section className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white rounded shadow-lg w-96 p-5">
        {/* ปุ่มกลับไปยังหน้าล็อกอิน */}
        <NavLink to="/login" className='hover:text-red-600'>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-big-left">
            <path d="M18 15h-6v4l-7-7 7-7v4h6v6z"/>
          </svg>
        </NavLink>
        <h1 className="text-2xl font-bold text-center mb-4">Admin Register</h1>
        <form onSubmit={handleRegister}>
          {/* ช่องกรอกชื่อ */}
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded mb-2" required />
          {/* ช่องกรอกอีเมล */}
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded mb-2" required />
          {/* ช่องกรอกรหัสผ่าน */}
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded mb-2" required />
          {/* ปุ่มสำหรับส่งข้อมูลลงทะเบียน */}
          <button type="submit" className="w-full bg-green-600 text-white p-2 rounded">Register</button>
        </form>
      </div>
    </section>
  );
};

export default Register;
import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import AdminService from '../services/admin.service'

const Login = () => {
    // สร้าง state สำหรับเก็บข้อมูลของฟอร์ม
    const [email, setemail] = React.useState(''); // สำหรับเก็บค่า email
    const [password, setpassword] = React.useState(''); // สำหรับเก็บค่า password
    const [showPassword, setShowPassword] = React.useState(false); // สำหรับควบคุมการแสดง/ซ่อนรหัสผ่าน
    const navigate = useNavigate(); // ฟังก์ชันสำหรับการนำทางหลังจากเข้าสู่ระบบ

    // ฟังก์ชันสำหรับการเข้าสู่ระบบ
    const handleLogin = async (e) => {
        e.preventDefault(); // ป้องกันการรีโหลดหน้าเมื่อฟอร์มถูก submit
        try {
            // ส่งข้อมูลเข้าสู่ระบบไปยัง API
            const response = await AdminService.login({ email, password });
            localStorage.setItem("token", response.data.token); // เก็บ token ที่ได้รับจาก API ลงใน localStorage
            navigate("/dashboard"); // นำทางไปยังหน้า dashboard หลังจากเข้าสู่ระบบสำเร็จ
        } catch (error) {
            alert(error.response?.data?.error || "เกิดข้อผิดพลาด"); // แสดงข้อความผิดพลาดถ้าเกิดข้อผิดพลาด
        }
    }

  return (
    <div>
      <section className='flex justify-center items-center h-screen'>
            <div className='bg-white border rounded-2xl shadow-2xl w-96 p-5'>
                <div className="flex justify-end">
                    {/* ปุ่มปิดหน้าต่าง (ปิดแบบไม่ทำอะไร) */}
                    <NavLink to="/" className='hover:text-red-600'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x">
                        <path d="M18 6 6 18"/>
                        <path d="m6 6 12 12"/>
                        </svg>
                    </NavLink>
                </div>
                <h1 className='text-2xl font-bold text-center mb-2'>Login Up</h1>
                <form onSubmit={handleLogin}>
                    {/* ช่องกรอกอีเมล */}
                    <div className='mb-2'>
                        <label className='block font-bold text-gray-700'>E-mail</label>
                        <input type="email" value={email} onChange={(e) => setemail(e.target.value)} className="w-full border border-gray-300 p-2 rounded" placeholder="กรอกอีเมลของคุณ" />
                    </div>
                    {/* ช่องกรอกรหัสผ่าน */}
                    <div className='mb-2'>
                        <label className='block font-bold text-gray-700'>Password</label>
                        <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setpassword(e.target.value)} className="w-full border border-gray-300 p-2 rounded" placeholder="กรอกรหัสผ่านของคุณ" />
                        {/* ปุ่มแสดง/ซ่อนรหัสผ่าน */}
                        <button type='button' className='absolute right-2 top-2 text-gray-500' onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye-off">
                                <path d="M9.88 9.88A3 3 0 0 0 14.12 14.12"/>
                                <path d="M10.73 5.08A10.94 10.94 0 0 1 12 5c5 0 8.85 3.94 10 7-1.2 3-4.67 7-10 7a10.94 10.94 0 0 1-1.27-.08"/>
                                <path d="m3 3 18 18"/>
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye">
                                <path d="M2 12s3.94-7 10-7 10 7 10 7-3.94 7-10 7-10-7-10-7"/>
                                <circle cx="12" cy="12" r="3"/>
                            </svg>
                        )}
                        </button>
                    </div>
                    {/* ลิงก์สำหรับลืมรหัสผ่าน */}
                    <div className='mb-2'>
                        <a href="#" className='hover:text-red-600 hover:underline'>ลืมรหัสผ่าน?</a>
                    </div>
                    {/* ปุ่มเข้าสู่ระบบ */}
                    <button type='submit' className='flex items-center justify-center bg-blue-600 text-white rounded-lg py-2 w-full mb-2 hover:bg-blue-700'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-log-in"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" x2="3" y1="12" y2="12"/></svg><span className='ml-1 font-bold hover:text-gray-100'>เข้าสู่ระบบ</span>
                    </button>
                    {/* ลิงก์สำหรับการลงทะเบียน */}
                    <div className='text-center mb-2'>
                        <NavLink to="/register" className='hover:text-green-600 hover:underline'>ลงทะเบียน</NavLink>
                    </div>
                </form>
            </div>
        </section>
    </div>
  )
}

export default Login
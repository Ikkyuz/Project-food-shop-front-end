import React, { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import MenuService from "../services/menu.service";

const Admin = () => {
  const navigate = useNavigate();
  const [menuList, setMenuList] = useState([]);

  // ฟังก์ชันดึงข้อมูลเมนูจาก API
  const fetchMenuList = async () => {
    try {
      const response = await MenuService.get();
      console.log("API Response:", response.data);

      // จัดกลุ่มเมนูตามหมวดหมู่
      const groupedMenus = response.data.reduce((acc, item) => {
        const categoryName = item.category?.name || "ไม่ระบุหมวดหมู่";
        if (!acc[categoryName]) {
          acc[categoryName] = { name: categoryName, items: [] };
        }
        acc[categoryName].items.push(item);
        return acc;
      }, {});

      setMenuList(Object.values(groupedMenus)); // อัปเดต state
    } catch (error) {
      console.error("API Error:", error);
      setMenuList([]);
    }
  };

  // ดึงข้อมูลเมนูเมื่อ component ถูก mount
  useEffect(() => {
    fetchMenuList();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        {/* ปุ่มย้อนกลับไปหน้า Dashboard */}
        <NavLink to="/dashboard" className="hover:text-red-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-big-left">
            <path d="M18 15h-6v4l-7-7 7-7v4h6v6z"/>
          </svg>
        </NavLink>
        <h1 className="text-2xl font-bold my-auto ml-2">จัดการเมนู</h1>
        <NavLink to="/add-menu" className="bg-blue-500 text-white py-2 px-4 rounded-lg">
          เพิ่มเมนู
        </NavLink>
      </div>

      {/* แสดงเมนูตามหมวดหมู่ */}
      {menuList.length > 0 ? (
        menuList.map((category) => (
          <div key={category.name}>
            <h2 className="text-xl font-bold mt-6">{category.name}</h2>
            <table className="w-full border-collapse shadow-lg rounded-lg overflow-hidden mt-4">
              <thead>
                <tr className="bg-gradient-to-r from-blue-500 to-blue-700 text-white text-left">
                  <th className="px-6 py-3">ชื่อเมนู</th>
                  <th className="px-6 py-3">ราคา</th>
                  <th className="px-6 py-3">จัดการ</th>
                </tr>
              </thead>
              <tbody>
                {category.items.map((item) => (
                  <tr key={item._id} className="border-b hover:bg-gray-100">
                    <td className="px-6 py-3">{item.name}</td>
                    <td className="px-6 py-3">{item.price} บาท</td>
                    <td className="px-6 py-3">
                      <NavLink to={`/edit-menu/${item._id}`} className="text-blue-500 hover:text-blue-700">
                        แก้ไข
                      </NavLink>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="ml-4 text-red-500 hover:text-red-700"
                      >
                        ลบ
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      ) : (
        <p className="text-gray-500">ไม่มีเมนูในระบบ</p>
      )}
    </div>
  );
};

export default Admin;
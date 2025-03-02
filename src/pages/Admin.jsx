import React, { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import MenuService from "../services/menu.service";

const Admin = () => {
  const [menus, setMenus] = useState([]);
  const navigate = useNavigate();

  const fetchMenus = () => {
    // เรียกใช้งาน API ผ่าน MenuService
    MenuService.get()
      .then((response) => {
        console.log("API Response:", response.data);

        // จัดกลุ่มเมนูตามหมวดหมู่
        const groupedMenus = response.data.reduce((acc, item) => {
          // กำหนดชื่อหมวดหมู่ ถ้าไม่มีให้ใช้ "ไม่ระบุหมวดหมู่"
          const categoryName = item.category?.name || "ไม่ระบุหมวดหมู่";

          // ตรวจสอบว่าหมวดหมู่นี้มีอยู่แล้วหรือไม่
          if (!acc[categoryName]) {
            acc[categoryName] = { name: categoryName, items: [] };
          }

          // เพิ่มเมนูเข้าไปในหมวดหมู่
          acc[categoryName].items.push(item);

          return acc;
        }, {});

        // เก็บข้อมูลเมนูที่จัดกลุ่มแล้วลงใน state
        setMenus(Object.values(groupedMenus));
      })
      .catch((error) => {
        // หากมีข้อผิดพลาดในการดึงข้อมูลจาก API
        console.log("API Error:", error);
        setMenus([]); // หากเกิดข้อผิดพลาดให้ล้างข้อมูลเมนู
      });
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  const removeMenu = (id) => {
    if (window.confirm("คุณต้องการลบเมนูนี้ใช่หรือไม่?")) {
      MenuService.remove(id)
        .then((response) => {
          console.log("เมนูถูกลบแล้ว:", response.data);
  
          // อัปเดตเมนูใน state โดยการกรองเมนูที่ไม่ตรงกับ id ที่ลบ
          setMenus((prevMenus) => {
            return prevMenus.map((category) => {
              return {
                ...category,
                items: category.items.filter((menu) => menu._id !== id),
              };
            });
          });
  
          window.alert("เมนูถูกลบเรียบร้อยแล้ว!");
        })
        .catch((error) => {
          console.log("เกิดข้อผิดพลาดในการลบเมนู:", error);
          window.alert("เกิดข้อผิดพลาดในการลบเมนู");
        });
    }
  };

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <NavLink to="/dashboard" className="hover:text-red-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-big-left">
            <path d="M18 15h-6v4l-7-7 7-7v4h6v6z"/>
          </svg>
        </NavLink>
        <h1 className="text-2xl font-bold my-auto ml-2">จัดการเมนู</h1>
        <NavLink to="/add-menu" className="bg-blue-500 text-white py-2 px-4 rounded-lg">
          เพิ่มเมนู
        </NavLink>
      </div>

      {/* แสดงเมนูทั้งหมด */}
      <div>
        {menus.map((category) => (
          <div key={category.name} className="mt-8">
            <h2 className="text-xl font-semibold mb-4">{category.name}</h2>
            <table className="w-full border-collapse shadow-lg rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gradient-to-r from-blue-500 to-blue-700 text-white text-left">
                  <th className="px-6 py-3">ชื่อเมนู</th>
                  <th className="px-6 py-3">ข้อมูลเมนู</th>
                  <th className="px-6 py-3">ราคา</th>
                  <th className="px-6 py-3">หมวดหมู่</th>
                  <th className="px-6 py-3">รูปภาพ</th>
                  <th className="px-6 py-3">จัดการ</th>
                </tr>
              </thead>
              <tbody>
                {category.items.map((menu) => (
                  <tr key={menu._id} className="border-b hover:bg-gray-100">
                    <td className="px-6 py-3">{menu.name}</td>
                    <td className="px-6 py-3">{menu.description}</td>
                    <td className="px-6 py-3">{menu.price} บาท</td>
                    <td className="px-6 py-3">{menu.category ? menu.category.name : "ไม่ระบุหมวดหมู่"}</td>
                    <td className="px-6 py-3">
                      <img 
                        src={menu.pictureUrl} 
                        alt={menu.picture} 
                        className="w-16 h-16 object-cover rounded-lg" 
                      />
                    </td>
                    <td className="px-6 py-3">
                      <button onClick={() => navigate(`/edit/${menu.id}`)} className="border rounded-lg bg-blue-500 text-white py-2 px-4 hover:bg-blue-600">แก้ไข</button>
                      <button  onClick={() => removeMenu(menu.id)} className="border rounded-lg bg-red-500 text-white py-2 px-4 hover:bg-red-600 ml-2">ลบ</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;

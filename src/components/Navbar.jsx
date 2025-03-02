import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import CategoryService from "../services/category.service";

const Navbar = () => {
  const [categories, setCategories] = useState([]);
  const fetchCategories = () => {
    CategoryService.get()
      .then((response) => {
        setCategories(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <>
      {/* ส่วน Header ที่เป็น Navbar */}
      <header className="bg-gradient-to-t from-purple-700/85 to-purple-900 p-1">
        
        {/* แถบเมนูหลัก (ชื่อเว็บ + ปุ่ม Order) */}
        <ul className="flex justify-between items-center space-x-4 px-4 text-white">
          <li>
            {/* โลโก้หรือชื่อเว็บไซต์ที่ลิงก์ไปหน้าแรก */}
            <NavLink to="/" className="flex items-center space-x-2  text-xl font-bold hover:text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-utensils-crossed"><path d="m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8"/><path d="M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7"/><path d="m2.1 21.8 6.4-6.3"/><path d="m19 5-7 7"/></svg>
              <span className="pr-1">Buffet Lounge</span> 
            </NavLink>
          </li>
          <div className="flex space-x-2 items-center">
            <li>
              {/* ลิงก์ไปหน้าสั่งอาหาร */}
              <NavLink to="/order" className="flex items-center space-x-2 hover:text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-basket"><path d="m15 11-1 9"/><path d="m19 11-4-7"/><path d="M2 11h20"/><path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4"/><path d="M4.5 15.5h15"/><path d="m5 11 4-7"/><path d="m9 11 1 9"/></svg>
              </NavLink>
            </li>
            <li>
              <NavLink to="/login" className="flex items-center space-x-2 border-2 border-white rounded-md px-2 py-1 hover:text-gray-400 hover:bg-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                <span>Sign In</span>
              </NavLink>
            </li>
          </div>
          
        </ul>

        {/* เส้นแบ่งระหว่างแถบเมนูหลักและหมวดหมู่ */}
        <hr className="my-1" />

        {/* แถบเมนูหมวดหมู่ที่ดึงมาจากไฟล์ data.js */}
        <nav className="container mx-auto overflow-x-auto">
          <ul className="flex justify-center items-center space-x-8 text-white text-lg whitespace-nowrap">
            {/* ใช้ .map() เพื่อวนลูปสร้างเมนูหมวดหมู่ */}
            {categories.map((menu) => (
              <li key={menu.name} className="px-2 py-1">
                {/* กำหนดเส้นแบ่งที่ด้านซ้าย */}
                <NavLink
                  to={{ pathname: "/" }} // ให้ลิงก์ไปหน้าแรก
                  state={{ scrollTo: menu.name }} // ส่งค่า state เพื่อให้ scroll ไปที่หมวดหมู่
                  className="hover:text-gray-300 border-x-4 border-transparent rounded-md hover:border-gray-300 hover:px-1"
                >
                  {menu.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
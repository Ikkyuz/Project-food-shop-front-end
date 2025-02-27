import React, { useState, useRef, useEffect } from "react";
import Layout from "./../components/Layout";
import MenuCard from "./MenuCard";
import { NavLink, useLocation } from "react-router-dom";
import MenuService from "../services/menu.service";

const Menu = () => {
  // การใช้ useRef เพื่อเก็บการอ้างอิงไปยังแต่ละหมวดหมู่เมนู
  const categoryRefs = useRef({});
  const location = useLocation(); // ใช้ location เพื่อดักจับการเปลี่ยน URL
  const [menus, setMenus] = useState([]); // สถานะเก็บข้อมูลเมนูที่ดึงจาก API

  // ฟังก์ชันสำหรับเลื่อนหน้าจอไปยังหมวดหมู่ที่เลือก
  const scrollToCategory = (category) => {
    if (categoryRefs.current[category]) {
      categoryRefs.current[category].scrollIntoView({ behavior: "smooth" });
    }
  };

  // useEffect สำหรับการตรวจจับการเปลี่ยน URL และเลื่อนหน้าจอไปยังหมวดหมู่ที่กำหนดใน URL
  useEffect(() => {
    if (location.state?.scrollTo && location.key !== "default") {
      setTimeout(() => scrollToCategory(location.state.scrollTo), 100);
    }
  }, [location]);

  // ฟังก์ชันดึงข้อมูลเมนูจาก API
  const fetchMenus = () => {
    MenuService.get()
      .then((response) => {
        console.log("API Response:", response.data);

        // จัดกลุ่มเมนูตามหมวดหมู่
        const groupedMenus = response.data.reduce((acc, item) => {
          const categoryName = item.category?.name || "ไม่ระบุหมวดหมู่"; // กำหนดชื่อหมวดหมู่
          if (!acc[categoryName]) {
            acc[categoryName] = { name: categoryName, items: [] }; // สร้างหมวดหมู่ใหม่ถ้ายังไม่มี
          }
          acc[categoryName].items.push(item); // เพิ่มเมนูเข้าไปในหมวดหมู่
          return acc;
        }, {});

        // แปลงจาก Object เป็น Array และอัพเดท state
        setMenus(Object.values(groupedMenus));
      })
      .catch((error) => {
        console.log("API Error:", error); // ถ้าเกิดข้อผิดพลาดจะจับไว้ที่นี่
        setMenus([]); // ถ้าเกิดข้อผิดพลาดให้ตั้งค่า menus เป็น array ว่าง
      });
  };

  // เรียกใช้ fetchMenus เมื่อคอมโพเนนต์ถูก mount
  useEffect(() => {
    fetchMenus();
  }, []); // เรียกใช้เพียงครั้งเดียวเมื่อคอมโพเนนต์ถูก mount

  // คอมโพเนนต์หลักของหน้าจะแสดงเมนูต่างๆ ตามหมวดหมู่
  return (
    <Layout>
      <section className="items-center justify-center mx-auto py-12">
        <div className="grid grid-cols-1 gap-5">
          {/* แสดงเมนูแต่ละหมวดหมู่ */}
          {menus.map((menuCategory) => (
            <div
              key={menuCategory.name}
              ref={(el) => {
                if (menuCategory.name) {
                  categoryRefs.current[menuCategory.name] = el; // เก็บการอ้างอิงหมวดหมู่ที่มีชื่อ
                }
              }}
              className="border-4 border-red-300 bg-white rounded-lg p-5 shadow-md"
            >
              {/* ชื่อหมวดหมู่ */}
              <h1 className="text-2xl font-bold mb-4">{menuCategory.name}</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {/* แสดงการ์ดเมนูแต่ละรายการในหมวดหมู่นั้น */}
                {menuCategory.items?.map((item) => (
                  <MenuCard 
                  key={item.id}
                  id={item.id}  // ✅ ส่ง ID ไปยัง MenuItemCard
                  imageUrl={item.imageUrl}
                  name={item.name}
                />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Menu;
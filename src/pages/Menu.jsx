import React, { useState, useRef, useEffect } from "react";
import Layout from "./../components/Layout";
import MenuCard from "./MenuCard";
import { useLocation } from "react-router-dom";
import MenuService from "../services/menu.service";

const Menu = () => {
  // ใช้ useRef เพื่ออ้างอิงถึงแต่ละหมวดหมู่สำหรับการเลื่อนหน้าไปยังหมวดหมู่ที่ต้องการ
  const categoryRefs = useRef({});
  
  // ใช้ useLocation เพื่อดึงข้อมูลเกี่ยวกับสถานะของ URL (เช่น การเลื่อนหน้าไปยังหมวดหมู่ที่ระบุ)
  const location = useLocation();
  
  // สถานะที่เก็บข้อมูลเมนูที่ได้จาก API
  const [menus, setMenus] = useState([]);

  // ฟังก์ชันสำหรับเลื่อนหน้าจอไปยังหมวดหมู่ที่ต้องการ
  const scrollToCategory = (category) => {
    if (categoryRefs.current[category]) {
      // ใช้ scrollIntoView เพื่อเลื่อนหน้าไปยังหมวดหมู่
      categoryRefs.current[category].scrollIntoView({ behavior: "smooth" });
    }
  };

  // useEffect สำหรับการเลื่อนหน้าจอไปยังหมวดหมู่เมื่อมีการเปลี่ยนแปลงใน URL
  useEffect(() => {
    // ตรวจสอบว่าใน URL มีการระบุให้เลื่อนไปที่หมวดหมู่หรือไม่
    if (location.state?.scrollTo && location.key !== "default") {
      setTimeout(() => scrollToCategory(location.state.scrollTo), 100);
    }
  }, [location]);

  // ฟังก์ชันสำหรับดึงข้อมูลเมนูจาก API
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

  // ดึงข้อมูลเมนูจาก API เมื่อคอมโพเนนต์ถูก render ครั้งแรก
  useEffect(() => {
    fetchMenus();
  }, []);

  return (
    <Layout>
      {/* ส่วนของการแสดงเมนู */}
      <section className="items-center justify-center mx-auto py-12">
        <div className="grid grid-cols-1 gap-5">
          {/* แสดงหมวดหมู่เมนู */}
          {menus.map((menuCategory) => (
            <div
              key={menuCategory.name}
              // อ้างอิงถึงหมวดหมู่นี้ใน categoryRefs เพื่อใช้ในการเลื่อนหน้าไปยังหมวดหมู่
              ref={(el) => {
                if (menuCategory.name) {
                  categoryRefs.current[menuCategory.name] = el;
                }
              }}
              className="border-4 border-red-300 bg-white rounded-lg p-5 shadow-md"
            >
              {/* ชื่อหมวดหมู่ */}
              <h1 className="text-2xl font-bold mb-4">{menuCategory.name}</h1>
              
              {/* การแสดงเมนูในหมวดหมู่ */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {/* แสดงการ์ดเมนู */}
                {menuCategory.items?.map((item) => (
                  <MenuCard
                    key={item.id}
                    id={item.id}
                    pictureUrl={item.pictureUrl}
                    name={item.name}
                    price={item.price}
                    description={item.description}
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
import React from 'react';
import { NavLink } from 'react-router-dom';

const MenuItemCard = ({ id, imageUrl, name }) => {
  return (
    <NavLink to={`/menu/${id}`} className="block"> {/* ✅ ใช้ template literals ที่ถูกต้อง */}
      <div className="flex flex-col items-center border-4 border-gray-200 rounded-lg p-5 shadow-lg transform hover:scale-105 transition-transform duration-200">
        {/* รูปภาพเมนู */}
        <img
          className="w-full h-48 object-cover mt-4"
          src={imageUrl || "/default-image.jpg"}
          alt={name}
        />
        {/* ชื่อเมนู */}
        <h2 className="text-xl font-bold mt-4">{name}</h2>
      </div>
    </NavLink>
  );
};

export default MenuItemCard;
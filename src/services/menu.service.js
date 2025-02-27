import http from "../http-common";

const baseUrl = "/menus";

// ฟังก์ชันดึงข้อมูลเมนูทั้งหมด
const get = () => {
  return http.get(baseUrl);
}

// ฟังก์ชันดึงข้อมูลเมนูตาม id
const getById = (id) => {
  return http.get(`${baseUrl}/${id}`); // ส่ง id ไปที่ URL
}

const MenuService = {
  get,
  getById
}

export default MenuService;

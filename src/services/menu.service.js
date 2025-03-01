import http from "../http-common";

const baseUrl = "/menus";

// ฟังก์ชันดึงข้อมูลเมนูทั้งหมด
const get = () => {
  return http.get(baseUrl);
}


const MenuService = {
  get,
}

export default MenuService;

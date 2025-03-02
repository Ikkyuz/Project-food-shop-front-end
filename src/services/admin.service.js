import http from "../http-common";

const baseUrl = "/admin";

// ฟังก์ชันดึงข้อมูลเมนูทั้งหมด
const register = (data) => {
  return http.post(`${baseUrl}/register`,data);
}

const login = (data) => {
    return http.post(`${baseUrl}/login`,data);
}

const MenuService = {
  register,
  login
}

export default MenuService;
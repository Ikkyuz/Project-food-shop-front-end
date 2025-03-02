import http from "../http-common";

const baseUrl = "/menus";

// ฟังก์ชันดึงข้อมูลเมนูทั้งหมด
const get = () => {
  return http.get(baseUrl);
}

const create = (data) => {
  return http.post(baseUrl, data);
}

const update = (id, data) => {
  return http.put(`${baseUrl}/${id}`, data);
}

const remove = (id) => {
  return http.delete(`${baseUrl}/${id}`);
}

const MenuService = {
  get,
  create,
  update,
  remove
}

export default MenuService;

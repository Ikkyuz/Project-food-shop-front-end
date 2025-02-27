import http from "../http-common";

const CategoryService = {
  get: () => http.get("/categories"),
};

export default CategoryService;

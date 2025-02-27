import http from "../http-common";

const OrderService = {
  get: () => http.get("/orders"),
};

export default OrderService;
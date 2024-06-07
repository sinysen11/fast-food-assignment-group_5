const axios = require("axios");

const ROOT_URL = "https://fakestoreapi.com";

export default {
  fetchProducts() {
    return axios.get(`${ROOT_URL}/products`, {
      params: {
        limit: "9",
      },
    });
  },
  fetchProductsByCategory(category) {
    const URL = `${ROOT_URL}/products/category/${category}`;
    return axios.get(URL);
  },
  fetchProduct(product_id) {
    return axios.get(`${ROOT_URL}/products/${product_id}`);
  },
  getIndexFor(array_items, compareTo) {
    return array_items.findIndex((item) => {
      return item.id === compareTo;
    });
  },
};

import API from "../API/API";
import Endpoints from "../API/endpoints";

class productServices {
  static createProduct(product) {
    return API.post(Endpoints?.api?.products?.create, product);
  } //createProduct

  static updateProduct(id, product) {
    return API.put(Endpoints?.api?.products?.update + id, product);
  } //updateproduct

  static deleteProduct(id, productName) {
    return API.delete(Endpoints?.api?.products.delete + id, productName);
  }
  static fetchOneProduct(id) {
    return API.get(Endpoints?.api?.products?.getOne + id);
  } //fetchOneproduct

  static fetchAllProduct(query = "") {
    return API.get(Endpoints?.api?.products?.getAll + query);
  } //fetchAllproducts
}

export default productServices;

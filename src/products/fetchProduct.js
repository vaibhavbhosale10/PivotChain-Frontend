import React, { useEffect, useState } from "react";
import productServices from "../services/productservices";
import Swal from "sweetalert2";

import "./fetch.css";
import Example from "../modal/modal";
import Button from "react-bootstrap/esm/Button";

const FetchProduct = () => {
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    try {
      const response = await productServices.fetchAllProduct();
      setProducts(response?.data?.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = (productName) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        productServices
          .deleteProduct(productName)
          .then((response) => {
            Swal.fire("Deleted!", "The product has been deleted.", "success");
            loadProducts();
          })
          .catch((err) => {
            console.error(err);
            Swal.fire(
              "Not Deleted!",
              "The product has not been deleted.",
              "error"
            );
          });
      }
    });
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div>
      <h2>Product Information</h2>
      <Example />
      <Button style={{ marginLeft: "50px" }} onClick={loadProducts}>
        Show Product List
      </Button>
      <div style={{ display: "flex", flexWrap: "wrap", marginLeft: "100px" }}>
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="card">
              <img
                src={product.productImg}
                alt="Product Image"
                style={{ maxWidth: "100%", height: "200px" }}
              />
              <div className="card-content">
                <div className="product-name">
                  Product Name: {product.productName}
                </div>
                <div className="price">Price: {product.price}</div>
                <div className="description">
                  Description: {product.description}
                </div>
                <div className="processor">Processor: {product.processor}</div>
                <div className="operating-system">
                  Operating System: {product.operatingSystem}
                </div>

                <button className="button edit-button">Update Product</button>
                <button className="button" onClick={deleteProduct}>
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default FetchProduct;

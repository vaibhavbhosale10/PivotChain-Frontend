import React, { useEffect, useState } from "react";
import productServices from "../services/productservices";
import Swal from "sweetalert2";
import { Form, Modal, Button } from "react-bootstrap";

import "../products/fetch.css";
import Example from "../modal/modal";

const UpdateProduct = () => {
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [updatedData, setUpdatedData] = useState({
    productName: "",
    productImg: "",
    price: "",
    description: "",
    processor: "",
    operatingSystem: "",
  });

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
          .deleteProduct(products.productName)
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

  const handleUpdate = () => {
    // Assuming you have an API endpoint for updating products on the server
    productServices
      .updateProduct(selectedProduct._id, updatedData)
      .then((response) => {
        setData(response.data);
        setSelectedProduct(null);
        setUpdatedData({
          productName: "",
          productImg: "",
          price: "",
          description: "",
          processor: "",
          operatingSystem: "",
        });
        loadProducts(); // Fetch the updated products after successful update
        handleClose(); // Close the modal after successful update
        Swal.fire("Updated!", "The product has been updated.", "success");
      })
      .catch((error) => {
        console.error("Error updating data:", error);
        Swal.fire("Error", "Failed to update the product.", "error");
      });
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setUpdatedData({
      productName: product.productName,
      productImg: product.productImg,
      price: product.price,
      description: product.description,
      processor: product.processor,
      operatingSystem: product.operatingSystem,
    });
    handleShow();
  };

  // Modal handling states
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

                <button
                  className="button edit-button"
                  onClick={() => handleEditProduct(product)}
                >
                  Update Product
                </button>
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

      {/* Modal for updating the product */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form method="POST" onSubmit={handleUpdate}>
            <Form.Group>
              <Form.Control
                style={{
                  border: "none",
                  backgroundColor: "#faf5ee",
                  fontSize: "16px",
                  marginBottom: 15,
                }}
                required
                size="lg"
                placeholder="Product Name"
                type="text"
                name="productName"
                value={updatedData.productName}
                onChange={(e) =>
                  setUpdatedData({
                    ...updatedData,
                    productName: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                style={{
                  border: "none",
                  backgroundColor: "#faf5ee",
                  fontSize: "16px",
                  marginBottom: 15,
                }}
                required
                size="lg"
                placeholder="Product img url"
                type="text"
                name="productImg"
                value={updatedData.productImg}
                onChange={(e) =>
                  setUpdatedData({ ...updatedData, productImg: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                style={{
                  border: "none",
                  backgroundColor: "#faf5ee",
                  fontSize: "16px",
                  marginBottom: 15,
                }}
                required
                size="lg"
                placeholder="price"
                type="text"
                name="price"
                value={updatedData.price}
                onChange={(e) =>
                  setUpdatedData({ ...updatedData, price: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                style={{
                  border: "none",
                  backgroundColor: "#faf5ee",
                  fontSize: "16px",
                  marginBottom: 15,
                }}
                required
                size="lg"
                placeholder="description"
                type="text"
                name="description"
                value={updatedData.description}
                onChange={(e) =>
                  setUpdatedData({
                    ...updatedData,
                    description: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                style={{
                  border: "none",
                  backgroundColor: "#faf5ee",
                  fontSize: "16px",
                  marginBottom: 15,
                }}
                required
                size="lg"
                placeholder="processor"
                type="text"
                name="processor"
                value={updatedData.processor}
                onChange={(e) =>
                  setUpdatedData({ ...updatedData, processor: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                style={{
                  border: "none",
                  backgroundColor: "#faf5ee",
                  fontSize: "16px",
                  marginBottom: 15,
                }}
                required
                size="lg"
                placeholder="operating System"
                type="text"
                name="operatingSystem"
                value={updatedData.operatingSystem}
                onChange={(e) =>
                  setUpdatedData({
                    ...updatedData,
                    operatingSystem: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Modal.Footer>
              <Button
                type="submit"
                style={{
                  marginTop: 5,
                  color: "white",
                  backgroundColor: "black",
                  border: "1px solid gold",
                  padding: 5,
                }}
              >
                Update Product
              </Button>
              <Button
                onClick={handleClose}
                style={{
                  marginTop: 5,
                  color: "white",
                  backgroundColor: "black",
                  border: "1px solid gold",
                  padding: 5,
                  marginLeft: 5,
                }}
                variant="secondary"
              >
                Close
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default UpdateProduct;

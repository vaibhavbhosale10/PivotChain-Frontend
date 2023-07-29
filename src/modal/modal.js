import { useState } from "react";
import React, { Fragment } from "react";
import Modal from "react-bootstrap/Modal";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Form from "react-bootstrap/esm/Form";
import Button from "react-bootstrap/esm/Button";
import productServices from "../services/productservices";
import Swal from "sweetalert2";

const Exclusive = () => {
  const [color, setColor] = useState("");
  const changeView = (e) => {
    setColor((e.target.style.color = "black"));
    setColor((e.target.style.backgroundColor = "white"));
    setColor((e.target.style.borderColor = "black"));
  };

  const revertChange = (e) => {
    setColor((e.target.style.color = "white"));
    setColor((e.target.style.backgroundColor = "black"));
    setColor((e.target.style.borderColor = "gold"));
  };

  const schema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    phone: yup.string().required(),
    date: yup.date().required(),
    time: yup.string().required(),
    services: yup.array().min(1).required(),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [productDetails, setProductDetails] = useState({
    productName: "",
    productImg: "",
    price: "",
    description: "",
    category: "",
    operatingSystem: "",
    processor: "",
    storage: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductDetails({ ...productDetails, [name]: value });
  };

  const onSubmit = async (e) => {
    handleClose();
    Swal.fire("Product Created!", "product created successfully!", "success");
    e.preventDefault();
    reset();

    productServices
      .createProduct(productDetails)
      .then((response) => {
        console.log(response);
        const message = response.data.message || "product created ...";
        console.log(message);
        Swal.fire(
          "Product Created!",
          "refresh page to see created product!",
          "success"
        );
      })
      .catch((err) => {
        console.log(err);
        const message =
          err?.response?.data.message ||
          "Could not create product, please try again!";
        console.log(message);
      });
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Fragment>
      <Button variant="primary" onClick={handleShow}>
        Create Product
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title
            style={{
              fontSize: "30px",
              color: "orange",
              fontFamily: "Delicious Handrawn,cursive",
            }}
          >
            Please fill the product details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form method="POST" onSubmit={onSubmit}>
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
                {...register("productName")}
                onChange={handleChange}
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
                {...register("productImg")}
                onChange={handleChange}
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
                {...register("price")}
                onChange={handleChange}
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
                type="text"
                placeholder="description"
                {...register("description")}
                onChange={handleChange}
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
                placeholder="Category"
                type="text"
                {...register("category")}
                onChange={handleChange}
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
                type="text"
                placeholder="Operating System"
                {...register("operatingSystem")}
                onChange={handleChange}
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
                type="text"
                placeholder="processor"
                {...register("processor")}
                onChange={handleChange}
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
                type="text"
                placeholder="storage"
                {...register("storage")}
                onChange={handleChange}
              />
            </Form.Group>

            <Modal.Footer>
              <Button
                onMouseOver={changeView}
                onMouseLeave={revertChange}
                onChange={handleChange}
                type="submit"
                style={{
                  marginTop: 5,
                  color: "white",
                  backgroundColor: "black",
                  border: "1px solid gold",
                  padding: 5,
                }}
              >
                Create Product
              </Button>
              <Button
                onClick={handleClose}
                onMouseOver={changeView}
                onMouseLeave={revertChange}
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
    </Fragment>
  );
};

export default Exclusive;

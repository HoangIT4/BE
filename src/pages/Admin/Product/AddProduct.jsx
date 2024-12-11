import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import Dropdown from "react-bootstrap/Dropdown";
import { useFormik } from "formik";
import * as Yup from "yup";
import DropdownButton from "react-bootstrap/DropdownButton";
import { addProduct } from "@/apis/productsService";

import { getBrands } from '@/apis/brandsService';
import { getCategories } from '@/apis/categoryService'

const AddProduct = () => {
  // Khai báo navigate để điều hướng
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // const [listProducts,setListProducts] = useState([]);
  const [listBrands, setListBrands] = useState([]);
  const [listCategories, setListCategories] = useState([]);

  useEffect(() => {
    // getProducts().then((res) => {
    //   setListProducts(res.data);
    // });

    getBrands().then((res) => {
      setListBrands(res.data);
    });

    getCategories().then((res) => {
      console.log(res);

      setListCategories(res.data);
    });
  }, []);



  const [productData, setProductData] = useState({
    name: "",
    src: "",
    preImg: "",
    brandID: "",
    categoryIDs: [],
    productDetailsRequest: [
      {
        price: 0,
        stock: 0,
        isHotDeal: false,
        isNew: false,
        isBestSeller: false,
        weight: "",
        origin: "",
        description: "",
        detailDes: "",
      },
    ],
  });



  const handleBack = () => {
    navigate("/admin/product");

  };
  // Hàm xử lý khi nhấn nút thêm sản phẩm
  const handleAddProduct = (e) => {
    e.preventDefault();
    addProduct(productData)
      .then((res) => {
        if(res.success){
          toast.success('Thêm sản phẩm thành công!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
  
          });
          navigate("/admin/product");
        }
        else{
          toast.error('Thêm sản phẩm thất bại!');
        }

      })
  };

  // Hàm để xử lý thay đổi giá trị các trường input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("productDetailsRequest")) {
      const field = name.split(".")[1];
      setProductData((prev) => ({
        ...prev,
        productDetailsRequest: [{ ...prev.productDetailsRequest[0], [field]: value }],
      }));
    } else {
      setProductData({ ...productData, [name]: value });
    }
  };

  const handleBrandChange = (e) => {
    const { value } = e.target;
    setProductData((prev) => ({
      ...prev,
      brandID: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;

    if (name === "categoryIDs") {
      const value = e.target.value;
      setProductData((prev) => {
        const updatedCategories = checked
          ? [...prev.categoryIDs, value]
          : prev.categoryIDs.filter((id) => id !== value);
        return { ...prev, categoryIDs: updatedCategories };
      });
    } else {
      setProductData((prev) => ({
        ...prev,
        productDetailsRequest: [
          { ...prev.productDetailsRequest[0], [name]: checked },
        ],
      }));
    }
  };




  return (
    <>
      <div className="container">
        <h2 className="my-4">Thêm Sản Phẩm Mới</h2>
        <Form onSubmit={handleAddProduct}>
          <Form.Group className="mb-3" controlId="productName">
            <Form.Label>Tên sản phẩm</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={productData.name}
              onChange={handleInputChange}
              placeholder="Nhập tên sản phẩm"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="brandName">
            <Form.Label>Brand</Form.Label>
            <Form.Select
              name="brandID"
              value={productData.brandID}
              onChange={handleBrandChange}
            >
              <option value="">Chọn thương hiệu</option>
              {listBrands.map((brand) => (
                <option key={brand.brandID} value={brand.brandID}>
                  {brand.brandName}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="productWeight">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="text"
              name="productDetailsRequest.price"
              value={productData.productDetailsRequest[0].price}
              onChange={handleInputChange}
              placeholder="Nhập giá trị sản phẩm ( Viết dạng X.XXX Đ )"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="productWeight">
            <Form.Label>Weight</Form.Label>
            <Form.Control
              type="text"
              name="productDetailsRequest.weight"
              value={productData.Weight}
              onChange={handleInputChange}
              placeholder="Nhập khối lượng sản phẩm"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="productOrigin">
            <Form.Label>Origin</Form.Label>
            <Form.Control
              type="text"
              name="productDetailsRequest.origin"
              value={productData.productDetailsRequest[0].origin}
              onChange={handleInputChange}
              placeholder="Nhập xuất xứ"
            />
          </Form.Group>

          <Form.Group controlId="brandLogo" className="mb-3">
            <Form.Label>Brand Logo </Form.Label>
            <Form.Control type="file" />
          </Form.Group>


          <h5 style={{ paddingBottom: '10px', paddingTop: '20px' }}>Description</h5>
          <div>Title description</div>
          <div className="input-group">
            <textarea className="form-control" aria-label="With textarea"></textarea>
          </div>

          <div style={{ paddingTop: '20px' }}>Detail description</div>
          <div className="input-group" style={{ paddingBottom: '20px' }}>
            <textarea className="form-control" style={{ height: '200px' }} aria-label="With textarea"></textarea>
          </div>


          <Form.Group className="mb-3" controlId="stock">
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="number"
              name="productDetailsRequest.stock"
              value={productData.productDetailsRequest[0].stock}
              onChange={handleInputChange}
              placeholder="Nhập số lượng tồn kho"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="product">
            <Form.Label>Phân loại sản phẩm</Form.Label>
            <div>
              <Form.Check
                type="checkbox"
                label="Hot Deal"
                name="isHotDeal"
                checked={productData.productDetailsRequest[0].isHotDeal}
                onChange={handleCheckboxChange}
              />
              <Form.Check
                type="checkbox"
                label="New"
                name="isNew"
                checked={productData.productDetailsRequest[0].isNew}
                onChange={handleCheckboxChange}
              />
              <Form.Check
                type="checkbox"
                label="Best Seller"
                name="isBestSeller"
                checked={productData.productDetailsRequest[0].isBestSeller}
                onChange={handleCheckboxChange}
              />
            </div>
          </Form.Group>

          <Form.Group className="mb-3" controlId="category">
            <Form.Label>Category</Form.Label>
            <DropdownButton id="dropdown-basic-button" title="Chọn danh mục">
              <div style={{ padding: "10px", maxHeight: "800px", overflowY: "auto" }}>
                {listCategories.map((category) => (
                  <Form.Check
                    name="categoryIDs"
                    key={category.categoryID}
                    type="checkbox"
                    label={category.categoryName}
                    value={category.categoryID}
                    checked={productData.categoryIDs.includes(category.categoryID)}
                    onChange={handleCheckboxChange}
                  />
                ))}
              </div>
            </DropdownButton>
          </Form.Group>

          <Form.Group className="mb-3" controlId="src">
            <Form.Label>Hình ảnh chính (src)</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => {
                const file = e.target.files[0];
                setProductData({ ...productData, src: file }); // Lưu tệp
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="preImg">
            <Form.Label>Hình ảnh thay thế (preImg)</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => {
                const file = e.target.files[0];
                setProductData({ ...productData, preImg: file }); // Lưu tệp
              }}
            />
          </Form.Group>


          <div className="mt-3">
            <Button onClick={handleShow} variant="secondary" className="me-2 mb-2">
              Hủy
            </Button>
            <Button
              onClick={handleAddProduct}
              variant="primary" type="submit" className="mb-2">
              Thêm Sản Phẩm
            </Button>
          </div>



        </Form>
      </div>


      {/* Modal confirmation */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Bạn có muốn hủy không?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Các thay đổi của bạn sẽ không được lưu!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleBack}>
            Xác nhận hủy
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddProduct;

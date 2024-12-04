import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';

const AddProduct = () => {
  // Khai báo navigate để điều hướng
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [productData, setProductData] = useState({
    name: "",
    brandName: "",
    brandLogo: "",
    stock: 0,
    category: "",
    images: ["", ""],
    styles: "",
  });

  const handleBack = () =>{
    navigate("/admin/product");

  };

  // Hàm để xử lý thay đổi giá trị các trường input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };


  // Hàm xử lý khi nhấn nút thêm sản phẩm
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Product Data Submitted:", productData);
    // Thực hiện API POST để gửi `productData` lên server
  };

  return (
    <>
    <div className="container">
      <h2 className="my-4">Thêm Sản Phẩm Mới</h2>
      <Form onSubmit={handleSubmit}>
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
          <Form.Label>Thương hiệu</Form.Label>
          <Form.Control
            type="text"
            name="brandName"
            value={productData.brandName}
            onChange={handleInputChange}
            placeholder="Tên thương hiệu"
          />
        </Form.Group>

        <Form.Group controlId="brandLogo" className="mb-3">
          <Form.Label>Brand Logo </Form.Label>
          <Form.Control type="file" />
        </Form.Group>


        <h5 style={{paddingBottom:'10px',paddingTop:'20px'}}>Description</h5>
        <div>Title description</div>
        <div class="input-group">
          <textarea class="form-control" aria-label="With textarea"></textarea>
        </div>

        <div style={{paddingTop:'20px'}}>Detail description</div>
        <div class="input-group" style={{paddingBottom:'20px'}}>
          <textarea class="form-control" style={{height:'200px'}}  aria-label="With textarea"></textarea>
        </div>
        

        <Form.Group className="mb-3" controlId="stock">
          <Form.Label>Stock</Form.Label>
          <Form.Control
            type="number"
            name="stock"
            value={productData.stock}
            onChange={handleInputChange}
            placeholder="Nhập số lượng tồn kho"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="category">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            name="category"
            value={productData.category}
            onChange={handleInputChange}
            placeholder="Nhập mã danh mục"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="images">
          <Form.Label>Hình ảnh</Form.Label>
          
          {productData.images.map((img, idx) => (
            <div key={idx} className="mb-3">
              <div>{`Hình ${idx + 1}`}</div>
              <Form.Control
                type="file"
                value={img}
                onChange={(e) => {
                  const newImages = [...productData.images];
                  newImages[idx] = e.target.value;
                  setProductData({ ...productData, images: newImages });
                }}
                className="mb-2"
              />
            </div>  
          ))}
        </Form.Group>

       
        <div className="mt-3">
          <Button onClick={handleShow} variant="secondary" className="me-2 mb-2">
            Hủy
          </Button>
          <Button variant="primary" type="submit" className="mb-2">
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

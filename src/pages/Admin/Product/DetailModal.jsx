// DetailModal.js
import React from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import styles from "./DetailModal.module.scss"; // File CSS để tuỳ chỉnh thêm

const DetailModal = ({ show, onClose, selectedProduct }) => {
  return (
    <Modal show={show} onHide={onClose} centered size="lg" className={styles.modal} style={{ zIndex: 1500 }}  >
      <Modal.Header closeButton>
        <Modal.Title className={styles.modalTitle}>Product Details</Modal.Title>
      </Modal.Header>
        
      <Modal.Body style={{ maxHeight: "70vh", overflowY: "auto" }}>
        {selectedProduct ? (
          <>
            {/* Hình ảnh sản phẩm */}
            <div className="text-center mb-4">
              {/* Ảnh chính */}
              <img 
                src={selectedProduct.src} 
                alt={selectedProduct.name} 
                style={{ maxWidth: "100%", height: "auto", borderRadius: "10px" }} 
              />

              {/* Ảnh phụ */}
              <div className="mt-3">
                <img 
                  src={selectedProduct.preImg} 
                  alt={`${selectedProduct.name} - Thumbnail`} 
                  style={{ maxWidth: "150px", height: "auto", borderRadius: "5px", border: "1px solid #ddd" }} 
                />
              </div>
            </div>

            {/* Thông tin cơ bản */}
            <Row className="mb-4">
              <Col xs={12} md={6}>
                <p><strong>ID:</strong> {selectedProduct.productID}</p>
                <p><strong>Name:</strong> {selectedProduct.name}</p>
                <p><strong>Brand:</strong> {selectedProduct.brands?.brandName || "Unknown"}</p>
              </Col>
              <Col xs={12} md={6}>
                <p><strong>Price:</strong> {selectedProduct.price.toLocaleString()} đ</p>
                <p><strong>Stock:</strong> {selectedProduct.stock}</p>
                <p><strong>Rating:</strong> {selectedProduct.rating || 0} / 5</p>
              </Col>
            </Row>

            {/* Mô tả sản phẩm */}
            <div className="mb-4">
              <h5>Description</h5>
              <p>{selectedProduct.detailDes}</p>
            </div>

            {/* Categories (nếu có) */}
            {selectedProduct.categories && (
              <div>
                <h5>Categories</h5>
                <ul>
                  {selectedProduct.categories.map((cat, index) => (
                    <li key={index}>{cat.categoryName}</li>
                  ))}
                </ul>
              </div>
            )}
          </>
        ) : (
          <p>No product details available.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>

  );
};

export default DetailModal;

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
          <div className={styles.productDetails}>
            <Row className="mb-4">
              <Col xs={12} md={6}>
                <p className={styles.detailItem}><strong>ID:</strong> {selectedProduct.id}</p>
                <p className={styles.detailItem}><strong>Name:</strong> {selectedProduct.name}</p>
              </Col>
              <Col xs={12} md={6}>
                <p className={styles.detailItem}><strong>Brand:</strong> {selectedProduct.brand.name}</p>
              </Col>
            </Row>
            
            <h5 className={styles.variantTitle}>Variants:</h5>
            {selectedProduct.variants.map((variant, idx) => (
              <div key={idx} className={styles.variant}>
                <Row className="align-items-center">
                  <Col xs={12}>
                    <p className={styles.variantColor}><strong>Color:</strong> {variant.color}</p>
                  </Col>
                </Row>
                <Row>
                  {Object.keys(variant.sizes).map((sizeKey) => (
                    <Col xs={12} md={6} key={sizeKey} className={styles.sizeInfo}>
                      <div className={styles.sizeDetails}>
                        <p><strong>Size:</strong> {sizeKey.toUpperCase()}</p>
                        <p><strong>Price:</strong> ${variant.sizes[sizeKey].price}</p>
                        <p><strong>Rental Price:</strong> ${variant.sizes[sizeKey].rental}</p>
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>
            ))}
          </div>
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

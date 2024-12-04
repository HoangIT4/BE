import React from 'react';
import { Modal, Button, Form, Row, Col, InputGroup } from 'react-bootstrap';

const ModalForm = ({ show, handleClose, newOrder, handleInputChange, handleAddOrder }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create New Order</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Enter name" 
                  name="name" 
                  value={newOrder.name} 
                  onChange={handleInputChange} 
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formProducts">
                <Form.Label>Products</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Enter products" 
                  name="products" 
                  value={newOrder.products} 
                  onChange={handleInputChange} 
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Group controlId="formAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Enter address" 
                  name="address" 
                  value={newOrder.address} 
                  onChange={handleInputChange} 
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formDate">
                <Form.Label>Date</Form.Label>
                <Form.Control 
                  type="date" 
                  name="date" 
                  value={newOrder.date} 
                  onChange={handleInputChange} 
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Group controlId="formStatus">
                <Form.Label>Status</Form.Label>
                <Form.Select 
                  name="status" 
                  value={newOrder.status} 
                  onChange={handleInputChange}>
                  <option value="Pending">Pending</option>
                  <option value="Success">Success</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formPrice">
                <Form.Label>Price</Form.Label>
                <InputGroup>
                  <Form.Control 
                    type="number" 
                    placeholder="Enter price" 
                    name="price" 
                    value={newOrder.price} 
                    onChange={handleInputChange} 
                  />
                  <InputGroup.Text>đ</InputGroup.Text>
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleAddOrder}>
          Add Order
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalForm;

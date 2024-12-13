import React from 'react';
import { Modal, Button, Table } from 'react-bootstrap';

const OrderDetailModal = ({ show, onClose, order }) => {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Order Detail</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Order ID:</strong> {order.orderID}</p>
        <p><strong>User ID:</strong> {order.userID}</p>
        <p><strong>Address:</strong> {order.address}</p>
        <p><strong>Phone Number:</strong> {order.phoneNumber}</p>
        <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
        <p><strong>Status:</strong> {order.status}</p>
        <p><strong>Total Price:</strong> {order.totalPrice}</p>
        <p><strong>Create At:</strong> {new Date(order.createAt).toLocaleString()}</p>
        {/* Add any other details you need */}

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {order.orderItems && order.orderItems.length > 0 ? (
              order.orderItems.map((item) => (
                <tr key={item.orderItemID}>
                  <td>{item.productName || 'N/A'}</td>
                  <td>{item.price.toFixed(3)} đ</td>
                  <td>{item.quantity}</td>
                  <td>{item.totalPrice.toFixed(3)} đ</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No items available.</td>
              </tr>
            )}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OrderDetailModal;

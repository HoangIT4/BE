import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const DetailUserModal = ({ show, onClose, selectedItem }) => {
  if (!selectedItem) return null; // Không render nếu không có dữ liệu.

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Thông Tin Chi Tiết</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>ID:</strong> {selectedItem.id}</p>
        <p><strong>Name:</strong> {selectedItem.name}</p>
        <p><strong>Email:</strong> {selectedItem.email}</p>
        <p><strong>Role:</strong> {selectedItem.role}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DetailUserModal;

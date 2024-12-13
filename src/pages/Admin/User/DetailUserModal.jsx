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
        <p><strong>Name:</strong> {selectedItem.userName || 'Chưa có tên'}</p>
        <p><strong>Email:</strong> {selectedItem.email || 'Chưa có email'}</p>
        <p><strong>Số điện thoại:</strong> {selectedItem.phoneNumber || 'Chưa có số điện thoại'}</p>
        <p><strong>Địa chỉ:</strong> {selectedItem.address || 'Chưa có địa chỉ'}</p>
        <p><strong>Giới tính:</strong> {selectedItem.gender || 'Chưa có giới tính'}</p>
        <p><strong>Ngày sinh:</strong> {selectedItem.birthday ? new Date(selectedItem.birthday).toLocaleDateString() : 'Chưa có ngày sinh'}</p>
        <p><strong>Ngày tạo:</strong> {new Date(selectedItem.createdAt).toLocaleDateString()}</p>
        <p><strong>Cập nhật lần cuối:</strong> {selectedItem.updatedAt ? new Date(selectedItem.updatedAt).toLocaleDateString() : 'Chưa có cập nhật'}</p>
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

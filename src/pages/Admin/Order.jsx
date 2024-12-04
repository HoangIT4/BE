import React, { useState } from 'react';
import { ButtonGroup, Button, Table } from 'react-bootstrap';
import "react-icons/fa";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faFilter, faSort, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import ModalForm from '@components/ModalForm';
import ContextMenu from '@components/ContextMenu'; // Import ContextMenu
 // Import CSS cho context menu

const Order = () => {
  document.title="Quản trị - Đơn hàng"
  const [showModal, setShowModal] = useState(false);
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState({
    name: '',
    products: '',
    address: '',
    date: '',
    status: '',
    price: ''
  });

  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const [contextMenuPos, setContextMenuPos] = useState({ x: 0, y: 0 });
  const [selectedOrderIndex, setSelectedOrderIndex] = useState(null);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleInputChange = (e) => {
    setNewOrder({ ...newOrder, [e.target.name]: e.target.value });
  };

  const handleAddOrder = () => {
    setOrders([...orders, newOrder]);
    setNewOrder({
      name: '',
      products: '',
      address: '',
      date: '',
      status: '',
      price: ''
    });
    handleCloseModal();
  };

  const handleRightClick = (e, index) => {
    e.preventDefault();
    setContextMenuVisible(true);
    setContextMenuPos({ x: e.pageX, y: e.pageY });
    setSelectedOrderIndex(index);
  };

  const handleCloseContextMenu = () => {
    setContextMenuVisible(false);
  };

  const handleExport = () => {
    console.log("Export order:", selectedOrderIndex);
    handleCloseContextMenu();
  };

  const handleDelete = () => {
    const updatedOrders = orders.filter((_, index) => index !== selectedOrderIndex);
    setOrders(updatedOrders);
    handleCloseContextMenu();
  };

  return (
    <div className="container-fluid">
      {/* Tiêu đề và nút */}
      <div className="row mt-4">
        <h2 className="col-12 col-md-6 d-flex justify-content-between align-items-center">Order</h2>
        <div className="col-12 col-md-6 d-flex justify-content-end">
          <button className="btn btn-secondary me-2 py-1">Export</button>
          <button className="btn btn-primary" onClick={handleShowModal}>Create Order</button>
        </div>
      </div>

      {/* ButtonGroup */}
      <div className="row my-3">
        <div className="col-12 d-flex justify-content-between align-items-center flex-wrap">
          <ButtonGroup aria-label="Order Filter" className="mb-2 mb-md-0">
            <Button className="btn-primary" active>All</Button>
            <Button variant="outline-secondary">Unpaid</Button>
          </ButtonGroup>

          <ButtonGroup aria-label="Order Actions">
            <Button variant="outline-secondary">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </Button>
            <Button variant="outline-secondary">
              <FontAwesomeIcon icon={faFilter} />
            </Button>
            <Button variant="outline-secondary">
              <FontAwesomeIcon icon={faSort} />
            </Button>
            <Button variant="outline-secondary">
              <FontAwesomeIcon icon={faEllipsisH} />
            </Button>
          </ButtonGroup>
        </div>
      </div>

      {/* Bảng đơn hàng */}
      <div className="table-responsive">
        <Table striped bordered hover className="text-center">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Products</th>
              <th>Address</th>
              <th>Date</th>
              <th>Status</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="7">No orders yet.</td>
              </tr>
            ) : (
              orders.map((order, index) => (
                <tr key={index} onContextMenu={(e) => handleRightClick(e, index)}>
                  <td>{index + 1}</td>
                  <td>{order.name}</td>
                  <td>{order.products}</td>
                  <td>{order.address}</td>
                  <td>{order.date}</td>
                  <td>{order.status}</td>
                  <td>{order.price} đ</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>

      {/* Modal thêm đơn hàng */}
      <ModalForm
        show={showModal}
        handleClose={handleCloseModal}
        newOrder={newOrder}
        handleInputChange={handleInputChange}
        handleAddOrder={handleAddOrder}
      />

      {/* Context menu */}
      {contextMenuVisible && (
        <ContextMenu
          x={contextMenuPos.x}
          y={contextMenuPos.y}
          onExport={handleExport}
          onDelete={handleDelete}
          onClose={handleCloseContextMenu}
        />
      )}
    </div>
  );
};

export default Order;

  import React, { useState, useEffect } from 'react';
  import { ButtonGroup, Button, Table } from 'react-bootstrap';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { faMagnifyingGlass, faFilter, faSort, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
  import ModalForm from '../../../components/ModalForm';
  import ContextMenu from '../../../components/ContextMenu';
  // import { HOST_API } from '../../../config/url'; 
  import {createOrder, getOrder ,deleteOrder ,getOrderByID,updateOrder ,getOrderForAdmin} from '@/apis/orderService';

  const Order = () => {
    document.title = "Quản trị - Đơn hàng";

    const [showModal, setShowModal] = useState(false);
    const [orders, setOrders] = useState([]);
    const [newOrder, setNewOrder] = useState({
      userID: '',
      address: '',
      phoneNumber: '',
      paymentMethod: '',
      orderItems: [],
    });


  
    const [contextMenuVisible, setContextMenuVisible] = useState(false);
    const [contextMenuPos, setContextMenuPos] = useState({ x: 0, y: 0 });
    const [selectedOrderIndex, setSelectedOrderIndex] = useState(null);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleInputChange = (e) => {
      setNewOrder({ ...newOrder, [e.target.name]: e.target.value });
    };





    const [updatingOrderID, setUpdatingOrderID] = useState(null);
    const handleUpdateStatus = async (orderID, newStatus) => {
      try {
        setUpdatingOrderID(orderID);
        const body = { status: newStatus };
        const updatedOrder = await updateOrder(orderID, body);
  
        setOrders((prevOrders) => {
          return prevOrders.map((order) =>
            order.orderID === orderID
              ? { ...order, status: updatedOrder.status ?? order.status }
              : order
          );
        });
      } catch (error) {
        console.error("Error updating order status:", error);
      } finally {
        setUpdatingOrderID(null);
      }
    };


    const handleAddOrder = async () => {
      try {
        const newOrderData = await createOrder(newOrder);
        setOrders([...orders, newOrderData]);
        setNewOrder({
          userID: '',
          address: '',
          phoneNumber: '',
          paymentMethod: '',
          orderItems: [],
        });
        handleCloseModal();
      } catch (error) {
        console.error('Error creating order:', error);
      }
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
      console.log("Export order:", orders[selectedOrderIndex]);
      handleCloseContextMenu();
    };

    const handleDelete = async () => {
      try {
        await deleteOrder(orders[selectedOrderIndex].orderID);
        const updatedOrders = orders.filter((_, index) => index !== selectedOrderIndex);
        setOrders(updatedOrders);
      } catch (error) {
        console.error('Error deleting order:', error);
      }
      handleCloseContextMenu();
    };


    useEffect(() => {
      getOrderForAdmin()
        .then((res) => {
          // Kiểm tra xem dữ liệu trả về có phải là mảng không
          if (Array.isArray(res)) {
            setOrders(res);
          } else if (res && Array.isArray(res.data)) {
            setOrders(res.data); // Nếu res.data là mảng
          } else {
            console.error("Unexpected data format:", res);
            setOrders([]); // Đặt giá trị rỗng nếu dữ liệu không hợp lệ
          }
        })
        .catch((error) => {
          console.error("Error fetching orders:", error);
          setOrders([]); // Xử lý khi lỗi xảy ra
        });
    }, []);
    

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
                <th>User ID</th>
                <th>Address</th>
                <th>Phone Number</th>
                <th>Payment Method</th>
                <th>Status</th>
                <th>Total Price</th>
                <th>Create At</th>
              </tr>
            </thead>
            <tbody>
            {orders && orders.length > 0 ? (
              orders.map((order, index) => (
                <tr key={order.orderID}>
                  <td>{order.orderID}</td>
                  <td>{order.userID}</td>
                  <td>{order.address}</td>
                  <td>{order.phoneNumber}</td>
                  <td>{order.paymentMethod}</td>
                  <td>
                    {updatingOrderID === order.orderID ? (
                      <span>Updating...</span>
                    ) : (
                      <select
                        value={typeof order.status === 'number' ? order.status : 0}
                        onChange={(e) => handleUpdateStatus(order.orderID, parseInt(e.target.value, 10))}
                      >
                        <option value={0}>Pending</option>
                        <option value={1}>Approved</option>
                        <option value={2}>Canceled</option>
                      </select>
                    )}
                  </td>
                  <td>{order.totalPrice} đ</td>
                  <td>{new Date(order.createAt).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">No orders available.</td>
              </tr>
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

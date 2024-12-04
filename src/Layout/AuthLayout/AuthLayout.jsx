import React, { useState } from "react"; 
import "bootstrap/dist/css/bootstrap.min.css";
import "boxicons/css/boxicons.min.css";
import Sidebar from "./SidebarAdmin";
import Header from "./HeaderAdmin";
import "../../assets/styles/Layout/AuthLayout.scss";
import { useMediaQuery } from 'react-responsive';
import Modal from 'react-bootstrap/Modal';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthLayout = (props) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [nextPath, setNextPath] = useState('');
  const isMobile = useMediaQuery({ query: '(max-width: 974px)' });
  const navigate = useNavigate();
  const location = useLocation(); // Lấy đường dẫn hiện tại

  const handleMenuClick = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleNavigation = (path) => {
    // Kiểm tra nếu đang ở trang addProduct
    if (location.pathname === '/admin/product/add') {
      setNextPath(path); // Lưu đường dẫn cần điều hướng
      setShowConfirmModal(true); // Hiển thị modal xác nhận
    } else {
      setSidebarOpen(isSidebarOpen);
      navigate(path); // Điều hướng ngay nếu không phải trang addProduct
    }
  };

  const confirmNavigation = () => {
    setShowConfirmModal(false); // Đóng modal
    setSidebarOpen(isSidebarOpen); 
    navigate(nextPath); // Thực hiện điều hướng sau khi xác nhận
  };

  const cancelNavigation = () => {
    setShowConfirmModal(false); // Đóng modal nếu người dùng chọn hủy
  };

  return (
    <div className="app-container">
      {isMobile ? (
        <>
          {isSidebarOpen && <div className="modal-backdrop fade show"></div>}
          <div className={`offcanvas offcanvas-start ${isSidebarOpen ? 'show' : ''}`} tabIndex="-1" id="offcanvasWithBothOptions" style={{zIndex: 1088, width: "300px"}}>
            <div className="offcanvas-header">
              <button type="button" className="btn-close" onClick={handleMenuClick}></button>
            </div>
            <div className="offcanvas-body">
              <Sidebar onMenuItemClick={handleNavigation} />
            </div>
          </div>
        </>
      ) : (
        isSidebarOpen && (
          <div className="d-none d-md-flex flex-column sidebar">
            <Sidebar onMenuItemClick={handleNavigation} />
          </div>
        )
      )}
      <div className="main-content">
        <Header onMenuClick={handleMenuClick} />
        <div className="content">
          <div className="page-content">{props.children}</div>  
        </div>
      </div>

      {/* Modal xác nhận */}
      <Modal show={showConfirmModal} onHide={cancelNavigation}>
        <Modal.Header closeButton>
          <Modal.Title>Xác Nhận</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có chắc chắn muốn chuyển hướng? Các thay đổi của bạn sẽ không được lưu!</Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={cancelNavigation}>Hủy</button>
          <button className="btn btn-primary" onClick={confirmNavigation}>Xác Nhận</button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AuthLayout;

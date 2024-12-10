import React, { useState, useEffect, useMemo } from 'react';
import { IoMdEye } from 'react-icons/io';
import { MdDelete } from 'react-icons/md';
import { FaPen } from "react-icons/fa";
import { MaterialReactTable } from 'material-react-table'; // Cập nhật import
import DetailUserModal from './DetailUserModal';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'react-toastify/dist/ReactToastify.css';

const UserTable = () => {
  const dataUser =[
    { id: 1, email: 'minhhoang2003bn@gmail.com', username: 'Phạm Minh Hoàng', createdAt: '2024-012-01' },
    { id: 2, email: 'dung@gmail.com', username: 'Nguyễn Tiến Dũng', createdAt: '2024-012-02' },
  ]
  const [data, setData] = useState(dataUser);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Fetch data từ users.json
  // useEffect(() => {
  //   fetch('/users.json')
  //     .then((response) => response.json())
  //     .then((jsonData) => setData(jsonData))
  //     .catch((error) => console.error('Error fetching user data:', error));
  // }, []);

  // Các cột của bảng
  const columns = useMemo(() => [
    {
      accessorKey: 'id',
      header: 'ID',
      size: 30,
    },
    {
      accessorKey: 'username',
      header: 'Name',
      size: 200,
    },
    {
      accessorKey: 'email',
      header: 'Email',
      size: 200,
    },
    // {
    //   accessorKey: 'role',
    //   header: 'Role',
    //   size: 100,
    // },
    {
      header: 'View',
      Cell: ({ row }) => (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',width:'50px' }}>
          <IoMdEye
            style={{ cursor: 'pointer', color: '#007bff', fontSize: '1.5em' }}
            onClick={() => handleShowDetail(row.original)}
          />
        </div>
      ),
    },
    {
      header: 'Actions',
      Cell: ({ row }) => (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '100px' }}>
          <FaPen style={{ cursor: 'pointer', color: '#007bff', fontSize: '1.2em',marginRight:'10px'}} />
          <MdDelete
            style={{ cursor: 'pointer', color: '#ff4d4f', fontSize: '1.5em' }}
            onClick={() => handleShowDelete(row.original)}
          />
        </div>
      ),
    },
  ], []);

  // Hàm xử lý xem chi tiết
  const handleShowDetail = (user) => {
    setSelectedUser(user);
    setShowDetailModal(true);
  };

  const handleCloseDetail = () => {
    setShowDetailModal(false);
    setSelectedUser(null);
  };

  // Hàm xử lý xóa
  const handleShowDelete = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const handleCloseDelete = () => setShowDeleteModal(false);

  const handleDelete = () => {
    setData((prev) => prev.filter((user) => user.id !== selectedUser.id));
    setShowDeleteModal(false);
    setSelectedUser(null);

    toast.success('Xóa người dùng thành công', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      pauseOnHover: true,
      transition: Bounce,
    });
  };

  return (
    <>
      <MaterialReactTable
        data={data}
        columns={columns}
        enableRowSelection={false}
        initialState={{ pagination: { pageSize: 5, pageIndex: 0 } }}
      />

      {/* Modal chi tiết */}
      <DetailUserModal
        show={showDetailModal}
        onClose={handleCloseDetail}
        selectedItem={selectedUser}
      />

      {/* Modal xác nhận xóa */}
      <Modal show={showDeleteModal} onHide={handleCloseDelete} centered>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận xóa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn có muốn xóa người dùng <strong>{selectedUser?.name}</strong> không?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDelete}>
            Hủy
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Thông báo */}
      <ToastContainer />
    </>
  );
};

export default UserTable;

import { Button } from 'react-bootstrap';
import { useEffect, useMemo, useState } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { IoMdEye } from "react-icons/io";
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import DetailModal from './DetailModal';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductTable = () => {
  const [data, setData] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  
  const handleShowDetail = (product) => {
    setSelectedProduct(product);
    setShowDetailModal(true);
  };
  
  const handleCloseDetail = () => {
    setShowDetailModal(false);
    setSelectedProduct(null);
  };

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleCloseDelete = () => setShowDeleteModal(false);
  const handleShowDelete = () => setShowDeleteModal(true);
  const handleDelete = () => {
    handleCloseDelete();
    toast.success('Xóa sản phẩm thành công', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  // Fetch data from category.json
  useEffect(() => {
    fetch('/category.json')
      .then((response) => response.json())
      .then((jsonData) => setData(jsonData))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  // Memoized columns
  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 30,
      },
      {
        accessorKey: 'name',
        header: 'Product Name',
        size: 200,
      },
      {
        accessorKey: 'brand.name',
        header: 'Brand Name',
        size: 100,
      },
      {
        accessorKey: 'variants',
        header: 'Variants',
        Cell: ({ cell }) => (
          <ul>
            {cell.getValue().map((variant, index) => (
              <li key={index}>
                {variant.color} - S: ${variant.sizes.s.price} / M: $
                {variant.sizes.m.price} / L: ${variant.sizes.l.price}
              </li>
            ))}
          </ul>
        ),
        size: 200,
      },
      {
        accessorKey: 'stock',
        header: 'Stock',
        size: 50,
      },
      {
        accessorKey: 'styles',
        header: 'Styles',
        size: 50,
      },
      {
        header: 'View',
        Cell: ({ row }) => (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <IoMdEye
              style={{ cursor: 'pointer', color: '#007bff', fontSize: '1.5em' }}
              onClick={() => handleShowDetail(row.original)}
            />
          </div>
        ),
        size: 100,
      },
      {
        header: 'Actions',
        Cell: ({ row }) => (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <FaPen style={{ cursor: 'pointer', color: '#007bff', fontSize: '1.2em', marginRight: '10px'}} />
            <MdDelete style={{ cursor: 'pointer', color: '#007bff', fontSize: '1.5em' }}
              onClick={handleShowDelete}
            />
          </div>
        ),
        size: 100,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data,
    enableRowSelection: true,
    positionToolbarAlertBanner: "top",
    initialState: { pagination: { pageSize: 10, pageIndex: 0 } },
  });

  return (
    <>
      <MaterialReactTable table={table} />

      <DetailModal
        show={showDetailModal}
        onClose={handleCloseDetail}
        selectedProduct={selectedProduct}
        style={{ zIndex: 1500 }} // Higher z-index for DetailModal
      />

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={handleCloseDelete} style={{ zIndex: 1500 }}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có muốn xóa sản phẩm này không?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDelete}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Toastify Notification */}
      <ToastContainer
        style={{ zIndex: 1500 }} // Higher z-index for ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
};

export default ProductTable;

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
import { getProducts, deleteProduct, getProductById } from '@/apis/productsService';
import { useNavigate } from 'react-router-dom';

const ProductTable = () => {
  const [listProducts, setListProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getProducts().then((res) => {    
      setListProducts(res.data);
    });
  }, []);

  const handleShowDetail = async (productID) => {
    const productData = await getProductById(productID);
    setSelectedProduct(productData);
    setShowDetailModal(true);
  };
  
  const handleCloseDetail = () => {
    setShowDetailModal(false);
    setSelectedProduct(null);
  };

  const handleShowDelete = (productID) => {
    setProductToDelete(productID);
    setShowDeleteModal(true);
  };

  const handleCloseDelete = () => {
    setShowDeleteModal(false);
    setProductToDelete(null);
  };

  const handleShowEdit = (productID) => {
    navigate(`/admin/product/update/${productID}`);
  };

  const handleDelete = () => {
    if (!productToDelete) return;

    deleteProduct(productToDelete)
      .then(() => {
        setListProducts((prevList) => 
          prevList.filter((product) => product.productID !== productToDelete)
        );

        toast.success('Xóa sản phẩm thành công', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        handleCloseDelete();
      })
      .catch((err) => {
        toast.error('Xóa sản phẩm thất bại', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      });
  };

  const columns = useMemo(
    () => [
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
              onClick={() => handleShowDetail(row.original.productID)}
            />
          </div>
        ),
        size: 100,
      },
      { accessorKey: 'name', header: 'Product Name', size: 200 },
      { 
        accessorKey: 'brand',
        header: 'Brand Name', 
        size: 100,
        Cell: ({ row }) => {
          const { brandName } = row.original.brands;
          return brandName || 'Unknown'; 
        }
      },
      { 
        accessorKey: 'formattedPrice', 
        header: 'Price', 
        size: 50,
        Cell: ({ row }) => {
          const price = row.original.formattedPrice || 0;
          return `${price} đ`;
        }
      },
      { accessorKey: 'stock', header: 'Stock', size: 50 },
      {
        header: 'Actions',
        Cell: ({ row }) => (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <FaPen 
              style={{ cursor: 'pointer', color: '#007bff', fontSize: '1.2em', marginRight: '10px'}} 
              onClick={() => handleShowEdit(row.original.productID)}
            />
            <MdDelete 
              style={{ cursor: 'pointer', color: '#007bff', fontSize: '1.5em' }}
              onClick={() => handleShowDelete(row.original.productID)}
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
    data: listProducts,
    enableRowSelection: true,
    positionToolbarAlertBanner: "top",
    initialState: { pagination: { pageSize: 5, pageIndex: 0 } },
  });

  return (
    <>
      <MaterialReactTable table={table} />

      <DetailModal
        show={showDetailModal}
        onClose={handleCloseDetail}
        selectedProduct={selectedProduct}
        style={{ zIndex: 1500 }}
      />

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

      <ToastContainer
        style={{ zIndex: 1500 }} 
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

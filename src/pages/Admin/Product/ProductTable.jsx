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
import {getProducts} from '@/apis/productsService';
import {deleteProduct} from '@/apis/productsService';
import {getProductById} from '@/apis/productsService';

const ProductTable = () => {


const [listProducts,setListProducts] = useState([]);
const [selectedProduct, setSelectedProduct] = useState(null);
const [showDetailModal, setShowDetailModal] = useState(false);

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

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleCloseDelete = () => setShowDeleteModal(false);
  const handleShowDelete = () => setShowDeleteModal(true);


  const handleDelete = (productId) => {
    // Gọi API xóa sản phẩm và sau đó xử lý kết quả
    deleteProduct(productId)
      .then(() => {
        // Cập nhật lại danh sách sản phẩm sau khi xóa
        setListProducts((prevList) => prevList.filter((product) => product.productID !== productId));
  
        // Thông báo thành công
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
        handleCloseDelete(); // Đóng modal
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





  // Memoized columns
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

      { accessorKey: 'brand',
        header: 'Brand Name', 
        size: 100,
        Cell: ({ row }) => {
          // Tìm thương hiệu dựa trên brandID
          const { brandName } = row.original.brands; // Truy xuất tên thương hiệu từ `brands`
          return brandName || 'Unknown'; 
        }

      },

      { accessorKey: 'formattedPrice', 
        header: 'Price', 
        size: 50 ,
        Cell: ({ row }) => {
          const price = row.original.formattedPrice || 0;
          return `${(price)} đ`;
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
    data : listProducts,
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

import React, { useState,useEffect, useMemo } from 'react';

import { MaterialReactTable } from 'material-react-table';
import { Button } from '@mui/material';
import { MdDelete, MdEdit } from 'react-icons/md';
import Modal from 'react-bootstrap/Modal';
import { getBrands , addBrand,updateBrand,deleteBrand } from '@/apis/brandsService';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const BrandTable = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingRow, setEditingRow] = useState(null);
  const [listBrands, setListBrands] = useState([]);


  useEffect(() => {
    getBrands().then((res) => {
      setListBrands(res.data);
    });


  }, []);


  const columns = useMemo(
    () => [
      {
        accessorKey: 'brandID',
        header: 'ID',
        size: 50,
       
      },
      {
        accessorKey: 'brandName',
        header: 'Brand Name',
        size: 200,
      },
      {
        accessorKey: 'createdAt',
        header: 'Created At',
        size: 150,
        Cell: ({ cell }) => new Date(cell.getValue()).toLocaleDateString(),
      },
      {
        id: 'actions',
        header: 'Actions',
        size: 150,
        Cell: ({ row }) => (
          <div style={{ display: 'flex', gap: '10px' }}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              startIcon={<MdEdit />}
              onClick={() => handleEdit(row.original)}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="error"
              size="small"
              startIcon={<MdDelete />}
              onClick={() => handleDelete(row.original.brandID)}
            >
              Delete
            </Button>
          </div>
        ),
      },
    ],
    []
  );

  const handleSave = (newData) => {

    const isBrandExist = listBrands.some(
      (brand) => brand.brandName.toLowerCase() === newData.brandName.toLowerCase()
    );

    if (isBrandExist) {
      toast.error('Tên thương hiệu đã tồn tại!', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      });
      return;
    }
    
    if (editingRow) {
      updateBrand(editingRow.brandID,newData)
        .then((res) => {
          
          setListBrands((prev) =>
            prev.map((item) => (item.brandID === editingRow.brandID ? newData : item))
          );
          toast.success('Cập nhật thương hiệu thành công', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
            transition: Bounce,
          });
        })
        .catch((error) => {
          toast.error('Không thể cập nhật thương hiệu ', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
            transition: Bounce,
          });
        });
    } 
    
    
    else {
      addBrand(newData)
      .then((res) =>{
        getBrands().then((res) => {
          setListBrands(res.data); // Ensure the brandID is correctly updated
        });
        toast.success("Thêm thương hiệu thành công",{
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
      })
      .catch((error) => {
        console.error('Lỗi khi thêm thương hiệu', {
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
      
    }
    setShowModal(false);
    setEditingRow(null);
  };

  const handleDelete = (brandID) => {
    deleteBrand(brandID)
    .then(() => {
      setListBrands((prev) => prev.filter((item) => item.brandID !== brandID)); // Cập nhật danh sách
      toast.success('Đã xóa thương hiệu thành công', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      });
    })
    .catch((error) => {
      toast.error('Không thể xóa thương hiệu', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      });
    });
  };

  const handleEdit = (row) => {
    setEditingRow(row);
    setShowModal(true);
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setShowModal(true)}
        style={{ marginBottom: '10px' }}
      >
        Add Brand
      </Button>

      <MaterialReactTable columns={columns} data={listBrands} /> 

      {showModal && (
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>{editingRow ? 'Edit Brand' : 'Add Brand'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const formObject = Object.fromEntries(formData.entries());
                handleSave({
                  id: editingRow?.brandID || null,
                  brandName: formObject.brandName,
                  imagePath: formObject.imagePath,
                  createdAt: editingRow?.createdAt || new Date().toISOString(),
                });
              }}
            >
              <div className="mb-3">
                <label className="form-label">Brand Name</label>
                <input
                  type="text"
                  name="brandName"
                  className="form-control"
                  defaultValue={editingRow?.brandName || ''}
                  required
                />
              </div>
              <div className="d-flex justify-content-end">
                <Button variant="contained" color="secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="contained" color="primary" style={{ marginLeft: '10px' }}>
                  Save
                </Button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      )}

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

export default BrandTable;

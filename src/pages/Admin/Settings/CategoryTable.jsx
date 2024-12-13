  import React, { useState, useMemo ,useEffect} from 'react';
  import { MaterialReactTable } from 'material-react-table';
  import { Button } from '@mui/material';
  import { MdDelete, MdEdit } from 'react-icons/md';
  import Modal from 'react-bootstrap/Modal';
  import 'bootstrap/dist/css/bootstrap.min.css';
  import { ToastContainer, toast, Bounce } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import {getCategories, addCategory, updateCategory, deleteCategory} from '@/apis/categoryService'


  const CategoryTable = () => {
    const [showModal, setShowModal] = useState(false); // State for modal visibility
    const [editingRow, setEditingRow] = useState(null); // Currently editing row
    const [listCategories, setListCategories] = useState([]);

    useEffect(() => {
      getCategories().then((res) => {
        console.log(res);
        
        setListCategories(res.data);
      });
    }, []);


    const columns = useMemo(
      () => [
        {
          accessorKey: 'categoryID',
          header: 'ID',
          size: 200,
        },
        {
          accessorKey: 'categoryName',
          header: 'Category Name',
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
                onClick={() => handleDelete(row.original.categoryID)}
              >
                Delete
              </Button>
            </div>
          ),
        },
      ],
      []
    );

    // console.log();
    
    // Handle create/edit
    const handleSave = (DataCate) => {

      const isCategoryExist = listCategories.some((category) => {
        const categoryID = category.categoryID;
        const newCategoryID = DataCate.categoryID;
      
        // Ensure both categoryIDs are defined and can be converted to lowercase
        return categoryID && newCategoryID && categoryID.toLowerCase() === newCategoryID.toLowerCase();
      });
    

      if (isCategoryExist) {
        toast.error('Tên danh mục đã tồn tại!', {
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
        updateCategory(editingRow.categoryID,{ categoryName: DataCate.categoryName })
  
          .then((res) => {
            setListCategories((prev) =>
              prev.map((item) => (item.categoryID === editingRow.categoryID ? { ...item, categoryName: DataCate.categoryName } : item))
            );
            toast.success('Cập nhật danh mục thành công', {
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
            toast.error('Không thể cập nhật danh mục ', {
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
        addCategory(DataCate)
        .then((res) => {
          getCategories().then((res) => {
            setListCategories(res.data);
          });
          toast.success('Thêm danh mục thành công', {
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
          toast.error('Lỗi khi thêm danh mục', {
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
    
      setShowModal(false);
      setEditingRow(null);
    };

    // Handle delete
    const handleDelete = (categoryID) => {
      deleteCategory(categoryID)
      .then(() => {
        setListCategories((prev) => prev.filter((item) => item.categoryID !== categoryID)); // Cập nhật danh sách
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
    

    // Handle edit
    const handleEdit = (row) => {
      setEditingRow(row); // Set row to edit
      setShowModal(true); // Show modal
    };

    return (
      <>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowModal(true)}
          style={{ marginBottom: '10px' }}
        >
          Add Category
        </Button>

        {/* Table */}
        <MaterialReactTable columns={columns} data={listCategories} />

        {/* Modal for Add/Edit */}
        {showModal && (
          <Modal show={showModal} onHide={() => setShowModal(false)} centered>
            <Modal.Header closeButton>
              <Modal.Title>{editingRow ? 'Edit Category' : 'Add Category'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {/* Form for Adding/Editing */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target);
                  const formObject = Object.fromEntries(formData.entries());
                  handleSave({
                    id: editingRow?.categoryID || null,
                    categoryName: formObject.categoryName,
                    createdAt: editingRow?.createdAt || new Date().toISOString(),
                  });
                }}
              >
                <div className="mb-3">
                  <label className="form-label">Category Name</label>
                  <input
                    type="text"
                    name="categoryName"
                    className="form-control"
                    defaultValue={editingRow?.categoryName || ''}
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

  export default CategoryTable;

import React, { useState, useMemo } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { Button } from '@mui/material';
import { MdDelete, MdEdit } from 'react-icons/md';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialData = [
  { id: 1, key: 'SiteName', value: 'Eshop', group: 'General', description: 'Name of the website', createdAt: '2023-01-01' },
  { id: 2, key: 'Currency', value: 'USD', group: 'Payment', description: 'Default currency for transactions', createdAt: '2023-01-02' },
];

const SettingTable = () => {
  const [data, setData] = useState(initialData); // State to hold settings
  const [showModal, setShowModal] = useState(false); // State to show the modal
  const [editingRow, setEditingRow] = useState(null); // Track the row being edited

  // Columns definition for Material React Table
  const columns = useMemo(
    () => [
      {
        accessorKey: 'key',
        header: 'Key',
        size: 200,
      },
      {
        accessorKey: 'value',
        header: 'Value',
        size: 200,
      },
      {
        accessorKey: 'group',
        header: 'Group',
        size: 150,
      },
      {
        accessorKey: 'description',
        header: 'Description',
        size: 300,
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
              onClick={() => handleDelete(row.original.id)}
            >
              Delete
            </Button>
          </div>
        ),
      },
    ],
    []
  );

  // Save new or edited data
  const handleSave = (newData) => {
    if (editingRow) {
      // Update existing setting
      setData((prev) =>
        prev.map((item) => (item.id === editingRow.id ? newData : item))
      );
    } else {
      // Add new setting
      setData((prev) => [...prev, { ...newData, id: Date.now() }]);
    }
    setShowModal(false); // Close modal
    setEditingRow(null); // Reset editing row
  };

  // Delete a row
  const handleDelete = (id) => {
    setData((prev) => prev.filter((item) => item.id !== id));
  };

  // Edit a row
  const handleEdit = (row) => {
    setEditingRow(row);
    setShowModal(true); // Open the modal
  };

  return (
    <>
      {/* Add Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => setShowModal(true)}
        style={{ marginBottom: '10px' }}
      >
        Add Setting
      </Button>

      {/* Table */}
      <MaterialReactTable columns={columns} data={data} />

      {/* Modal for Add/Edit */}
      {showModal && (
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>{editingRow ? 'Edit Setting' : 'Add Setting'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const formObject = Object.fromEntries(formData.entries());
                handleSave({
                  id: editingRow?.id || null,
                  key: formObject.key,
                  value: formObject.value,
                  group: formObject.group,
                  description: formObject.description,
                  createdAt: editingRow?.createdAt || new Date().toISOString(),
                });
              }}
            >
              <div className="mb-3">
                <label className="form-label">Key</label>
                <input
                  type="text"
                  name="key"
                  className="form-control"
                  defaultValue={editingRow?.key || ''}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Value</label>
                <input
                  type="text"
                  name="value"
                  className="form-control"
                  defaultValue={editingRow?.value || ''}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Group</label>
                <input
                  type="text"
                  name="group"
                  className="form-control"
                  defaultValue={editingRow?.group || ''}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  name="description"
                  className="form-control"
                  defaultValue={editingRow?.description || ''}
                  rows={3}
                ></textarea>
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

export default SettingTable;

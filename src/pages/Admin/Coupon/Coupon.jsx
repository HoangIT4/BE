import React, { useState, useMemo, useEffect } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { MdDelete } from 'react-icons/md';
import { IoMdEye } from 'react-icons/io';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Sample coupon data (you can fetch this from your backend)
const initialCoupons = [
  {
    id: '1',
    name: 'New Year Sale',
    description: '10% off on all items',
    type: 'Discount',
    discountValue: 10.0,
    expirationDate: '2024-12-31',
    isActive: true,
    totalQuantity: 100,
    usedQuantity: 20,
    createdAt: '2024-01-01',
  },
  {
    id: '2',
    name: 'Black Friday',
    description: '50% off on selected items',
    type: 'Promotion',
    discountValue: 50.0,
    expirationDate: '2024-11-25',
    isActive: true,
    totalQuantity: 200,
    usedQuantity: 50,
    createdAt: '2024-10-01',
  },
];

const CouponTable = () => {
  // State hooks
  const [coupons, setCoupons] = useState(initialCoupons); // List of coupons
  const [selectedCoupon, setSelectedCoupon] = useState(null); // Selected coupon
  const [showDetailModal, setShowDetailModal] = useState(false); // Detail Modal visibility
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Delete Modal visibility

  // Open the detail modal
  const handleOpenDetail = (coupon) => {
    setSelectedCoupon(coupon);
    setShowDetailModal(true);
  };

  // Close the detail modal
  const handleCloseDetail = () => {
    setSelectedCoupon(null);
    setShowDetailModal(false);
  };

  // Open the delete confirmation modal
  const handleOpenDelete = (coupon) => {
    setSelectedCoupon(coupon);
    setShowDeleteModal(true);
  };

  // Close the delete confirmation modal
  const handleCloseDelete = () => {
    setSelectedCoupon(null);
    setShowDeleteModal(false);
  };

  // Handle coupon deletion
  const handleDelete = () => {
    setCoupons((prevCoupons) =>
      prevCoupons.filter((coupon) => coupon.id !== selectedCoupon.id)
    );
    toast.success(`Deleted coupon: ${selectedCoupon.name}`);
    handleCloseDelete();
  };

  // Define the columns for the Material React Table
  const columns = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
        size: 200,
      },
      {
        accessorKey: 'description',
        header: 'Description',
        size: 300,
      },
      {
        accessorKey: 'type',
        header: 'Type',
        size: 80,
      },
      {
        accessorKey: 'discountValue',
        header: 'Value (%)',
        size: 100,
        Cell: ({ cell }) => `${cell.getValue()}%`,
      },
      {
        accessorKey: 'expirationDate',
        header: 'Expires On',
        size: 120,
        Cell: ({ cell }) =>
          new Date(cell.getValue()).toLocaleDateString('en-GB'),
      },
      {
        accessorKey: 'isActive',
        header: 'Active',
        size: 80,
        Cell: ({ cell }) => (cell.getValue() ? 'Yes' : 'No'),
      },
      {
        accessorKey: 'totalQuantity',
        header: 'Total Quantity',
        size: 120,
      },
      {
        accessorKey: 'usedQuantity',
        header: 'Used Quantity',
        size: 120,
      },
      {
        accessorKey: 'createdAt',
        header: 'Created At',
        size: 150,
        Cell: ({ cell }) =>
          new Date(cell.getValue()).toLocaleDateString('en-GB'),
      },
      {
        id: 'actions',
        header: 'Actions',
        size: 150,
        Cell: ({ row }) => (
          <div className="d-flex justify-content-between">
            <Button
              variant="success"
              size="sm"
              onClick={() => handleOpenDetail(row.original)}
            >
              <IoMdEye /> View
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => handleOpenDelete(row.original)}
            >
              <MdDelete /> Delete
            </Button>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <>
      {/* Coupon Management Table */}
      <MaterialReactTable
        columns={columns}
        data={coupons}
        enableColumnResizing
        enableBottomToolbar={true}
        enableRowActions={false}
        renderTopToolbarCustomActions={() => (
          <Button
            variant="primary"
            size="sm"
            onClick={() => toast.info('Add Coupon functionality pending!')}
          >
            Add Coupon
          </Button>
        )}
      />

      {/* Detail Modal */}
      <Modal show={showDetailModal} onHide={handleCloseDetail} centered>
        <Modal.Header closeButton>
          <Modal.Title>Coupon Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedCoupon && (
            <>
              <p><strong>Name:</strong> {selectedCoupon.name}</p>
              <p><strong>Description:</strong> {selectedCoupon.description || 'N/A'}</p>
              <p><strong>Type:</strong> {selectedCoupon.type || 'N/A'}</p>
              <p><strong>Discount Value:</strong> {selectedCoupon.discountValue || 0}%</p>
              <p>
                <strong>Expiration Date:</strong>{' '}
                {selectedCoupon.expirationDate
                  ? new Date(selectedCoupon.expirationDate).toLocaleDateString(
                      'en-GB'
                    )
                  : 'N/A'}
              </p>
              <p><strong>Active:</strong> {selectedCoupon.isActive ? 'Yes' : 'No'}</p>
              <p><strong>Total Quantity:</strong> {selectedCoupon.totalQuantity}</p>
              <p><strong>Used Quantity:</strong> {selectedCoupon.usedQuantity}</p>
              <p>
                <strong>Created At:</strong>{' '}
                {new Date(selectedCoupon.createdAt).toLocaleDateString('en-GB')}
              </p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDetail}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={handleCloseDelete} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedCoupon && (
            <>
              Are you sure you want to delete the coupon{' '}
              <strong>{selectedCoupon.name}</strong>?
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Toast Notifications */}
      <ToastContainer />
    </>
  );
};

export default CouponTable;

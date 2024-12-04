import React, { useState } from "react";
import { Button, Table, Col, Form } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import ProductTable from "./ProductTable";

const Product = () => {
  document.title = "Quản trị - Sản phẩm";

  // Khai báo navigate để điều hướng
  const navigate = useNavigate();

  const handleAddProductClick = () => {
    navigate("/admin/product/add");
  };

  return (
    <div className="container-fluid">
      {/* Tiêu đề và nút */}
      <div className="row mt-4">
        <h2 className="col-12 col-md-6 d-flex justify-content-between align-items-center">
          Sản phẩm
        </h2>
      </div>
     
      <div className="row mt-4">
        <div className="col-12 col-md-6 d-flex">
          
        </div>
        <div className="col-12 col-md-6 d-flex justify-content-end">
          <Button onClick={handleAddProductClick}>Thêm sản phẩm</Button>
        </div>
      </div>

      <div className="row mt-4">
        <ProductTable></ProductTable>
      </div>
    </div>
  );
};

export default Product;

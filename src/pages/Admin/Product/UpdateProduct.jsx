import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById, updateProduct } from "@/apis/productsService";
import { getBrands } from "@/apis/brandsService";
import { getCategories } from "@/apis/categoryService";

const UpdateProduct = () => {
  const navigate = useNavigate();
  const { productID } = useParams();

  const [productData, setProductData] = useState({
    productID: "",
    name: "",
    src: "",
    preImg: "",
    detailDes: "",
    isHotDeal: false,
    isNew: false,
    isBestSeller: false,
    weight: "",
    origin: "",
    description: "",
    price: 0,
    stock: 0,
    rating: 0,
    brands: {
      brandID: "",
      brandName: "",
      createdAt: "",
    },
    categoryIDs: [], // Initialize categoryIDs as an array
  });

  const [listBrands, setListBrands] = useState([]);
  const [listCategories, setListCategories] = useState([]);

  useEffect(() => {
    getProductById(productID).then((res) => {
      if (res) {
        // Chuyển đổi categories thành mảng categoryIDs
        const categoryIDs = res.categories
          ? res.categories.map((cat) => cat.categoryID)
          : [];
        setProductData({
          ...res,
          categoryIDs, // Đặt categoryIDs vào productData
        });
      } else {
        toast.error("Không tìm thấy sản phẩm!");
      }
    });

    // Lấy danh sách thương hiệu và danh mục
    getBrands().then((res) => setListBrands(res.data));
    getCategories().then((res) => setListCategories(res.data));
  }, [productID]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBrandChange = (e) => {
    const { value } = e.target;
    setProductData((prev) => ({
      ...prev,
      brands: { ...prev.brands, brandID: value },
    }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setProductData((prev) => {
      const updatedCategories = checked
        ? [...prev.categoryIDs, value]
        : prev.categoryIDs.filter((id) => id !== value);
      return { ...prev, categoryIDs: updatedCategories };
    });
  };

  //   const handleUpdateProduct = (e) => {
  //     e.preventDefault();
  //     updateProduct(productID, productData).then((res) => {
  //       if (res.success) {
  //         toast.success("Cập nhật sản phẩm thành công!", {
  //           position: "top-right",
  //           autoClose: 2000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //           theme: "light",
  //           transition: Bounce,
  //         });
  //         navigate("/admin/product");
  //       } else {
  //         toast.error("Cập nhật sản phẩm thất bại!");
  //       }
  //     });
  //   };

  const handleUpdateProduct = (e) => {
    e.preventDefault();

    // Tạo đối tượng sản phẩm để gửi lên server
    const productToPost = {
      name: productData.name,
      src: productData.src,
      preImg: productData.preImg,
      brandID: productData.brands.brandID,
      categoryIDs: productData.categoryIDs,
      productDetailsRequest: [
        {
          price: productData.price,
          stock: productData.stock,
          isHotDeal: productData.isHotDeal,
          isNew: productData.isNew,
          isBestSeller: productData.isBestSeller,
          weight: productData.weight,
          origin: productData.origin,
          description: productData.description,
          detailDes: productData.detailDes,
        },
      ],
    };

    // Gọi API cập nhật sản phẩm
    updateProduct(productID, productToPost).then((res) => {
      if (res.success) {
        toast.success("Cập nhật sản phẩm thành công!", {
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
        navigate("/admin/product");
      } else {
        toast.error("Cập nhật sản phẩm thất bại!");
      }
    });
  };

  return (
    <div className="container">
      <h2 className="my-4">Cập Nhật Sản Phẩm</h2>
      <Form onSubmit={handleUpdateProduct}>
        <Form.Group className="mb-3" controlId="productName">
          <Form.Label>Tên sản phẩm</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={productData.name}
            onChange={handleInputChange}
            placeholder="Nhập tên sản phẩm"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="brandName">
          <Form.Label>Thương hiệu</Form.Label>
          <Form.Select
            name="brandID"
            value={productData.brands.brandID || ""}
            onChange={handleBrandChange}
          >
            <option value="">Chọn thương hiệu</option>
            {listBrands.map((brand) => (
              <option key={brand.brandID} value={brand.brandID}>
                {brand.brandName}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="productPrice">
          <Form.Label>Giá</Form.Label>
          <Form.Control
            type="text"
            name="price"
            value={productData.price}
            onChange={handleInputChange}
            placeholder="Nhập giá trị sản phẩm"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="productWeight">
          <Form.Label>Khối lượng</Form.Label>
          <Form.Control
            type="text"
            name="weight"
            value={productData.weight}
            onChange={handleInputChange}
            placeholder="Nhập khối lượng sản phẩm"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="productOrigin">
          <Form.Label>Xuất xứ</Form.Label>
          <Form.Control
            type="text"
            name="origin"
            value={productData.origin}
            onChange={handleInputChange}
            placeholder="Nhập xuất xứ"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="productDescription">
          <Form.Label>Mô tả</Form.Label>
          <textarea
            className="form-control"
            name="description"
            value={productData.description || ""} // Sử dụng chuỗi rỗng thay vì null
            onChange={handleInputChange}
            placeholder="Nhập mô tả sản phẩm"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="productDetailDescription">
          <Form.Label>Mô tả chi tiết</Form.Label>
          <textarea
            className="form-control"
            name="detailDes"
            value={productData.detailDes || ""} // Sử dụng chuỗi rỗng thay vì null
            onChange={handleInputChange}
            placeholder="Nhập mô tả chi tiết"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="productStock">
          <Form.Label>Số lượng tồn kho</Form.Label>
          <Form.Control
            type="number"
            name="stock"
            value={productData.stock}
            onChange={handleInputChange}
            placeholder="Nhập số lượng tồn kho"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="productCategories">
          <Form.Label>Danh mục</Form.Label>
          {listCategories.map((category) => (
            <Form.Check
              key={category.categoryID}
              type="checkbox"
              label={category.categoryName}
              value={category.categoryID}
              checked={productData.categoryIDs.includes(category.categoryID)} // Sửa ở đây
              onChange={handleCheckboxChange}
            />
          ))}
        </Form.Group>

        <Form.Group className="mb-3" controlId="productImage">
          <Form.Label>Hình ảnh chính</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => {
              const file = e.target.files[0];
              setProductData({ ...productData, src: file });
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="productPreImage">
          <Form.Label>Hình ảnh thay thế</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => {
              const file = e.target.files[0];
              setProductData({ ...productData, preImg: file });
            }}
          />
        </Form.Group>

        <div className="mt-3">
          <Button
            onClick={() => navigate("/admin/product")}
            variant="secondary"
            className="me-2 mb-2"
          >
            Hủy
          </Button>
          <Button variant="primary" type="submit" className="mb-2">
            Cập Nhật Sản Phẩm
          </Button>
        </div>
      </Form>
      <ToastContainer />
    </div>
  );
};

export default UpdateProduct;

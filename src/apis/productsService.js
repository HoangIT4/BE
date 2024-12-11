import axiosClient from './axiosClient';

const getProducts = async () =>{
    const res = await axiosClient.get('/Product/All');
    return res.data;
}
const getProductById = async (productID) => {
  
  const res = await axiosClient.get(`/Product/${productID}`);
  return res.data;
  
};
const addProduct = async (body) => {
  try {
    const res = await axiosClient.post('/Product/create', body, {
      headers: {
        'Content-Type': 'multipart/form-data', // Đảm bảo content type là multipart/form-data
      },
    });
    console.log(res.data); // Đảm bảo sử dụng res.data thay vì data
    return res.data;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error; // Ném lỗi để xử lý ở nơi gọi
  }
};
const deleteProduct = async (productID) =>{
  const res = await axiosClient.delete(`/Product/${productID}`)
  return res.data;
}
    
export { getProducts,getProductById, addProduct, deleteProduct};

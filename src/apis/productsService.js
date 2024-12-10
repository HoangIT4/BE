import axiosClient from './axiosClient';

const getProducts = async () =>{
    const res = await axiosClient.get('/Product/All');
    return res.data;
}
const getProductById = async (productId) => {
  
  const res = await axiosClient.get(`/Product/${productId}`);
  return res.data;
  
};
const addProduct = async (body) =>{
 
  
  const res = await axiosClient.post('/Product/create',body);
  console.log(data);
  return res.data;
}
const deleteProduct = async (productId) =>{
  const res = await axiosClient.delete(`/Product/delete/${productId}`)
  return res.data;
}
    
export { getProducts,getProductById, addProduct, deleteProduct};

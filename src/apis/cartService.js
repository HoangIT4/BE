import axiosClient from './axiosClient';

const addProductToCart = async (data) =>{
    const res = await axiosClient.post('/Cart/addToCart',data);
    return res.data;
}
const getCart = async (UserID) =>{
    const res = await axiosClient.get(`/Cart/${UserID}`);
    return res.data;
   
}
const deleteItem = async (body) =>{

    const res = await axiosClient.delete('Cart/DeleteCart-Item',{data:body})
    return res.data
}

const deleteCart = async (body) => {

    const res = await axiosClient.delete(`Cart/ClearAllCart`, {data: body});
    return res.data
}

  
export { addProductToCart, getCart ,deleteItem ,deleteCart};

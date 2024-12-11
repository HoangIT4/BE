import axiosClient from './axiosClient';

const createOrder = async (data) =>{
    const res = await axiosClient.post('/Order/create',data);
    return res.data;
}
const getOrder= async (UserID) =>{
    const res = await axiosClient.get(`/Order/All/${UserID}`);
    return res.data;
   
}

const getOrderForAdmin = async () =>{
    
    const res = await axiosClient.get('/Order/Admin');
    console.log(res.data);
    return res.data;
}
const getOrderByID = async (OrderID) =>{
    const res = await axiosClient.get(`/Order/${OrderID}`);
    return res.data;
}
const deleteOrder = async (OrderID) =>{

    const res = await axiosClient.delete(`Order/delete/${OrderID}`,)
    return res.data
}

const updateOrder = async (OrderID,body) => {

    const res = await axiosClient.put(`Order/changeStatus/${OrderID}`, body);
    return res.data
}

  
export { createOrder,getOrderForAdmin, getOrder ,deleteOrder ,getOrderByID,updateOrder};

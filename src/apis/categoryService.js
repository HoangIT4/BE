import axiosClient from './axiosClient';

const getCategories = async () =>{
    const res = await axiosClient.get('/Category');
    return res.data;
}
const getCategoryById = async (id) => {
    const res = await axiosClient.get(`/Category/${id}`);
    console.log(res.data);
    return res;
}
const addCategory = async (data) =>{
    const res = await axiosClient.post('/Category',data);
    return res.data;
}
const updateCategory = async (categoryID,body) =>{
    const res = await axiosClient.patch(`/Category/${categoryID}`,body);
    return res.data;
}
const deleteCategory = async (categoryID) =>{
    const res = await axiosClient.delete(`/Category/${categoryID}`);
    return res.data;
}

export {getCategories, getCategoryById, addCategory,updateCategory,deleteCategory}
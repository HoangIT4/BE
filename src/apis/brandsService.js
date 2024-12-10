import axiosClient from './axiosClient';

const getBrands = async () =>{
    const res = await axiosClient.get('/Brand');
    return res.data;
}
const getBrandByID = async (brandID) =>{
    const res = await axiosClient.get(`/Brand/${brandID}`);
    return res.data;
}
const addBrand= async (data) =>{
    const res = await axiosClient.post('/Brand',data);
    return res.data;
}
const updateBrand = async (brandID,body) =>{
    const res = await axiosClient.patch(`/Brand/${brandID}`,body);
    return res.data;
}
const deleteBrand = async (brandID) =>{
    const res = await axiosClient.delete(`/Brand/${brandID}`);
    return res.data;
}

export {getBrands,addBrand,getBrandByID,updateBrand,deleteBrand }
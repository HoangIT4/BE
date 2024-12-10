import axiosClient from './axiosClient';

const register= async (body) =>{  
    return await axiosClient.post('/User/register', body);
}

const signIn = async (body) =>{
    return await axiosClient.post('/User/login', body);
}
const getInfo = async (Id) =>{
    return await axiosClient.get(`/User/${Id}`);
}

export {register, signIn, getInfo}  
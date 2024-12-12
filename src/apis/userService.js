import axiosClient from './axiosClient';

const getUserList = async () =>{
    const res = await axiosClient.get('/User/all');
    return res.data;
}


export {getUserList}
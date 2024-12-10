import axios from 'axios';
import  Cookies  from 'js-cookie';
const axiosClient = axios.create({
    // baseURL: 'http://localhost:3000',
    baseURL: 'https://localhost:7015',
    timeout:10000,
    headers: {
        'Content-Type': 'application/json',
    }


});

axiosClient.interceptors.request.use(async (config) => {
    const token = Cookies.get('token')

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
}, (err) =>{
    return Promise.reject(err)
    }
);

axiosClient.interceptors.response.use(
    (res)=>{
        return res;
    },
    async (error) =>{
        const originalRequest = error.config;
    

            if (error.response &&  error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                const message = data?.message || '';

                if (message.includes("token expired") || message.includes("invalid token")) {
                    Cookies.remove('token'); // Xóa token
                    window.location.href = '/'; // Chuyển hướng về trang login
                    return Promise.reject(error);
                }
    
                if (message.includes("Invalid credentials")) {
                    alert("Sai mật khẩu hoặc tên đăng nhập");
                    return Promise.reject(error);
                }
            }
       
        return Promise.reject(error);

       
    }
)

export default axiosClient
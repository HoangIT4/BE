import React, { lazy } from 'react';
import UserAdmin from '../pages/Admin/User/UserAdmin';
import CouponAdmin from '../pages/Admin/Coupon/CouponAdmin';
import Settings from '../pages/Admin/Settings/Settings';


const AddProduct =  lazy(() => import('../pages/Admin/Product/AddProduct'));
const Dashboard = lazy(() => import('../pages/Admin/Dashboard/Dashboard'));
const Order = lazy(() => import('../pages/Admin/Order'));
const Product = lazy(() => import('../pages/Admin/Product/Product'));



const adminRoutes = [
    { path: "/admin", component: <Dashboard/>},
    { path: "/admin/order", component: <Order/>},
    { path: "/admin/product", component: <Product/>},
    { path: "/admin/product/add", component: <AddProduct/>},
    { path: "/admin/user", component: <UserAdmin/>},
    { path: "/admin/coupon", component: <CouponAdmin/>},
    { path: "/admin/user", component: <UserAdmin/>},
    { path: "/admin/setting", component: <Settings/>},

]

export { adminRoutes};

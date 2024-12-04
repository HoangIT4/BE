import React, { lazy } from 'react';



const AddProduct =  lazy(() => import('../pages/Admin/Product/AddProduct'));
const Dashboard = lazy(() => import('../pages/Admin/Dashboard/Dashboard'));
const Order = lazy(() => import('../pages/Admin/Order'));
const Product = lazy(() => import('../pages/Admin/Product/Product'));



const adminRoutes = [
    { path: "/admin", component: <Dashboard/>},
    { path: "/admin/order", component: <Order/>},
    { path: "/admin/product", component: <Product/>},
    { path: "/admin/product/add", component: <AddProduct/>},
]

export { adminRoutes};

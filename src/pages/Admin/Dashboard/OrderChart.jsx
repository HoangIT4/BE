import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const OrderChart = () => {
  // Dữ liệu giả lập số lượng mua và cho thuê trong 7 ngày qua
  const data = [
    { day: 'Thứ hai', purchases: 34, rentals: 22 },
    { day: 'Thứ ba', purchases: 45, rentals: 28 },
    { day: 'Thứ tư', purchases: 31, rentals: 25 },
    { day: 'Thứ năm', purchases: 50, rentals: 30 },
    { day: 'Thứ sáu', purchases: 40, rentals: 27 },
    { day: 'Thứ bảy', purchases: 65, rentals: 34 },
    { day: 'Chủ nhật', purchases: 55, rentals: 29 },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="purchases" fill="#8884d8" name="Order" />
        {/* <Bar dataKey="rentals" fill="#82ca9d" name="Lượt thuê" />
        <Bar dataKey="rentals" fill="#82ca9d" name="Lượt thuê" />
        <Bar dataKey="rentals" fill="#82cv9d" name="Lượt thuê" /> */}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default OrderChart;

import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
// npm install react-chartjs-2 chart.js

// Cấu hình các thành phần cho Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const OrderChart2 = () => {
  // Dữ liệu giả lập số lượng mua và cho thuê trong 7 ngày qua
  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Purchases',
        data: [34, 45, 31, 50, 40, 65, 55],
        backgroundColor: '#8884d8',
      },
      {
        label: 'Rentals',
        data: [22, 28, 25, 30, 27, 34, 29],
        backgroundColor: '#82ca9d',
      },
    ],
  };

  // Các tùy chọn cấu hình cho biểu đồ
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Order Statistics (Last 7 Days)',
      },
    },
  };

  return (
    <div style={{ width: '100%', height: '500px' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default OrderChart2;

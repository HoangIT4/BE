import React from 'react';
import { ResponsiveBar } from '@nivo/bar';

const OrderChart = () => {
  // Dữ liệu giả lập số lượng mua và cho thuê trong 7 ngày qua
  const data = [
    { day: 'Mon', Purchases: 34, Rentals: 22 },
    { day: 'Tue', Purchases: 45, Rentals: 28 },
    { day: 'Wed', Purchases: 31, Rentals: 25 },
    { day: 'Thu', Purchases: 50, Rentals: 30 },
    { day: 'Fri', Purchases: 40, Rentals: 27 },
    { day: 'Sat', Purchases: 65, Rentals: 34 },
    { day: 'Sun', Purchases: 55, Rentals: 29 },
  ];

  const keys = ['Purchases', 'Rentals'];
  const colors = { Purchases: '#8884d8', Rentals: '#82ca9d' };

  return (
    <div style={{ height: '300px' }}>
      <ResponsiveBar
        data={data}
        keys={keys}
        indexBy="day"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        groupMode="grouped" // Cấu hình hiển thị song song
        colors={({ id }) => colors[id]}
        borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Day',
          legendPosition: 'middle',
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Orders',
          legendPosition: 'middle',
          legendOffset: -40,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        legends={[
          {
            dataFrom: 'keys',
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: 'hover',
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        role="application"
        ariaLabel="Order statistics bar chart"
        barAriaLabel={function (e) {
          return `${e.id}: ${e.formattedValue} orders on ${e.indexValue}`;
        }}
      />
    </div>
  );
};

export default OrderChart;

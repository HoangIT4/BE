import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CustomCard from '../../../components/CustomCard'; 
import OrderChart from './OrderChart';
import OrderChart2 from './OrderChart2';
import OrderChart3 from './OrderChart3';

const Dashboard = () => {
  document.title="Quản trị - Trang chủ"
  return (
    <Container fluid >
      <Row className="mt-4 justify-content-between">
        <h2>Trang chủ</h2>
      </Row>
      
      <Row className="mt-4 justify-content-between">
        <Col xs={12} sm={6} lg={3} className="mb-4">
          <CustomCard title="Today Orders" text="400.000 đ" />
        </Col>

        <Col xs={12} sm={6} lg={3} className="mb-4">
          <CustomCard title="This Month" text="400.000 đ" />
        </Col>

        <Col xs={12} sm={6} lg={3} className="mb-4">
          <CustomCard title="Order Pending" text="200" />
        </Col>

        <Col xs={12} sm={6} lg={3} className="mb-4">
          <CustomCard title="Order Deliverd" text="2" />
        </Col>
      </Row>

      <Row>
        <Col>
          <div>
            <h2>Thống kê (tuần này)</h2>
            <OrderChart />
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div>
            <h2>Thống kê (tuần trước)</h2>
            <OrderChart2 />
          </div>
        </Col>
      </Row>
      {/* <Row>
        <Col>
          <div>
            <h2>Thống kê (tuần trước)</h2>
            <OrderChart3 />
          </div>
        </Col>
      </Row> */}
    </Container>
  );
};

export default Dashboard;

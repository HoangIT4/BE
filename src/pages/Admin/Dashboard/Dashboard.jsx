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
          <CustomCard title="Box 1" text="Content for Box 1" />
        </Col>

        <Col xs={12} sm={6} lg={3} className="mb-4">
          <CustomCard title="Box 2" text="Content for Box 2" />
        </Col>

        <Col xs={12} sm={6} lg={3} className="mb-4">
          <CustomCard title="Box 3" text="Content for Box 3" />
        </Col>

        <Col xs={12} sm={6} lg={3} className="mb-4">
          <CustomCard title="Box 4" text="Content for Box 4" />
        </Col>
      </Row>

      <Row>
        <Col>
          <div>
            <h2>Thống kê (tuần trước)</h2>
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
      <Row>
        <Col>
          <div>
            <h2>Thống kê (tuần trước)</h2>
            <OrderChart3 />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;

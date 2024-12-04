import React from 'react';
import { Card } from 'react-bootstrap';

const CustomCard = ({ title, text }) => {
  return (
    <Card className="shadow-sm" style={{ height: '100%' }}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{text}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CustomCard;

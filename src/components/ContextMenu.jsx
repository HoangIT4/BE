// ContextMenu.jsx
import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
 // Import CSS

const ContextMenu = ({ x, y, onExport, onDelete, onClose }) => {
  return (
    <div
      className="context-menu"
      style={{
        position: 'absolute',
        top: `${x}px`,
        left: `${y}px`
      }}
      onMouseLeave={onClose} // Đóng menu khi rời khỏi
    >
      <ButtonGroup vertical>
        <Button variant="light" onClick={onExport}>
          Export
        </Button>
        <Button variant="light" onClick={onDelete}> 
          Delete
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default ContextMenu;

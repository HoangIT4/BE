import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import styles from "../../assets/styles/components/AdminPage/Header.module.scss";


const HeaderAdmin = ({ onMenuClick }) => {
  return (
    <Navbar className={`${styles.header} bg-dark text-white`}>
        <i className={`bx bx-menu ${styles["menuBtn"]}`} onClick={onMenuClick}></i>
    </Navbar>
  );
};

export default HeaderAdmin;

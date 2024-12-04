import React, { useEffect } from "react";
import { Nav } from "react-bootstrap";
import styles from "../../assets/styles/components/AdminPage/Sidebar.module.scss";
import logo from "../../assets/image/logo.png";

const SidebarAdmin = ({ onMenuItemClick }) => {
  useEffect(() => {
    const body = document.querySelector("body"),
      modeSwitch = document.querySelector(`.${styles["toggle-switch"]}`);

    const toggleDarkMode = () => {
      body.classList.toggle("dark");
    };

    if (modeSwitch) {
      modeSwitch.addEventListener("click", toggleDarkMode);
    }

    return () => {
      if (modeSwitch) {
        modeSwitch.removeEventListener("click", toggleDarkMode);
      }
    };
  }, []); // Chỉ chạy một lần sau khi component render

  return (
    <Nav className={styles["sidebarcustom"]}>
      <header>
        <div className={styles["image-text"]}>
          <span className={styles.image}>
            <img src={logo} alt="logo" />
          </span>

          <div className={styles["header-text"]}>
            <span className={styles.name}>Shoppingweb</span>
            <span className={styles.profession}>Administration</span>
          </div>
        </div>
      </header>

      <div className={styles["menu-bar"]}>
        <div className={styles["menu"]}>
          
          <ul className={styles["menu-links"]}>
            <li
              className={styles["nav-link"]}
              role="button"
              tabIndex={0}
              onClick={() => onMenuItemClick('/admin')}
            >
              <div className={styles["nav-link-container"]}>
                <i className={`bx bx-home-alt ${styles.icon}`}></i>
                <span className={styles["nav-text"]}>Dashboard</span>
              </div>
            </li>
          </ul>

          <ul className={styles["menu-links"]}>
            <li
              className={styles["nav-link"]}
              role="button"
              tabIndex={0}
              onClick={() => onMenuItemClick('/admin/product')}
            >
              <div className={styles["nav-link-container"]}>
                <i className={`bx bx-package ${styles.icon}`}></i>
                <span className={styles["nav-text"]}>Products</span>
              </div>
            </li>
          </ul>

          <ul className={styles["menu-links"]}>
            <li
              className={styles["nav-link"]}
              role="button"
              tabIndex={0}
              onClick={() => onMenuItemClick('/admin/order')}
            >
              <div className={styles["nav-link-container"]}>
                <i className={`bx bx-receipt ${styles.icon}`}></i>
                <span className={styles["nav-text"]}>Orders</span>
              </div>
            </li>
          </ul>
        </div>

        <div className={styles["bottom-content"]}>
          <li>
            <a href="#">
              <i className={`bx bx-log-out ${styles.icon}`}></i>
              <span className={`${styles.text} ${styles["nav-text"]}`}>Logout</span>
            </a>
          </li>

          {/* <li className={styles.mode}>
            <div className={styles["moon-sun"]}>
              <i className={`bx bx-moon ${styles.icon} ${styles.moon}`}></i>
              <i className={`bx bx-sun ${styles.icon} ${styles.sun}`}></i>
            </div>
            <span className={`${styles["mode-text"]} ${styles.text}`}>Dark Mode</span>

            <div className={styles["toggle-switch"]}>
              <span className={styles.switch}></span>
            </div>
          </li> */}
        </div>
      </div>
    </Nav>
  );
};

export default SidebarAdmin;

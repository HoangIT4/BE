import React, { useEffect } from "react";
import { Nav } from "react-bootstrap";
import styles from "../../assets/styles/components/AdminPage/Sidebar.module.scss";
import logo from "../../assets/image/logo.png";

const menuItems = [
  { path: '/admin', icon: 'bx-home-alt', text: 'Dashboard' },
  { path: '/admin/product', icon: 'bx-package', text: 'Products' },
  { path: '/admin/order', icon: 'bx-receipt', text: 'Orders' },
  { path: '/admin/user', icon: 'bx-user', text: 'Customer' },
  { path: '/admin/coupon', icon: 'bx-gift', text: 'Coupon'},
  // { path: '/admin/statistic', icon: 'bx-chart', text: 'Statistic' },
  { path: '/admin/setting', icon: 'bx-cog', text: 'Settings' },
];

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
            {menuItems.map((item, index) => (
              <li
                key={index}
                className={styles["nav-link"]}
                role="button"
                tabIndex={0}
                onClick={() => onMenuItemClick(item.path)}
              >
                <div className={styles["nav-link-container"]}>
                  <i className={`bx ${item.icon} ${styles.icon}`}></i>
                  <span className={styles["nav-text"]}>{item.text}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles["bottom-content"]}>
          <li>
            <a href="#">
              <i className={`bx bx-log-out ${styles.icon}`}></i>
              <span className={`${styles.text} ${styles["nav-text"]}`}>Logout</span>
            </a>
          </li>
        </div>
      </div>
    </Nav>
  );
};

export default SidebarAdmin;
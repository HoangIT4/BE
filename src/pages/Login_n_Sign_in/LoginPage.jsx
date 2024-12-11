import React, { useState } from "react";
import { FaFacebook } from 'react-icons/fa';
import styles from "./LoginForm.module.scss"; // Import SCSS module

const LoginForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleSwitchToRegister = () => {
    setIsLogin(false); // Switch to Register form
  };

  const handleSwitchToLogin = () => {
    setIsLogin(true); // Switch to Login form
  };

  const responseFacebook = (response) => {
    console.log(response);
    // Xử lý response từ Facebook ở đây. Có thể điều hướng người dùng nếu đăng nhập thành công.
  };

  return (
    <div className={styles["login-container"]}>
      <div className={styles["login-header"]}>
        <h2
          className={isLogin ? styles.active : ""}
          onClick={handleSwitchToLogin}
        >
          Đăng nhập
        </h2>
        <h2
          className={!isLogin ? styles.active : ""}
          onClick={handleSwitchToRegister}
        >
          Đăng ký
        </h2>
      </div>

      {isLogin ? (
        <div className={styles["login-form"]}>
          <input
            type="email"
            placeholder="Đăng Nhập"
            className={styles["login-input"]}
          />
          <input
            type="password"
            placeholder="Mật Khẩu"
            className={styles["login-input"]}
          />
          <button className={styles["login-btn"]}>ĐĂNG NHẬP</button>
          
          {/* Facebook Login Button */}
          <div>
                    <p className={styles["login-option"]}>Đăng nhập bằng:</p>
                    <div className={styles["facebook-login"]}><FaFacebook className={styles["facebook-icon"]}/></div>
                </div>

          <div className={styles["login-footer"]}>
            <p>
              Bạn quên mật khẩu? <a href="#">Quên mật khẩu?</a>
            </p>
            <p>
              Bạn chưa có tài khoản?{" "}
              <a href="#" onClick={handleSwitchToRegister}>
                Đăng ký
              </a>
            </p>
          </div>
        </div>
      ) : (
        <div className={styles["register-form"]}>
          <input type="text" placeholder="Họ" className={styles["register-input"]} />
          <input type="text" placeholder="Tên" className={styles["register-input"]} />
          <input type="email" placeholder="Email" className={styles["register-input"]} />
          <input type="password" placeholder="Mật khẩu" className={styles["register-input"]} />
          <button className={styles["register-btn"]}>ĐĂNG KÝ</button>
          <div className={styles["register-footer"]}>
            <p>
              Bạn đã có tài khoản?{" "}
              <a href="#" onClick={handleSwitchToLogin}>
                Đăng nhập ngay
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginForm;

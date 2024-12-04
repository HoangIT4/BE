import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    document.title="Không tìm thấy trang !"
    return (
        <React.Fragment>
            <div className='error-page h600px mt-6'>
                <h1>Oops! Không tìm thấy trang</h1>
                <section className="error-container">
                    <span className="four"><span className="screen-reader-text">4</span></span>
                    <span className="zero"><span className="screen-reader-text">0</span></span>
                    <span className="four"><span className="screen-reader-text">4</span></span>
                </section>
                <div className="link-container">
                    <Link to="/" className="more-link">
                        Về trang chủ
                    </Link>
                </div>
            </div>
        </React.Fragment>
    );
};

export default ErrorPage;
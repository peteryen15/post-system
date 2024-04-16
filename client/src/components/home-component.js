import React from "react";
import { NavLink } from "react-router-dom";

const HomeComponent = () => {
  return (
    <main>
      <div className="container py-4">
        <div className="p-5 mb-4 bg-light rounded-3">
          <div className="container-fluid py-5">
            <h1 className="display-5 fw-bold">發文系統</h1>
            <p className="col-md-8 fs-4">使用者可以登入系統、發文。</p>
            <p className="col-md-8 fs-4">
              本系統使用 React.js 作為前端框架，Node.js、MongoDB
              作為後端伺服器。此項目為 MERN 項目。
            </p>
            <button type="button" className="btn btn-primary">
              <NavLink className="nav-link" to="/posts">
                觀看全部貼文
              </NavLink>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomeComponent;

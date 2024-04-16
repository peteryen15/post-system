import React from "react";
import { Link, NavLink } from "react-router-dom";
import AuthService from "../services/auth.service";

const NavComponent = ({ currentUser, setCurrentUser }) => {
  const thumbnail = "https://img.icons8.com/nolan/64/user-default.png";

  const handleLogout = () => {
    AuthService.logout();
    window.alert("登出成功，您將被導向首頁");
    setCurrentUser(null);
  };

  return (
    <div>
      <header className="bg-light p-3 mb-3 border-bottom">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <Link
              className="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none"
              to="/"
            >
              <span className="fs-4">發文系統</span>
            </Link>

            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0 px-2">
              <li>
                <Link className="nav-link px-2" to="/posts">
                  全部貼文
                </Link>
              </li>
            </ul>

            {!currentUser && (
              <div className="col-md-3 text-end">
                <button type="button" className="btn btn-outline-primary me-2">
                  <NavLink className="nav-link" to="/login">
                    會員登入
                  </NavLink>
                </button>
                <button type="button" className="btn btn-primary">
                  <NavLink className="nav-link" to="/register">
                    註冊會員
                  </NavLink>
                </button>
              </div>
            )}

            {currentUser && (
              <div className="dropdown text-end">
                <Link
                  to={`/profile/${currentUser.user.name}`}
                  className="d-block link-body-emphasis text-decoration-none dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src={thumbnail}
                    alt="mdo"
                    width="32"
                    height="32"
                    className="rounded-circle"
                  />
                  <span className="px-2">{currentUser.user.name}</span>
                </Link>
                <ul className="dropdown-menu text-small">
                  <li>
                    <Link
                      className="dropdown-item"
                      to={`/posts?author=${currentUser.user.name}`}
                    >
                      我的貼文
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to={`/profile/${currentUser.user.name}`}
                    >
                      您的個人頁面
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link
                      onClick={handleLogout}
                      className="dropdown-item"
                      to="/"
                    >
                      登出
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </header>
    </div>
  );
};

export default NavComponent;

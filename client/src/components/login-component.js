import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

const LoginComponent = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      const response = await AuthService.login(email, password);
      localStorage.setItem("user", JSON.stringify(response.data));
      window.alert("登入成功，將導向您的個人頁面");
      setCurrentUser(AuthService.getCurrentUser());
      navigate(`/profile/${response.data.user.name}`);
    } catch (err) {
      if (err.response) {
        setMessage(err.response.data.message);
      } else {
        setMessage("未知的錯誤!");
      }
    }
  };

  return (
    <div style={{ padding: "3rem" }} className="col-md-12">
      <div style={{ maxWidth: "24rem" }} className="mx-auto d-grid">
        {message && <div className="alert alert-danger">{message}</div>}
        <div className="form-group">
          <label htmlFor="email">電子信箱：</label>
          <input
            onChange={handleEmail}
            type="text"
            className="form-control"
            id="email"
            name="email"
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="password">密碼：</label>
          <input
            onChange={handlePassword}
            type="password"
            className="form-control"
            id="password"
            name="password"
          />
        </div>
        <br />
        <button onClick={handleLogin} className="btn btn-primary">
          <span>登入系統</span>
        </button>
      </div>
    </div>
  );
};

export default LoginComponent;

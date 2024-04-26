import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AccountService from "../services/account.service";

const RegisterComponent = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleRegister = () => {
    AccountService.post(name, email, password)
      .then(() => {
        window.alert("註冊成功，您將被導向登入頁面");
        navigate("/login");
      })
      .catch((err) => {
        if (err.response) {
          setMessage(err.response.data.message);
        } else {
          setMessage("未知的錯誤!");
        }
      });
  };

  return (
    <div style={{ padding: "3rem" }} className="col-md-12">
      <div style={{ maxWidth: "24rem" }} className="mx-auto d-grid">
        {message && <div className="alert alert-danger">{message}</div>}
        <div>
          <label htmlFor="name">用戶名稱:</label>
          <input
            onChange={handleName}
            type="text"
            className="form-control"
            id="name"
            name="name"
          />
        </div>
        <br />
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
            placeholder="長度至少超過6個英文或數字"
          />
        </div>
        <br />
        <button onClick={handleRegister} className="btn btn-primary">
          <span>註冊</span>
        </button>
      </div>
    </div>
  );
};

export default RegisterComponent;

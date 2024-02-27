import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomeComponent from "./components/home-component";
import RegisterComponent from "./components/register-component";
import LoginComponent from "./components/login-component";
import ProfileComponent from "./components/profile-component";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomeComponent />} />
          <Route path="register" element={<RegisterComponent />} />
          <Route path="login" element={<LoginComponent />} />
          <Route path="profile" element={<ProfileComponent />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

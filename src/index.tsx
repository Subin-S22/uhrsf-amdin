import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./componets/pages";
import Application from "./componets/pages/Application";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const isLogin = () => localStorage.getItem("login");
root.render(
  <BrowserRouter>
    <Routes>
      <Route index path="/login" element={<Login />} />
      <Route
        path="/"
        element={isLogin() ? <App /> : <Navigate to={"/login"} />}
      ></Route>
      <Route path="/application/viewall" element={<Application />}></Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

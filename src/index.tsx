import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./componets/pages";
import Application from "./componets/pages/ApplicationReceived";
import ApplicationStatus from "./componets/pages/ApplicationStatus";
import UserForm from "./componets/pages/UserForm";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <BrowserRouter>
    <Routes>
      <Route index path="/login" element={<Login />} />
      <Route path="/" element={<App />}></Route>
      <Route path="/application" element={<Application />}></Route>
      <Route
        path="/application/:status"
        element={<ApplicationStatus />}
      ></Route>
      <Route path="/userManagement" element={<UserForm />}></Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

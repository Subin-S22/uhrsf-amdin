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
import BranchForm from "./componets/pages/BranchForm";
import { Provider } from "./context";
import BranchPage from "./componets/pages/BranchPage";
import { ToastContainer } from "react-toastify";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider>
    <ToastContainer />
    <BrowserRouter>
      <Routes>
        <Route index path="/login" element={<Login />} />
        <Route path="/" element={<App />}></Route>
        <Route path="/dashboard" element={<App />}></Route>
        <Route path="/application" element={<Application />}></Route>
        <Route
          path="/application/:status"
          element={<ApplicationStatus />}
        ></Route>
        <Route path="/application/add-user" element={<UserForm />}></Route>
        <Route path="/application/add-branch" element={<BranchForm />}></Route>
        <Route path="/application/branches" element={<BranchPage />}></Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

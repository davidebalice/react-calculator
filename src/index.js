import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./common/Header";
import Calculator from "./components/Calculator";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Header />
    <Calculator />
  </React.StrictMode>
);

reportWebVitals();

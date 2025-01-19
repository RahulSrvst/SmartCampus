import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import 'animate.css';
import { Toaster } from 'react-hot-toast';


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(

    <>
      <App />
      <Toaster position="top-center" reverseOrder={false} />
    </>

);

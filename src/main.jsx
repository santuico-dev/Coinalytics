import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { NavValueContext } from "./Context/NavValueContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NavValueContext>
      <RouterProvider router={router} />
    </NavValueContext>
  </React.StrictMode>
);

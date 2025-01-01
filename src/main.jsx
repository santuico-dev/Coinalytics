import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { NavValueContext } from "./Context/NavValueContext";
import { ConversionContext } from "./Context/ConversionContext";
import { SnackbarProvider } from "notistack";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SnackbarProvider maxSnack={2}>
      <NavValueContext>
        <ConversionContext>
          <RouterProvider router={router} />
        </ConversionContext>
      </NavValueContext>
    </SnackbarProvider>
  </React.StrictMode>
);

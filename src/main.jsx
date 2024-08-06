import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./Routes/LoginPage/LoginPage.jsx";
import RegisterPage from "./Routes/RegisterPage/RegisterPage.jsx";
import IniciarViagem from "./Routes/IniciarViagem/IniciarViagem.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/registrar",
    element: <RegisterPage />,
  },
  { 
    path: "/iniciar-viagem", 
    element: <IniciarViagem /> 
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

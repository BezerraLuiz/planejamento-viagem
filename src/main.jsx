import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./Routes/LoginPage/LoginPage.jsx";
import RegisterPage from "./Routes/RegisterPage/RegisterPage.jsx";
import IniciarViagem from "./Routes/IniciarViagem/IniciarViagem.jsx";
import UserPage from "./Routes/UserPage/UserPage.jsx";
import DetalhesViagem from "./Routes/DetalhesViagem/DetalhesViagem.jsx";

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
    path: "/user",
    element: <UserPage />,
  },
  {
    path: "/iniciar-viagem",
    element: <IniciarViagem />,
  },
  {
    path: "/detalhes/:idViagem", // Defina a rota para detalhes da viagem
    element: <DetalhesViagem />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

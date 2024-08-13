import { Outlet } from "react-router-dom";
import "./App.css";
import Footer from "./Components/Outlet/Footer/Footer";
import Navbar from "./Components/Outlet/Navbar/Navbar";
import PrincipalPage from "./Routes/PrincipalPage/PrincipalPage";
import { useEffect } from "react";

function App() {

  useEffect(() => {
    // Verificar se há e-mail e senha salvos no localStorage.
    // Se tiver, faz o login (salva no sessionStorage), se não, faz nada.
  }, []);

  return (
    <>
      <Navbar/>

      <PrincipalPage/>

      <Outlet />
      <Footer />
    </>
  );
}

export default App;

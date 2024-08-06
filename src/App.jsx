import { Outlet } from "react-router-dom";
import "./App.css";
import Footer from "./Components/Outlet/Footer/Footer";
import Navbar from "./Components/Outlet/Navbar/Navbar";
import PrincipalPage from "./Routes/PrincipalPage/PrincipalPage";

function App() {
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

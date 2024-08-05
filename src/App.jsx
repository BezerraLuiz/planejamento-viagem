import { Outlet } from "react-router-dom";
import "./App.css";
import Footer from "./Components/Outlet/Footer/Footer";
import Navbar from "./Components/Outlet/Navbar/Navbar";

function App() {
  return (
    <>
      <Navbar/>

      <Outlet />
      <Footer />
    </>
  );
}

export default App;

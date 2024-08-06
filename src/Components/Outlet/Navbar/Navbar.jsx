import { LiaSearchLocationSolid } from "react-icons/lia";
import "./Navbar.css";
import { CiUser } from "react-icons/ci";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const searchBarRef = useRef(null);
  const [local, setLocal] = useState("");
  const navigate = useNavigate();

  const handleFocus = () => {
    if (searchBarRef.current) {
      searchBarRef.current.classList.add("focused");
    }
  };

  const handleBlur = () => {
    if (searchBarRef.current) {
      searchBarRef.current.classList.remove("focused");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(local);
  };

  const handleNavigateLogin = () => {
    navigate('/login')
  }
  
  return (
    <>
      <nav>
        <h1>Router Airplane</h1>

        <div id="search-bar" ref={searchBarRef}>
          <LiaSearchLocationSolid />
          <form
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onSubmit={handleSearch}
            action=""
          >
            <input
              id="search-input"
              type="text"
              placeholder="Digite o local da viagem..."
              autoComplete="off"
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={(e) => setLocal(e.target.value)}
            />
          </form>
        </div>

        <CiUser id="icon-navbar"
          onClick={handleNavigateLogin}
        />
      </nav>
    </>
  );
}

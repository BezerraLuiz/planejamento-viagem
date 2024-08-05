import { LiaSearchLocationSolid } from "react-icons/lia";
import "./Navbar.css";
import icon from "../../../assets/icon.png";
import { useRef, useState } from "react";

export default function Navbar() {
  const searchBarRef = useRef(null);
  const [local, setLocal] = useState("");

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

        <img src={icon} id="icon-navbar" alt="icon" />
      </nav>
    </>
  );
}

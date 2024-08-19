import { LiaSearchLocationSolid } from "react-icons/lia";
import "./Navbar.css";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar({ searchTerm, setSearchTerm }) {
  const searchBarRef = useRef(null);
  const [local, setLocal] = useState("");
  const navigate = useNavigate();
  const [userLogado, setUserLogado] = useState("");

  useEffect(() => {
    let logado = sessionStorage.getItem("user");

    if (!logado) {
      setUserLogado("Login");
    } else {
      setUserLogado("Olá, " + sessionStorage.getItem("user"));
    }
  }, []);

  const handleFocus = () => {
    if (searchBarRef.current) {
      searchBarRef.current.classList.add('focused');
    }
  };

  const handleBlur = () => {
    if (searchBarRef.current) {
      searchBarRef.current.classList.remove('focused');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(local);
  };

  const handleInputChange = (e) => {
    setLocal(e.target.value);
    setSearchTerm(e.target.value);
  };

  const handleNavigateUser = () => {
    let logado = sessionStorage.getItem("user");

    if (!logado) {
      navigate("/login");
    } else {
      navigate("/user");
    }
  };

  return (
    <nav className='navbar'>
      <h1 className='logo'>Router Airplane</h1>
      <div className='searchContainer'>
        <div className='searchBar' ref={searchBarRef}>
          <LiaSearchLocationSolid className='searchIcon' />
          <form className='searchForm' onSubmit={handleSearch}>
            <input
              className='searchInput'
              type="text"
              placeholder="Digite o local da viagem..."
              autoComplete="off"
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={handleInputChange}
              value={local}
            />
          </form>
        </div>
      </div>
      <h3 className='userGreeting' onClick={handleNavigateUser}>{userLogado}</h3>
    </nav>
  );
}

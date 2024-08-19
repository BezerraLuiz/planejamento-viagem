// App.js
import { Outlet, useNavigate } from "react-router-dom";
import style from "./App.module.css";
import Footer from "./Components/Outlet/Footer/Footer";
import Navbar from "./Components/Outlet/Navbar/Navbar";
import { useEffect, useState } from "react";

function App() {
  const [idUser, setIdUser] = useState("");
  const [viagens, setViagens] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para o termo de pesquisa
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.length !== 0) {
      const userLogado = localStorage.getItem("lembrarUsuario");
      console.log(userLogado);

      sessionStorage.setItem("user", userLogado);
      console.log("Lembrou Usuário");
    }
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/users/getUserId",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: sessionStorage.getItem("user") }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          setIdUser(parseInt(data));
        } else {
          const errorText = await response.text();
          alert(errorText);
        }
      } catch (error) {
        alert("Erro ao carregar id do usuário. Tente novamente mais tarde!");
      }
    };

    if (sessionStorage.length != 0) {
      fetchUserData();
    }
  }, []);

  useEffect(() => {
    if (sessionStorage.length != 0) {
      if (idUser) {
        const fetchViagemData = async () => {
          try {
            const response = await fetch(
              "http://localhost:8080/api/viagens/get-viagens",
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  "User-Id": idUser,
                },
              }
            );

            if (response.ok) {
              const data = await response.json();
              setViagens(data);
            } else {
              const errorText = await response.text();
              alert(errorText);
            }
          } catch (error) {
            console.log("Erro ao carregar as viagens.");
          }
        };

        fetchViagemData();
      }
    }
  }, [idUser]);

  const handleFinalizar = async (idViagem) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/viagens/delete-viagem/${idViagem}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            // Remova o cabeçalho "Viagem-Id" se você passar o ID na URL
          },
        }
      );

      if (response.ok) {
        const data = await response.text(); // Ajustado para `text()` já que estamos retornando uma mensagem
        console.log(data);

        // Atualize o estado removendo a viagem deletada
        setViagens((prevViagens) =>
          prevViagens.filter((viagem) => viagem.idViagem !== idViagem)
        );
      } else {
        const errorText = await response.text();
        alert(errorText);
      }
    } catch (error) {
      console.log("Erro no try: " + error);
      alert("Erro ao deletar viagem.");
    }
  };

  const planejarViagem = () => {
    navigate("/iniciar-viagem");
  };

  const filteredViagens = viagens.filter((viagem) =>
    viagem.localViagem.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const detalhesViagem = (idViagem) => {
    navigate(`/detalhes/${idViagem}`);
  };

  return (
    <>
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className={style.container_main}>
        <button id={style.btn_planejar} onClick={planejarViagem}>
          Planejar Viagem
        </button>
      </div>

      <div className={style.container}>
        {filteredViagens.map((viagem) => (
          <div
            key={viagem.idViagem}
            className={style.card}
          >
            <h2 className={style.title} onClick={() => detalhesViagem(viagem.idViagem)}>{viagem.localViagem}</h2>
            <p className={style.details} onClick={() => detalhesViagem(viagem.idViagem)}>
              <span className={style.label}>Código:</span> {viagem.idViagem}
            </p>
            <p className={style.details} onClick={() => detalhesViagem(viagem.idViagem)}>Data de Início: {viagem.dataInicio}</p>
            <p className={style.details} onClick={() => detalhesViagem(viagem.idViagem)}>Data de Fim: {viagem.dataFim}</p>
            <button
              className={style.finalizarButton}
              onClick={() => handleFinalizar(viagem.idViagem)}
            >
              Finalizar
            </button>
          </div>
        ))}
      </div>

      <Outlet />
      <Footer />
    </>
  );
}

export default App;

import style from "./UserPage.module.css";
import Footer from "../../Components/Outlet/Footer/Footer";
import { FaRegEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";
import { useEffect, useState } from "react";

export default function UserPage() {
  const [senha, setSenha] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/users/me", {
          method: "POST", // Alterado para POST
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: sessionStorage.getItem("user") }),
        });

        if (response.ok) {
          const data = await response.json();
          setSenha(data); // Assumindo que o backend retorna a senha
        } else {
          const errorText = await response.text();
          alert(errorText);
        }
      } catch (error) {
        console.log("Erro no fetch: " + error);
        alert("Erro ao carregar dados do usuário. Tente novamente mais tarde!");
      }
    };

    fetchUserData();
  }, []);

  const handleSaveChanges = async () => {
    setIsLoading(true);

    try {
      const updatedUser = {
        email: sessionStorage.getItem("user"),
        senha: senha,
      };

      const response = await fetch("http://localhost:8080/api/users/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });

      if (response.ok) {
        setTimeout(() => {
          setIsLoading(false);
          navigate("/");
        }, 1000);
      } else {
        const errorText = await response.text();
        setIsLoading(false);
        alert(errorText);
      }
    } catch (error) {
      setIsLoading(false);
      console.log("Erro no try: " + error);
      alert("Erro ao tentar fazer login. Tente novamente mais tarde!");
    }
  };

  const handleEdit = () => {
    let input = document.getElementById("input-senha");
    input.disabled = false;
    input.style.backgroundColor = "white";
  };

 const handleCancel = () => {
  navigate('/');
 }

  const handleLogout = () => {
    setIsLoading(true);
    sessionStorage.clear();
    localStorage.clear("lembrarUsuario");

    setTimeout(() => {
      setIsLoading(false);
      navigate("/");
    }, 3000);
  };

  return (
    <>
      {isLoading && <Loading />}
      <div id={style.container}>
        <div id={style.container_user}>
          <div className={style.container_input}>
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              autoComplete="off"
              disabled
              value={sessionStorage.getItem("user")}
            />
          </div>
          <div className={style.container_input}>
            <label htmlFor="password">Senha</label>
            <div id={style.container_senha}>
              <input
                type="password"
                id="input-senha"
                autoComplete="off"
                disabled
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
              <FaRegEdit id={style.icon_edit} onClick={handleEdit} />
            </div>
            <div>
              <p onClick={handleLogout}>Desconectar Usuário</p>
            </div>
          </div>
          <div id={style.container_btn}>
            <span onClick={handleCancel}>
              Cancelar
            </span>
            <button onClick={handleSaveChanges}>Salvar Alterações</button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

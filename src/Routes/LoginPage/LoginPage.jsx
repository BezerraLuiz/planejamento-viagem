import style from "../LoginPage/LoginPage.module.css";
import Footer from "../../Components/Outlet/Footer/Footer";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmitAccount = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      });

      if (response.ok) {
        sessionStorage.setItem( "user", email)
        setTimeout(() => {
          setIsLoading(false);
          navigate("/");
        }, 3000);
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

  return (
    <>
      {isLoading && <Loading />}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          minHeight: "88vh",
          gap: "80px",
        }}
      >
        <h1 id={style.nome}>Router Airplane</h1>
        <div className={style.container}>
          <div className={style.login}>
            <div className={style.titulo}>
              <h1>Login</h1>
            </div>
            <form
              onSubmit={handleSubmitAccount}
              className={style.form}
              action=""
            >
              <div className={style.container_input}>
                <label htmlFor="email">E-mail</label>
                <input
                  className={style.input}
                  type="email"
                  placeholder="@mail.com"
                  required
                  autoComplete="off"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className={style.container_input}>
                <label htmlFor="password">Senha</label>
                <input
                  className={style.input}
                  type="password"
                  required
                  autoComplete="off"
                  onChange={(e) => setSenha(e.target.value)}
                />
              </div>
              <div className={style.check}>
                <input type="checkbox" />
                <label htmlFor="check">Lembrar Senha</label>
              </div>
              <button id={style.button}>Entrar</button>
              <div className={style.register}>
                <label htmlFor="registrar">Não possui cadastro?</label>
                <Link to={`/registrar`}>Cadastrar-se.</Link>
              </div>
            </form>
          </div>

          <Footer />
        </div>
      </div>
    </>
  );
}
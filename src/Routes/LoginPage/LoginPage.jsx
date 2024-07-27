import style from "../LoginPage/LoginPage.module.css";
import Footer from "../../Components/Outlet/Footer/Footer"
import { useState } from "react";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmitAccount = (e) => {
    e.preventDefault();

    console.log(email);
    console.log(senha);
  };

  return (
    <>
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
            <form onSubmit={handleSubmitAccount} className={style.form} action="">
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
                  placeholder="Senha@123"
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

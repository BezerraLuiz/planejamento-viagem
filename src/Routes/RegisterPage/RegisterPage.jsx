import style from "../RegisterPage/RegisterPage.module.css";
import Footer from "../../Components/Outlet/Footer/Footer"
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from '../../Components/Loading/Loading'

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [repetirSenha, setRepetirSenha] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmitAccount = (e) => {
    e.preventDefault();

    if (senha === repetirSenha) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);

        const index = localStorage.length / 2; // Cada conta ocupa duas chaves no localStorage
        localStorage.setItem("senha" + index, senha);
        localStorage.setItem("email" + index, email);

        navigate('/login');
      }, 3000);
    } else {
      alert("Senhas diferentes!");
      setRepetirSenha('');
    }
  };

  return (
    <>
      {isLoading && <Loading />}
      <div id={style.container_main}>
        <h1 id={style.nome}>Router Airplane</h1>
        <div className={style.container}>
          <div className={style.login}>
            <div className={style.titulo}>
              <h1>Cadastro</h1>
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
                  value={senha}
                />
              </div>
              <div className={style.container_input}>
                <label htmlFor="password">Repetir Senha</label>
                <input
                  className={style.input}
                  type="password"
                  required
                  autoComplete="off"
                  onChange={(e) => setRepetirSenha(e.target.value)}
                  value={repetirSenha}
                />
              </div>
              <button id={style.button}>Cadastrar</button>
              <div className={style.logar}>
                <label htmlFor="registrar">Já possui cadastro?</label>
                <Link to={`/login`}>Fazer login!</Link>
              </div>
            </form>
          </div>

          <Footer />
        </div>
      </div>
    </>
  );
}

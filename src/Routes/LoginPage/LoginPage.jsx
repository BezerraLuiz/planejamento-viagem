import style from "../LoginPage/LoginPage.module.css";

export default function LoginPage() {
  return (
    <>
      <div className={style.container}>
        <div className={style.login}>
          <div className={style.titulo}>
            <h1>Login</h1>
          </div>
          <form className={style.form} action="">
            <div className={style.container_input}>
              <label htmlFor="email">E-mail</label>
              <input className={style.input} type="email" placeholder="@mail.com" required />
            </div>
            <div className={style.container_input}>
              <label htmlFor="password">Senha</label>
              <input className={style.input} type="password" placeholder="Senha@123" required />
            </div>
            <div className={style.check}>
              <label htmlFor="check">
                <input type="checkbox" />
                Lembrar Senha
              </label>
            </div>
            <button id={style.button}>Entrar</button>
            <label htmlFor="register">
              Não possui cadastro?
              <a href="">Cadastrar-se.</a>
            </label>
          </form>
        </div>
      </div>
    </>
  );
}

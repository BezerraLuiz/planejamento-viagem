export default function LoginPage() {
  return (
    <>
      <div className="login">
        <h1>Login</h1>
        <form action="">
          <div>
            <label htmlFor="email">
              E-mail
              <input type="email" placeholder="@mail.com" />
            </label>
          </div>
          <div>
            <label htmlFor="password">
              Senha
              <input type="password" placeholder="Senha@123" />
            </label>
          </div>
        </form>
      </div>
    </>
  );
}

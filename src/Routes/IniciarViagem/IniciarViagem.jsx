import style from "./IniciarViagem.module.css";

export default function IniciarViagem() {
  return (
    <>
      <div id={style.container_main}>
        <div id={style.container}>
          <form id={style.form} action="">
            <div>
              <div
                style={{
                  display: "flex",
                  gap: "100px",
                  marginBottom: "15px",
                }}
              >
                <div className={style.container_input}>
                  <label htmlFor="">Local da Viagem</label>
                  <input type="text" />
                </div>
                <div className={style.container_input}>
                  <label htmlFor="">Local da Hospedagem</label>
                  <input type="text" />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "100px",
                }}
              >
                <div className={style.container_input}>
                  <label htmlFor="">Data Início</label>
                  <input type="date" />
                </div>
                <div className={style.container_input}>
                  <label htmlFor="">Data Fim</label>
                  <input type="date" />
                </div>
              </div>
            </div>
          </form>

          
        </div>
      </div>
    </>
  );
}

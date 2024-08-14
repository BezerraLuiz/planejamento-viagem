import style from "./IniciarViagem.module.css";
import Footer from "../../Components/Outlet/Footer/Footer";
import { useState } from "react";

export default function IniciarViagem() {
  const [valorPassagem, setValorPassagem] = useState('');

  const handleFormatarMoeda = (e) => {
    let value = e.target.value;

    // Remove todos os caracteres que não sejam dígitos
    value = value.replace(/\D/g, '');

    // Formata o valor para moeda BR.
    value = (Number(value) / 100).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });

    setValorPassagem(value);
  }
  
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

          <div id={style.container_orcamento}>
            <span></span>
            <p>Orçamento</p>
            <span></span>
          </div>

          <div>
            <div>
              <label htmlFor="">Valor Passagem</label>
              <input type="text"
                value={valorPassagem}
                onChange={handleFormatarMoeda}
              />
            </div>
            <div>
              <label htmlFor="">Valor Hospedagem</label>
              <input type="text"
                value={valorPassagem}
                onChange={handleFormatarMoeda}
              />
            </div>
            <div>
              <label htmlFor="">Valor estipulado para consumo</label>
              <input type="text"
                value={valorPassagem}
                onChange={handleFormatarMoeda}
              />
            </div>
            <div>
              <label htmlFor="">Total</label>
              <input type="text"
                value={valorPassagem}
                onChange={handleFormatarMoeda}
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

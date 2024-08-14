import style from "./IniciarViagem.module.css";
import Footer from "../../Components/Outlet/Footer/Footer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function IniciarViagem() {
  const [valorPassagem, setValorPassagem] = useState("");
  const [valorHospedagem, setValorHospedagem] = useState("");
  const [valorConsumo, setValorConsumo] = useState("");
  const [valorTotal, setValorTotal] = useState("");
  const navigate = useNavigate();

  const handleFormatarMoeda = (e, setState) => {
    let value = e.target.value;

    // Remove todos os caracteres que não sejam dígitos
    value = value.replace(/\D/g, "");

    // Formata o valor para moeda BR.
    value = (Number(value) / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    setState(value);
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <>
      <div id={style.container_main}>
        <div id={style.container}>
          <form id={style.form} action="" onSubmit={(e) => e.preventDefault()}>
            <div>
              <div
                style={{
                  display: "flex",
                  gap: "100px",
                  marginBottom: "15px",
                }}
              >
                <div className={style.container_input}>
                  <label htmlFor="localViagem">Local da Viagem</label>
                  <input
                    id="localViagem"
                    type="text"
                    autoComplete="off"
                    required
                  />
                </div>
                <div className={style.container_input}>
                  <label htmlFor="localHospedagem">Local da Hospedagem</label>
                  <input
                    id="localHospedagem"
                    type="text"
                    autoComplete="off"
                    required
                  />
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
                  <label htmlFor="dataInicio">Data Início</label>
                  <input
                    id="dataInicio"
                    type="date"
                    autoComplete="off"
                    required
                  />
                </div>
                <div className={style.container_input}>
                  <label htmlFor="dataFim">Data Fim</label>
                  <input id="dataFim" type="date" autoComplete="off" required />
                </div>
              </div>
            </div>

            <div id={style.container_orcamento}>
              <span></span>
              <p>Orçamento</p>
              <span></span>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "100px",
                margin: "20px 0 15px 0",
              }}
            >
              <div className={style.container_input}>
                <label htmlFor="valorPassagem">Valor Passagem</label>
                <input
                  id="valorPassagem"
                  type="text"
                  autoComplete="off"
                  required
                  value={valorPassagem}
                  onChange={(e) => handleFormatarMoeda(e, setValorPassagem)}
                />
              </div>
              <div className={style.container_input}>
                <label htmlFor="valorHospedagem">Valor Hospedagem</label>
                <input
                  id="valorHospedagem"
                  type="text"
                  autoComplete="off"
                  required
                  value={valorHospedagem}
                  onChange={(e) => handleFormatarMoeda(e, setValorHospedagem)}
                />
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
                <label htmlFor="valorConsumo">
                  Valor estipulado para consumo
                </label>
                <input
                  id="valorConsumo"
                  type="text"
                  autoComplete="off"
                  required
                  value={valorConsumo}
                  onChange={(e) => handleFormatarMoeda(e, setValorConsumo)}
                />
              </div>
              <div className={style.container_input}>
                <label htmlFor="valorTotal">Total</label>
                <input
                  id="valorTotal"
                  type="text"
                  autoComplete="off"
                  required
                  disabled
                  value={valorTotal}
                  onChange={(e) => handleFormatarMoeda(e, setValorTotal)}
                />
              </div>
            </div>

            <div id={style.divisor}>
              <span></span>
            </div>

            <div id={style.container_btn}>
              <span onClick={handleCancel}>Cancelar</span>
              <button>Salvar Alterações</button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}

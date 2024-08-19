import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import style from "./DetalhesViagem.module.css";
import Loading from '../../Components/Loading/Loading';
import Places from '../../Components/API/Places';

const DetalhesViagem = () => {
  const { idViagem } = useParams();
  const [viagem, setViagem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchViagemDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/viagens/get-viagem/${idViagem}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setViagem(data);
        } else {
          const errorText = await response.text();
          setError(errorText);
        }
      } catch (error) {
        setError("Erro ao carregar os detalhes.");
      } finally {
        setLoading(false);
      }
    };

    fetchViagemDetails();
  }, [idViagem]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!viagem) {
    return <div>Viagem não encontrada.</div>;
  }

  return (
    <>
      <div className={style.container_main}>
        <div className={style.container}>
          <div className={style.mapContainer}>
            <Places location={viagem.localViagem} />
          </div>
          <form id={style.form} action="" onSubmit={(e) => e.preventDefault()}>
            <div className={style.field_group}>
              <div className={style.container_input}>
                <label htmlFor="localViagem">Local da Viagem</label>
                <input
                  id="localViagem"
                  type="text"
                  autoComplete="off"
                  required
                  value={viagem.localViagem || ""}
                  disabled
                />
              </div>
              <div className={style.container_input}>
                <label htmlFor="localHospedagem">Local da Hospedagem</label>
                <input
                  id="localHospedagem"
                  type="text"
                  autoComplete="off"
                  required
                  value={viagem.localHospedagem || ""}
                  disabled
                />
              </div>
            </div>
            <div className={style.field_group}>
              <div className={style.container_input}>
                <label htmlFor="dataInicio">Data Início</label>
                <input
                  id="dataInicio"
                  type="date"
                  autoComplete="off"
                  required
                  value={viagem.dataInicio || ""}
                  disabled
                />
              </div>
              <div className={style.container_input}>
                <label htmlFor="dataFim">Data Fim</label>
                <input
                  id="dataFim"
                  type="date"
                  autoComplete="off"
                  required
                  value={viagem.dataFim || ""}
                  disabled
                />
              </div>
            </div>

            <div className={style.container_orcamento}>
              <span></span>
              <p>Orçamento</p>
              <span></span>
            </div>

            <div className={style.field_group}>
              <div className={style.container_input}>
                <label htmlFor="valorPassagem">Valor Passagem</label>
                <input
                  id="valorPassagem"
                  type="text"
                  autoComplete="off"
                  required
                  value={viagem.valorPassagem || ""}
                  disabled
                />
              </div>
              <div className={style.container_input}>
                <label htmlFor="valorHospedagem">Valor Hospedagem</label>
                <input
                  id="valorHospedagem"
                  type="text"
                  autoComplete="off"
                  required
                  value={viagem.valorHospedagem || ""}
                  disabled
                />
              </div>
            </div>

            <div className={style.field_group}>
              <div className={style.container_input}>
                <label htmlFor="valorConsumo">Valor estipulado para consumo</label>
                <input
                  id="valorConsumo"
                  type="text"
                  autoComplete="off"
                  required
                  value={viagem.valorConsumo || ""}
                  disabled
                />
              </div>
              <div className={style.container_input}>
                <label htmlFor="valorTotal">Total</label>
                <input
                  id="valorTotal"
                  type="text"
                  autoComplete="off"
                  required
                  value={viagem.valorTotal || ""}
                  disabled
                />
              </div>
            </div>

            <div className={style.divisor}></div>

            <div className={style.container_btn}>
              <span onClick={() => window.history.back()}>Voltar</span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default DetalhesViagem;

import style from "./IniciarViagem.module.css";
import Footer from "../../Components/Outlet/Footer/Footer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";

export default function IniciarViagem() {
  const [idUser, setIdUser] = useState("");
  const [localViagem, setLocalViagem] = useState("");
  const [localHospedagem, setLocalHospedagem] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [valorPassagem, setValorPassagem] = useState("");
  const [valorHospedagem, setValorHospedagem] = useState("");
  const [valorConsumo, setValorConsumo] = useState("");
  const [valorTotal, setValorTotal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/users/getUserId",
          {
            method: "POST", // Alterado para POST
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: sessionStorage.getItem("user") }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          setIdUser(data); // Assumindo que o backend retorna a senha
          console.log("Id: " + data);
        } else {
          const errorText = await response.text();
          alert(errorText);
        }
      } catch (error) {
        console.log("Erro no fetch: " + error);
        alert("Erro ao carregar id do usuário. Tente novamente mais tarde!");
      }
    };

    fetchUserData();
  }, []);

  const handleSubmitViagem = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    // Função para converter valores monetários para números
    const convertToNumber = (valor) => {
      return parseFloat(valor.replace("R$", "").replace(/\./g, "").replace(",", "."));
    };
  
    // Convertendo valores
    const valorPassagemNum = convertToNumber(valorPassagem);
    const valorHospedagemNum = convertToNumber(valorHospedagem);
    const valorConsumoNum = convertToNumber(valorConsumo);
  
    // Calculando o valor total
    const valorTotalCalculado = valorPassagemNum + valorHospedagemNum + valorConsumoNum;
    setValorTotal('R$ ' + valorTotalCalculado);
  
    try {
      // Enviar dados para o backend.
      const response = await fetch("http://localhost:8080/api/viagens/iniciar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idUser: idUser,
          localViagem: localViagem,
          localHospedagem: localHospedagem,
          dataInicio: dataInicio,
          dataFim: dataFim,
          valorPassagem: valorPassagemNum,
          valorHospedagem: valorHospedagemNum,
          valorConsumo: valorConsumoNum,
          valorTotal: valorTotalCalculado,
        }),
      });
  
      if (response.ok) {
        console.log("Viagem iniciada com sucesso!");
        navigate("/");
      } else {
        console.error("Erro ao iniciar viagem | Erro no response.");
        alert("Erro ao iniciar viagem!");
      }
    } catch (error) {
      console.log("Erro ao iniciar viagem | Erro no try: " + error);
      alert("Erro ao iniciar viagem");
    } finally {
      setIsLoading(false);
    }
  };  

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
      {isLoading && <Loading />}
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
                    value={localViagem}
                    onChange={(e) => setLocalViagem(e.target.value)}
                  />
                </div>
                <div className={style.container_input}>
                  <label htmlFor="localHospedagem">Local da Hospedagem</label>
                  <input
                    id="localHospedagem"
                    type="text"
                    autoComplete="off"
                    required
                    value={localHospedagem}
                    onChange={(e) => setLocalHospedagem(e.target.value)}
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
                    value={dataInicio}
                    onChange={(e) => setDataInicio(e.target.value)}
                  />
                </div>
                <div className={style.container_input}>
                  <label htmlFor="dataFim">Data Fim</label>
                  <input
                    id="dataFim"
                    type="date"
                    autoComplete="off"
                    required
                    value={dataFim}
                    onChange={(e) => setDataFim(e.target.value)}
                  />
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
              <button onClick={handleSubmitViagem}>Salvar Alterações</button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}

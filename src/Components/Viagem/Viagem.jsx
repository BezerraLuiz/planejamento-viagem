import { useEffect, useState } from "react";

export default function Viagem() {
  const [idUser, setIdUser] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/users/getUserId",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: sessionStorage.getItem("user") }),
          }
        );
  
        if (response.ok) {
          const data = await response.json();
          setIdUser(parseInt(data)); // Assumindo que o backend retorna o ID do usuário
          console.log("Id: " + data);
        } else {
          const errorText = await response.text();
          alert(errorText);
        }
      } catch (error) {
        console.log("Erro no try: " + error);
        alert("Erro ao carregar id do usuário. Tente novamente mais tarde!");
      }
    };
  
    fetchUserData();
  }, []);
  
  useEffect(() => {
    if (idUser) {
      const fetchViagemData = async () => {
        try {
          const response = await fetch(
            "http://localhost:8080/api/viagens/get-viagens",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "User-Id": idUser,
              },
            }
          );
  
          if (response.ok) {
            const data = await response.json();
            console.log("data: ", JSON.stringify(data, null, 2));

            // Setar valores para as variáveis.

            // data.forEach((item) => {
            //   const idViagem = item.idViagem;
            //   const idUser = item.idUser;
            //   const localViagem = item.localViagem;
            //   const localHospedagem = item.localHospedagem;
            //   const dataInicio = item.dataInicio;
            //   const dataFim = item.dataFim;
            //   const valorPassagem = item.valorPassagem;
            //   const valorHospedagem = item.valorHospedagem;
            //   const valorConsumo = item.valorConsumo;
            //   const valorTotal = item.valorTotal;
            
            //   // Exemplo de uso das variáveis
            //   console.log(`ID da Viagem: ${idViagem}`);
            //   console.log(`ID do Usuário: ${idUser}`);
            //   console.log(`Local da Viagem: ${localViagem}`);
            //   console.log(`Local de Hospedagem: ${localHospedagem}`);
            //   console.log(`Data de Início: ${dataInicio}`);
            //   console.log(`Data de Fim: ${dataFim}`);
            //   console.log(`Valor da Passagem: ${valorPassagem}`);
            //   console.log(`Valor da Hospedagem: ${valorHospedagem}`);
            //   console.log(`Valor do Consumo: ${valorConsumo}`);
            //   console.log(`Valor Total: ${valorTotal}`);
            // });
          } else {
            const errorText = await response.text();
            alert(errorText);
          }
        } catch (error) {
          console.log("Erro ao carregar as viagens: " + error);
          alert("Erro ao carregar as viagens.");
        }
      };
  
      fetchViagemData();
    }
  }, [idUser]); // Este useEffect roda quando o idUser é atualizado  

  return <></>;
}

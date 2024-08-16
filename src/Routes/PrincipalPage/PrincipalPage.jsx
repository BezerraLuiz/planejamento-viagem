import { useNavigate } from "react-router-dom";
import style from "./PrincipalPage.module.css";
import Viagem from "../../Components/Viagem/Viagem";

export default function PrincipalPage() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/iniciar-viagem");
  };

  return (
    <>
      <div className={style.container_main}>
        <button id={style.btn_planejar} onClick={handleNavigate}>
          Planejar Viagem
        </button>
      </div>

      <Viagem/>
    </>
  );
}

import { Link } from "react-router-dom";
import style from "./PrincipalPage.module.css";

export default function PrincipalPage() {
  return (
    <>
      <div className={style.container_main}>
        <button id={style.btn_planejar}>
          <Link style={{
            textDecoration: "none",
            color: "#5350C1"
          }} to={`/iniciar-viagem`}>
            Planejar Viagem
          </Link>
        </button>
      </div>
    </>
  );
}

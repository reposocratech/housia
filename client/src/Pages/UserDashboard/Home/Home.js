import React from "react";
import { Container } from "react-bootstrap";
import "./StyleHome.scss";

export const Home = () => {
  return (
    <Container fluid className="fondoHome">
      <div className="row">
        <div className="col-12 col-lg-12 col-xl-12 col-xxl-6">
          <div className="colInfo">
            <div className="divInfo">
              <div className="botInfo">Welcome to Housia</div>
              <div className="botInfoA">Quienes somos</div>
            </div>
            <p className="tamInfo">
              Toma El Control De Tus Propiedades Inmobiliarias
            </p>
            <p className="pInfo">Controla tus propiedades</p>
            <p className="pInfo">Descubre oportunidades de Inversión</p>
            <p className="pInfo">Valora inversiones por su beneficio</p>
            <button className="soonBoton">Soon</button>
          </div>
        </div>
        <div className="col-6 divcol6 ">
          <div className="imageInfo">
            <img
              className=""
              src="../images/user/mock20.png"
              alt="mock20.png"
            />
          </div>
        </div>
      </div>

    </Container>
  );
};

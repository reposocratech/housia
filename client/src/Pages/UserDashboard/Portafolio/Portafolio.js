import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../Context/AppContext";
import axios from "axios";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { localStorageUser } from "../../../Utils/localStorage/localStorageUser";

import "./portafolio.scss";

export const Portafolio = () => {
  /* console.log(propertyDetails); */

  const { user, setIsLogged, propertyDetails, setPropertyDetails } = useContext(AppContext);
  const navigate = useNavigate();

  const URL_PROP = 'http://localhost:4000/property';

  useEffect(() => {
    const token = localStorageUser();
    if (token) {
      let id = jwtDecode(token).user.id;
      setIsLogged(true);
      /* console.log(id); */

      axios
        .get(`http://localhost:4000/users/getAllProperty/${id}`)

        .then((res) => {
          setPropertyDetails(res.data.resultProperty);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const handleSold = (idProperty, isSold) => {
    let url = "";
    const END_URL_USER = `${idProperty}/${user.user_id}`

    if (isSold === 1) {
      url = `${URL_PROP}/uncheckSale/${END_URL_USER}`;
    } else if (isSold === 0) {
      url = `${URL_PROP}/checkSale/${END_URL_USER}`;
    }
    axios
      .put(url)
      .then((res) => {
        setPropertyDetails(res.data);
      })
      .catch((Err) => console.log(Err));
  };

  const handleAllProperties = () => {
    const token = localStorageUser();
    if (token) {
      let user_id = jwtDecode(token).user.id;

      axios
        .get(`http://localhost:4000/users/getProperties/${user_id}`)
        .then((res) => {
          setPropertyDetails(res.data);
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <Container fluid className="portafolio-container">
      <h1 className="turquoise">PORTAFOLIO</h1>

      <div className="image">
        <div className="benefit">
          <h4>Beneficio</h4>
          <h1 className="turquoise">312.220 €</h1>
          <div className="total">
            <span>Total</span>
            <span className="turquoise">+32%</span>
          </div>
          <div className="monthly">
            <span>Monthly</span>
            <span className="turquoise">+32%</span>
          </div>
        </div>
      </div>

      <div className="buttons">
        <Button className="button" onClick={handleAllProperties}>
          Ver todas mis propiedades
        </Button>
        <Button className="button" onClick={() => navigate(`/addProperty`)}>
          Añadir propiedad
        </Button>
      </div>
      <div className="row">
        {propertyDetails?.map((prop, index) => {
          return (
            <div className="col-12 col-sm-6 col-lg-4 properties" key={index}>
              <div className="property">
                <div
                  onClick={() => navigate(`/propertyDetails/${prop.property_id}`)}
                  className="imageMain"
                >
                  <img src={`/images/property/${prop.image_title}`} />
                </div>

                <div className="all">
                  <button
                    onClick={() => navigate(`/propertyDetails/${prop.property_id}`)}
                    className="infoProperty"
                  >
                    <h5>
                      {prop?.property_name}
                      <div
                        className={ prop.property_is_for_sale === 0 ? "nosold " : "sold "}
                      >
                        En Venta
                      </div>
                    </h5>
                    <p>
                      <img
                        className="location"
                        src="/images/property/location.png"
                      />
                      <span className="address">
                        {" "}
                        {prop.address_street_name}{" "}
                      </span>
                      <span className="address">
                        {prop.address_street_number}
                      </span>
                    </p>
                    <h5 className="turquoise">{prop.purchase_buy_price} €</h5>
                  </button>

                  <div className="del_sale">
                    <Button
                      onClick={() => handleSold(prop.property_id, prop.property_is_for_sale) }
                      className="sale"
                    >
                      {prop.property_is_for_sale === 0
                        ? "Poner en venta"
                        : "Quitar de la venta"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Container>
  );
};

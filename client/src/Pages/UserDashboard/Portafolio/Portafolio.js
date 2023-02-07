import React, { useContext, useEffect } from "react";
import { AppContext } from "../../../Context/AppContext";
import axios from "axios";
import { Button, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { localStorageUser } from "../../../Utils/localStorage/localStorageUser";
import Swal from "sweetalert2";

import "./portafolio.scss";

export const Portafolio = () => {
  /* console.log(propertyDetails); */

  const { user, setIsLogged, propertyDetails, setPropertyDetails } =
    useContext(AppContext);
  const navigate = useNavigate();

  const URL_PROP = "http://localhost:4000/property";

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

  const createAlert = () => {
    Swal.fire({
      icon: "error",
      text: "Debes introducir el precio de compra!",
    });
  };

  const handleSold = (idProperty, isSold, purchase_buy_price) => {
    let url = "";
    const END_URL_USER = `${idProperty}/${user.user_id}`;
    if (purchase_buy_price === 0 || !purchase_buy_price) {
      createAlert();
    } else {
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
    }
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
      <h1>Portafolio</h1>
      <div className="image">
        <div className="benefit">
          <h4>Beneficio</h4>
          <h2>312.220 €</h2>
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

      <Row className="container-prop">
        {propertyDetails?.map((prop, index) => {
          return (
            <div
              className="col-12 col-sm-10 col-md-6 col-lg-4 properties_portfolio"
              key={index}
            >
              <div className="property_portfolio">
                <div
                  onClick={() =>
                    navigate(`/propertyDetails/${prop.property_id}`)
                  }
                  className="imageMain"
                >
                  <img src={`/images/property/${prop.image_title}`} alt='property_image' />

                  <div className="filtro-opaco">
                    <div
                      className={
                        prop.property_is_for_sale === 0 ? "nosold " : "sold "
                      }
                    >
                      En Venta
                    </div>
                    <h5>€{prop.purchase_buy_price}</h5>
                  </div>
                </div>

                <div className="p-2">
                  <div
                    onClick={() =>
                      navigate(`/propertyDetails/${prop.property_id}`)
                    }
                    className="infoProperty"
                  >
                    <h5>{prop?.property_name}</h5>
                    <div className="d-flex align-items-center">
                      <img
                        className="location"
                        src="/images/property/location.png"
                        alt="property_location_image"
                      />
                      <p className="address m-0">
                        {" "}
                        {prop.address_street_name} {prop.address_street_number}
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={() =>
                      handleSold(
                        prop.property_id,
                        prop.property_is_for_sale,
                        prop.purchase_buy_price
                      )
                    }
                    className="sale"
                  >
                    {prop.property_is_for_sale === 0
                      ? "Poner en venta"
                      : "Quitar de la venta"}
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </Row>
    </Container>
  );
};

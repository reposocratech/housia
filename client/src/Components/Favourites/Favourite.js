import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import Card from "react-bootstrap/Card";
import { localStorageUser } from "../../Utils/localStorage/localStorageUser";
import { Container } from "react-bootstrap";
import "./Favourite.scss";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";

export const Favourite = () => {
  const [fav, setFav] = useState();
  const { user } = useContext(AppContext);
  const navigate = useNavigate();
  const [reset, setReset] = useState(true);

  useEffect(() => {
    const token = localStorageUser();
    if (token) {
      let id = jwtDecode(token).user.id;
      axios
        .get(`http://localhost:4000/property/favUser/${id}`)
        .then((res) => {
          setFav(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [reset]);

  const handleFav = (property_id) => {
    let arrProv = fav.filter(elem => elem.property !== property_id)

    axios
      .delete(
        `http://localhost:4000/property/unfav/${user.user_id}/${property_id}`
      )
      .then((res) => {
        console.log("Eliminado");
        setFav(arrProv);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(fav, "favoritos");

  return (
    <div className="padreFav">
      <h2>Mis Favoritos</h2>
      <Container fluid>
        <div className="row">
          {fav?.map((favorito, i) => {
            return (
              <div
                key={i}
                className="col-12 col-lg-6 col-xl-6 col-xxl-4 cardFavFondo"
              >
                <Card style={{ width: "18rem" }}>
                  <Card.Img
                    variant="top"
                    onClick={() =>
                      navigate(`/propertyDetails/${favorito?.property_id}`)
                    }
                    src={`/images/property/${favorito?.image_title}`}
                  />

                  <Card.Body className="carBodyFav">
                    <Card.Title className="carTitleFav">
                      <div className="displayFav">
                        <h6>{favorito?.property_name}</h6>{" "}
                        <h3>{favorito?.purchase_buy_price}€</h3>
                      </div>
                      <p>
                        {`${favorito?.province_name}   ${favorito?.city_name} (Spain)`}{" "}
                      </p>
                      <button onClick={() => handleFav(favorito?.property_id)}>
                        Quitar de favoritos
                      </button>
                    </Card.Title>
                  </Card.Body>
                </Card>
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
};

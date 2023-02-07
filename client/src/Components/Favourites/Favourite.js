import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import Card from "react-bootstrap/Card";
import { localStorageUser } from "../../Utils/localStorage/localStorageUser";
import { Container } from "react-bootstrap";
import "./Favourite.scss";
/* import { useNavigate } from "react-router-dom"; */
import { AppContext } from "../../Context/AppContext";

export const Favourite = () => {
  const [fav, setFav] = useState([]);
  const { user } = useContext(AppContext);
 /*  const navigate = useNavigate(); */

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
  }, []);
  
  const handleFav = (property_id) => {
    let arrProv = fav.filter(elem => elem.property_id !== property_id)

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
        
  return (
    <div className='padreFav'>
    <h1>Mis Favoritos</h1>
<Container fluid>
    <div className='d-flex flex-wrap justify-content-center'>
        
        {fav?.map((favorito, i)=>{
        return(

          <div key={i} className='col-md-5 col-lg-4 cardFavFondo'>  
            <Card className='tarjeta-fav'>
            <Card.Img variant="top" /* onClick={()=>navigate(`/propertyDetails/${favorito?.property_id}`)} */ src={`/images/property/${favorito?.image_title}`} />
  
            <Card.Body className='carBodyFav'>
            <Card.Title className='carTitleFav'>
                <div className='displayFav'>
                    <h6>{favorito?.property_name}</h6> 
                    <h3>{favorito?.purchase_buy_price}€</h3>
                </div>
                <div className='d-flex align-items-center'>
                    <span class="material-symbols-outlined">
                        location_on
                    </span>
                    <p className='m-0'>{`${favorito?.province_name}   ${favorito?.city_name} (Spain)` } </p>
                </div>
                <div className='d-flex justify-content-center mt-2'>
                    <button onClick={()=>(handleFav(favorito?.property_id))}>Quitar de favoritos</button>
                </div>
                
            </Card.Title>
            </Card.Body>
            </Card>

    </div>

        )
    })}
        
    </div>
</Container>

</div>
  );

};

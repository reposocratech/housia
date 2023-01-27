import React, { useEffect, useState } from 'react';
import axios from "axios";

export const Discover = () => {
    const [discover, setDiscover] = useState([]);
    const [fav, setFav] = useState(false);
    useEffect(() => {
        axios
        .get(`http://localhost:4000/property/discover`)
        .then((res) => {
            setDiscover(res.data);
            console.log(res.data, "VENDIDOOOOOOOOOOOOOOOOOOO");
           
        })
        .catch((err) => {
            console.log(err);
        });
    }, [])
console.log(discover, "DISCOVER")
    
        const handleFav = (user_id, property_id) => {
        setFav(!fav);
        if(fav === false){
            axios
            .post(`http://localhost:4000/property/fav/${user_id}/${property_id}`)
            .then((res) => {
                console.log("Insertado")
               
            })
            .catch((err) => {
                console.log(err);
            });
        }

        if(fav === true){
            axios
            .delete(`http://localhost:4000/property/unfav/${user_id}/${property_id}`)
            .then((res) => {
                console.log("Eliminado")
            })
            .catch((err) => {
                console.log(err);
            });
        } 

        }
  return (
    <div>
        <h1>Descubre</h1>
        <div>
        {discover?.map((property, i) => {
            return(
                <div key={i} style={{border:"2px solid red"}}>
                <img src='' alt={property?.image_title}></img>
                <h3>{property?.property_name}</h3>
                <p>{property?.province_name} {property?.city_name} (Spain)</p>
                <p>Precio: {property?.purchase_buy_price}</p>
                <span onClick={()=>handleFav(property?.property_user_id, property?.property_id)} style={{backgroundColor: fav ? "yellow" : "white", border: "1px solid black"}}>{fav ? "⭐" : "✰"}</span>
                </div>
            )
        })}
        </div>
    </div>
  )
}

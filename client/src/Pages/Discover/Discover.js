import React, { useEffect, useState } from 'react';
import axios from "axios";

export const Discover = () => {
    const [discover, setDiscover] = useState([]);

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
                </div>
            )
        })}
        </div>
    </div>
  )
}

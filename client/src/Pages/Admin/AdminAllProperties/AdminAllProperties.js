import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const AdminAllProperties = () => {

    const [allProperties, setAllProperties] = useState()

    useEffect(()=>{
        
        axios
            .get("http://localhost:4000/admin/allProperties")
            .then((res)=>{
                console.log(res, "esto es la respuesta del axios")
                setAllProperties(res.data)
            })
            .catch((error)=>{
                console.log(error)
            })
    },[]);

    //PARA CUANDO TENGAMOS QUE PONER FILTROS.
    // let casasAMostrar = allProperties.filter(elem => elem.price >= "el precio del limitar que pongamos")

    let casasAMostrar = allProperties;


  return (

    <div>
        <h1>Aqui tiene que ver todas la propiedades</h1>

        <div>
            <h3>Nombre de la casa</h3>
            <p>calle</p>
            <p>provincia</p>
            <p>precio</p>
        </div>

        { casasAMostrar?.map((elem, index)=>{
            return(
                <div>
                     <h3>Nombre de la casa: {elem.name}</h3>
                    <p>calle: {elem.street}</p>
                    <p>provincia: {elem.province}</p>
                    <p>precio: {elem.price}</p>
                </div>
            )
        })
            
        }

    </div>

  )
}

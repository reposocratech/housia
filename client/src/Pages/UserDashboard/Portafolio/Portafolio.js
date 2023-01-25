import React, { useContext, useEffect, useState}  from 'react';
import { AppContext } from '../../../Context/AppContext';
import axios from 'axios';
import {Button, Container} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import './portafolio.scss';


export const Portafolio = () => {
  const [propertyDetails, setPropertyDetails] = useState();

   const {user} = useContext(AppContext);
  const navigate = useNavigate();
  // console.log(user);
  // console.log(isLogged);
  // console.log(propertyDetails);
  console.log(user, "user del portfolio");


 

  useEffect(() => {
    
    axios
      .get(`http://localhost:4000/users/getAllProperty/${user.user_id}`)
      .then((res)=>{
        // console.log(res.data);
        setPropertyDetails(res.data.resultProperty);
      })
      .catch((err)=> {
        console.log(err);
      })
}, [user.user_id])

  const delPropertyUser = (propiedad) => {
    
    axios
      .put(`http://localhost:4000/users/logicDeletedUserProperty/${propiedad.property_id}/${user.user_id}`)
      .then((res) => {
        setPropertyDetails(res.data.resultProperty);
          // console.log(res.data.resultProperty, "respuesta del axios del delete");
      })
      .catch((error)=> {console.log(error);})
  }
    



  const handleSold = (idProperty, isSold) => {
    let url = "";
    
    if(isSold === 1){
      url=`http://localhost:4000/property/uncheckSale/${idProperty}/${user.user_id}`
  }else if (isSold === 0) {
    url = `http://localhost:4000/property/checkSale/${idProperty}/${user.user_id}`
  }
  axios
  .put(url)
  .then((res)=>{
      setPropertyDetails(res.data)
      // console.log(res);
  })
  .catch((Err)=>console.log(Err))
  }

  const handleAllProperties = () => {
    axios
    .get(`http://localhost:4000/users/getProperties/${user.user_id}`)
    .then ((res) => {
      setPropertyDetails(res.data)
      
    })
    .catch((error)=> console.log(error))
  }

console.log(propertyDetails);
  return (
    <Container fluid className='portafolio-container'>
      <h1 className='turquesa'>PORTAFOLIO</h1>

      <div className='image'>
        <div className='beneficio'>
          <h4>Beneficio</h4>
          <h1 className='turquesa'>312.220 €</h1>
          <div className='total'><span>Total</span><span className='turquesa'>+32%</span></div>
          <div className='monthly'><span>Monthly</span><span className='turquesa'>+32%</span></div>
        </div>
      </div>

      <div className='botones'>
      <Button className='boton' onClick={handleAllProperties}>Ver todas mis propiedades</Button>
      <Button className='boton' onClick={()=>navigate(`/addProperty`)}>Añadir propiedad</Button>
      </div>
      <div className='row'>
        {propertyDetails?.map((prop, index)=> {
            return(

              <div className='col-4' key={index}>
              <Button onClick={()=>navigate(`/propertyDetails/${prop.property_id}`)} className='propiedad' key={prop.property_id}>
                  <p>{prop?.property_name}</p>
                  <p>
                    <span>{prop.address_street_name} </span>
                    <span>{prop.address_street_number}</span>
                    </p>
                    <p>{prop.purchase_buy_price} €</p>
                  
                  </Button>
              <div >
                  <Button 
                    onClick={()=>delPropertyUser(prop)} className='borrar'
                    >Borrar</Button>
    
                  <Button onClick={()=>handleSold(prop.property_id, prop.property_is_for_sale)} className='venta'>{prop.property_is_for_sale === 0 ? "Poner en venta" : "quitar de la venta"}</Button>
              </div>
              </div>
            )
          })
      }
      </div>
      

    </Container>
  )
}

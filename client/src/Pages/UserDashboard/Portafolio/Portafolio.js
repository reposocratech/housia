import React, { useContext, useEffect, useState}  from 'react';
import { AppContext } from '../../../Context/AppContext';
import axios from 'axios';
import {Container} from 'react-bootstrap'
import './portafolio.scss';

export const Portafolio = () => {
  const [propertyDetails, setPropertyDetails] = useState();
  const {user, isLogged} = useContext(AppContext);
  console.log(user);
  console.log(isLogged);
  console.log(propertyDetails);
  

  useEffect(() => {
    axios
      .get(`http://localhost:4000/users/getAllProperty/1`)
      .then((res)=>{
        console.log(res.data);
        setPropertyDetails(res.data.resultProperty);
      })
      .catch((err)=> {
        console.log(err);
      })
}, [])

  return (
    <Container fluid className='portafolio-container'>
      <h1>PORTAFOLIO</h1>
      {propertyDetails?.map((property)=> {
        return(
          <p>{property?.property_name}</p>
        )
      }) }

    </Container>
  )
}

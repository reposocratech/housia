import React, { useContext, useEffect}  from 'react';
import { AppContext } from '../../../Context/AppContext';
import axios from 'axios';
import './portafolio.scss';

export const Portafolio = () => {
  const {user} = useContext(AppContext);
  let id = user.user_id;
  

  useEffect(() => {
    axios
      .get(`http://localhost:4000/users/getAllProperty/${id}`)
      .then((res)=>{
        console.log(res.data.resultProperty);
      })
      .catch((err)=> {
        console.log(err);
      })
}, [])

  return (
    <div className='portafolio-container'>
      <h1>PORTAFOLIO</h1>


    </div>
  )
}

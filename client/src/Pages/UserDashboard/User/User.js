import React, { useContext, useEffect, useState }  from 'react';
import { AppContext } from '../../../Context/AppContext';
import {Row, Col} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from "axios";
import './user.scss';

export const User = () => {
  const {user} = useContext(AppContext);
  const navigate = useNavigate();
  const [fav, setFav] = useState();
  const [reset, setReset] = useState();
  console.log(user, "hola")
  useEffect(() => {
    axios
        .get(`http://localhost:4000/property/favUser/2`)
        .then((res) => {
            setFav(res.data)             
        })
        .catch((err) => {
            console.log(err);
        });
  }, [reset])

const handleFav = (property_id) => {
  setReset("")
  axios
  .delete(`http://localhost:4000/property/unfav/2/${property_id}`)
  .then((res) => {
      console.log("Eliminado")
  })
  .catch((err) => {
      console.log(err);
  });
} 

  
  return (
    <div className='perfil-usuario'>
      <section className='perfil-datos'>
        <h1>Perfíl</h1>
        <img className='perfil-imagen' src={`../images/user/${user?.user_img}`} alt='foto_user' />
        <h2>{user?.user_name} {user?.user_lastname}</h2>
        <h5>{user?.user_email}</h5>
      </section>

    <section className='perfil-extras'>
      <Row className='fila m-0'>
        <Col className='columna' xs={10} sm={5} lg={4}>
          <h2>Busquedas</h2>
          <div className='perfil-opcion'><span class="material-symbols-outlined icono">
            favorite
          </span> <p>Mis favoritos</p> 
          <Dropdown>
          <Dropdown.Toggle className='toggle'>
       
          </Dropdown.Toggle>
          <Dropdown.Menu>
          {fav?.length === 0 ? (<Dropdown.Item>No tienes favoritos</Dropdown.Item>) : (fav?.map ((fav, i) => {
          return(
          <Dropdown.Item key={i} ><div style={{display:"flex", alignItems: 'center'}}>
            <span class="material-symbols-outlined icono" onClick={()=>handleFav(fav?.property_id)} >
            favorite
          </span>
            <div  style={{ margin:"20px"}} onClick={()=>navigate(`/propertyDetails/${fav?.property_id}`)}>
              <img style={{width:"100px"}} src={`/images/property/${fav?.image_title}`} alt={fav?.image_title}/>
              <p>{fav?.property_name}</p>
            </div>
            </div>
            </Dropdown.Item>
          )
          })) }
           </Dropdown.Menu>
          </Dropdown>
          </div>
          <div className='perfil-opcion'>
          <span class="material-symbols-outlined icono">
          label_important
          </span>
          <p>Busquedas guardadas</p>
          </div>

          <div className='perfil-opcion'><span class="material-symbols-outlined icono">
            notifications
          </span> <p>Alertas</p> 
          </div>
        </Col>

        <Col xs={10} sm={5} lg={4}>
            <h2>General</h2>
            <div className='perfil-opcion'>
              <span class="material-symbols-outlined icono">
              edit
              </span>
            <p onClick={()=>navigate('/user/editUser')}>Editar perfil</p>
          </div>

          <div className='perfil-opcion'>
              <span class="material-symbols-outlined icono">
              <span class="material-symbols-outlined">
              settings
              </span>
              </span>
            <p>Ajuste</p>
          </div>
            
         
        </Col>
      </Row>
    </section>
      
        
      
     
      
    </div>
  )
}

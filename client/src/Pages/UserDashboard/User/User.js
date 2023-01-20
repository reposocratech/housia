import React, { useContext }  from 'react';
import { AppContext } from '../../../Context/AppContext';
import {Row, Col} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom';


export const User = () => {
  const {user, isLogged} = useContext(AppContext);
  const navigate = useNavigate();
  
  return (
    <div>
      <Row>
        <h1>Perfíl</h1>
        <img className='w-25' src={`../images/user/${user?.user_img}`}/>
        <h2>{user?.user_name} {user?.user_lastname}</h2>
        <h3>{user?.user_email}</h3>
      </Row>

      <Row>
        <Col>
        <h1>Busquedas</h1>
        <p>Mis favoritos</p>
        <p>Busquedas guardadas</p>
        <p>Alertas</p>
        </Col>
        <Col>
        <h1>General</h1>
        <p onClick={()=>navigate('/user/editUser')}>Editar perfil</p>
        <p>Ajustes</p>
        </Col>
      </Row>
      
    </div>
  )
}

import React, { useContext, useEffect, useState }  from 'react';
import { AppContext } from '../../../Context/AppContext';
import {Row, Col} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import './user.scss';

export const User = () => {
  const {user} = useContext(AppContext);
  const navigate = useNavigate();
  const [fav, setFav] = useState();
  const [reset, setReset] = useState();
  /* console.log(user, "hola") */
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
  
  return (
    <div className='perfil-usuario'>
      <section className='perfil-datos'>
        <h1>Perfil</h1>
        <img className='perfil-imagen' src={`../images/user/${user?.user_img}`} alt='foto_user' />
        <h2>{user?.user_name} {user?.user_lastname}</h2>
        <h5>{user?.user_email}</h5>
      </section>

    <section className='perfil-extras'>
      <Row className='fila m-0'>

        {user?.user_type === 2 && (
          <Col className='columna' xs={10} sm={5} lg={4}>
            <h2>Busquedas</h2>
            <div className='perfil-opcion'><span className="material-symbols-outlined icono">
              favorite
            </span><p onClick={()=>navigate("/user/favourites")}>Mis favoritos</p> 
            </div>
            <div className='perfil-opcion'>
            <span className="material-symbols-outlined icono">
              label_important
            </span>
            <p>Busquedas guardadas</p>
            </div>

            <div className='perfil-opcion'><span className="material-symbols-outlined icono">
              notifications
            </span> <p>Alertas</p> 
            </div>
          </Col>
        )}

        <Col xs={10} sm={5} lg={4}>
            <h2>General</h2>
            <div className='perfil-opcion'>
              <span className="material-symbols-outlined icono">
              edit
              </span>
            <p onClick={()=>navigate('/user/editUser')}>Editar perfil</p>
          </div>

          <div className='perfil-opcion'>
              <span className="material-symbols-outlined icono">
              <span className="material-symbols-outlined">
              settings
              </span>
              </span>
            <p>Ajustes</p>
          </div>
        </Col>
      </Row>
    </section>
    </div>
  )
}

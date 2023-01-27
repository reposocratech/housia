import React, { useContext, useEffect, useState }  from 'react';
import { AppContext } from '../../../Context/AppContext';
import {Row, Col} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from "axios";

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
            console.log(res.data, "EEEEEEEEEEEEEE")              
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
    <div>
      <Row>
        <h1>Perfíl</h1>
        <img className='w-25' src={`../images/user/${user?.user_img}`} alt='foto_user' />
        <h2>{user?.user_name} {user?.user_lastname}</h2>
        <h3>{user?.user_email}</h3>
        
      </Row>

      <Row>
        <Col>
        <h1>Busquedas</h1>
        <Dropdown>
        <Dropdown.Toggle variant="Secondary" id="dropdown-basic">
        ❤  Mis favoritos
        </Dropdown.Toggle>

        <Dropdown.Menu>
        
       {fav?.length === 0 ? (<Dropdown.Item>No tienes favoritos</Dropdown.Item>) : (fav?.map ((fav, i) => {
          return(
          <Dropdown.Item key={i} ><div style={{display:"flex", alignItems: 'center'}}>
            <span onClick={()=>handleFav(fav?.property_id)} >⭐    </span>
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

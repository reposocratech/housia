import React, { useContext, useEffect, useState} from 'react'
import { AppContext } from '../../../Context/AppContext';
import { Row, Col, Button} from 'react-bootstrap';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import './user.scss';

export const EditUser = () => {
    const { user, setUser, resetUser, setResetUser } = useContext(AppContext);
    const navigate = useNavigate();

    const [editUser, setEditUser] = useState();
    const [file, setFile] = useState();

    /* console.log(user); */
  
    useEffect(()=> {
        setEditUser(user);
      },[user])

      const handleChange = (e)=>{
        const {name, value} = e.target;
        setEditUser({...editUser, [name]:value});
        // console.log(e.target);
      }

      const handleFile = (e)=>{
        setFile(e.target.files[0]);
      }

      const onSubmit = (e) =>{
        e.preventDefault();

        const newFormData = new FormData();
        /* console.log(editUser); */
        newFormData.append('file', file);
        newFormData.append('register', JSON.stringify(editUser));
    
        axios
          .put(`http://localhost:4000/users/editUser/${user.user_id}`, newFormData)
          .then((res)=>{
            setUser(editUser);
            navigate('/user/perfil');
            setResetUser(!resetUser)
          })
          .catch((error)=>{
            console.log(error);
          })
      }

    
  return (
    <div className='perfil-usuario'>
      <section className='perfil-datos'>
      <h1>Editar Perfil</h1>
      <img className='perfil-imagen' src={`../images/user/${user?.user_img}`} alt='foto_user' />
      </section>

      <section className='perfil-extras'>
      <form
            encType='multipart/form-data'
            >
        <Row className='justify-content-center m-0'>
        
        <Col className='perfil-editar' xs={10} sm={5} lg={4}>
          
          <label>Nombre</label>
          <input
                className='perfil-input'
                placeholder='name'
                autoComplete='off'
                required
                value={editUser?.user_name}
                onChange={handleChange}
                name='user_name'
            />
            <label>Apellido</label>
            <input
                className='perfil-input'
                placeholder='lastname'
                autoComplete='off'
                required
                value={editUser?.user_lastname}
                onChange={handleChange}
                name='user_lastname'
            />
            <label>Teléfono</label>
            <input
                className='perfil-input'
                placeholder='telefono'
                autoComplete='off'
                required
                value={editUser?.user_phone === 'null' ? '' : editUser?.user_phone}
                onChange={handleChange}
                name='user_phone'
            />
          </Col>

          <Col className='columna perfil-editar' xs={10} sm={5} lg={4}>
            <label>Dni</label>
            <input
                className='perfil-input'
                placeholder='dni'
                autoComplete='off'
                required
                value={editUser?.user_dni === 'null' ? '' : editUser?.user_dni}
                onChange={handleChange}
                name='user_dni'
            />
            <label>Fecha de nacimiento</label>
            <input
                type ='date'
                className='perfil-input'
                placeholder='fecha de nacimiento'
                autoComplete='off'
                required
                value={editUser?.user_birth_date}
                onChange={handleChange}
                name='user_birth_date'
            />
             <label>Imágen de perfíl</label>
            <input
              type='file'
              className='perfil-input'
              autoComplete='off'
              onChange={handleFile}
            />
          </Col>
        </Row>
          <div className='editar-perfil-botones'>
              <Button onClick={onSubmit} >Guardar</Button>
          </div>
        </form>
      </section>
      </div>
  )
}

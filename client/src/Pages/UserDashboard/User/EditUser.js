import React, { useContext, useEffect, useState} from 'react'
import { AppContext } from '../../../Context/AppContext';import {Container, Row, Col, Button} from 'react-bootstrap';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

export const EditUser = () => {
    const { user, setUser, resetUser, setResetUser } = useContext(AppContext);
    const navigate = useNavigate();

    const [editUser, setEditUser] = useState();
    const [file, setFile] = useState();
    console.log(user);
  
    

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
        console.log(editUser);
        newFormData.append('file', file);
        newFormData.append('register', JSON.stringify(editUser));
    
        axios
          .put(`http://localhost:4000/users/editUser/${user.user_id}`, newFormData)
          .then((res)=>{
            setUser(editUser);
            // navigate('/user');
            setResetUser(!resetUser)
          })
          .catch((error)=>{
            console.log(error);
          })
      }

    
  return (
    <div>
        <h1>Editar perfil</h1>
        <Container fluid>
        <Row>
        <Col md={4}>
          <form
            encType='multipart/form-data'
            className='d-flex flex-column'>
          <div>
          <input
                className='m-2'
                placeholder='name'
                autoComplete='off'
                required
                value={editUser?.user_name}
                onChange={handleChange}
                name='user_name'
            />
            <input
                className='m-2'
                placeholder='lastname'
                autoComplete='off'
                required
                value={editUser?.user_lastname}
                onChange={handleChange}
                name='user_lastname'
            />
            <input
                className='m-2'
                placeholder='telefono'
                autoComplete='off'
                required
                value={editUser?.user_phone}
                onChange={handleChange}
                name='user_phone'
            />
            <input
                className='m-2'
                placeholder='dni'
                autoComplete='off'
                required
                value={editUser?.user_dni}
                onChange={handleChange}
                name='user_dni'
            />
            <input
                type ='date'
                className='m-2'
                placeholder='fecha de nacimiento'
                autoComplete='off'
                required
                value={editUser?.user_birth_date}
                onChange={handleChange}
                name='user_birth_date'
            />
            <input
              type='file'
              className='m-2'
              autoComplete='off'
              onChange={handleFile}
            />
             <div>
              <Button className='m-2' onClick={onSubmit} >Guardar cambios</Button>
              <Button className='m-2' onClick={()=> navigate(-1)}>Cancelar cambios</Button>
            </div>
            </div>
          </form>
        </Col>
      </Row>
    </Container>

    </div>
  )
}

import React, { useState } from 'react'
import { useForm } from 'react-hook-form' 
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import "./StyleRegister.scss";


const initialState = {
    name: "",
    lastname:"",
    email: "",
    password:"",
    code:""
  }
 

export const Register = () => {
    const [registerUser, setRegisterUser] = useState(initialState);
    const [messageError, setMessageError] = useState("");

    const { register, formState:{errors}, handleSubmit } = useForm();

    const navigate = useNavigate();
  
    const onSubmit = (data) => {
        axios
        .post('http://localhost:4000/users/createUser', data)
        .then((res) => {
          console.log(res.config.data, 'respuesta user');
          setRegisterUser(res.config.data)
          navigate('/login')
          })
          .catch((error) => {
              console.log('error_user', error);
              setMessageError(error.res.data);
          })
      }

  return (
    <div className='fondoAzul'>
    <h2>Registro</h2>
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
          type='text'
          placeholder='name'
          autoComplete='off'
          name='name'
          {...register('name', {
            required: {value: true, message:'Introduce tu nombre'},
            minLength: {value: 3, message: 'Tu nombre debe tener al menos 3 caracteres'}
          })}
       />
       {errors.name && 
            <div className='text-danger'>
              {errors.name.message}
            </div>
          }
      <input
          type='text'
          placeholder='lastname'
          autoComplete='off'
          name='lastname'
          {...register('lastname', {
              required: {value: true, message:'Introduce tu apellido'},
              minLength: {value: 3, message: 'Tu apellido debe tener al menos 3 caracteres'}
            })}
      />
      {errors.lastname && 
            <div className='text-danger'>
              {errors.lastname.message}
            </div>
          }
      <input
          type='email'
          placeholder='email@email.com'
          autoComplete='off'
          name='email'
          {...register('email', {
            required: {value: true, message:'introduce un email'},
            pattern: { value: /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/ , message: 'formato email incorrecto' } 
          })}
      />
      {errors.email && 
            <div className='text-danger'>
              {errors.email.message}
            </div>
          }
      <input
          placeholder='code'
          autoComplete='off'
          name='promotional_code'
          {...register('promotional_code'
          )}
      />
      <input
          type='password'
          placeholder='password'
          autoComplete='off'
          name='password'
          {...register('password', {
            required: {value: true, message:'introduce una contraseña'},
            pattern: {
              value: /^(?=\w*\d)(?=\w*[a-z])\S{8,16}$/, 
              message: 'La contraseña debe tener al menos 6 caracteres y un dígito' }
          })}
      />
      {errors.password && 
            <div className='text-danger'>
              {errors.password.message}
            </div>
          }
    <div style={{ color: "red" }}>{messageError}</div>
    <button type='submit'>Crear cuenta</button>
    </form>
    
    </div>
  )
}

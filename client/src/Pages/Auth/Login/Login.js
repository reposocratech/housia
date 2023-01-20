import React, { useContext, useState } from 'react'
import axios from 'axios';
import { AppContext } from '../../../Context/AppContext';
import {useNavigate} from 'react-router-dom'
import { saveLocalStorageUser } from '../../../Utils/localStorage/localStorageUser';
import './login.scss';

const initialState = {
    email: "",
    password:""
  }

  export const Login = () => {
    const [login, setLogin] = useState(initialState);
    const {isLogged, setIsLogged} = useContext(AppContext);
    const [messageError1, setMessageError1] = useState("");
    const navigate = useNavigate();

    const handleChange = (e)=>{
        const {name, value} = e.target;
        setLogin({...login, [name]: value});
      }

    const handleLogin = () => {
        if(!login?.email || !login?.password){
          setMessageError1("Debes completar todos los campos");
        } else{
          axios
          .post('http://localhost:4000/users/login', login)
          .then((res) => {
            console.log(res.data.token);
            const token = res.data.token;
            saveLocalStorageUser(token);
            setIsLogged(true);
            navigate('/user/portafolio');
          })
          .catch((error) => {
            setMessageError1("");
            console.log(error);
          })
        }
    }

    return (
     <div className='login-container'>
       <h1>Bienvenido de nuevo a Housia</h1>
       <h2>Login</h2>
       <div className='login-form'>
          <input
              placeholder='Correo electrónico'
              autoComplete='off'
              value={login?.email}
              onChange={handleChange}
              name='email'
          />
          <input
              placeholder='contraseña'
              autoComplete='off'
              value={login?.password}
              onChange={handleChange}
              name='password'
           />
           <p>¿Has olvidado la contraseña?</p>
        <button className='login-boton' onClick={handleLogin}>Iniciar Sesión</button>
        {messageError1}
        </div>
     </div>
    )
  }
  

  
  
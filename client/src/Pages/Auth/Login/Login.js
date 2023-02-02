import React, { useContext, useState } from 'react'
import axios from 'axios';
import { AppContext } from '../../../Context/AppContext';
import {useNavigate} from 'react-router-dom';
import { saveLocalStorageUser } from '../../../Utils/localStorage/localStorageUser';
import 'material-icons/iconfont/material-icons.css';
import './login.scss';
import jwtDecode from 'jwt-decode';


const initialState = {
    email: "",
    password:""
  }

  export const Login = () => {
    const [login, setLogin] = useState(initialState);

    const {setIsLogged} = useContext(AppContext);


    const [showPassword, setshowPassword] = useState(false);
    const [message, setMessage] = useState("");
    const [messageError, setMessageError] = useState("");


    const navigate = useNavigate();
    

    const handleChange = (e)=>{
        const {name, value} = e.target;
        setLogin({...login, [name]: value});
        setMessage("");
        setMessageError("");
    }

    const handleLogin = () => {
        if(login.email === "" || login.password === ""){
          setMessage("Debes completar todos los campos");
        } else{
          axios
          .post('http://localhost:4000/users/login', login)
          .then((res) => {
            const token = res.data.token;

            saveLocalStorageUser(token);
            setIsLogged(true);

            const type = jwtDecode(token).user.type;
            /* console.log(type, 'TIPO USUARIO'); */

            type === 1 ? navigate('/admin/allproperties') : type === 2 ? navigate('/user/portafolio') : navigate('/', {replace: true})
              
            })
            .catch((error) => {
              setMessageError("Usuario y/o contraseña incorrecta");
              console.log(error);
            })
            
        }
      }

    return (
      <>
    
     <div className='login-container'>
      <div className='login-form-container'>
      <h1>HOUSIA LOGIN</h1>
       <div className='login-form'>
          <input
              className='input-login'
              placeholder='Correo electrónico'
              autoComplete='off'
              value={login?.email}
              onChange={handleChange}
              name='email'
          />
           <input className='input-login'
              type={showPassword ? 'text' : 'password'}
              placeholder='contraseña'
              autoComplete='off'
              value={login?.password}
              onChange={handleChange}
              name='password'>
          
           </input>
           <div className='icono' onClick={()=>setshowPassword(!showPassword)}>
            {showPassword ? <span class="material-icons-round">
                  visibility
            </span> :
              <span class="material-icons-round">
              visibility_off
            </span>} 
          </div>
           <div style={{ color: "red" }}>{message}</div>
           <div style={{ color: "red" }}>{messageError}</div>
           <p>¿Has olvidado la contraseña?</p>
           <button className='login-boton' onClick={handleLogin}>Iniciar Sesión</button>
        </div>
        <p>¿Aún no tienes cuenta? <span onClick={()=> navigate('/register')}>REGISTRATE</span></p>
      </div>
       
     </div>
     </>
    )
  }
  

  
  
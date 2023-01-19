import React, { useState } from 'react'
import axios from 'axios';

const initialState = {
    email: "",
    password:""
  }

  export const Login = () => {
    const [login, setLogin] = useState(initialState);
    const [isLogged, setIsLogged] = useState(false);
    const [messageError1, setMessageError1] = useState("");

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
            console.log(res.data);
            setIsLogged(true);
          })
          .catch((error) => {
            setMessageError1("");
            console.log(error);
          })
        }
    }

    return (
     <>
       <h1>Bienvenido de nuevo a Housia</h1>
       <h2>Login</h2>
       <div>
       <input
              placeholder='email'
              autoComplete='off'
              value={login?.email}
              onChange={handleChange}
              name='email'
          />
          <input
              placeholder='password'
              autoComplete='off'
              value={login?.password}
              onChange={handleChange}
              name='password'
        />
    </div>
    <button onClick={handleLogin}>Login</button>
    {messageError1}
    {isLogged && <p>Usuario logueado: {isLogged}</p>}
     </>
    )
  }
  

  
  
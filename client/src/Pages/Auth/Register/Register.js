import React, { useState } from 'react'
import axios from 'axios';

const initialState = {
    name: "",
    lastname:"",
    email: "",
    password:"",
    code:""
  }

export const Register = () => {
    const [register, setRegister] = useState(initialState);
    const [messageError1, setMessageError1] = useState("");

    const handleChange = (e)=>{
        const {name, value} = e.target;
        setRegister({...register, [name]: value});
      }

      const handleRegister = () =>{
        if(!register.name || !register.lastname || !register.email || !register.password){
          setMessageError1("Debes completar todos los campos");
        }else{
          axios
          .post('http://localhost:4000/users/createUser', register)
          .then((res) => {
            console.log(res.data);
          })
          .catch((error) => {
            console.log(error);
          })
        }
    }
  return (
    <>
    <h2>Registro</h2>
    <div>
      <input
          placeholder='name'
          autoComplete='off'
          value={register?.name}
          onChange={handleChange}
          name='name'
       />
      <input
          placeholder='lastname'
          autoComplete='off'
          value={register?.lastname}
          onChange={handleChange}
          name='lastname'
      />
      <input
          placeholder='email'
          autoComplete='off'
          value={register?.email}
          onChange={handleChange}
          name='email'
      />
      <input
          placeholder='code'
          autoComplete='off'
          value={register?.promotional_code}
          onChange={handleChange}
          name='promotional_code'
      />
      <input
          placeholder='password'
          autoComplete='off'
          value={register?.password}
          onChange={handleChange}
          name='password'
      />
    </div>
    <button onClick={handleRegister}>Crear cuenta</button>
    </>
  )
}

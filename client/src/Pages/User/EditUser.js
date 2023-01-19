import React, { useEffect, useState} from 'react'
import axios from 'axios';

export const EditUser = () => {
    const [editUser, setEditUser] = useState();
    const [file, setFile] = useState();

    // useEffect(()=> {
    //     setEditUser(user);
    //   },[user])

    const handleChange = (e)=>{
        const {name, value} = e.target;
        setEditUser({...editUser, [name]: value});
    }
    const handleFile = (e)=>{
        setFile(e.target.files[0]);
      }
    
      const onSubmit = (e) =>{
        e.preventDefault();
        const newFormData = new FormData();
    
        newFormData.append('file', file);
        newFormData.append('register', JSON.stringify(editUser));
    
        axios
        //   .put(`http://localhost:4000/users/editUser/${user.user_id}`, newFormData)
          .then((res)=>{
            // setUser(editUser);
            // navigate('/user');
            // setResetImg(!resetImg)
          })
          .catch((error)=>{
            console.log(error);
          })
      }

  return (
    <>
    <h1>Editar datos de usuario</h1>
    <form
            encType='multipart/form'
            className='d-flex flex-column'>
          <div className='divFormAuth'>
            <input
                className='m-2'
                placeholder='name'
                autoComplete='off'
                required
                value={editUser?.name}
                onChange={handleChange}
                name='name'
            />
            <input
                className='m-2'
                placeholder='lastname'
                autoComplete='off'
                required
                value={editUser?.lastname}
                onChange={handleChange}
                name='lastname'
            />
            <input
                className='m-2'
                placeholder='phone'
                autoComplete='off'
                required
                value={editUser?.phone}
                onChange={handleChange}
                name='phone'
            />
            <input
                className='m-2'
                placeholder='dni'
                autoComplete='off'
                required
                value={editUser?.dni}
                onChange={handleChange}
                name='dni'
            />
            <input
                className='m-2'
                placeholder='promotional_code'
                autoComplete='off'
                required
                value={editUser?.promotional_code}
                onChange={handleChange}
                name='promotional_code'
            />
            <input
                className='m-2'
                placeholder='birth_date'
                autoComplete='off'
                required
                value={editUser?.birth_date}
                onChange={handleChange}
                name='birth_date'
            />
            <input
              type='file'
              className='m-2'
              autoComplete='off'
              onChange={handleFile}
            />
          
            <div>
              <button className='m-2' onClick={onSubmit} >Guardar cambios</button>
              <button className='m-2'>Cancelar cambios</button>
            </div>
          
          </div>
          </form>
    </>
  )
}

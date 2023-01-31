import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../../Context/AppContext'


export const AdminHome = () => {

    const navigate = useNavigate()

    const {user} = useContext(AppContext);
    
  return (
    <div >
        <h1>Hola {user.user_name}</h1>

        <button onClick={()=>navigate("/admin/allproperties")}>Todas la Propiedades</button>
        <button onClick={()=>navigate("/admin/customFeaturesElem")}>Visualizar // Editar caracteristicas</button>
        <hr/>
        <button onClick={()=>navigate("/addProperty")}>Añadir una vivienda</button>
    </div>
  )
}

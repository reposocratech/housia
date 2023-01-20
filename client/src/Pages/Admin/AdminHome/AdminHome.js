import React from 'react'
import { useNavigate } from 'react-router-dom'


export const AdminHome = () => {

    const navigate = useNavigate()
    
  return (
    <div>
        <h1>Hola Admin</h1>

        <button onClick={()=>navigate("/admin/allproperties")}>Todas la Propiedades</button>

        
    </div>
  )
}

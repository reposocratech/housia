import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ModalDeleteProperty } from '../../../Components/ModalAdminDispenseProperty/ModalDeleteProperty'
import { AppContext } from '../../../Context/AppContext'


export const AdminAllProperties = () => {
    
    const navigate = useNavigate()

    const  {resetUser, setResetUser, setProperty } = useContext(AppContext)

    const [allProperties, setAllProperties] = useState()
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [idForDelete, setIdForDelete] = useState()

    useEffect(()=>{
        
        axios
            .get("http://localhost:4000/admin/allProperties")
            .then((res)=>{
                console.log(res, "esto es la respuesta del axios")
                setAllProperties(res.data)
            })
            .catch((error)=>{
                console.log(error)
            })
    },[resetUser]);

    //PARA CUANDO TENGAMOS QUE PONER FILTROS.
    // let casasAMostrar = allProperties.filter(elem => elem.price >= "el precio del limitar que pongamos")

    let casasAMostrar = allProperties;

    //Para bloquear activos
    const handleBlock = (propertyId, estaBlock) =>{

        let url = `http://localhost:4000/admin/blockProperty/${propertyId}`

        if(estaBlock === true){
            url = `http://localhost:4000/admin/unBlockProperty/${propertyId}`
        }

        axios
        .put(url)
        .then((res)=>{
            console.log(res);
            setResetUser(!resetUser)
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    const handleDelete = (id) =>{
        setIdForDelete(id)
        setShowModalDelete(true);
    }


    const redirectEdit =(id) =>{
        setProperty(id);
        navigate("/editEconomicFeatures");
    }

    
  return (

    <div>
        <h1>Aqui tiene que ver todas la propiedades</h1>

        <div>
            <h3>Nombre de la casa</h3>
            <p>calle</p>
            <p>provincia</p>
            <p>precio</p>
            <button>bloquear activo</button>
            <button >editar activo</button>
            <button  onClick={()=>handleDelete(2000)}>BORRAR Activo</button>
        </div>

        { casasAMostrar?.map((elem, index)=>{
            return(
                <div key={index}>
                     <h3>Nombre de la casa: {elem.property_name}</h3>
                    <p>calle: {elem.address_street}</p>
                    <p>provincia: {elem.province_name}</p>
                    <p>precio: {elem.purchase_price}</p>
                    <button onClick={()=>handleBlock(elem.property_id, elem.property_is_user_deleted)}>
                    {elem.property_is_user_deleted === false? "BLOCK":"UNBLOCK"}
                    </button>
                    <hr/>
                    <button onClick={()=>redirectEdit(elem.property_id)}>editar activo</button>
                    <hr/>
                    <button onClick={()=>handleDelete(elem.property_id)}>BORRAR activo</button>
                    <hr/>
                    <hr/>
                </div>
            )
        })   
        }

        {showModalDelete && 
        <ModalDeleteProperty
        showModal = {showModalDelete}
        setShowModal = {setShowModalDelete}
        idABorrar = {idForDelete}
        />}
    </div>

  )
}

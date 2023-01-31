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
    console.log(allProperties, 'todas propiedades');
    

    //Para bloquear activos
    const handleBlock = (propertyId, isBlock) =>{

        let url = `http://localhost:4000/admin/blockProperty/${propertyId}`

        if(isBlock === 1){
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

    const redirectEditBasicFeatures =(elem) =>{
        setProperty(elem.property_id);
        navigate(`/editProperty/${elem.property_id}/${elem.property_subtype_id}`);
    }

    const redirectEditEconomicFeatures = (elem) => {
        navigate(`/editEconomicFeatures/${elem.property_id}`)
    }

    
  return (

    <div>
        <h1>Aqui tiene que ver todas la propiedades</h1>
        <div>
            { casasAMostrar?.map((elem, index)=>{
                return(
                    <div key={index}>
                        <h3>{elem.property_name}</h3>
                        <p>{elem.address_street_name}</p>
                        <p>{elem.province_name}</p>
                        <p>{elem.purchase_buy_price} €</p>
                        <button 
                            onClick={()=>handleBlock(elem.property_id, elem.property_is_user_deleted)}>
                            {elem.property_is_user_deleted === 1 ? "Desbloquear":"Bloquear"}
                        </button>
                        <hr/>
                        <button onClick={()=>redirectEditBasicFeatures(elem)}>Propiedades básicas</button>
                        <hr/>
                        <button onClick={()=>redirectEditEconomicFeatures(elem)}>Características Económicas</button>
                        <hr/>
                        <button onClick={()=>handleDelete(elem.property_id)}>Eliminar Activo</button>
                        <hr/>
                        <hr/>
                    </div>
                )
            })   
            }
        </div>

        {showModalDelete && 
        <ModalDeleteProperty
        showModal = {showModalDelete}
        setShowModal = {setShowModalDelete}
        idABorrar = {idForDelete}
        />}
    </div>

  )
}

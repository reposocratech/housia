import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Image } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { ModalDeleteProperty } from '../../../Components/ModalAdminDispenseProperty/ModalDeleteProperty'
import { AppContext } from '../../../Context/AppContext'

import './adminAllProperties.scss'

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

    let propsToShow = allProperties;
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

    console.log('casas para mostrar', propsToShow);
    
    
  return (
    <div className='pt-5 allProperties'>
        <h2 className='pt-5 mt-4 mb-4 text-center'>Todas las Propiedades</h2>

        <div className='row g-4'>
            { propsToShow?.map((elem, index)=>{
                return(
                    <div className='col-12 col-sm-6 col-lg-4 ' key={index}>
                        <div className='prop'>
                            <div className='imgProp'>
                                <Image src={`/images/property/${elem.image_title}`}/>
                            </div>
                            <div className='info'>
                                <h3 onClick={() => navigate(`/propertyDetails/${elem.property_id}`)}>{elem?.property_name}</h3>
                                <p>{elem?.address_street_name}</p>
                                <p>{elem?.province_name}</p>
                                <p>{elem?.purchase_buy_price} €</p>
                            </div>
                        </div>
                        
                        <div className='d-flex justify-content-around buttons'>
                            <div className='d-flex flex-column'>
                                <button 
                                    onClick={()=>handleBlock(elem.property_id, elem.property_is_user_deleted)}
                                    className='mb-2 bg-warning rounded border-none'
                                    >
                                    {elem.property_is_user_deleted === 1 ? "Desbloquear":"Bloquear"}
                                    
                                </button>
                                <button
                                    onClick={()=>redirectEditBasicFeatures(elem)}
                                    className='rounded bg-info'
                                    >Propiedades básicas
                                </button>
                            </div>
                            <div className='d-flex flex-column'>
                                <button 
                                    onClick={()=>redirectEditEconomicFeatures(elem)}
                                    className='mb-2 rounded bg-info'
                                    >Caract. Económicas
                                </button>
                                <button 
                                    onClick={()=>handleDelete(elem.property_id)}
                                    className='rounded bg-danger'
                                    >Eliminar Activo
                                </button>
                            </div>
                            
                        </div>
                    </div>
                )
            })   
            }
        </div>

        {showModalDelete && 
        <ModalDeleteProperty
            setAllProperties={setAllProperties}
            allProperties={allProperties}
            showModal = {showModalDelete}
            setShowModal = {setShowModalDelete}
            idABorrar = {idForDelete}
        />}
    </div>

  )
}

import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Image } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { ModalDeleteProperty } from '../../../Components/ModalAdminDispenseProperty/ModalDeleteProperty'
import { AppContext } from '../../../Context/AppContext'

import './adminAllProperties.scss'

export const AdminAllProperties = () => {
    
    const navigate = useNavigate()

    const  {resetUser, setResetUser, setProperty } = useContext(AppContext)

    const [allProperties, setAllProperties] = useState()
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [idForDelete, setIdForDelete] = useState();

    const URL_PROP = 'http://localhost:4000/property';

    useEffect(()=>{
        
        axios
            .get("http://localhost:4000/admin/allProperties")
            .then((res)=>{
                /* console.log(res, "esto es la respuesta del axios") */
                setAllProperties(res.data)
            })
            .catch((error)=>{
                console.log(error)
            })
    },[resetUser]);

    //PARA CUANDO TENGAMOS QUE PONER FILTROS.
    // let casasAMostrar = allProperties.filter(elem => elem.price >= "el precio del limitar que pongamos")

    let propsToShow = allProperties;

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

    const handleSold = (idProperty, isSold) => {
        let url = "";
        
        if(isSold === 1) {
            url = `${URL_PROP}/unCheckSaleAdmin/${idProperty}`;
        }
        else if (isSold === 0){
            url =`${URL_PROP}/checkSaleAdmin/${idProperty}`
        }

        axios
            .put(url)
            .then((res) => {
                setAllProperties(res.data)
            })
            .catch((err) => {
                console.log(err, 'error de sale_admin');
            })
    }

    /* console.log('casas para mostrar', propsToShow); */
    /* console.log(allProperties, 'todas propiedades'); */
    
  return (
    <div className='pt-5 allProperties'>
        <h1 className='pt-5 mt-4 mb-4 text-center'>Todas las Propiedades</h1>

        <div className='row justify-content-center g-4 mt-4'>
            { propsToShow?.map((elem, index)=>{
                return(
                    <div className='mb-4 col-12 col-sm-10 col-md-6 col-lg-4 col-xl-3' key={index}>
                        <div className='prop'>
                            <div className='imgProp'>
                                <Image src={`/images/property/${elem.image_title}`}/>
                           
                            <div className='filtro-opaco'>
                            <Button variant= {elem?.property_is_for_sale === 0 ?"success" : "info"}
                                    onClick={() => handleSold(elem.property_id, elem.property_is_for_sale)}
                                    size='sm'
                                    className='mb-2 rounded'
                            >
                                    {elem?.property_is_for_sale === 0 ? <span class="material-symbols-outlined">
                                    real_estate_agent<span class="material-symbols-outlined">
                                    done
                                    </span>
                                    </span> : 
                                    <span class="material-symbols-outlined">
                                    real_estate_agent<span class="material-symbols-outlined">
                                    close
                                    </span></span>}
                            </Button>
                            <Button variant={elem?.property_is_user_deleted === 1 ? "secondary" : "warning"}
                                    onClick={()=>handleBlock(elem.property_id, elem.property_is_user_deleted)}
                                    className='mb-2 rounded border-none'
                                    >
                                    {elem.property_is_user_deleted === 0 ? <span className="material-symbols-outlined">
                                    lock_open
                                    </span>:
                                    <span className="material-symbols-outlined">
                                    lock
                                    </span>}      
                            </Button>
                            <Button 
                                    onClick={()=>handleDelete(elem.property_id)}
                                    className='rounded bg-danger'
                                    ><span class="material-symbols-outlined">
                                    delete_forever
                                    </span>
                            </Button>
                            <h5>{elem?.purchase_buy_price} €</h5>
                            </div>
                            </div>
                        </div>
                        
                        <div className='info-inferior'>
                            <h5>{elem?.property_name}</h5>
                            <div className='direccion'>
                                <span class="material-symbols-outlined">
                                location_on
                                </span>
                                <p>{elem?.address_street_name}, {elem?.province_name}</p>
                            </div> 
                           
                            <div className='d-flex buttons'>
                                <Button
                                    onClick={()=>redirectEditBasicFeatures(elem)}
                                    ><span class="material-symbols-outlined">
                                    edit
                                    </span><p>Caract. básicas</p>
                                </Button>
                                <Button 
                                    onClick={()=>redirectEditEconomicFeatures(elem)}
                                    ><span class="material-symbols-outlined">
                                    edit
                                    </span> <p>Caract. económicas</p>
                                </Button> 
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

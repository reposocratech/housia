import axios from 'axios'
import React, { useContext } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../../Context/AppContext'

export const ModalSalePropertyUser = ({showSalePropertyUser, setShowSalePropertyUser, propertyIsForSale, property_id, isSold, setIsSold}) => {

    const handleClose = () =>{
        setShowSalePropertyUser(false);  
    } 

    const navigate = useNavigate();

    const {user, setPropertyDetails} = useContext(AppContext)

    const URL_PROP = 'http://localhost:4000/property';
    const URL_END = `${Number(property_id)}/${Number(user.user_id)}`

    const handleSubmit = () => {

        let url = "";
        
        if(propertyIsForSale === 1){
            url=`${URL_PROP}/uncheckSale/${URL_END}`

        }else if(propertyIsForSale === 0) {
            url = `${URL_PROP}/checkSale/${URL_END}`
        }
    
        axios
        .put(url)
        .then((res) => {
            setShowSalePropertyUser(false);
            setIsSold(res.data[0].property_is_for_sale)

            setPropertyDetails(res.data)
            navigate(`/user/portafolio`)
        })
        .catch((err) => {
            console.log(err);
        });
    } 

    /* console.log(user, 'USUARIO EN EL MODAL');
    console.log(property_id, 'ID PROPIEDAD EN VENTA');
    console.log(isSold, 'estado de la propiedad');
    console.log(propertyIsForSale, 'estado for_sale');
    console.log(showSalePropertyUser, 'estado del modal'); */
    
  return (
    <Modal show={showSalePropertyUser} onHide={handleClose}>
        <Modal.Body className='text-center'>{isSold === 1 ? '¿Quieres quitar la propiedad de la venta?' : '¿Seguro de poner en venta la propiedad?'}</Modal.Body>
        <Modal.Footer className='d-flex justify-content-evenly'>
            <Button 
                style={{backgroundColor: 'rgb(61,62,77)', border: 'none'}} 
                onClick={handleSubmit}
                >{isSold === 1 ? 'Si, quitar de la venta' : 'Si, poner en Venta'}

            </Button>
            <Button 
                style={{backgroundColor: 'rgb(48,162,185)', border: 'none'}} 
                onClick={handleClose}
                >No, volver
            </Button>
        </Modal.Footer>
    </Modal>
  )
}

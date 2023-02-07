import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Card, Col, Container, Modal, Row } from 'react-bootstrap'
import './styles.scss'

export const ModalInfoDiscover = ({showModalInfoDiscover, setShowModalInfoDiscover, infoOneProperty}) => {

    const [photosThisProperty, setPhotosThisProperty] = useState([])
  
    useEffect(()=>{

        let id = infoOneProperty?.property_id
        axios
        .get(`http://localhost:4000/property/getImagesProperty/${id}`)
        .then((res)=>{
            
            setPhotosThisProperty(res.data)
        })
        .catch((error)=>{
            console.log(error);
        })
    },[infoOneProperty?.property_id])

    const handleClose =()=>{
        setShowModalInfoDiscover(false)
    }

  return (
    <div> 
        
      <Modal
        show={showModalInfoDiscover}
        onHide={()=>handleClose()}
        dialogClassName="modal-xl"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton className='titulo'>
          <Modal.Title id="example-custom-modal-styling-title">
            <div className='d-flex flex-row align-items-center justify-content-evenly'>
                <img src='/images/logo-blanco.png' className='w-25'/> <h2> {infoOneProperty?.subtype_name} en {infoOneProperty?.city_name}</h2>
            </div>
          
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className='main'>
        
        <div className='mt-5 ps-5 ms-5 d-flex flex-column w-100 align-items-start'>
        
            <div className='d-flex flex-row align-items-center my-2'>
                <h5>  <span className='fs-2'> Dirección: </span><span>{infoOneProperty?.address_street_name}, {infoOneProperty?.address_street_number}</span><span>  ({infoOneProperty?.city_name}) </span></h5>
            </div>
        
            <h3>Descripción:</h3> 
        </div>
           
        <Container className='d-flex flex-column align-items-center'>
        
        <Row className='fila_info'>
        <Col>    
            <div className='d-flex flex-row'>
                <div>
                     <span ><img src='/images/property/home.png'/></span>
                </div>
                <div className='d-flex flex-column flex-start ms-2'>
                     <span>Tipo </span>
                <span>{infoOneProperty?.type_name}</span>
                </div>
               
            </div>
        </Col>
        <Col>
        <div className='d-flex flex-row'>
            <div >
                <span><img src='/images/property/size.png'/> </span>
            </div>
            <div className='d-flex flex-column flex-start ms-2'>
                 <span>Superficie construida </span>
                <span>{infoOneProperty?.property_built_meters? infoOneProperty.property_built_meters:   0} m²</span> 
            </div>
            </div> 
        </Col>
        <Col>

        <div className='d-flex flex-row'>
            <div >
                <span><img src='/images/property/parcela.png'/> </span>
            </div>
            <div className='d-flex flex-column flex-start ms-2'>
                <span>Parcela </span>
                <span>{infoOneProperty?.property_total_meters? infoOneProperty.property_total_meters: 0} m²</span>
            </div>
            </div>
        </Col>
        </Row>
        <Row className='fila_info'>
            <Col>
            <div className='d-flex flex-row'>
            <div >
                <span><img src='/images/property/habitaciones.png'/> </span>
            </div>
            <div className='d-flex flex-column flex-start ms-2'>
                <span>Habitaciones: </span>
                <span>{infoOneProperty?.property_rooms}</span>  
            </div>
            </div>
            </Col>
            <Col>
            <div className='d-flex flex-row'>
            <div >
                <span><img src='/images/property/bath.png'/> </span>
            </div>
            <div className='d-flex flex-column flex-start ms-2'>
                <span>Baños: </span>
                <span>{infoOneProperty?.property_bathrooms}</span>  
            </div>
            </div>
            </Col>
            <Col>
            <div className='d-flex flex-row'>
            <div >
                <span><img src='/images/property/garage.png'/> </span>
            </div>
            <div className='d-flex flex-column flex-start ms-2'>
                <span>Garaje: </span>
                <span>{infoOneProperty?.property_garage}</span>
            </div>
            </div>
            </Col>
      </Row>
       <Row className='fila_info justify-content-center'>
            <Col>
            <div className='d-flex flex-row'>
            <div >
                <span><img src='/images/property/date.png'/> </span>
            </div>
            <div className='d-flex flex-column flex-start ms-2'>
                <span>Año de construccion: </span>
                <span>{infoOneProperty?.property_built_year}</span>
            </div>
            </div>
            </Col>
       </Row>
        </Container>

        <Row xs={1} md={2} lg={3}  className="g-4 m-4 justify-content-evenly w-100">
        {
        photosThisProperty.map((elem, index)=>{
            return(
                <Col key={index}>
                    <Card className="bg-dark text-white cartita" >
                        <Card.Img src={`/images/property/${elem.image_title}`} alt="Imagen de la casa seleccionada" />   
                    </Card>
                </Col>
            )
        })
           
        }
        </Row>
        </Modal.Body>
      </Modal>
    </div>
  )
}

import React from 'react'
import { Button, Image, Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'



export const ModalSaveProperty = ({setimages, showFinalModal, setShowFinalModal, property_id, setShowSelectButton}) => {
   
    const handleClose = () => {
        setShowFinalModal(false)
    }

    const handleAddressToEconomy = () => {
        setimages([]);
        navigate(`/editEconomicFeatures/${property_id}`)
        setShowSelectButton(true);
    }

    const handleAddressToPortfolio = () => {
        setimages([]);
        navigate('/user/portafolio');
        setShowSelectButton(true);
    }

    const navigate = useNavigate();

  return (
    <Modal show={showFinalModal} onHide={handleClose}>
        <Modal.Header>
          <Image className='w-100' src='/images/little_house.png' />
        </Modal.Header>
        <Modal.Body className='d-flex flex-column' >
            <h2 className='text-center'>Propiedad creada con éxito</h2>
            <div className='d-flex flex-column align-items-center'>
                <Button className='mb-3 w-75' variant="primary" size='lg' onClick={handleAddressToEconomy }>
                    Introducir Datos Económicos
                </Button>
                <Button className='w-75' variant="secondary" size='lg' onClick={handleAddressToPortfolio }>
                    Salir a Mi Portafolio
                </Button>

            </div>
        </Modal.Body>
      </Modal>
  )
}

import axios from 'axios'
import React from 'react'
import { Button, Modal } from 'react-bootstrap'

export const ModalDeleteProperty = ({showModal, setShowModal, idABorrar, setAllProperties, allProperties}) => {

    const hideForAdmin =(id)=>{

        let newProp = allProperties.filter((prop) => prop.property_id !== id)

        axios
        .put(`http://localhost:4000/admin/logicDeletedAdminProperty/${id}`)
        .then((res)=>{
            setShowModal(false);
            setAllProperties(newProp)
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    console.log(idABorrar)
  return (
    <div>
        
      <Modal
        show={showModal}
        onHide={()=>setShowModal(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Eliminar esta propiedad de la vista CONTROL</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Si pulsa Aceptar, esta propiedad no aparecera en la vista control, pero los datos se mantendran. ¿Esta seguro?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={()=>hideForAdmin(idABorrar)}>Aceptar</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

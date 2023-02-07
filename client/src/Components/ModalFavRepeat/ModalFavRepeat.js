import React from 'react'
import { Button, Modal } from 'react-bootstrap'

export const ModalFavRepeat = ({setShow, show}) => {
  return (
    <Modal show={show} onHide={()=>setShow(false)}>
                                <Modal.Header closeButton>
                                <Modal.Title>Accion ya realizada</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>Esta opcion ya esta en su lista de "Favoritos".
                                    <br/>
                                    Si desea revisar sus favoritos, haga click encima de su icono y en el desplegable "Favoritos"

                    
                                </Modal.Body>
                                <Modal.Footer>
                                <Button variant="secondary" onClick={()=>setShow(false)}>
                                    Cerrar

                                </Button>
                                </Modal.Footer>
                            </Modal>
  )
}

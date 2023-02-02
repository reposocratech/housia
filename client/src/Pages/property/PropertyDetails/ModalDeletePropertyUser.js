import axios from 'axios';
import React, { useContext } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../../Context/AppContext';

export const ModalDeletePropertyUser = ({showDeleteModalUser, setShowDeleteModalUser, property_id}) => {

    const handleClose = () => setShowDeleteModalUser(false);

    const navigate = useNavigate();

    const {user, setPropertyDetails} = useContext(AppContext)

    const delPropertyUser = () => {
    
        axios
            .put(`http://localhost:4000/users/logicDeletedUserProperty/${property_id}/${user?.user_id}`)
            .then((res) => {
                setPropertyDetails(res.data.resultProperty);
                navigate('/user/portafolio');
            })
            .catch((error)=> {console.log(error);})
      }

  return (
    <Modal show={showDeleteModalUser} onHide={handleClose}>
        <Modal.Body>¿Estás seguro de eliminar la propiedad?</Modal.Body>
        <Modal.Footer
            className='d-flex justify-content-evenly'
        >
            <Button 
                style={{backgroundColor: 'rgb(61,62,77)', border: 'none'}} 
                size='sm' 
                onClick={delPropertyUser}
                >Sí, eliminar
            </Button>
            <Button 
                style={{backgroundColor: 'rgb(48,162,185)', border: 'none'}} 
                size='sm' 
                onClick={handleClose}
                >No, volver atrás
            </Button>
        </Modal.Footer>
    </Modal>
  )
}

import React, {useState} from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import axios from 'axios'

export const ModalAddImage = ({property, setImagesProperty, showAddImage, setShowAddImage}) => {

    const [imageAdded, setImageAdded] = useState();

    const handleClose = () => {
        setShowAddImage(false)
    }

    const handleImage = (e) => {
        setImageAdded(e.target.files)
    }

    const onSubmit = (id) => {
        const newFormData = new FormData();

        if(imageAdded){
            for(const image of imageAdded){
                newFormData.append('file', image)
            }
        }

        console.log(imageAdded, id);
        

        axios
            .put(`http://localhost:4000/property/addOneImage/${id}`, newFormData)
            .then((res) => {
                console.log(res.data);
                setShowAddImage(false);
                setImageAdded([])
                setImagesProperty(res.data.resultSelect);
            })
            .catch((error) => {
                console.log(error.message);
            })
    }

  return (
    <Modal show={showAddImage} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Añadir Foto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form encType='multipart/form'>
            <Form.Group className="mb-3" >
                <Form.Control 
                    type="file" 
                    onChange={handleImage}
                    multiple={true}
                />
            </Form.Group>
            </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button 
            type='submit' 
            variant="info" 
            onClick={() => onSubmit(property.property_id)}
            >Guardar
          </Button>
        </Modal.Footer>
      </Modal>
  )
}

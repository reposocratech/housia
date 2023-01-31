

import axios from "axios";
import React, { useState, useContext } from "react";
import { Button, Container, Row, Col, Image } from "react-bootstrap";
import { AppContext } from "../../Context/AppContext";

import "./addimage.css";
import { ModalSaveProperty } from "./ModalSaveProperty";

export const AddPropertyImage = () => {

  const [images, setimages] = useState([]);
 
  
  const [showFinalModal, setShowFinalModal] = useState(false);
  const [showSelectButton, setShowSelectButton] = useState(true);

  const {property, setProperty} = useContext(AppContext);

  const URL_PROP = 'http://localhost:4000/property';

  const changeInput = (e) => {
    
    let newImgsToState = readmultifiles(e);

    let newImgs = [...images]

    newImgsToState.map((img) => {
      newImgs.push(img)
    })

    setimages(newImgs)
};

  function readmultifiles(e) {
    const files = e.target.files;

    //el array con las imagenes nuevas
    const arrayImages = [];

    Object.keys(files).forEach((i) => {
      const file = files[i];

      let url = URL.createObjectURL(file);

      arrayImages.push({
        url,
        file
      });

    });

    //despues de haber concluido el ciclo retornamos las nuevas imagenes
    return arrayImages;
  }

  console.log(images, 'IMGANESSSSSS');
  

  const handleDeleteImage = (name) => {
      const newArrImgs = images.filter((img) => img.file.name !== name);
      setimages(newArrImgs)
  }

  const onSubmit = (id) => {
    const newFormData = new FormData();

    if(images){
        for(const image of images) {
            newFormData.append('file', image.file);
        }
    }

    axios
        .put(`${URL_PROP}/addImgsProperty/${id}`, newFormData)
        .then((res) => {
            console.log(res.data);
            setShowFinalModal(true);
            setShowSelectButton(false);
        })  
        .catch((error) => {
            console.log(error.message);
        })
  }

  return (
    <>
    <Container fluid className="m-4">

      <h2 className="text-center">Añadir Propiedad</h2>

        {/* VIEW IMAGES */}
      <Row>
        {images?.map((imagen) => (
            <Col className="col-6 col-sm-4 col-lg-3 m-2" key={imagen.index}>
                <div className="content_img">
                    <Image
                        alt='property image'
                        src={imagen.url}
                        data-toggle="modal"
                        data-target="#ModalPreViewImg"
                        className="img-responsive rounded-4"
                    />
                    {images.length > 1 && (
                    <div  className="options delete">
                      <Button onClick={() => handleDeleteImage(imagen.file.name)} variant="outline-danger" size="sm">Quitar</Button>
                    </div>
                    )}
                </div>
            </Col>
          ))
        }
      </Row>

      <div className="mt-4">
      {/* INPUT IMAGES */}

      {showSelectButton && (
        <Button size="lg" as="label" variant="secondary" className="me-3">
            <span>Seleccionar IMÁGENES </span>
            <input hidden type="file" multiple onChange={changeInput}></input>
        </Button>
      )}
      

      {images.length >= 1 && (
        <Button 
          size="lg" 
          variant="dark"
          onClick={() => onSubmit(property.property_id)}
          >Guardar Y Terminar
        </Button>
      )}
      </div>

      </Container>
      <ModalSaveProperty 
          setShowSelectButton={setShowSelectButton} 
          setimages={setimages} 
          showFinalModal={showFinalModal} 
          setShowFinalModal={setShowFinalModal} 
          property_id={property.property_id}/>
      </>
  );
}
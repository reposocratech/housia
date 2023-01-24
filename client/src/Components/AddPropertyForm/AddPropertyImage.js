import axios from "axios";
import React, { useState, useContext } from "react";
import { Button, Container, Row, Col, Image } from "react-bootstrap";
import { AppContext } from "../../Context/AppContext";

import "./addimage.css";

export const AddPropertyImage = () => {

  const [images, setimages] = useState([]);
  const [imagesToAdd, setImagesToAdd] = useState([]);
  const [imagesToEdit, setImagesToEdit] = useState([]);
  const [showImagesToEdit, setShowImagesToEdit] = useState(false);

  const {property, setProperty} = useContext(AppContext);

  const URL_PROP = 'http://localhost:4000/property';

  const changeInput = (e) => {
    //esto es el indice que se le dará a cada imagen, a partir del indice de la ultima foto
    let indexImg;

    //aquí evaluamos si ya hay imagenes antes de este input, para saber en dónde debe empezar el index del proximo array
    if (images.length > 0) {
      indexImg = images[images.length - 1].index + 1;
    } else {
      indexImg = 0;
    }

    let newImgsToState = readmultifiles(e, indexImg);
    let newImgsState = [...images, ...newImgsToState];
    setimages(newImgsState);

    setImagesToAdd(e.target.files);
};

  function readmultifiles(e, indexInicial) {
    const files = e.currentTarget.files;

    //el array con las imagenes nuevas
    const arrayImages = [];

    Object.keys(files).forEach((i) => {
      const file = files[i];

      let url = URL.createObjectURL(file);

      //console.log(file);
      arrayImages.push({
        index: indexInicial,
        name: file.name,
        url,
        file
      });

      indexInicial++;
    });

    //despues de haber concluido el ciclo retornamos las nuevas imagenes
    return arrayImages;
  }

  function deleteImg(indice) {
    const newImgs = images.filter(function (element) {
      return element.index !== indice;
    });
    setimages(newImgs);
  }

  const handleDeleteImageEdit = (imageId, imagePropertyId) => {

    axios
      .delete(`http://localhost:4000/property/deleteInitialImageProperty/${imageId}/${imagePropertyId}`)
      .then((res) => {
        console.log(res.data);
        setImagesToEdit(res.data);
        setShowImagesToEdit(true);
      })
      .catch((error) => {
        console.log(error.message);
        
      })
  }

  const handleMainImage = (image) => {

    let url = '';

    if(image.image_is_main === 0){
      url = `${URL_PROP}/setMainImage/${image.image_id}/1`
    }
    else if(image.image_is_main === 1) {
      url = `${URL_PROP}/unSetMainImage/${image.image_id}/1`
    }

    axios
      .put(url)
      .then((response) => {
        /* console.log(response.data); */
        setImagesToEdit(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const onSubmit = (id) => {
    const newFormData = new FormData();

    if(imagesToAdd){
        for(const image of imagesToAdd) {
            newFormData.append('file', image);
        }
    }

    axios
        .put(`http://localhost:4000/property/addImgsProperty/${id}`, newFormData)
        .then((res) => {
            console.log(res.data);
            setImagesToEdit(res.data);
            setShowImagesToEdit(true);
        })
        .catch((error) => {
            console.log(error.message);
        })
  }

  console.log(imagesToEdit);
   
  

  return (
    <Container fluid className="m-4">

        <h2 className="text-center">Añadir Propiedad</h2>

          {/* VIEW IMAGES */}
        <Row>
            {!showImagesToEdit 
                ? (
                    images.map((imagen) => (
                        <Col className="col-6 col-sm-4 col-lg-3 m-2" key={imagen.index}>
                            <div className="content_img">
                                <Image
                                    alt="algo"
                                    src={imagen.url}
                                    data-toggle="modal"
                                    data-target="#ModalPreViewImg"
                                    className="img-responsive rounded-4"
                                />
                                <div className="options">
                                    <div
                                        className="delete"
                                        onClick={deleteImg.bind(this, imagen.index)}
                                        >Quitar
                                    </div>
                                </div>
                            </div>
                        </Col>
                    ))
                )
                : (
                  imagesToEdit?.map((imgEdit, ind) => {
                    return (
                      <Col className="col-6 col-sm-4 col-lg-3 m-2" key={ind}>
                          <div className="content_img">
                              <Image
                                  alt="algo"
                                  src={`/images/property/${imgEdit.image_title}`}
                                  data-toggle="modal"
                                  data-target="#ModalPreViewImg"
                                  className="img-responsive rounded-4"
                              />
                              <div className="options">
                                <div
                                  onClick ={() => handleMainImage(imgEdit)}
                                >
                                  {imgEdit.image_is_main ? 'Principal' : 'Hacer Principal'}
                                </div>
                                  <div
                                      className="delete"
                                      onClick={() => handleDeleteImageEdit(imgEdit.image_id, imgEdit.image_property_id)}
                                      >Eliminar
                                  </div>
                              </div>
                          </div>
                      </Col>
                    )
                  })
                  )
            }
            
        </Row>

      <div className="mt-4">
        {/* INPUT IMAGES */}

        {!showImagesToEdit && (

          <Button size="lg" as="label" variant="secondary" className="me-3">
              <span>Seleccionar archivos </span>
              <input hidden type="file" multiple onChange={changeInput}></input>
          </Button>
        )}

        <Button 
        size="lg" 
        variant="dark"
        onClick={() => onSubmit(/* property.property_id */1)}
        >Guardar Fotos
        </Button>

        {showImagesToEdit && (
          <Button>Guardar Todo y Terminar</Button>
        )}
      </div>

    </Container>
  );
}

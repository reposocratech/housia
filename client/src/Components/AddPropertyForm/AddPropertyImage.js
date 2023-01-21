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
    //console.log("borrar img " + indice);

    const newImgs = images.filter(function (element) {
      return element.index !== indice;
    });
    /* console.log(newImgs); */
    setimages(newImgs);
  }

console.log(imagesToAdd);

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
                : (<p>No hay más fotos</p>)
            }
            
        </Row>

      <div className="mt-4">
        {/* INPUT IMAGES */}
        
        <Button size="lg" as="label" variant="secondary" className="me-3">
            <span>Seleccionar archivos </span>
            <input hidden type="file" multiple onChange={changeInput}></input>
        </Button>

        <Button 
        size="lg" 
        variant="dark"
        onClick={() => onSubmit(/* property.property_id */5)}
        >Guardar Fotos
        </Button>
      </div>

    </Container>
  );
}

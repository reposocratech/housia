import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
/* import { useForm } from "react-hook-form"; */
import { useNavigate, useParams } from "react-router-dom";
import Select from 'react-select';
import { AppContext } from "../../Context/AppContext";

import './editProperty.css'
import { ModalAddImage } from "./ModalAddImage";



export const EditPropertyForm = () => {

    const [type, setType] = useState();
    const [subtype, setSubtype] = useState();
    const [typeId, setTypeId] = useState(1);
    const [subTypeId, setSubTypeId] = useState();
    const [kitchen, setKitchen] = useState();
    const [kitchenId, setKitchenId] = useState(1);
    const [province, setProvince] = useState();
    const [city, setCity] = useState();
    const [provinceId, setProvinceId] = useState(1);
    const [cityId, setCityId] = useState();
    const [features, setFeatures] = useState([])
    const [featuresSelected, setFeaturesSelected] = useState([]);
    const [featuresProperty, setFeaturesProperty] = useState([]);
    const [imagesProperty, setImagesProperty] = useState([]);
    const [showAddImage, setShowAddImage] = useState(false);

    const [prueba, setPrueba] = useState([]);
    const {property, setProperty} = useContext(AppContext);

    const {property_id} = useParams();

    const navigate = useNavigate();

    const URL_PROP = 'http://localhost:4000/property';

    

    // let nombreTipo = type[(property?.type_id) -1 ].type_name;
    
    // let nombreSubTipo = Number(subtype[(property?.property_subtype_id) -1 ] .subtype_name);

    

    useEffect(() => {
        axios
        .get("http://localhost:4000/property/allTypes")
        .then((res) => {
            setType(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);


    useEffect(() => {
        axios
        .get(`http://localhost:4000/property/allSubTypes/${typeId}`)
        .then((res) => {
           
            setSubtype(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
    }, [type, typeId]);

    const handleTypeId = (e) =>{
        setTypeId(e.target.value);
        // setTypeId(id);
    }
    
    
    const handleSubTypeId = (e) => {
        setSubTypeId(e.target.value);
    }

    useEffect(() => {
        axios
        .get("http://localhost:4000/property/allKitchens")
        .then((res) => {
         setKitchen(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
    }, [])

    const handleKitchenId = (e) => {
        setKitchenId(e.target.value);
    }

    useEffect(() => {
        axios
        .get("http://localhost:4000/property/allProvinces")
        .then((res) => {
           setProvince(res.data)
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);

    useEffect(() => {
        axios
        .get(`http://localhost:4000/property/allCities/${provinceId}`)
        .then((res) => {
           setCity(res.data)
        })
        .catch((err) => {
            console.log(err);
        });
    }, [provinceId]);

    const handleProvinceId = (e) => {
        setProvinceId(e.target.value);
       }

    const handleCityId = (e) => {
        setCityId(e.target.value);
    }

  

    useEffect(() => {
        axios
            .get(`http://localhost:4000/property/propertyDetailsProvinceCity/${property_id}`)
            .then((res) => {
                /* console.log(res.data[0], 'DATOS PROPIEDAD'); */
                setProperty(res.data[0])
            })
            .catch((error) => {
                console.log(error.message);
                
            })
    }, [property_id])

    useEffect(() => {
        axios
        .get(`http://localhost:4000/property/allFeatures`)
        .then((res) => {
            setFeatures(res.data);
                        
            let array = res.data.map((ele, ind) => {
                return { ...ele, checked: false}
            })

            setPrueba(array);
        })
        .catch((err) => {
            console.log(err);
        });
    }, [])

    useEffect(()=> {
        axios
            .get(`${URL_PROP}/getPropertyFeatures/${property?.property_id}`)
            .then((res) => {
                setFeaturesProperty(res.data)
                let arrayProv = [];

                for(let i = 0; i < res.data.length; i++){
                    arrayProv.push(res.data[i].feature_id)
                }
                
                setFeaturesSelected(arrayProv)

                otherFeature(res.data);
            })
            .catch((error) => {
                console.log(error.message);
            })
    }, [property?.property_id])

    useEffect(() =>{
        axios
            .get(`${URL_PROP}/getImagesProperty/${property?.property_id}`)
            .then((res) => {
                /* console.log(res.data); */
                setImagesProperty(res.data);
            })
            .catch((error) => {
                console.log(error.message);
            })

    }, [property?.property_id])
    

    /* console.log('IMAGES PARA GUARDAR', imagesProperty); */

    const handleDeleteImage = (id) => {
        const newArrImgs = imagesProperty?.filter((img) => img.image_id !== id );

        axios
            .put(`${URL_PROP}/delImg/${id}`)
            .then((res) => {
                /* console.log('RES DEL DELETE PHOTO EN EDIT', res); */
                setImagesProperty(newArrImgs);
            })
            .catch((error) => {
                console.log(error.message);
                
            })
    }

    const handleSetMain = (id) => {
        axios
            .put(`${URL_PROP}/setMainImage/${id}/${property.property_id}`)
            .then((res) => {
                /* console.log('RES DEL SETMAIN', res.data); */
                setImagesProperty(res.data)
            })
            .catch((error) => {
                console.log('ERROR DEL SETmAIN', error);
            })
    }

  const handleChange = (e) =>{
    const {name, value} = e.target;
    setProperty({...property, [name]:value});
  }

  const insertFeaturesToArray = (e) => {

    let featId = Number(e.target.name);

    if(featuresSelected?.includes(featId) === false){
        setFeaturesSelected([...featuresSelected, featId]);
    }
    else if(featuresSelected?.includes(featId)){
        setFeaturesSelected(featuresSelected.filter(elem => elem !== featId));
    }
  }

  const handleCheck = (e) => {
    
    let arrayPrueba = [...prueba]
    
    setPrueba(arrayPrueba.map((elem) => {
        if(elem.feature_id === Number(e.target.name)){
            return{ ...elem, checked: !elem.checked } 
        }
        else{
            return elem
        }
    }))
    
    insertFeaturesToArray(e) ;
  }
  
  const otherFeature = (featuresProperty) => {

      let prueba2 = [...prueba];
      
      featuresProperty?.forEach((featureProp) => {
        prueba2?.map((ele, ind) => {
            if(ele.feature_id === featureProp.feature_id) {
                ele.checked = true;
            }
        })
    })
    setPrueba(prueba2)
}
    

    const saveFeaturesFromEdit = (id) => {
        if(featuresSelected){
            axios
                .post(`http://localhost:4000/property/editFeaturesProperty/${id}`, featuresSelected)
                .then((res) => {
                    console.log(res);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }

    const editPropertyAddress = () => {
        axios
            .put(`${URL_PROP}/editPropertyAddress/${property.property_id}/${property.address_province_id}/${property.address_city_id}`, property)
            .then((res) => {
                console.log('RES DE EDIT PROPERTY', res);
                navigate(`/propertyDetails/${property.property_id}`);
            })
            .catch((error) => {
                console.log('ERROR del EDITADDRESS');
            })
    }

     console.log('PROPIEDAD EN EDICIÓN', property);
    /* console.log(featuresSelected, 'FEATURESSSSSS QUE ESTOY MARCANDO'); */
    /* console.log(imagesProperty, 'IMÁGENES PARA SUBIR'); */
    
    const onSubmit = (e) => {
        e.preventDefault();
        editPropertyAddress();
        saveFeaturesFromEdit(property?.property_id);

    }


  return (
    <Container fluid>
        <h2 className="text-center mb-3">Editar Propiedad</h2>

        <Form className="m-3" onSubmit={onSubmit /* handleSubmit(onSubmit) */}>

            <Row>
                <Col md='6'>
                    <Form.Label>Nombre Propiedad</Form.Label>
                    <Form.Control
                        className="mb-3" 
                        type="text" 
                        name="property_name"
                        value={property?.property_name}
                        onChange={handleChange}
                    />

                    <Row className="d-flex justify-content-between">
                        <Form.Group className="mb-3" as={Col} md='6'>
                            <Form.Label>Tipo</Form.Label>
                            <Form.Select onChange={handleTypeId} /* name='type_id' */>
                                <option value={property?.type_id}>{'Tipo'}</option>
                                {type?.map((typ, ind) => {
                                    return(
                                        <option key={ind} value={typ.type_id}>{typ.type_name}</option>
                                    )
                                })}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" as={Col} md='6'>
                            <Form.Label>SubTipo</Form.Label>
                            <Form.Select 
                                onChange={handleChange}
                                name='property_subtype_id'
                                value={property?.property_subtype_id}
                            >
                                {/* <option value={property?.property_subtype_id}>{'Nombre Subtipo'}</option> */}
                                {subtype?.map((subtyp, ind) => {
                                    return(
                                        <option key={ind} value={subtyp.subtype_id}>{subtyp.subtype_name}</option>
                                    )
                                })}
                            </Form.Select>
                        </Form.Group>
                    </Row> 

                    <Form.Group>
                        <Form.Label>Calle</Form.Label>
                        <Form.Control 
                        className="mb-3" 
                        autoComplete="off" 
                        type="text" 
                        name="address_street_name"
                        value={property?.address_street_name}
                        onChange={handleChange}
                    />
                    </Form.Group>

                    <Row className="d-flex justify-content-between">
                        <Form.Group className="mb-3" as={Col} md='3'>
                            <Form.Label>Número</Form.Label>
                            <Form.Control 
                                autoComplete="off"  
                                type="text" 
                                onChange={handleChange}
                                value={property?.address_street_number}
                                name='address_street_number'
                            />
                        </Form.Group>

                        <Form.Group as={Col} md='9'>
                            <Form.Label>Provincia</Form.Label>
                            <Form.Select onChange={handleProvinceId}>
                                <option value={property?.address_province_id}>{property?.province_name}</option>
                                {province?.map((prov, ind) =>{
                                    return(
                                        <option
                                            key={ind} 
                                            value={prov.province_id}
                                            >{prov.province_name}
                                        </option>
                                    )
                                })}
                            </Form.Select>
                        </Form.Group>
                    </Row>   

                    <Form.Group>
                        <Form.Label>Código Postal</Form.Label>
                        <Form.Control 
                            className="mb-3" 
                            autoComplete="off" 
                            type="text" 
                            name="address_postal_code"
                            onChange={handleChange}
                            value={property?.address_postal_code}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Ciudad</Form.Label>
                        <Form.Select onChange={handleCityId}>
                        <option value={property?.address_city_id}>{property?.city_name}</option>
                            {city?.map((cit, ind) =>{
                                return(
                                    <option key={ind} value={cit.city_id}>{cit.city_name}</option>
                                )
                            })}
                        </Form.Select>
                    </Form.Group>

                    <Row className="d-flex justify-content-between">
                        <Form.Group className="mb-3" as={Col} md='2'>
                            <Form.Label>Bloque</Form.Label>
                            <Form.Control 
                                autoComplete="off" 
                                type="text"
                                name="address_block"
                                onChange={handleChange}
                                value={property?.address_block === "undefined" ? 0 : property?.address_block}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" as={Col} md='2'>
                            <Form.Label>Portal</Form.Label>
                            <Form.Control 
                                autoComplete="off"  
                                type="text"
                                name="address_gate"
                                onChange={handleChange}
                                value={property?.address_gate === "undefined" ? 0 : property?.address_gate}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" as={Col} md='2'>
                            <Form.Label>Escalera</Form.Label>
                            <Form.Control 
                                autoComplete="off"  
                                type="text"
                                name="address_stair"
                                onChange={handleChange}
                                value={property?.address_stair === "undefined" ? 0 : property?.address_stair}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" as={Col} md='2'>
                            <Form.Label>Planta</Form.Label>
                            <Form.Control 
                                autoComplete="off"  
                                type="text"
                                name="address_floor"
                                onChange={handleChange}
                                value={property?.floor === "undefined" ? 0 : property?.address_floor}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" as={Col} md='2'>
                            <Form.Label>Puerta</Form.Label>
                            <Form.Control 
                                autoComplete="off"  
                                type="text"
                                name="address_door"
                                onChange={handleChange}
                                value={property?.door === "undefined" ? 0 : property?.address_door}
                            />
                        </Form.Group>
                    </Row> 
                </Col>
                <Col md='6'>
                    <Row className="d-flex justify-content-between">
                        <Form.Group className="mb-3" as={Col} md='6'>
                            <Form.Label>Superficie Útil</Form.Label>
                            <Form.Control 
                                autoComplete="off"  
                                type="text" 
                                name="property_total_meters"
                                onChange={handleChange}
                                value={property?.property_total_meters}
                            />
                        </Form.Group>
                        <Form.Group as={Col} md='6'>
                            <Form.Label>Superficie Construida</Form.Label>
                            <Form.Control 
                                autoComplete="off"  
                                type="text"
                                name="property_built_meters"
                                onChange={handleChange}
                                value={property?.property_built_meters}
                            />
                        </Form.Group>
                    </Row>

                    <Row className="d-flex justify-content-between">
                        <Form.Group className="mb-3" as={Col} md='3'>
                            <Form.Label>Año Construcción</Form.Label>
                            <Form.Control 
                                autoComplete="off"  
                                type="text"
                                value={property?.property_built_year}
                                onChange={handleChange}
                                name='property_built_year'
                            />
                        </Form.Group>
                        <Form.Group as={Col} md='3'>
                            <Form.Label>Habitaciones</Form.Label>
                            <Form.Control 
                                autoComplete="off"  
                                type="text"
                                name="property_rooms"
                                onChange={handleChange}
                                value={property?.property_rooms === "undefined" ? 0 : property?.property_rooms}
                            />
                        </Form.Group>
                        <Form.Group as={Col} md='3'>
                            <Form.Label>Baños</Form.Label>
                            <Form.Control 
                                autoComplete="off"  
                                type="text"
                                name="property_bathrooms"
                                onChange={handleChange}
                                value={property?.property_bathrooms === "undefined" ? 0 : property?.property_bathrooms}
                            />
                        </Form.Group>
                        <Form.Group as={Col} md='3'>
                            <Form.Label>Garaje</Form.Label>
                            <Form.Control 
                                autoComplete="off"  
                                type="text" 
                                name="property_garage"
                                onChange={handleChange}
                                value={property?.property_garage === "undefined" ? 0 : property?.property_garage}
                            />
                        </Form.Group>
                    </Row> 
                    <Row>
                        <Form.Group as={Col} md='6'>
                            <Form.Group>
                                <Form.Label>Tipo de Cocina</Form.Label>
                                <Form.Select onChange={handleChange} value={property?.property_kitchen_id} name='property_kitchen_id' >
                                    {kitchen?.map((kit, ind) => {
                                        return(
                                            <option key={ind} value={kit.kitchen_id}>{kit.kitchen_name}</option>
                                        )
                                    })}
                                </Form.Select>
                            </Form.Group>
                        </Form.Group>
                    </Row>
                    <Row className="d-flex mt-4">
                        {prueba?.map((feature, index) => {
                            return(
                                <Col md={3} key={index}>
                                    <Button
                                        className="rounded rounded-4 mb-3"
                                        variant={feature?.checked ? 'info' : 'outline-info'}
                                        onClick={handleCheck}
                                        name={feature?.feature_id}
                                        >{feature?.feature_name}
                                    </Button>
                                </Col>
                            )
                        })}
                    </Row>
                    <Row>
                        {imagesProperty?.map((img, ind) => {
                            return(
                                <Col md={3} key={ind}>
                                    <div className="editImage">
                                        <Image
                                            style={{width: '100%'}}
                                            src={`/images/property/${img.image_title}`}
                                            className='rounded'
                                            alt='image property'
                                        />
                                        {(imagesProperty?.length > 1 && img.image_is_main  === 0) && (

                                            <div className="options">
                                                <div 
                                                    onClick={() => handleSetMain(img.image_id)}
                                                    className='buttonMain'
                                                    >
                                                    Principal
                                                </div>
                                                <div
                                                    onClick={() => handleDeleteImage(img.image_id)}
                                                    className="buttonDelete"
                                                    >Quitar
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </Col> 
                            )
                        })}
                        <div className="mt-3">
                            <Button
                                variant="info"
                                size="sm"
                                onClick={() => setShowAddImage(true)}
                            >
                                Añadir Foto
                            </Button>
                        </div>
                    </Row>
                </Col>
            </Row>

            <Button size="lg" variant="secondary" type="submit">
                GUARDAR
            </Button>
        </Form>
        <ModalAddImage 
            property={property} 
            setImagesProperty={setImagesProperty} 
            showAddImage={showAddImage} 
            setShowAddImage={setShowAddImage}
        />
    
    </Container>

    
  );
};

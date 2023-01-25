import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { AppContext } from "../../Context/AppContext";

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

    const {property, setProperty} = useContext(AppContext);
    
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
            .get(`http://localhost:4000/property/propertyDetailsProvinceCity/10`)
            .then((res) => {
                /* console.log(res.data[0], 'DATOS PROPIEDAD'); */
                setProperty(res.data[0])
            })
            .catch((error) => {
                console.log(error.message);
                
            })

    }, [])
    
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (values) => {
    console.log(values);
    setProperty(values)
  };

  console.log(property, 'PROPERTY DESPUES VALIDACIÓN');
  
  

  return (
    <Container fluid>
        <h2 className="text-center mb-3">Editar Propiedad</h2>

        <Form className="m-3" onSubmit={handleSubmit(onSubmit)}>

            <Row>
                <Col md='6'>
                    <Form.Label>Nombre Propiedad</Form.Label>
                    <Form.Control
                        className="mb-3" 
                        type="text" 
                        name="property_name"
                        defaultValue={property?.property_name}
                        {...register("property_name", {
                            required: {value: true, message: 'Introduce un nombre'},
                            minLength: {value: 5, message: 'Escribe al menos 5 caracteres'},
                            maxLength: {value: 150, message: 'Máximo 150 caracteres'}
                        })}
                    />
                    {errors.property_name && 
                        <div className='text-danger'>
                            {errors.property_name.message}
                        </div>}


                    <Row className="d-flex justify-content-between">
                        <Form.Group className="mb-3" as={Col} md='6'>
                            <Form.Label>Tipo</Form.Label>
                            <Form.Select onClick={handleTypeId}>
                                {type?.map((typ, ind) => {
                                    return(
                                        <option key={ind} value={typ.type_id}>{typ.type_name}</option>
                                    )
                                })}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" as={Col} md='6'>
                            <Form.Label>SubTipo</Form.Label>
                            <Form.Select onClick={handleSubTypeId}>
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
                        defaultValue={property?.address_street_name}
                        {...register("address_street_name", {
                            required: {value: true, message: 'Introduce una dirección'},
                            minLength: {value: 5, message: 'Escribe al menos 5 caracteres'},
                            maxLength: {value: 150, message: 'Máximo 150 caracteres'}
                        })}
                    />
                    {errors.address_street_name && 
                        <div className='text-danger'>
                            {errors.address_street_name.message}
                        </div>}
                    </Form.Group>

                    <Row className="d-flex justify-content-between">
                        <Form.Group className="mb-3" as={Col} md='3'>
                            <Form.Label>Número</Form.Label>
                            <Form.Control autoComplete="off"  type="text" />
                        </Form.Group>

                        <Form.Group as={Col} md='9'>
                            <Form.Label>Provincia</Form.Label>
                            <Form.Select onClick={handleProvinceId}>
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
                        <Form.Control className="mb-3" autoComplete="off" type="text" name="" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Ciudad</Form.Label>
                        <Form.Select onClick={handleCityId}>
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
                            <Form.Control autoComplete="off"  type="text"/>
                        </Form.Group>
                        <Form.Group className="mb-3" as={Col} md='2'>
                            <Form.Label>Portal</Form.Label>
                            <Form.Control autoComplete="off"  type="text"/>
                        </Form.Group>
                        <Form.Group className="mb-3" as={Col} md='2'>
                            <Form.Label>Escalera</Form.Label>
                            <Form.Control autoComplete="off"  type="text"/>
                        </Form.Group>
                        <Form.Group className="mb-3" as={Col} md='2'>
                            <Form.Label>Planta</Form.Label>
                            <Form.Control autoComplete="off"  type="text"/>
                        </Form.Group>
                        <Form.Group className="mb-3" as={Col} md='2'>
                            <Form.Label>Puerta</Form.Label>
                            <Form.Control autoComplete="off"  type="text"/>
                        </Form.Group>
                    </Row> 
                </Col>
                <Col md='6'>
                    <Row className="d-flex justify-content-between">
                        <Form.Group className="mb-3" as={Col} md='6'>
                            <Form.Label>Superficie Útil</Form.Label>
                            <Form.Control autoComplete="off"  type="text" />
                        </Form.Group>
                        <Form.Group as={Col} md='6'>
                            <Form.Label>Superficie Construida</Form.Label>
                            <Form.Control autoComplete="off"  type="text"/>
                        </Form.Group>
                    </Row>

                    <Row className="d-flex justify-content-between">
                        <Form.Group className="mb-3" as={Col} md='3'>
                            <Form.Label>Año Construcción</Form.Label>
                            <Form.Control autoComplete="off"  type="text"/>
                        </Form.Group>
                        <Form.Group as={Col} md='3'>
                            <Form.Label>Habitaciones</Form.Label>
                            <Form.Control autoComplete="off"  type="text"/>
                        </Form.Group>
                        <Form.Group as={Col} md='3'>
                            <Form.Label>Baños</Form.Label>
                            <Form.Control autoComplete="off"  type="text"/>
                        </Form.Group>
                        <Form.Group as={Col} md='3'>
                            <Form.Label>Garaje</Form.Label>
                            <Form.Control autoComplete="off"  type="text" />
                        </Form.Group>
                    </Row> 
                    <Row>
                        <Form.Group as={Col} md='6'>
                            <Form.Group>
                                <Form.Label>Tipo de Cocina</Form.Label>
                                <Form.Select onClick={handleKitchenId}>
                                    {kitchen?.map((kit, ind) => {
                                        return(
                                            <option key={ind} value={kit.kitchen_id}>{kit.kitchen_name}</option>
                                        )
                                    })}
                                </Form.Select>
                            </Form.Group>
                        </Form.Group>

                    </Row>
                </Col>
            </Row>

            
            
            <Button variant="primary" type="submit">
            Submit
            </Button>
        </Form>
    
    </Container>


      /* <h2>Introducir Artículo</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
                       
        <input {...register("firstName", { required: true })} aria-invalid={errors.firstName ? "true" : "false"}  />
        {errors.firstName?.type === 'required' && <p role="alert">First name is required</p>}

        <input {...register("lastName", { pattern: /^[A-Za-z]+$/i })} />

        <input 
        {...register("mail", { required: "Email Address is required" })} 
        aria-invalid={errors.mail ? "true" : "false"} 
        />
        {errors.mail && <p role="alert">{errors.mail?.message}</p>}

        <input  defaultValue="0" type="number" {...register("age", { min: 18, max: 99 })} />
        
        <select {...register("gender")}>
            <option value="female">female</option>
            <option value="male">male</option>
            <option value="other">other</option>
        </select>
        
        <input type="submit" />
        </form> */
    
  );
};

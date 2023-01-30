import React, { useContext, useEffect, useState } from 'react'
import axios from "axios";
import {useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../../../Context/AppContext';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import { Carousel, Container, Row } from 'react-bootstrap';
import './PropertyDetails.scss';


//cambiar el user id, esta hardcodeado
//cambiar los navigate a la pagina editar detalles y editar detalles economicos


export const PropertyDetails = () => {
    const [propertyDetails, setPropertyDetails] = useState([]);
    const [imagenes, setImagenes] = useState();
    const [address, setAddress] = useState([]);
    const [detailsPurchase, setDetailsPurchase] = useState([]);
    const [provinceCity, setProvinceCity] = useState([]);
    const [type, setType] = useState([]);
    const [rent, setRent] = useState([]);
    const [loan, setLoan] = useState([]);
    const [colorSold, setColorSold] = useState(false)
    const {user, property, setProperty } = useContext(AppContext);
    let { property_id } = useParams();
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const handleColor = () => setColorSold(!colorSold);
    console.log(user.user_id, "Soy USER ID");
    console.log(property_id, 'soy property_id');


    const handleSubmit = () => {
    
    axios
    .put(`http://localhost:4000/property/checkSale/${user.user_id}/${property_id}`)
    .then((res) => {
        setShow(false);
        console.log(res, "VENDIDOOOOOOOOOOOOOOOOOOO");
        navigate("/home") //navigate al descubre
    })
    .catch((err) => {
        console.log(err);
    });
    
  } 
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    
  console.log(user, "EYYYYYYYY")
    
    //Detalles Propiedad
    useEffect(() => {
        
        axios
        .get(`http://localhost:4000/property/propertyDetails/2/${property_id}`)
        .then((res) => {
           setPropertyDetails(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
    }, [property_id]);

    //Imagenes propiedad
    useEffect(() => {
        axios
        .get(`http://localhost:4000/property/propertyDetailsImg/${property_id}`)
        .then((res) => {
           setImagenes(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
    }, [property_id]);

    //Direccion de la propiedad
    useEffect(() => {
        axios
        .get(`http://localhost:4000/property/propertyDetailsAddress/${property_id}`)
        .then((res) => {
           setAddress(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
    }, [property_id]);

    //Datos de compra de la propeidad
    useEffect(() => {
        axios
        .get(`http://localhost:4000/property/propertyDetailsPurchase/${property_id}`)
        .then((res) => {
           setDetailsPurchase(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
    }, [property_id]);

        //Trae la provincia y Ciudad de una propiedad 
        useEffect(() => {
            axios
            .get(`http://localhost:4000/property/propertyDetailsProvinceCity/${property_id}`)
            .then((res) => {
                setProvinceCity(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        }, [property_id]);

        //Trae el tipo 
        useEffect(() => {
            axios
            .get(`http://localhost:4000/property/propertyDetailsSubtype/${property_id}`)
            .then((res) => {
                setType(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        }, [property_id]);


        
        //Trae el alquiler
        useEffect(() => {
            axios
            .get(`http://localhost:4000/property/propertyDetailsRent/${property_id}`)
            .then((res) => {
                setRent(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        }, [property_id]);

        //Trae la hipoteca
        useEffect(() => {
            axios
            .get(`http://localhost:4000/property/propertyDetailsLoan/${property_id}`)
            .then((res) => {
                setLoan(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        }, [property_id]);
        
        //carga el property id en navigate para editar detalles economicos
       const travelToEditEconomicFeatures = ()=>{

            setProperty(property_id)
            navigate("/addEconomicFeatures")
        }

      
  return (
    <Container fluid className='portafolio-container'>
         <h1 className='title'>{propertyDetails[0]?.property_name}</h1>
    <Row>
    {/* TRAER TODA LA INFO DE UNA PROPIEDAD */}
    <div className='col-6 infoAllProperty'>
       

        {/* CARRUSEL IMAGENES  */}    
        <div className="mt-5 carrusel">

        <div className='transparent'>
            <div  className='perTrans'>12%</div>
            <h2 className='turquoise'>{detailsPurchase[0]?.purchase_buy_price}€</h2>
            
            </div>

            <Carousel>
            {imagenes?.map((imagen, i)=>{return(
    
              <Carousel.Item className="contCarrusel imgCarrusel" key={i}>
               
                <div className="contenedorImagen d-flex justify-content-center" >
                    
                <img
                  className="d-block justify-content-center"
                  src={`/images/property/${imagen?.image_title}`}
                  alt={imagen?.image_title} 
                />
                </div>
              
              </Carousel.Item>
    
            )})
              
              } 
            </Carousel>
          </div>
          <div className='col-3 info'>
            <div className='icono'>
                <div><img src='/images/property/home.png'/></div>
                <div> <p>Tipo</p><p>{type[0]?.subtype_name}</p></div>
            </div>
            <div className='icono'>
                <div><img src='/images/property/date.png'/></div>
                <div><p>Año</p><p>{propertyDetails[0]?.property_built_year}</p></div>
            </div>
            <div className='icono'>
                <div><img src='/images/property/size.png'/></div>
                <div> <p>Tamaño</p><p>{propertyDetails[0]?.property_total_meters}m2</p></div>
            </div>
          </div>
          </div>

          <div className='direction'>
            <img src='/images/property/location.png'/>
            <h6>{address[0]?.address_street_name}, {address[0]?.address_postal_code}, {provinceCity[0]?.province_name}</h6>
        </div>  


        <div className='buttons'>
        <Button className='button' onClick={()=>navigate("/edit")}>Editar detalles</Button>
        <Button className='button'  onClick={handleShow}>
            Vender propiedad
            </Button>
           
                               
       
            <Modal className='modal' show={show} onHide={handleClose}>
            <Modal.Header  closeButton>
             <Modal.Title>¿Estas seguro que deseas vender la propiedad?</Modal.Title>
            </Modal.Header>
           
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
            Cerrar
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
            Aceptar
            </Button>
            </Modal.Footer>
            </Modal>
            </div>

            <h4>Informacion</h4>

        <div className='infoGrafica'>
            <div className='col-3 percenteges'>
                <div className='percent'>
                    <p>Ingresos</p>
                    <p>0%</p>
                    <p>+0,0%</p>
                </div>
                <div className='percent'>
                    <p>Costes</p>
                    <p>1.200€</p>
                    <p>+12,6%</p>
                </div>
                <div className='percent'>
                    <p>Beneficios</p>
                    <p>26.400€</p>
                    <p>-4%</p>
                </div>
            </div>
            <div className='col_6 graph'>
                <p>Valor de mercado</p>
                <p>{detailsPurchase[0]?.purchase_buy_price}€</p>
                <img src='/images/property/grafica.jpg'></img>
            </div>
        </div>     

        <div className='limits'>
            <p>Limites</p>
            <div className='limit'> 
                <p>Takes Profit</p>
                <div></div>
                <div>50.000€</div>
            </div>

            <div className='limit'>
                <p>Stop Loss</p>
                <div></div>
                <div>20.000€</div>
            </div>              
         </div>       
              
          </Row>

        
       
       
       
        
        
        <br/>
       
        <hr/>
        <h2>Resumen de la inversion</h2>
        <div>
            <p>Inversion inicial</p>
            <p>{detailsPurchase[0]?.purchase_entry_expenses + detailsPurchase[0]?.purchase_trading_expenses + detailsPurchase[0]?.purchase_reform_expenses + detailsPurchase[0]?.purchase_furniture_expenses}€</p>
            <p>Entrada </p>
            <p>{detailsPurchase[0]?.purchase_entry_expenses}</p>
            <p>Impuestos y gastos</p>
            <p>{detailsPurchase[0]?.purchase_trading_expenses + detailsPurchase[0]?.purchase_reform_expenses + detailsPurchase[0]?.purchase_furniture_expenses}€</p>
        </div>
        <div>
            <p>Amortiaciones y gastos</p>
            <p>{loan[0]?.loan_type + loan[0]?.loan_value + 765}€</p>
            <p>Hipoteca </p>
            <p>{loan[0]?.loan_value}€</p>
            <p>Gastos</p>
            <p>{loan[0]?.loan_type}€</p>
            <p>Impuestos</p>
            <p>765€</p>
        </div>
        <div>
            <p>Ingresos</p>
            <p>{rent[0]?.rent_renting_price}€</p>
            <p>Renta </p>
            <p>{rent[0]?.rent_renting_price}€</p>
            <p>Otros ingresos</p>
            <p>0€</p>
        </div>
        <hr/>
        <h2>Escenarios</h2>
        <div>
            <p>Rendimiento</p>
            <p>78.000€</p>
            <p>+12%</p>
            <br/>
            <p>Escenario</p>
            <p>Positivo</p>
            <p>Medio</p>
            <p>Negativo</p>
            <p>Alquiler</p>
            <p>Reforma</p>
            <p>1 año</p>
            <p>5 años</p>
            <p>10 años</p>
            <img src='' alt='Foto' />
            <p>Amortizaciones y gastos</p>
            <p>{detailsPurchase[0]?.purchase_entry_expenses + detailsPurchase[0]?.purchase_trading_expenses + detailsPurchase[0]?.purchase_reform_expenses + detailsPurchase[0]?.purchase_furniture_expenses}€</p>
            <p>Hipoteca</p>
            <p>{loan[0]?.loan_value}€</p>
            <p>Gastos</p>
            <p>{detailsPurchase[0]?.purchase_entry_expenses + detailsPurchase[0]?.purchase_trading_expenses + detailsPurchase[0]?.purchase_reform_expenses + detailsPurchase[0]?.purchase_furniture_expenses}€</p>
            <p>Impuestos</p>
            <p>26.125€</p>
            <p>Ingresos</p>
            <p>65.665€</p>
            <p>Renta</p>
            <p>{rent[0]?.rent_renting_price}€</p>
            <p>Otros ingresos</p>
            <p>1.500€</p>
            <p>Venta</p>
            <p>232.000€</p>

            <Button 
                variant="primary" 
                onClick={()=>navigate(`/editEconomicFeatures/${property_id}`)}
                >Editar detalles conomicos</Button>


            <Button variant="warning"  onClick={handleShow}>
            Vender propiedad
            </Button>

            <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
             <Modal.Title>¿Estas seguro que deseas vender la propiedad?</Modal.Title>
            </Modal.Header>
           
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
            Cerrar
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
            Aceptar
            </Button>
            </Modal.Footer>
            </Modal>

            <Button onClick={handleColor} variant={colorSold ? "success" : "danger"}>{colorSold ? "Marcar como vendido" : "Marcar como no vendido"}</Button>


        </div>
        <h2>Boost Invest</h2>
        <p>BoostInvest analiza la oferta de la zona para ofrecerte ideas para rentabilizar tu inversión inmobiliaria. Precios medios de alquiler, coster de reforma... y, si lo deseas, te conecta con profesionales para que te gestionen el alquiler del inmueble</p>
    

    </Container>
  )
  
}

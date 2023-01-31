import React, { useContext, useEffect, useState } from 'react'
import axios from "axios";
import {Form, useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../../../Context/AppContext';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import { Carousel, Col, Container, Row } from 'react-bootstrap';
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
    const [show, setShow] = useState(false);

    const {user } = useContext(AppContext);

    let { property_id } = useParams();

    const navigate = useNavigate();

    const handleColor = () => setColorSold(!colorSold);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    /* console.log(user.user_id, "Soy USER ID");
    console.log(property_id, 'soy property_id'); */

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
    
  /* console.log(user, "EYYYYYYYY") */
    
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
       /* const travelToEditEconomicFeatures = ()=>{

            setProperty(property_id)
            navigate("/addEconomicFeatures")
        } */

      
  return (
    <Container fluid className='portafolio-container'>
         <h1 className='title'>{propertyDetails[0]?.property_name}</h1>
    
        <div className='infoCarousel'>
             
        <div className='infoAllProperty'>             
        <div className="carrusel">

       
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
         </div>
         </div>

        
         <div className='information'>
            <div className='direction'>
                <div className='dir'>
                    <img src='/images/property/place.png'/>
                    <h6>{address[0]?.address_street_name}, {address[0]?.address_postal_code}, {provinceCity[0]?.province_name}</h6>
                </div>

                <div className='info'>
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
            <div className='transparent'>
                <div  className='perTrans'>12%</div>
                <h2 className='turquoise'>{detailsPurchase[0]?.purchase_buy_price}€</h2>  
                
                    
            </div>
         </div>       
                 
                          
        <div className='divButtons'>
            <div className='buttons'>
                <Button className='button' onClick={()=>navigate("/home")}>
                    <img src='/images/icons/editSmall.png'/>
                    Editar detalles</Button>
                <Button className='button'  onClick={handleShow}>
                <img src='/images/icons/graphSmall.png'/>
                Vender propiedad
                </Button>
            </div>
                                                   
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

       
            <h4>Información</h4>

        <div className='row infoGrafica'>
            <div className='col-12 col-sm-4 col-lg-2 percenteges'>
                <div className='percent'>
                    <p>Ingresos</p>
                    <p>0%</p>
                    <div className='perGreen'>+0,0%</div>
                </div>
                <div className='percent'>
                    <p>Costes</p>
                    <p>1.200€</p>
                    <div className='perGreen'>+12,6%</div>
                </div>
                <div className='percent'>
                    <p>Beneficios</p>
                    <p>26.400€</p>
                    <div className='perRed'>-4%</div>
                </div>
            </div>
            <div className='col-12 col-sm-8 col-lg-10 graph'>
                <div className='valor'>
                <p>Valor de mercado</p>
                <p>{detailsPurchase[0]?.purchase_buy_price}€</p>

                </div>
                
                <img src='/images/property/grafica4.jpg'></img>
               
            </div>
        </div>   


        <div className='row infos'>

        <div className='col-12 col-sm-12 col-lg-4 limits'>
            <div className='limites'>
            <h4>Limites</h4>
            <div className='limitsContainer'>
                <div className='limit'> 
                    <p>Take Profit</p>
                    <div className='b'></div>
                    <div className='c'>50.000€</div>
                </div>
                
                <div className='limit'>
                    <p>Stop Loss</p>
                    <div className='b'></div>
                    <div className='c'>20.000€</div>
                </div>        
            </div> 
            </div>                 
         </div> 

        <div className='col-12 col-sm-12 col-lg-8 inversions'>
        <h4>Resumen de la inversión</h4>
         <div className='inversion'>
            <div className='box'>
                <div className='divUno'>
                    <p className='gray'>Inversion inicial</p>
                     <p>{detailsPurchase[0]?.purchase_entry_expenses + detailsPurchase[0]?.purchase_trading_expenses + detailsPurchase[0]?.purchase_reform_expenses + detailsPurchase[0]?.purchase_furniture_expenses}€</p>
                </div>               
                <div className='divDos'>
                    <p className='gray'>Entrada </p>
                    <p>{detailsPurchase[0]?.purchase_entry_expenses}€</p>
                </div>
                    <div className='divDos'>
                        <p className='gray'>Impuestos y gastos</p>
                        <p>{detailsPurchase[0]?.purchase_trading_expenses + detailsPurchase[0]?.purchase_reform_expenses + detailsPurchase[0]?.purchase_furniture_expenses}€</p>
                    </div>
                
            </div>

            <div className='box'>
                <div className='divUno'>
                    <p className='gray'>Amortiaciones y gastos</p>
                    <p>{loan[0]?.loan_type + loan[0]?.loan_value + 765}€</p>
                </div>
                
                    <div className='divDos'>
                    <p className='gray'>Hipoteca </p>
                    <p>{loan[0]?.loan_value}€</p>
                    </div>
                    <div className='divDos'>
                    <p className='gray'>Gastos</p>
                    <p>{loan[0]?.loan_type}€</p>
                    </div>
                    <div className='divDos'>
                    <p className='gray'>Impuestos</p>
                    <p>765€</p>
                    </div>
                </div>
            

            <div className='box'>
                <div className='divUno'>
                <p className='gray'>Ingresos</p>
                <p>{rent[0]?.rent_renting_price}€</p>
                </div>
                
                    <div className='divDos'>
                    <p className='gray'>Renta </p>
                    <p>{rent[0]?.rent_renting_price}€</p>
                    </div>
                    <div className='divDos'>
                    <p className='gray'>Otros ingresos</p>
                    <p>0€</p>
                    </div>
                
            </div>
            </div>
        </div> 
        </div>


        <h4>Escenarios</h4>

        <div className='largeGraph row'>
            <div className='scenarios'>

                <div className='partOne'>
                    <div className='d-flex justify-content-between' >
                        <div>
                            <p className='gray'>Rendimiento</p>
                            <h4 className='mt-3'>78.000€</h4>
                        </div>
                        <div className='d-flex  align-items-end mt-5'><p className='green'>+12%</p></div>
                    </div>
                                       
                    
                    <div className='stage'>
                        <p>Escenario</p>
                        <div className='stageOne'>
                            <button>Positivo</button>
                            <button>Medio</button>
                            <button>Negativo</button>
                        </div>
                        <div className='stageTwo'>
                            <p>Alquiler</p>
                            <div className='b'></div>
                        </div>
                        <div className='stageTwo'>
                            <p>Reforma</p>
                            <div className='c'></div>
                        </div>
                        <div className='stageOne'>
                            <button>1 año</button>
                            <button>5 años</button>
                            <button>10 años</button>
                        </div>
                    </div>                                     
                                      
                </div>

                <div className='partTwo'>
                    <img src='/images/property/grafico.jpg' alt='Foto' />
                </div>

                <div className='partThree'>
                    <div className='data'>
                        <div className='d'>
                            <p>Amortizaciones y gastos</p>
                            <p>Hipoteca</p>
                            <p>Gastos</p>
                            <p>Impuestos</p>
                            <br/>
                            <p>Ingresos</p>
                            <p>Renta</p>
                            <p>Otros ingresos</p>
                            <p>Venta</p>
                        </div>

                        <div className='number'>
                            <p>{detailsPurchase[0]?.purchase_entry_expenses + detailsPurchase[0]?.purchase_trading_expenses + detailsPurchase[0]?.purchase_reform_expenses + detailsPurchase[0]?.purchase_furniture_expenses}€</p>
                            <p>{loan[0]?.loan_value}€</p>
                            <p>{detailsPurchase[0]?.purchase_entry_expenses + detailsPurchase[0]?.purchase_trading_expenses + detailsPurchase[0]?.purchase_reform_expenses + detailsPurchase[0]?.purchase_furniture_expenses}€</p>
                            <p>26.125€</p>
                            <br/>
                            <p>65.665€</p>
                            <p>{rent[0]?.rent_renting_price}€</p>
                            <p>1.500€</p>
                            <p>232.000€</p>
                        </div>
                                             
                    </div>

                   
                </div>
            </div>
        </div>              
              
                 
              
        <div className='threeButtons'>
            
           
            <Button className='edit'
                onClick={()=>navigate(`/editEconomicFeatures/${property_id}`)}
                >
                    <img src='/images/icons/editSmall.png'/>
                    Editar detalles conomicos</Button>


            <Button className='sold'
                onClick={handleShow}>
                    <img src='/images/icons/graphSmall.png'/>
                Vender propiedad</Button>

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

            <Button className='check'
                onClick={handleColor} variant={colorSold ? "success" : "danger"}>
                    <img src='/images/icons/verified.png'/>
                    {colorSold ? "Marcar como vendido" : "Marcar como no vendido"}</Button>
        </div>

    <div className='row boost'>
        <div className='col-5 boostbutton'>
            <button>Boost Invest</button>
        </div>

        <div className='col-7 boostp'>
            <p>BoostInvest analiza la oferta de la zona para ofrecerte ideas para rentabilizar tu inversión inmobiliaria. Precios medios de alquiler, coster de reforma... y, si lo deseas, te conecta con profesionales para que te gestionen el alquiler del inmueble</p>
            </div>

    </div>



        
        
    

    </Container>
  )
  
}

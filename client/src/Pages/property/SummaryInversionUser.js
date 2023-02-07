import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { AppContext } from '../../Context/AppContext';
import './summaryInv.scss';


export const SummaryInversionUser = () => {
    const [countProperties, setCountProperties] = useState();
    const [rentedProperties, setRentedProperties] = useState();
    const [soldProperties, setSoldProperties] = useState();
    const [totalInv, setTotalInv] = useState();
    const [monthlyInc, setMonthlyInc] = useState();

    const {user} = useContext(AppContext);
    const {user_id} = user;
    /* console.log(user_id, "USER_ID"); */
    
    useEffect(() => {
        axios 
        .get(`http://localhost:4000/users/getCountProperties/${user_id}`)
        .then((res) => {
            /* console.log(res.data.result[0].active_properties,  "RES total propiedades"); */
           setCountProperties(res.data.result[0].active_properties);
        })
        .catch((error)=> {console.log(error);
        })
    }, [user_id])

    useEffect(() => {
        axios
        .get(`http://localhost:4000/users/getSoldProperties/${user_id}`)
        .then((res) => {
            /* console.log(res.data.result.length, "vendidos"); */
            setSoldProperties(res.data.result.length)
            
        })
        .catch((error)=> {console.log(error);
        })
        }, [user_id])

    useEffect(() => {
        axios
        .get(`http://localhost:4000/users/getRentedProperties/${user_id}`)
        .then((res) => {
            /* console.log(res.data.result.length, "alquilados"); */
            setRentedProperties(res.data.result.length);
        })
        .catch((error)=> {console.log(error);
        })
    }, [user_id])

    useEffect(() => {
        axios
        .get(`http://localhost:4000/users/getTotalInv/${user_id}`)
        .then((res) => {
            const array = res.data.result;
            const resultArray = array.reduce((acum, current) => acum + current.purchase_buy_price, 0);
            /* console.log(resultArray, "inversion total")   */                     
            setTotalInv(resultArray)
        })
        .catch((error) => {console.log(error);
        })
                     
    }, [user_id])

    useEffect(() => {
        axios
        .get(`http://localhost:4000/users/getMonthlyIncome/${user_id}`)
        .then((res) => {
            const ingresos = res.data.result;
            const resultIngresos = ingresos.reduce((acum, current) => acum + current.rent_renting_price, 0);
            /* console.log(resultIngresos, "ingresos totales")  */                          
            setMonthlyInc(resultIngresos)
        })
        .catch((error) => {console.log(error);                
        })
                    
    }, [user_id])
        
 ///////
    
  return (
    <Container fluid className='main' >
        <h1 className='text-center'>Resumen Inversión</h1>
       
        <Row className='m-0 d-flex justify-content-center w-100'>
            
            <Col className='profit' xs={12}  lg={4}>
                <h3 className='w-50 m-auto'>Beneficio</h3>
                <p className='fs-1 w-50 m-auto'>{Math.floor(totalInv * 0.15)} €</p>
            </Col>
        
            <Col className=' graphic ' xs={12} lg={8}>
                <img src='/images/property/grafica4.jpg' alt='valoracion_patrimonio'/>
            </Col>
        </Row >
        <Row className='datos justify-content-evenly'>
            <Col className='m-4 info'  xs={12} md={6} lg={3}>
                <h3>Información</h3>
                <div className='d-flex justify-content-around ' >
                    <span>Total P/L</span> 
                    <span>{Math.floor(totalInv * 0.03)} €</span> 
                    <span> 3 %</span>
                </div>

                <div className='d-flex justify-content-around border border-dark rounded-4 p-2 mt-3'>
                    <span>Inversión Total</span> 
                    <span>{totalInv} € </span> 
                    <span> -2.8 %</span>
                </div>

                <div className='d-flex justify-content-around border border-dark rounded-4 p-2 mt-3'>
                    <span>Gastos mensuales</span> 
                    <span>1400 €</span> 
                    <span> -4 %</span>
                </div>

                <div className='d-flex justify-content-around border border-dark rounded-4 p-2 mt-3'>
                    <span>Ingresos Menusales</span> 
                    <span>{monthlyInc} € </span> 
                    <span> 0 %</span>
                </div>
            </Col>
            <Col className='m-4 medio' xs={12} md={6} lg={3}>
                <h3>Histórico Inmueble</h3>
                <div className='border border-dark rounded-4'>
                    <div className='d-flex justify-content-between tiposMedio'>
                        <span>Inmuebles activos: </span>
                        <span>{countProperties}</span>
                    </div>
                    <div className='d-flex justify-content-between tiposMedio'>
                        <span>Operaciones cerradas: </span>
                        <span>{soldProperties}</span>
                    </div>
                    <div className='d-flex justify-content-between tiposMedio'>
                        <span>Inmuebles en alquiler: </span>
                        <span>{rentedProperties}</span>
                    </div>
                    <div className='d-flex justify-content-between tiposMedio'>
                        <span>Rendimiento medio: </span>
                        <span>12%</span>
                    </div>
                </div>
            </Col>
            <Col className='m-4 record control' xs={12} md={6} lg={3}><h3>Récords de Inversión</h3></Col>
        </Row>

    </Container>
  )
}
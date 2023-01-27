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
    console.log(user_id, "****************");
    
    useEffect(() => {
        axios 
        .get(`http://localhost:4000/users/getCountProperties/${user_id}`)
        .then((res) => {
            console.log(res.data.result.length, "total propiedades");
           setCountProperties(res.data.result.length);
            
        })
        .catch((error)=> {console.log(error);
        })
    }, [user_id])

    useEffect(() => {
        axios
        .get(`http://localhost:4000/users/getSoldProperties/${user_id}`)
        .then((res) => {
            console.log(res.data.result.length, "vendidos");
            setSoldProperties(res.data.result.length)
            
        })
        .catch((error)=> {console.log(error);
        })
           
        }, [user_id])

    useEffect(() => {
        axios
        .get(`http://localhost:4000/users/getRentedProperties/${user_id}`)
        .then((res) => {
            console.log(res.data.result.length, "alquilados");
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
            console.log(resultArray, "inversion total")                       
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
            console.log(resultIngresos, "ingresos totales")                           
            setMonthlyInc(resultIngresos)
        })
        .catch((error) => {console.log(error);                
        })
                     
    }, [user_id])
        
 
    
  return (
    <Container>
        <h2 className='text-center'>RESUMEN INVERSIÓN</h2>
       
        <Row>
            <Col>
                <h3>Beneficio</h3>
                <p className='fs-1'>322220€</p>
            </Col>
            <Col>
                <img src='/images/valoracion_patrimonio.png' alt='valoracion_patrimonio'/>
            </Col>
        </Row>
        <Row className='mt-5'>
            <Col>
                <h3>Información</h3>
                <div className='d-flex justify-content-between border border-dark rounded-4 p-2' >
                    <span>Total P/L</span> 
                    <span>312000€</span> 
                    <span> -4%</span>
                </div>

                <div className='d-flex justify-content-between border border-dark rounded-4 p-2 mt-3'>
                    <span>Inversión Total</span> 
                    <span>{totalInv}€ </span> 
                    <span> -4%</span>
                </div>

                <div className='d-flex justify-content-between border border-dark rounded-4 p-2 mt-3'>
                    <span>Gastos mensuales</span> 
                    <span>1400€</span> 
                    <span> -4%</span>
                </div>

                <div className='d-flex justify-content-between border border-dark rounded-4 p-2 mt-3'>
                    <span>Ingresos Menusales</span> 
                    <span>{monthlyInc}€ </span> 
                    <span> -5%</span>
                </div>
            </Col>
            <Col >
                <h3>Histórico Inmueble</h3>
                <div className='border border-dark rounded-4 p-3'>
                    <div className='d-flex justify-content-between'>
                        <span>Inmuebles activos: </span>
                        <span>{countProperties}</span>
                    </div>
                    <div className='d-flex justify-content-between'>
                        <span>Operaciones cerradas: </span>
                        <span>{soldProperties}</span>
                    </div>
                    <div className='d-flex justify-content-between'>
                        <span>Inmuebles en alquiler: </span>
                        <span>{rentedProperties}</span>
                    </div>
                    <div className='d-flex justify-content-between'>
                        <span>Rendimiento medio: </span>
                        <span>12%</span>
                    </div>
                </div>
            </Col>
            <Col><h3>Récords de Inversión</h3></Col>
        </Row>







    </Container>
  )
}
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

export const SummaryInversionUser = () => {
  return (
    <Container>
        <h2 className='text-center'>RESUMEN INVERSIÓN</h2>
        <Row>
            <Col>
                <h3>Beneficio</h3>
                <p className='fs-1'>322220€</p>
            </Col>
            <Col>
                <img src='/images/valoracion_patrimonio.png'/>
            </Col>
        </Row>
        <Row className='mt-5'>
            <Col>
                <h3>Información</h3>
                <div className='d-flex justify-content-between border border-dark rounded-4 p-2' ><span>Total P/L</span> <span>312000€</span> <span> -4%</span></div>
                <div className='d-flex justify-content-between border border-dark rounded-4 p-2 mt-3'><span>Inversión Total</span> <span>12540000€</span> <span> -4%</span></div>
                <div className='d-flex justify-content-between border border-dark rounded-4 p-2 mt-3'><span>Gastos mensuales</span> <span>1400€</span> <span> -4%</span></div>
                <div className='d-flex justify-content-between border border-dark rounded-4 p-2 mt-3'><span>Ingresos Menusales</span> <span>1400€</span> <span> -5%</span></div>
            </Col>
            <Col >
                <h3>Histórico Inmueble</h3>
                <div className='border border-dark rounded-4 p-3'>
                    <div className='d-flex justify-content-between'>
                        <span>Inmuebles activos: </span>
                        <span>5</span>
                    </div>
                    <div className='d-flex justify-content-between'>
                        <span>Operaciones cerradas: </span>
                        <span>6</span>
                    </div>
                    <div className='d-flex justify-content-between'>
                        <span>Inmuebles en alquiler: </span>
                        <span>3</span>
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
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import './footer.scss';

export const Footer = () => {
  return (
    <Container fluid className='footerContainer'>
    <Row className='infoContainer'>

        <Col className='housia'>
            <img src='/images/logo-blanco.png' alt='logo_blanco'/>
            <p>Housia es una marca comercial debidamente registrada. Todos los derechos reservados. 2022</p>
            <a className='turquoise' href='mailto:info@housia.es'>info@housia.es</a>
            <a className='turquoise' href='tel:34656630911'>656 630911</a>
        </Col>

        <Col className='redes'>
            <a href='https://housia.es/about-page/'><img src='/images/icons/facebook.png' alt='logo_facebook'/></a>
            <a href='https://twitter.com/Housiaes'><img src='/images/icons/twitter.png' alt='logo_twitter'/></a>
            <a href='https://www.linkedin.com/company/housiaes'><img src='/images/icons/linkedin.png' alt='logo_linkedin'/></a>
        </Col>
        
    </Row>
    </Container>
  )
}

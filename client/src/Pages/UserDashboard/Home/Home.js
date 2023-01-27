import React from 'react';
import { Container} from 'react-bootstrap';
import "./StyleHome.scss";
export const Home = () => {
  return (
    <Container fluid className='fondoHome'>
      <div className='row'>
    <div className="col-12 col-lg-12 col-xl-12 col-xxl-6">
      <div className='colInfo'>
         <div className='divInfo'>
          <div className='botInfo'>
            Welcome to Housia
          </div>
          <div className='botInfoA'>
            Quienes somos
          </div>
        </div>  
        <p className='tamInfo'>Toma El Control De Tus Propiedades Inmobiliarias</p>
        <p className='pInfo'>Controla tus propiedades</p>
        <p className='pInfo'>Descubre oportunidades de Inversión</p>
        <p className='pInfo'>Valora inversiones por su beneficio</p>
        <button className='soonBoton'>Soon</button> 
      </div> 
      </div>
      <div className="col-6  ">
        <div className='imageInfo'>
           <img className='' src='../images/user/mock20.png' alt='mock20.png'/>
        </div>
      </div>
      <div className='row dos'>
        <div className='col dos'>
        <div className='footerInfo'>
          <img src='../images/logo-blanco.png' alt='LogoHousia' />
          <p>Housia es una marca comercial debidamente registrada. Todos los derechos reservados. 2022</p>
          <div className='enlaceInfo'>
          <img src='../images/user/carta.png' alt='Gmail' />
          <a href="">info@housia.es</a>
          </div>
          <div className='enlaceInfo'>
          <img src='../images/user/telefono.png' alt='Telefono' />
          <a href="">656 630911</a>
          </div>
        </div>
        </div>
      </div> 


      </div>
     
    </Container>
  )
}

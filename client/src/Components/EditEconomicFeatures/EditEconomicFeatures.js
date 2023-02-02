import axios from 'axios'
import React, {  useContext, useEffect, useState } from 'react'
import { Accordion, Col, Row } from 'react-bootstrap';
import {useParams} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import { AppContext } from '../../Context/AppContext';
import './editEconomicFeatures.scss';

export const EditEconomicFeatures = () => {
    const [editPurchase, setEditPurchase] = useState();
    const [editLoan, setEditLoan] = useState();
    const [editRent, setEditRent] = useState();
    const [checkboxState, setCheckboxState] = useState(false)

    const{user, isLogged} = useContext(AppContext)

    let {property_id} = useParams(); 
    const navigate= useNavigate();

    useEffect(()=>{
        axios
        .get(`http://localhost:4000/property/getAllPurchaseData/${property_id}`)
        .then((res)=>{
            setEditPurchase(res.data[0]);
            setEditLoan(res.data[0]);
            setEditRent(res.data[0]);
        })
        .catch((error)=> {
            console.log(error)
        })
        },[property_id])


    const handleSubmitEdit =(e)=>{
    e.preventDefault();

    axios
    .put(`http://localhost:4000/property/editPurchase/${property_id}`, editPurchase)
    .then((res)=>{
        console.log("respuesta correcta")
        navigate(`/propertyDetails/${property_id}`)

        if(isLogged && user.user_type === 2){
            navigate(`/user/portafolio`);
        } else{
            navigate(`/admin/allproperties`);
        }   

    })
    .catch((error)=>{
        console.log(error)
    })
    console.log(editPurchase);
} 
    
const handleRadioLoanType =(e) =>{
    const {value} = e.target

    if(value === "1"){
        setEditPurchase({...editPurchase, loan_type:1})
    } else if(value === "2"){
        setEditPurchase({...editPurchase, loan_type:2})
    }
}
   
const handleRadioIsNew = (e) =>{
    const {value} = e.target
        if(value=== "true"){ 
            setEditPurchase({...editPurchase, purchase_is_new:1})
        } else if(value === "false"){
            setEditPurchase({...editPurchase, purchase_is_new:0})
        }
    }


const handleCheckBox = (e) =>{
        setCheckboxState(!checkboxState)
        setEditPurchase({...editPurchase, purchase_is_usual: checkboxState? 0: 1})
}

const handleChangePurchase = (e) =>{
        let {name, value} = e.target;
        if (name === 'purchase_ownership_percentage'){
            if(value >100){
                value = 100;
            } 
            if(value < 0){
                value = 0;
            }
        }
        setEditPurchase({...editPurchase, [name]:value})
    };


  return (

    <div className='datos-economicos-container'>
         <h1>Caracteristicas Económicas</h1>
         <Row className='m-0 justify-content-center'>
        <Col className='datos-economicos-formulario'xs={10} md={8} lg={6}>
        <label for='purchase_buy_date'>Precio de Compra</label>

        <input
            onkeypress='return event.charCode >= 49 && event.charCode <= 57'
            type='number'
            step='0,01'
            placeholder='Precio de Compra'
            autoComplete='off'
            value={editPurchase?.purchase_buy_price}
            name='purchase_buy_price'
            onChange={handleChangePurchase}
        />
        <label for='purchase_buy_date'>Fecha de Compra</label>
        <input
            type='date'
            autoComplete='off'
            value={(editPurchase?.purchase_buy_date)}
            name="purchase_buy_date"
            onChange={handleChangePurchase}
        />
        <div>
       <div>
            <input type='radio'
                id='opcion-obra-nueva' 
                name='purchase_is_new'
                value= 'true'
                checked = {editPurchase?.purchase_is_new === 1} 
                onChange={handleRadioIsNew}
                />
            <label for='opcion-obra-nueva'>Obra Nueva</label>
        </div> 

       <div>
            <input type='radio'
                id='opcion-segunda-mano' 
                name='purchase_is_new'
                value='false'
                checked = {editPurchase?.purchase_is_new === 0}
                onChange={handleRadioIsNew}
                />
            <label for='opcion-segunda-mano'>Segunda Mano</label>
        </div>
    </div> 
       
        <Accordion alwaysOpen className='datos-economicos-acordion'>
            <Accordion.Item eventKey="0" className='accordion-opcion'>
            <Accordion.Header>Entrada y gastos de compraventa</Accordion.Header>
            <Accordion.Body className='d-flex flex-column'>
                <label>Entrada</label>
                <input 
                  type='number'
                  className='m-2'
                  min='0'
                  value={editPurchase?.purchase_entry_expenses}
                  name="purchase_entry_expenses"
                  onChange={handleChangePurchase}/>

                <label>Gastos de compraventa</label>
                <input 
                 type='number'
                 className='m-2'
                 min='0'
                 value={editPurchase?.purchase_trading_expenses}
                 name="purchase_trading_expenses"
                 onChange={handleChangePurchase}/>

                <div className='d-flex align-items-center  isUsual'>
                <input 
                  type="checkbox" 
                  id="check-is-usual" 
                  className='check-is-usual'
                  checked = {editPurchase?.purchase_is_usual}
                  name="purchase_is_usual"
                  onChange={handleCheckBox}
                  />
                <label className='m-2' for="check-is-usual">Usuales</label>
                </div>
            </Accordion.Body>
        </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Gastos de Reparación / Reforma</Accordion.Header>
        <Accordion.Body>
            <div className='d-flex align-items-center'>
                <p className='m-0'>€</p>
                <input 
                    type='number'
                    min='0'
                    className='m-2'
                    value={editPurchase?.purchase_reform_expenses}
                    name="purchase_reform_expenses"
                    onChange={handleChangePurchase}/>
            </div>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>Gastos de Mobiliario</Accordion.Header>
        <Accordion.Body>
            <div className='d-flex align-items-center'>
                <p className='m-0'>€</p>
                <input 
                    className='m-2'
                    type='number'
                    min='0'
                    value={editPurchase?.purchase_furniture_expenses}
                    name="purchase_furniture_expenses"
                    onChange={handleChangePurchase}/>
            </div>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="3">
        <Accordion.Header>Porcentaje de propiedad</Accordion.Header>
        <Accordion.Body>
            <div className='d-flex align-items-center'>
            <p className='m-0'>%</p>
                <input 
                    className='m-2'
                    type='number'
                    value={editPurchase?.purchase_ownership_percentage}
                    name="purchase_ownership_percentage"
                    onChange={handleChangePurchase}/>
                
            </div>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="4">
        <Accordion.Header>Hipoteca</Accordion.Header>
        <Accordion.Body>
            <div className='d-flex flex-column'>
                <label>Importe Hipoteca</label>
                <input 
                    value={editPurchase?.loan_value}
                    name="loan_value"
                    onChange={handleChangePurchase}/>
            </div>
            <input type='radio'
                id='hipoteca-importe-fijo' 
                name='loan_type'
                value='1'
                checked = {editPurchase?.loan_type === 1} 
                 onChange={ handleRadioLoanType}
                />
            <label className='m-2' for='hipoteca-importe-fijo'>Fijo</label>
            <input type='radio'
               id='hipoteca-importe-fijo' 
               name='loan_type'
               value='2'
               checked = {editPurchase?.loan_type === 2} 
               onChange={ handleRadioLoanType}
                />
            <label className='m-2' for='hipoteca-importe-variable'>Variable</label>
            
            <div className='d-flex flex-column'>
                <label>Años</label>
                <input 
                    value={editPurchase?.loan_years}
                    name="loan_years"
                    onChange={handleChangePurchase}/>
                <label>Interés</label>
                <input 
                    placeholder='Interés'
                    value={editPurchase?.loan_interest_rate}
                    name="loan_interest_rate"
                    onChange={handleChangePurchase}/>
            </div>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="5">
        <Accordion.Header>Alquiler</Accordion.Header>
        <Accordion.Body>
            <div className='d-flex flex-column flex-start'>
                <label>Precio d alquiler</label>
                <input 
                    value={editPurchase?.rent_renting_price}
                    name="rent_renting_price"
                    onChange={handleChangePurchase}/>
            </div>
            <div className='d-flex flex-column flex-start'>
                <label>Gastos mensuales</label>
                <input 
                    value={editPurchase?.rent_expenses}
                    name="rent_expenses"
                    onChange={handleChangePurchase}/>
            </div>
            <div className='d-flex align-items-center'>
                <label>Desde</label>
                <input 
                    type='date' 
                    className='m-2'
                    value={editPurchase?.rent_renting_date}
                    name="rent_renting_date"
                    onChange={handleChangePurchase}/>
            </div>
            
        </Accordion.Body>
        </Accordion.Item>
        </Accordion>
        <button className='boton-editar' onClick={handleSubmitEdit}>Guardar Cambios</button>
        </Col>
        </Row>


    </div>
  )
}
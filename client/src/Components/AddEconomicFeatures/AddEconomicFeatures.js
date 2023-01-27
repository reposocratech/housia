import React, {useState, useContext} from 'react'
import { Accordion, Button} from 'react-bootstrap'
import './AddEconomicFeatures.scss'
import { AppContext } from '../../Context/AppContext';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';


export const AddEconomicFeatures = () => {
    const [rent, setRent] = useState();
    const [loan, setLoan] = useState();
    const [purchase, setPurchase] = useState();
    const [isUsual, setIsUsual] = useState(false);
   
    console.log(purchase , 'datos de purchase');
    console.log(loan, 'datos de loan');
    console.log(rent, 'datos de rent');

    const navigate = useNavigate();

    const {property } = useContext(AppContext);

    // let property_id = property?.property_id;
   let property_id = property;

    const handleChangePurchase = (e) => {
        const {name, value} = e.target;
        console.log(e);
        setPurchase({...purchase, [name]:value})  
    }
    
    const handleChangeLoan = (e) => {
        const {name, value} = e.target;
        setLoan({...loan, [name]:value})
    }

    const handleChangeRent = (e) => {
        const {name, value} = e.target;
        console.log(e.target);
        setRent({...rent, [name]:value})
    }

    const handleClick = (e) => {
        e.preventDefault();
        axios
            .post(`http://localhost:4000/property/createRent/${property_id}`, rent )
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err, 'error de rent');
            });
        axios
            .post(`http://localhost:4000/property/createLoan/${property_id}`, loan )
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err, 'error de loan');
            });
        axios
            .post(`http://localhost:4000/property/createPurchase/${property_id}`, purchase )
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err, 'error de purchase');
            });
            
            navigate('/user/portafolio');
    }

  return (
    <div>
        <h1>Características Económicas</h1>
        <h3>Compra</h3>
        <div className='d-flex flex-column'>
        <input
            type='number'
            step='0,01'
            placeholder='Precio de Compra'
            autoComplete='off'
            value={purchase?.purchase_buy_price}
            name='purchase_buy_price'
            onChange={handleChangePurchase}
        />
        <label for='purchase_buy_date'>Fecha de Compra</label>
        <input
            type='date'
            autoComplete='off'
            value={purchase?.purchase_buy_date}
            name="purchase_buy_date"
            onChange={handleChangePurchase}
        />
        <div>
            <input type='radio'
                id='opcion-obra-nueva' 
                name='purchase_is_new'
                value='true'
                onChange={handleChangePurchase}
                />
            <label for='opcion-obra-nueva'>Obra Nueva</label>
        </div> 

        <div>
            <input type='radio'
                id='opcion-segunda-mano' 
                name='purchase_is_new'
                value='false'
                onChange={handleChangePurchase}
                />
            <label for='opcion-segunda-mano'>Segunda Mano</label>
        </div>
        <Accordion alwaysOpen>
      <Accordion.Item eventKey="0" className='m-3'>
        <Accordion.Header>Entrada y gastos de compraventa</Accordion.Header>
        <Accordion.Body>
          <label>Entrada</label>
          <input 
            type='number'
            min='0'
            value={purchase?.purchase_entry_expenses}
            name="purchase_entry_expenses"
            onChange={handleChangePurchase}/>

          <label>Gastos de compraventa</label>
          <input 
           type='number'
           min='0'
           value={purchase?.purchase_trading_expenses}
           name="purchase_trading_expenses"
           onChange={handleChangePurchase}/>

          <div className='d-flex align-items-center'>
          <input 
            type="checkbox" 
            id="check-is-usual" 
            className='check-is-usual'
            value={!isUsual}
            onClick={()=>setIsUsual(!isUsual)}
            name="purchase_is_usual"
            onChange={handleChangePurchase}
            />
          <label for="check-is-usual">Usuales</label>
          </div>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1" className='m-3'>
        <Accordion.Header>Gastos de Reparación / Reforma</Accordion.Header>
        <Accordion.Body>
            <div className='d-flex align-items-center'>
                <p className='m-0'>€</p>
                <input 
                    type='number'
                    min='0'
                    className='m-2'
                    value={purchase?.purchase_reform_expenses}
                    name="purchase_reform_expenses"
                    onChange={handleChangePurchase}/>
            </div>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2" className='m-3'>
        <Accordion.Header>Gastos de Mobiliario</Accordion.Header>
        <Accordion.Body>
            <div className='d-flex'>
                <p className='m-0'>€</p>
                <input 
                    className='m-2'
                    type='number'
                    min='0'
                    value={purchase?.purchase_furniture_expenses}
                    name="purchase_furniture_expenses"
                    onChange={handleChangePurchase}/>
            </div>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="3" className='m-3'>
        <Accordion.Header>Porcentaje de propiedad</Accordion.Header>
        <Accordion.Body>
            <div className='d-flex'>
                <input 
                    className='m-2'
                    type='number'
                    min='0'
                    value={purchase?.purchase_ownership_percentage}
                    name="purchase_ownership_percentage"
                    onChange={handleChangePurchase}/>
                <p className='m-0'>%</p>
            </div>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="4" className='m-3'>
        <Accordion.Header>Hipoteca</Accordion.Header>
        <Accordion.Body>
            <div className='d-flex flex-column flex-start'>
                <label>Importe Hipoteca</label>
                <input 
                    className='m-2'
                    value={loan?.loan_value}
                    name="loan_value"
                    onChange={handleChangeLoan}/>
            </div>
            <input type='radio'
                id='hipoteca-importe-fijo' 
                name='loan_type'
                value='1'
                onChange={handleChangeLoan}
                />
            <label for='hipoteca-importe-fijo'>Fijo</label>
            <input type='radio'
               id='hipoteca-importe-fijo' 
               name='loan_type'
               value='2'
               onChange={handleChangeLoan}
                />
            <label for='hipoteca-importe-variable'>Variable</label>
            
            <div className='d-flex'>
                <label>Años</label>
                <input 
                    className='m-2'
                    value={loan?.loan_years}
                    name="loan_years"
                    onChange={handleChangeLoan}/>
                <input 
                    className='m-2'
                    placeholder='Interés'
                    value={loan?.loan_interest_rate}
                    name="loan_interest_rate"
                    onChange={handleChangeLoan}/>
            </div>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="5"className='m-3' >
        <Accordion.Header>Alquiler</Accordion.Header>
        <Accordion.Body>
            <div className='d-flex flex-column flex-start'>
                <label>Precio d alquiler</label>
                <input 
                    className='m-2'
                    value={rent?.rent_renting_price}
                    name="rent_renting_price"
                    onChange={handleChangeRent}/>
            </div>
            <div className='d-flex flex-column flex-start'>
                <label>Gastos mensuales</label>
                <input 
                    className='m-2'
                    value={rent?.rent_expenses}
                    name="rent_expenses"
                    onChange={handleChangeRent}/>
            </div>
            <div className='d-flex align-items-center'>
                <label>Desde</label>
                <input 
                    type='date' 
                    className='m-2'
                    value={rent?.rent_renting_date}
                    name="rent_renting_date"
                    onChange={handleChangeRent}/>
            </div>
            
        </Accordion.Body>
        </Accordion.Item>
        </Accordion>
        </div>
        <Button onClick={handleClick}>Guardar</Button>
        
        
    </div>
  )
}

import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../Context/AppContext';
import { Accordion } from 'react-bootstrap';




export const EditEconomicFeatures = () => {

    
    const [editPurchase, setEditPurchase] = useState();
    const [editLoan, setEditLoan] = useState();
    const [editRent, setEditRent] = useState();
    const [checkboxState, setCheckboxState] = useState(false)
   

    let {property} = useContext(AppContext);
 property = 9;

 let fechaCompra = ""
 if(editPurchase?.purchase_buy_date !== undefined){
     fechaCompra = editPurchase?.purchase_buy_date.slice(0, 10)
 }
 ;

 let fechaAlquiler = "";
 if( editRent?.rent_renting_date !== null ){
fechaAlquiler = editRent?.rent_renting_date.slice(0, 10);
 }
 
 

useEffect(()=>{

axios
    .get(`http://localhost:4000/property/getAllPurchaseData/${property}`)
    .then((res)=>{
        
        
        setEditPurchase(res.data[0]);
        setEditLoan(res.data[0]);
        setEditRent(res.data[0]);
        
    })
    .catch((error)=> {
        console.log(error)
    })




    
},[])
 
const handleSubmitEdit =(e)=>{
    e.preventDefault();


    //axios del RENT
    let rentId = editRent.rent_id;
    axios
    .put(`http://localhost:4000/property/editRent/${rentId}`, editRent)
    .then((res)=>{
        console.log("respuesta correcta")
        //FALTA NAVIGATE A PROPERTY_ID;

    })
    .catch((error)=>{
        console.log(error)
    })
    

} 
    
const handleRadioLoanType =(e) =>{
    const {value} = e.target

    if(value === "1"){

        setEditLoan({...editLoan, loan_type:1})
    } else if(value === "2"){

        setEditLoan({...editLoan, loan_type:2})
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
    // console.log(checkboxState);


const handleChangePurchase = (e) =>{
        const {name, value} = e.target;
        console.log(e.target.value, "linea 69")
        setEditPurchase({...editPurchase, [name]:value})
        
    };

        // console.log(editPurchase, "edit purchase");
    
    
const handleChangeRent = (e) =>{
        const {name, value} = e.target;
        setEditRent({...editRent, [name]:value})
        
    };
console.log(editRent, "edit rent")
   

const handleChangeLoan =(e)=>{
        const {name, value} = e.target;
        setEditLoan({...editLoan, [name]: value})
       
    };

    //  console.log(editLoan, "edit loan")
  

   


  return (
    <div>
         <h1>Formulario para editar caracteristicas economicas</h1>

        <div className='d-flex flex-column'>
        <input
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
            value={fechaCompra}
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
       
        <Accordion alwaysOpen>
      <Accordion.Item eventKey="0" className='m-3'>
        <Accordion.Header>Entrada y gastos de compraventa</Accordion.Header>
        <Accordion.Body>
          <label>Entrada</label>
          <input 
            type='number'
            min='0'
            value={editPurchase?.purchase_entry_expenses}
            name="purchase_entry_expenses"
            onChange={handleChangePurchase}/>

          <label>Gastos de compraventa</label>
          <input 
           type='number'
           min='0'
           value={editPurchase?.purchase_trading_expenses}
           name="purchase_trading_expenses"
           onChange={handleChangePurchase}/>

          <div className='d-flex align-items-center'>
          <input 
            type="checkbox" 
            id="check-is-usual" 
            className='check-is-usual'
            checked = {checkboxState}
            name="purchase_is_usual"
            onChange={handleCheckBox}
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
                    value={editPurchase?.purchase_reform_expenses}
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
                    value={editPurchase?.purchase_furniture_expenses}
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
                    value={editPurchase?.purchase_ownership_percentage}
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
                    value={editLoan?.loan_value}
                    name="loan_value"
                    onChange={handleChangeLoan}/>
            </div>
            <input type='radio'
                id='hipoteca-importe-fijo' 
                name='loan_type'
                value='1'
                checked = {editLoan?.loan_type === 1} 
                 onChange={ handleRadioLoanType}
                />
            <label for='hipoteca-importe-fijo'>Fijo</label>
            <input type='radio'
               id='hipoteca-importe-fijo' 
               name='loan_type'
               value='2'
               checked = {editLoan?.loan_type === 2} 
               onChange={ handleRadioLoanType}
                />
            <label for='hipoteca-importe-variable'>Variable</label>
            
            <div className='d-flex'>
                <label>Años</label>
                <input 
                    className='m-2'
                    value={editLoan?.loan_years}
                    name="loan_years"
                    onChange={handleChangeLoan}/>
                <input 
                    className='m-2'
                    placeholder='Interés'
                    value={editLoan?.loan_interest_rate}
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
                    value={editRent?.rent_renting_price}
                    name="rent_renting_price"
                    onChange={handleChangeRent}/>
            </div>
            <div className='d-flex flex-column flex-start'>
                <label>Gastos mensuales</label>
                <input 
                    className='m-2'
                    value={editRent?.rent_expenses}
                    name="rent_expenses"
                    onChange={handleChangeRent}/>
            </div>
            <div className='d-flex align-items-center'>
                <label>Desde</label>
                <input 
                    type='date' 
                    className='m-2'
                    value={fechaAlquiler}
                    name="rent_renting_date"
                    onChange={handleChangeRent}/>
            </div>
            
        </Accordion.Body>
        </Accordion.Item>
        </Accordion>
        <button onClick={handleSubmitEdit}>Guardar Cambios</button>
        </div>


    </div>
  )
}

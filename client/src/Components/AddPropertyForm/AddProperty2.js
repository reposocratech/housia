import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AppContext } from '../../Context/AppContext';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Container} from 'react-bootstrap';
import "./AddProperty2.scss";

export const AddProperty2 = () => {
const [kitchen, setKitchen] = useState();
const [kitchenId, setKitchenId] = useState(1);
const {property, setProperty,  typeId } = useContext(AppContext);
const navigate = useNavigate();

/* console.log(property);
console.log(typeId, 'type id');
console.log(subTypeId, 'subtype id'); */
console.log(typeId, 'type id');

    useEffect(() => {
        axios
        .get("http://localhost:4000/property/allKitchens")
        .then((res) => {
         setKitchen(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
    }, [])

   
    const handleChange = (e) => {
        const {name, value} = e.target;
        setProperty({...property, [name]:value})
    }

    const handleSubmit = () => {
  
        axios
            .put(`http://localhost:4000/property/addBasicFeaturesToProperty/${property.property_id}/${kitchenId}`, property)
            .then((res) => {
                
                setProperty(res.data[0]);
                navigate("/addProperty3");
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const handleKitchenId = (e) => {
        setKitchenId(e.target.value);
       }

    
  return (
    <div className='padreAdd2'>
    <div className='tituloAdd2'>
    <h2>Añadir Propiedad</h2>
    </div>
    <Container fluid>
        <div className='row'>
            <div className='col-12 col-lg-12 col-xxl-6  colAdd2'>
    <h3>Características de la propiedad</h3>
    <p className='pAdd2'>Estos valores son de gran importancia para el analisis automatico de rendimiento de la inversión</p>
    <div className='displayAdd2'>
    <div>
    <p>Superficie util</p>
        <input
            placeholder='0'
            autoComplete='off'
            type="number"
            value={property?.property_total_meters === 0 ? '' : property?.property_total_meters}
            name="property_total_meters"
            onChange={handleChange}
        />
       </div>
       <div className='sepAdd2'>
        <p>Superficie construida</p>
        <input
            placeholder='0'
            autoComplete='off'
            type="number"
            value={property?.property_built_meters === 0 ? '' : property?.property_built_meters}
            name="property_built_meters"
            onChange={handleChange}
        />
       </div>
       </div>
       <div className='displayAdd2'>
       <div>
    {typeId != 4 &&
        <>
        <p>Año de construccion</p>
        <input
            placeholder='0'
            autoComplete='off'
            type="number"
            min="1500"
            max="3000"
            value={property?.property_built_year === 0 ? '' : property?.property_built_year}
            name="property_built_year"
            onChange={handleChange}
        />
      
        </>
    } 
    </div> 
    <div className='sepAdd2'>
    {typeId != 3 && typeId != 4 &&
        <>
        <p>Habitaciones</p>
        <input
            placeholder='0'
            autoComplete='off'
            type="number"
            value={property?.property_rooms === 0 ? '' : property?.property_rooms}
            name="property_rooms"
            onChange={handleChange}
        />
      
        </>
    }
    </div>
    </div>
    </div>
    <div className='col-6 otroColAdd2'>
        
    {typeId != 4 && <>
        <p>Baños</p>
        <input
            placeholder='0'
            autoComplete='off'
            type="number"
            value={property?.property_bathrooms === 0 ? '' : property?.property_bathrooms }
            name="property_bathrooms"
            onChange={handleChange}
        />
        
    </>}

       {typeId != 3 && typeId != 4 && <>
        <p>Garage</p>
        <input
            placeholder='0'
            autoComplete='off'
            type="number"
            value={property?.property_garage === 0 ? '' : property?.property_garage}
            name="property_garage"
            onChange={handleChange}
        />
        
        <p>Tipo de cocina</p>
        <select onClick={handleKitchenId}>
            {kitchen?.map((tipo, i)=>{
                return(
                    <option key={i} value={tipo?.kitchen_id}  >{tipo?.kitchen_name}</option>
                )
            })}
        </select>
       </>}
       <br/>
    <button type='submit' onClick={handleSubmit}>Siguiente</button>
    </div>
    </div>
    </Container>
    </div>
  )
}

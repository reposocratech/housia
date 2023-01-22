import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AppContext } from '../../Context/AppContext';
import { useNavigate } from 'react-router-dom';



export const AddProperty2 = () => {
const [kitchen, setKitchen] = useState();
const [kitchenId, setKitchenId] = useState(1);
const {property, setProperty, user } = useContext(AppContext);
const navigate = useNavigate();


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

    const handleSubmit = (e) => {
        e.preventDefault();
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


    
    console.log(property, "PROPERTY")
  return (
    <div>
        <button onClick={()=>navigate("/addProperty")}>Volver</button>
    <h2>Añadir Propiedad</h2>
    <h3>Características de la propiedad</h3>
    <p>Estos valores son de gran importancia para el analisis automatico de rendimiento de la inversión</p>
    <form>
    <p>Superficie util</p>
    <input
    placeholder='0'
    autoComplete='off'
    type="number"
    value={property?.property_total_meters}
    name="property_total_meters"
    onChange={handleChange}
    />
    <hr/>
    <p>Superficie construida</p>
    <input
    placeholder='0'
    autoComplete='off'
    type="number"
    value={property?.property_built_meters}
    name="property_built_meters"
    onChange={handleChange}
    />
    <hr/>
    <p>Año de construccion</p>
    <input
    placeholder='0'
    autoComplete='off'
    type="number"
    min="1500"
    max="3000"
    value={property?.property_built_year}
    name="property_built_year"
    onChange={handleChange}
    />
    <hr/>
    <p>Habitaciones</p>
    <input
    placeholder='0'
    autoComplete='off'
    type="number"
    value={property?.property_rooms}
    name="property_rooms"
    onChange={handleChange}
    />
    <hr/>
    <p>Baños</p>
    <input
    placeholder='0'
    autoComplete='off'
    type="number"
    value={property?.property_bathrooms}
    name="property_bathrooms"
    onChange={handleChange}
    />
    <hr/>
    <p>Garage</p>
    <input
    placeholder='0'
    autoComplete='off'
    type="number"
    value={property?.property_garage}
    name="property_garage"
    onChange={handleChange}
    />
    <hr/>
    <p>Tipo de cocina</p>
    <select onClick={handleKitchenId}>
    {kitchen?.map((tipo, i)=>{
        return(
            <option key={i} value={tipo?.kitchen_id}  >{tipo?.kitchen_name}</option>
        )
    })}
    </select>

    <button type='submit' onClick={handleSubmit}>Siguiente</button>
    </form>
    
    </div>
  )
}

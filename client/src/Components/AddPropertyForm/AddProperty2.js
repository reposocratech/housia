import React, { useEffect, useState } from 'react';
import axios from 'axios';

const initialValue = {
    property_total_meters: "",
    property_built_meters: "",
    property_built_year: "",
    property_rooms: "",
    property_bathrooms:"",
    property_garage: ""
}

export const AddProperty2 = () => {
const [kitchen, setKitchen] = useState();
const [property, setProperty] = useState(initialValue);
const [kitchenId, setKitchenId] = useState(1);

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
            .put(`http://localhost:4000/property/addBasicFeaturesToProperty/1/${kitchenId}`, property)
            .then((res) => {
                console.log(res, "RESSSSSSSSSSSSSSSSSS")
                setProperty(res.data[0])
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const handleKitchenId = (e) => {
        setKitchenId(e.target.value);
       }


    console.log(kitchenId, "ID KITCHEN")
    console.log(property, "PROPERTY")
  return (
    <div>
    <h2>Añadir Propiedad</h2>
    <h3>Características de la propiedad</h3>
    <p>Estos valores son de gran importancia para el analisis automatico de rendimiento de la inversión</p>
    <form>
    <p>Superficie util</p>
    <input
    placeholder='0'
    autoComplete='off'
    type="number"
    value={property.property_total_meters}
    name="property_total_meters"
    onChange={handleChange}
    />
    <hr/>
    <p>Superficie construida</p>
    <input
    placeholder='0'
    autoComplete='off'
    type="number"
    value={property.property_built_meters}
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
    value={property.property_built_year}
    name="property_built_year"
    onChange={handleChange}
    />
    <hr/>
    <p>Habitaciones</p>
    <input
    placeholder='0'
    autoComplete='off'
    type="number"
    value={property.property_rooms}
    name="property_rooms"
    onChange={handleChange}
    />
    <hr/>
    <p>Baños</p>
    <input
    placeholder='0'
    autoComplete='off'
    type="number"
    value={property.property_bathrooms}
    name="property_bathrooms"
    onChange={handleChange}
    />
    <hr/>
    <p>Garage</p>
    <input
    placeholder='0'
    autoComplete='off'
    type="number"
    value={property.property_garage}
    name="property_garage"
    onChange={handleChange}
    />
    <hr/>
    <p>Tipo de cocina</p>
    <select onClick={handleKitchenId}>
    {kitchen?.map((tipo, i)=>{
        return(
            <option key={i} value={tipo.kitchen_id}  >{tipo.kitchen_name}</option>
        )
    })}
    </select>

    <button type='submit' onClick={handleSubmit}>Siguiente</button>
    </form>
    
    </div>
  )
}

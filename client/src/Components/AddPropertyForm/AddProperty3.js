import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AppContext } from '../../Context/AppContext';
import { useNavigate } from 'react-router-dom';

export const AddProperty3 = () => {
    const [province, setProvince] = useState();
    const [city, setCity] = useState();
    const [provinceId, setProvinceId] = useState(1);
    const [cityId, setCityId] = useState(1);
    const {property, setProperty } = useContext(AppContext);
    const navigate = useNavigate();
    const handleChange = (e) => {
        const {name, value} = e.target;
        setProperty({...property, [name]:value})
    }

    useEffect(() => {
        axios
        .get("http://localhost:4000/property/allProvinces")
        .then((res) => {
           setProvince(res.data)
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);

    useEffect(() => {
        axios
        .get(`http://localhost:4000/property/allCities/${provinceId}`)
        .then((res) => {
           setCity(res.data)
        })
        .catch((err) => {
            console.log(err);
        });
    }, [provinceId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
        .put(`http://localhost:4000/property/addPropertyAddress/${property?.property_id}/${provinceId}/${cityId}`, property)
        .then((res) => {
            navigate("/addProperty4")
           console.log(res, "RESSSSS")
        })
        .catch((err) => {
            console.log(err);
        });
    }
       
    const handleProvinceId = (e) => {
        setProvinceId(e.target.value);
       }

       const handleCityId = (e) => {
        setCityId(e.target.value);
       }

       console.log(property, "PROPERTY IDdddd")
    
  return (
    <div>
     <h2>Añadir Propiedad</h2>
     <h3>Direccion</h3>

<form>
     <p>Calle</p>
     <input 
      placeholder='Calle'
      autoComplete='off'
      type="text"
      value= {property?.address_street_name}
      name="address_street_name"
      onChange={handleChange}
     />
     <br/>


     <p>Numero</p>
     <input 
     placeholder='0'
     autoComplete='off'
     type="number"
     value= {property?.address_street_number}
     name="address_street_number"
     onChange={handleChange}
     />
     <br/>


     <p>Provincia</p>
     <select onClick={handleProvinceId}>
    {province?.map ((provincia, i)=>{
        return(
            <option value={provincia.province_id} key={i}>{provincia?.province_name}</option>
        )
    })}
     </select>
     <br/>


     <p>Codigo postal</p>
     <input 
     placeholder='Codigo postal'
     autoComplete='off'
     type="text"
     value= {property?.address_postal_code}
     name="address_postal_code"
     onChange={handleChange}
     />
     <br/>


     <p>Ciudad</p>
     <select onClick={handleCityId}>
     {city?.map ((ciudad, i)=>{
        return(
            <option value={ciudad.city_id} key={i}>{ciudad?.city_name}</option>
        )
    })}
    </select>
     <br/>


     <p>Bloque</p>
     <input 
     placeholder='Bloque'
     autoComplete='off'
     type="text"
     value= {property?.address_block}
     name="address_block"
     onChange={handleChange}
     />
     <br/>

     <p>Portal</p>
     <input
     placeholder='Portal'
     autoComplete='off'
     type="text"
     value= {property?.address_gate}
     name="address_gate"
     onChange={handleChange}
     />
     <br/>

     <p>Escalera</p>
     <input
     placeholder='Escalera'
     autoComplete='off'
     type="text"
     value= {property?.address_stair}
     name="address_stair"
     onChange={handleChange}
     />
     <br/>

     <p>Planta</p>
     <input
     placeholder='Planta'
     autoComplete='off'
     type="text"
     value= {property?.address_floor}
     name="address_floor"
     onChange={handleChange}
     />
     <br/>

     <p>Puerta</p>
     <input
     placeholder='Calle'
     autoComplete='off'
     type="text"
     value= {property?.address_door}
     name="address_door"
     onChange={handleChange}
     />
     <br/>
     <button onClick={handleSubmit}>Siguiente</button>
     </form>
    </div>
  )
}

import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const AddProperty3 = () => {
    const [province, setProvince] = useState();
    const [city, setCity] = useState();
    const [provinceId, setProvinceId] = useState(1);
    const handleChange = () => {

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

    const handleProvinceId = (e) => {
        setProvinceId(e.target.value);
       }
    
       console.log(provinceId, "qweqweqwewe")
       

  return (
    <div>
     <h2>Añadir Propiedad</h2>
     <h3>Direccion</h3>


     <p>Calle</p>
     <input 
      placeholder='Calle'
      autoComplete='off'
      type="text"
      value= ""
      name=""
      onChange={handleChange}
     />
     <br/>


     <p>Numero</p>
     <input 
     placeholder='0'
     autoComplete='off'
     type="number"
     value= ""
     name=""
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
     type="number"
     value= ""
     name=""
     onChange={handleChange}
     />
     <br/>


     <p>Ciudad</p>
     <select>
     {city?.map ((ciudad, i)=>{
        return(
            <option key={i}>{ciudad?.city_name}</option>
        )
    })}
    </select>
     <br/>


     <p>Bloque</p>
     <input 
     placeholder='Bloque'
     autoComplete='off'
     type="text"
     value= ""
     name=""
     onChange={handleChange}
     />
     <br/>

     <p>Portal</p>
     <input
     placeholder='Portal'
     autoComplete='off'
     type="text"
     value= ""
     name=""
     onChange={handleChange}
     />
     <br/>

     <p>Escalera</p>
     <input
     placeholder='Escalera'
     autoComplete='off'
     type="text"
     value= ""
     name=""
     onChange={handleChange}
     />
     <br/>

     <p>Planta</p>
     <input
     placeholder='Planta'
     autoComplete='off'
     type="text"
     value= ""
     name=""
     onChange={handleChange}
     />
     <br/>

     <p>Puerta</p>
     <input
     placeholder='Calle'
     autoComplete='off'
     type="text"
     value= ""
     name=""
     onChange={handleChange}
     />
     <br/>
     
    </div>
  )
}

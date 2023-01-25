import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AppContext } from '../../Context/AppContext';
import { useNavigate } from 'react-router-dom';


export const AddPropertyForm1 = () => {
    const [type, setType] = useState();
    const [subtype, setSubtype] = useState();
    const [typeId, setTypeId] = useState(1);
    const [subTypeId, setSubTypeId] = useState(1);
    const {property, setProperty, user } = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(() => {
        axios
        .get("http://localhost:4000/property/allTypes")
        .then((res) => {
            setType(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);


    useEffect(() => {
        axios
        .get(`http://localhost:4000/property/allSubTypes/${typeId}`)
        .then((res) => {
           
            setSubtype(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
    }, [type, typeId]);

const handleTypeId = (e) =>{
    setTypeId(e.target.value);
    // setTypeId(id);
}

const handleSubTypeId = (e) => {
 setSubTypeId(e.target.value);
}


const handleChange = (e) => {
    const {name, value} = e.target;
    setProperty({...property, [name]:value})
}

const handleSubmit = (e) => {
    e.preventDefault();
    axios
        .post(`http://localhost:4000/property/createProperty/${user.user_id}/${subTypeId}`,property )
        .then((res) => {
            
            setProperty(res.data[0]);
            
            navigate("/addProperty2");
        })
        .catch((err) => {
            console.log(err);
        });
}
  return (
    <div>
        <h2>¿Preparado para conocer el valor 
        de tu propiedad?</h2>
        <h3>Conoce el verdadero valor de tu vivienda
        mediante AI</h3>
        <p>Elije un nombre para tu propiedad</p>
        <form>

        <input
       placeholder='Nombra la propiedad'
       autoComplete='off'
       value={property?.property_name}
       name="property_name"
       onChange={handleChange}
        ></input>
        <hr/>

        <p>Tipo</p>
        <div>
            
        {/* {type?.map((tipo, i) => {
                return(
                   
                    <button onClick={()=>handleTypeId(tipo.type_id)} key={i}>{tipo.type_name}</button>
                    
                )
            })} */}
         <select onClick={handleTypeId}>
            {type?.map((tipo, i) => {
                return(
                    <option key={i}  value={tipo.type_id}>{tipo.type_name}</option>
                )
            })}
        </select> 

        </div>
        <div>
        <p>Tipo de inmueble</p>
        <select onClick={handleSubTypeId}>
        
         {subtype?.map((subtipo, i) => {
                return(
                   
                    <option key={i} value={subtipo.subtype_id} >{subtipo?.subtype_name}</option>
                    
                )
            })}  
        </select>
        </div>
        <hr/>
        <button type='submit' onClick={handleSubmit}>Añadir propiedad</button>
        </form>
    </div>
  )
}
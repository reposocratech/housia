import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AppContext } from '../../Context/AppContext';
import { useNavigate } from 'react-router-dom';
import { localStorageUser } from '../../Utils/localStorage/localStorageUser';
import jwtDecode from 'jwt-decode';

const initialValue = {
    property_name: "",
    type_id: "",
    subtype_id: ""
}

export const AddPropertyForm1 = () => {
    const [type, setType] = useState();
    const [subtype, setSubtype] = useState();

    
    const [message, setMessage] = useState("");

    const [newPropertyData, setNewPropertyData] = useState(initialValue);

    const { property, setProperty, user, typeId, setTypeId, subTypeId, setSubTypeId } = useContext(AppContext);


    const navigate = useNavigate();

    console.log(typeId, 'type id');
    console.log(subTypeId, 'subtype id');

    useEffect(() => {
        setProperty("");
    }, [])
    
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
}

const handleSubTypeId = (e) => {
 setSubTypeId(e.target.value);
}


const handleChange = (e) => {
    const {name, value} = e.target;
    // setProperty({...property, [name]:value});
    setNewPropertyData({...newPropertyData, [name]:value});
    setMessage("");

}

const handleSubmit = (e) => {
    e.preventDefault();

    if(!newPropertyData.property_name){
        setMessage("Introduce un nombre para tu propiedad");
    } else {
        axios
        .post(`http://localhost:4000/property/createProperty/${user.user_id}/${subTypeId}`,property )
        .then((res) => {
            setProperty(res.data.resultProperty[0]);
            // console.log(res.data.resultProperty[0]);
            navigate("/addProperty2");
        })
        .catch((err) => {
            console.log(err);
        });
    }


   /* const token = localStorageUser();
    if(token) {
        let user_id = jwtDecode(token).user.id;
        
        axios
            .post(`http://localhost:4000/property/createProperty/${user_id}/${subTypeId}`,property )
            .then((res) => {
                
                setProperty(res.data[0]);
                
                navigate("/addProperty2");
            })
            .catch((err) => {
                console.log(err);
            });
    }
  */

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
       value={newPropertyData?.property_name}
       name="property_name"
       onChange={handleChange}
        ></input>
        <div style={{ color: "red" }}>{message}</div>
        <hr/>

        <p>Tipo</p>
        <div>

         <select onChange={handleTypeId}>
            {type?.map((tipo, i) => {
                return(
                    <option key={i}  value={tipo.type_id}>{tipo.type_name}</option>
                )
            })}
        </select> 

        </div>
        <div>
        <p>Tipo de inmueble</p>
        <select onChange={handleSubTypeId}>
        
         {subtype?.map((subtipo, i) => {
                return(
                    <option key={i} value={subtipo.subtype_id} >{subtipo?.subtype_name}</option>
                )
            })}  
        </select>
        </div>
        <hr/>
        <button 
            type='submit' 
            onClick={handleSubmit}
            >Añadir propiedad</button>
        </form>
    </div>
   
    
    
  )
}
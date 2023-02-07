import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AppContext } from '../../Context/AppContext';
import { useNavigate } from 'react-router-dom';
import { Container} from 'react-bootstrap';
import "./AddProperty1.scss";

const initialValue = {
    property_name: "",
    type_id: "",
    subtype_id: ""
}

export const AddPropertyForm1 = () => {
    const [type, setType] = useState();
    const [subtype, setSubtype] = useState();

    
    const [message, setMessage] = useState("");
    const [message2, setMessage2] = useState("");

    const [newPropertyData, setNewPropertyData] = useState(initialValue);

    const { setProperty, user, typeId, setTypeId, subTypeId, setSubTypeId } = useContext(AppContext);


    const navigate = useNavigate();

    /* console.log(typeId, 'type id');
    console.log(subTypeId, 'subtype id'); */

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
            setMessage('');
            setMessage2('');
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

    if(!newPropertyData.property_name) {
        setMessage("Introduce un nombre para tu propiedad");
        setMessage2("");
    } else if( typeId === -1 || subTypeId === -1) {
        setMessage2("Elige un tipo de propiedad");
        setMessage("");
    } 
    else {
        axios
        .post(`http://localhost:4000/property/createProperty/${user.user_id}/${subTypeId}`,newPropertyData )
        .then((res) => {
            setProperty(res.data.resultProperty[0]);
            // console.log(res.data.resultProperty[0]);
            navigate("/addProperty2", {replace:true});
        })
        .catch((err) => {
            console.log(err);
        });
    }

}
  return (

    <Container fluid className='fondoAdd1 pb-3'>
        <div className='row '>
           <div className='col-12 col-lg-12 col-xl-12 col-xxl-6 padreAdd1'>
                <div className='alturaCont'>
        <span>1/5</span>
        </div>
        <h2>¿Preparado para conocer el valor 
        de tu propiedad?</h2>
        <h3>Conoce el verdadero valor de tu vivienda
        mediante AI</h3>
        <div className='displayresAdd1'>
        <p>Elije un nombre para tu propiedad</p>
        
        
        <input
       placeholder='Nombra la propiedad'
       autoComplete='off'
       value={newPropertyData?.property_name}
       name="property_name"
       onChange={handleChange}
        ></input>
        <div style={{ color: "red" }}>{message}</div>
        <br/>

        <p>Tipo</p>
        <div>

         <select onChange={handleTypeId}>
            <option value={-1}>
                Seleccionar
            </option>
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
        <option value={-1}>
                Seleccionar
            </option>
         {subtype?.map((subtipo, i) => {
                return(
                    <option key={i} value={subtipo.subtype_id} >{subtipo?.subtype_name}</option>
                )
            })}  
        </select>
        </div>
        </div>
        <div style={{ color: "white" }}>{message2}</div>
        <br/>
        </div>
        
        <div className='col-6 padre2Add1 '>
        
         <img src='./images/user/Captura2.png' alt="ForSale.png" />
         <br/>
        <button 
            type='submit' 
            onClick={handleSubmit}
            >Añadir propiedad</button>
         </div>
         </div>
    </Container>
  )
}
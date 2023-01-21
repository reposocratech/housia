import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import {Button, ButtonGroup} from "react-bootstrap";
import { AppContext } from '../../Context/AppContext';
import "./styles/stylesAddProperty4.css"

export const AddProperty4 = () => {
const [featureAll, setFeatureAll] = useState();
const [features, setFeatures] = useState([]);
const [click, setClick] = useState(false);
const {property } = useContext(AppContext);
const [selected, setSelected] = useState();

const selecionado = (e) => {
    setSelected(e.target.value);
}


    useEffect(() => {
        axios
        .get(`http://localhost:4000/property/allFeatures`)
        .then((res) => {
            setFeatureAll(res.data);
           
        })
        .catch((err) => {
            console.log(err);
        });
    }, [])

    const handleAC = (e) => {
        
        // selecionado();
        if(features.includes(e.target.value) === false){
            setFeatures([...features, e.target.value]);
            
        }
        else if(features.includes(e.target.value)){
            setFeatures(features.filter(elem => elem !== e.target.value ));
            
        }

    }

    const handleSubmit = () => {
        console.log(features, "FFFFFFFFFF")
        axios
        .post(`http://localhost:4000/property/addFeaturesToProperty/${property?.property_id}`, features)
        .then((res) => {
            console.log(res)
           
        })
        .catch((err) => {
            console.log(err);
        });
    }

 /*    const onSubmit = (e) => {
        e.preventDefault();
      setFeatures(e.target.value)
    } */
    console.log(property, "PROPERTY")
    console.log(features, "eqqwwe")
 
  return (
    <div>
    <h2>Añadir propiedad</h2>
    <h2>Seleccionar caracteristicas</h2>
{/* <input onClick={handleAC}  value={feature.feature_id} placeholder="" type="checkbox" /> */}
    {featureAll?.map((feature, i)=>{
        return(
            
            
            <Button  onClick={handleAC} key={i} /* variant={features.includes(feature.feature_id) ? "dark" : "outline-dark"} */ value={feature.feature_id} >{feature.feature_name}</Button>
            
            
        )
    })}
        <div className='padre_de_los_checkbox'>
            
        { featureAll?.map((feature, i)=>{
            return(
                 <div key={i} className='checkbox-container'>
            <input type="checkbox" 
            classname="checkbox" 
            id={`checkbox-${feature.feature_name}`} 
            onClick={handleAC} 
            value={feature.feature_id} 
            />

            <label 
            for={`checkbox-${feature.feature_name}`} className="label">{feature.feature_name}
            </label>
            
          </div> 
            )

         
        })}

    </div>

    <button onClick={handleSubmit}>Siguiente</button>



    {/* <form>
    {feature?.map((feature, i)=>{
        return(
            
            <input   value={feature.feature_id} placeholder="" type="checkbox" />
            
            
        )
    })}
    <button type='submit' onClick={onSubmit} >Siguiente</button>
    </form> */}
    
    
    </div>
  )
}

import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import {Button, Container} from "react-bootstrap";
import { AppContext } from '../../Context/AppContext';

import {useNavigate} from 'react-router-dom';
import "./styles/stylesAddProperty4.css"


export const AddProperty4 = () => {

    const navigate = useNavigate();

    const [featureAll, setFeatureAll] = useState();
    const [features, setFeatures] = useState([]);
    const {property } = useContext(AppContext);
    const [isSelected, setIsSelected] = useState(true)


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

        if(features.includes(e.target.value) === false){
            setFeatures([...features, e.target.value]);
            setIsSelected(true)
        }
        else if(features.includes(e.target.value)){
            setFeatures(features.filter(elem => elem !== e.target.value ));
            setIsSelected(false);
        }
    }

    const handleSubmit = () => {
        axios
        .post(`http://localhost:4000/property/addFeaturesToProperty/${property?.property_id}`, features)
        .then((res) => {
            console.log(res)
            navigate('/addPropertyImage')
        })
        .catch((err) => {
            console.log(err);
        });
    }

 console.log(features, "features")
 
  return (
    <Container>
    <h2 className='text-center'>Añadir propiedad</h2>
    <h4>Seleccionar caracteristicas</h4>
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
                    <input 
                        type="checkbox" 
                        classname="checkbox" 
                        id={`checkbox-${feature.feature_name}`} 
                        onClick={handleAC} 
                        value={feature.feature_id} 
                    />

                    <label 
                        for={`checkbox-${feature.feature_name}`} 
                        className="label">{feature.feature_name}
                    </label>
                </div> 
        )})}

    </div>

    <button onClick={handleSubmit}>Siguiente</button>


            {/* <Form.Group className='d-flex'>
                <Form.Check onClick={handleAC} key={i} value={feature.feature_id}/>
                <Form.Label>{feature.feature_name}</Form.Label>
            </Form.Group> */}
            


    {/* <form>
    {feature?.map((feature, i)=>{
        return(
            
            <input   value={feature.feature_id} placeholder="" type="checkbox" />
            
            
        )
    })}
    <button type='submit' onClick={onSubmit} >Siguiente</button>
    </form> */}
    
    
    </Container>
  )
}

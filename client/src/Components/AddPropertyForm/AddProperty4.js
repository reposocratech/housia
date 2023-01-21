import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import {Button, Container} from "react-bootstrap";
import { AppContext } from '../../Context/AppContext';
import {useNavigate} from 'react-router-dom';

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
        {/* <input onClick={handleAC} key={i} value={feature.feature_id}/> */}
    <div>
        {featureAll?.map((feature, i)=>{
            return(
                <Button active={isSelected} variant='outline-dark' onClick={handleAC} key={i} value={feature.feature_id}>{feature.feature_name}</Button>
                )
            })}
    </div>
    <Button size='lg' onClick={handleSubmit}>Siguiente</Button>

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

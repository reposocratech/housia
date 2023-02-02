import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import {Button} from "react-bootstrap";
import { AppContext } from '../../Context/AppContext';
import {useNavigate} from 'react-router-dom';

import "./AddProperty4.scss";
import "./styles/stylesAddProperty4.css"


export const AddProperty4 = () => {

    const navigate = useNavigate();

    const [featureAll, setFeatureAll] = useState();
    const [features, setFeatures] = useState([]);
    const {property } = useContext(AppContext);
    const [isSelected ,setIsSelected] = useState(true)


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
            /* console.log(res) */
            navigate('/addPropertyImage')
        })
        .catch((err) => {
            console.log(err);
        });
    }

 /* console.log(features, "features") */
 
  return (
    <div className='PadreAdd4'>
    <div className='TituloAdd4'>
    <h2 className='text-center'>Añadir propiedad</h2>
    </div>
    <div className='alturaCont4'>
        <span>4/5</span>
        </div>
  
    <h4>Seleccionar caracteristicas</h4>

    <div className='padre_de_los_checkbox divAdd4'>
            
        { featureAll?.map((feature, i)=>{
            return(
                 <div key={i} className='checkbox-container'>
                    <input 
                        type="checkbox" 
                        className="checkbox" 
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
        <div className='displayBro'>
    <Button 
        variant='info' 
        size='lg' 
        onClick={handleSubmit}>Siguiente</Button>
        </div>
    </div>
  )
}

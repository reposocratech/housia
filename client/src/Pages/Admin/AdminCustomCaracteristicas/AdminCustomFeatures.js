import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../Context/AppContext';

export const AdminCustomFeatures = () => {

    const {resetUser, setResetUser} = useContext(AppContext)
    const [showKitchen, setShowKitchen] = useState(true);
    const [showHousesType, setShowHousesType] = useState(false);
    const [showHousesSubtype, setShowHousesSubtype] = useState(false);
    const [showFeatures, setShowFeatures] = useState(false)


    const [featuresDB, setFeaturesDB] = useState();
    const [typesDb, setTypesDb] = useState();
    const [subTypesDB, setSubTypesDB] = useState();
    const [kitchenDB, setKitchenDB] = useState();

    useEffect(() => {
        axios
        .get(`http://localhost:4000/property/allFeatures`)
        .then((res) => {
            setFeaturesDB(res.data);
            
           
        })
        .catch((err) => {
            console.log(err);
        });

        axios
        .get(`http://localhost:4000/admin/getPropertyTypes`)
        
        .then((res)=>{
            // console.log(res.data, "res de los tipos")
            setTypesDb(res.data);

        })
        .catch((error)=>{
            console.log(error, "error en tipos")
        })

        axios
        .get(`http://localhost:4000/admin/getPropertySubTypes/subtype_type_id`)
        .then((res)=>{
            // console.log(res.data, " res de los subtipos");
            setSubTypesDB(res.data);
        })
        .catch((error)=>{
            console.log(error, "error en subtipos");
        })

        axios
        .get(`http://localhost:4000/admin/getKitchenTypes`)
        .then((res)=>{
            // console.log(res.data, "respuesta kitchen")
            setKitchenDB(res.data)
        })
        .catch((error)=>{
            console.log(error, "error en cocina")
        });


    }, [resetUser]);

        
    


    const clickOption = (n) =>{
        // if(n === 1){
        //     setShowHousesSubtype(false);
        // setShowFeatures(false);
        // setShowHousesType(false);
        // setShowKitchen(true);
        // }
        switch (n){
            case 1:
                setShowHousesSubtype(false);
                setShowFeatures(false);
                setShowHousesType(false);
                setShowKitchen(true);
            break;

            case 2:
                setShowHousesSubtype(false);
                setShowFeatures(false);
                setShowHousesType(true);
                setShowKitchen(false);
            break;

            case 3:
                setShowHousesSubtype(false);
                setShowFeatures(true);
                setShowHousesType(false);
                setShowKitchen(false);
            break;

            case 4:
                setShowHousesSubtype(true);
                setShowFeatures(false);
                setShowHousesType(false);
                setShowKitchen(false);
            break;
        }
        
    }

  return (
    <div>
        <h1>Campo de  control//edicion de las caracteristicas de los activos</h1>

        <div className='botonera-opciones'>
            <button onClick={()=>clickOption(3)}>Caracteristicas // Features</button>
            <button onClick={()=>clickOption(2)}> Tipos Activo</button>
            <button onClick={()=>clickOption(4)}> Subtipos Activos</button>
            <button onClick={()=>clickOption(1)}> Clases de cocinas</button>
        </div>


        {showKitchen && 
        <div>
            
            <button>añadir nueva cocina</button>
           {kitchenDB?.map((elem, index)=>{
            return(
               <div key={index}>
                    <span>{elem.kitchen_name}---</span>
                    <button>borrar cocina</button>

                </div> 
            )
        })}
        </div>
        }
    
        {showHousesType &&
        <div>
            
            <button>añadir nuevo tipo</button>
            { typesDb?.map((elem, index)=>{
                return(
                    <div key={index}>
                        <span>{elem.type_name} -- {elem.type_id} --</span><button>borrar tipo</button>
                    </div>
                )
            })
        }
        </div>
        }

        {showFeatures  && 
            <div> 
                <button>añadir nueva caracteristica</button>
                {
            featuresDB?.map((elem, index)=>{
                return(
                    <div key={index}>
                        <span>{elem.feature_name}--</span>
                        <button>borrar caracteristica</button>
                    </div>
                    
                )
            })}
            </div>
        }

        {showHousesSubtype && 
        <div> 
             <button>añadir nuevo subtipo</button>
            {
        subTypesDB?.map((elem, index)=>{
            return(
                <div key={index}>
                    <span>{elem.subtype_name} -- 
                    {elem.subtype_type_id}--</span>
                    <button>borrar subtipo</button>
                </div>
            )
        })}
        </div>
        }
        
        



    </div>
  )
}

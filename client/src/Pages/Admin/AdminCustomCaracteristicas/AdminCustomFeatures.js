import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../Context/AppContext';
import './adminCustomFeatures.scss';

const initialValue = {
    type_id: "",
    subtype_name: ""
}
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

    const [show, setShow] = useState(false);
    const [message1, setMessage1] = useState("");
    const [message2, setMessage2] = useState("");
    const [message3, setMessage3] = useState("");
    const [message4, setMessage4] = useState("");
    
    const [kitchenType, setKitchenType] = useState("");
    const [features, setFeatures] = useState("");
    const [propertyType, setPropertyType] = useState("");
    const [propertySubType, setPropertySubType] = useState(initialValue);



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

    const handleChangeFeatures = (e) => {
        setFeatures({...features, feature_name:e.target.value})
        setMessage1("");

    }
    const handleChangePropertyType = (e) => {
        setPropertyType({...propertyType, type_name:e.target.value})
        setMessage2("");
    }
    
    const handleSelectSubtype = (e) => {
        let {name, value} = e.target;
        setPropertySubType({...propertySubType, [name]:value})
        setMessage3("");
    }

    const handleChangeKitchen = (e) => {
        setKitchenType({...kitchenType, kitchen_name:e.target.value})
        setMessage4("");
    }
   

    const createFeatures = () => {
        if(!features.feature_name){
            setMessage1('Campo vacío');
        } else {
            axios
            .post('http://localhost:4000/admin/createPropertyFeatures', features)
            .then((res) => {
                console.log(res.data);
                setResetUser(!resetUser);
                setFeatures("");
                setMessage1("");
                document.getElementById('input-a-borrar-features').value = "";
            })
            .catch((err) => {
                console.log(err, 'error del create features');
            })
        }   
    }
    
    const createPropertyType = () => {
        if(!propertyType.type_name){
            setMessage2("Campo vacío");
        }else{
            axios
            .post('http://localhost:4000/admin/createPropertyType', propertyType)
            .then((res) => {
                console.log(res.data);
                setResetUser(!resetUser);
                setPropertyType("");
                setMessage2("");
                document.getElementById('input-a-borrar-tipo').value = "";
            })
            .catch((err) => {
                console.log(err, 'error del create type');
            })
        }
       
    }
    
    const createPropertySubtype = () => {
        if(!propertySubType.subtype_name) {
            setMessage3("Campo vacío");
        } else{
            let type_id = propertySubType.type_id;
            axios
            .post(`http://localhost:4000/admin/createPropertySubType/${type_id}`, propertySubType)
            .then((res) => {
                console.log(res.data);
                setResetUser(!resetUser);
                setPropertySubType("");
                setMessage3 ("");
                document.getElementById('input-a-borrar-subtipo').value = "";
            })
            .catch((err) => {
                console.log(err, 'error del create subtype');
            })
        }
        
    }
    const createKitchenType = () => {
        if(!kitchenType.kitchen_name){
            setMessage4('Campo vacío');
        } else{
            axios
            .post('http://localhost:4000/admin/createKitchenType', kitchenType)
            .then((res) => {
                console.log(res.data);
                setResetUser(!resetUser);
                setKitchenType("");
                setMessage4("");
                document.getElementById('input-a-borrar-cocina').value = "";
            })
            .catch((err) => {
                console.log(err, 'error del create kitchen');
            })
        }
    }
    

    const deleteFeature = (feature_id) => {
        axios
        .delete(`http://localhost:4000/admin/deletePropertyFeature/${feature_id}`)
        .then((res) => {
            console.log(res.data, 'respuesta del delete feature');
            setResetUser(!resetUser);
        })
        .catch((err) => {
            console.log(err, 'error del delete feature');
        })
    }
    const deletePropertyType = (property_id) => {
        axios
        .delete(`http://localhost:4000/admin/deletePropertyType/${property_id}`)
        .then((res) => {
            console.log(res.data, 'respuesta del delete type');
            setResetUser(!resetUser);
        })
        .catch((err) => {
            console.log(err, 'error del delete type');
        })
    }
    const deletePropertySubType = (subtype_id) => {
        axios
        .delete(`http://localhost:4000/admin/deletePropertySubType/${subtype_id}`)
        .then((res) => {
            console.log(res.data, 'respuesta del delete subtype');
            setResetUser(!resetUser);
        })
        .catch((err) => {
            console.log(err, 'error del delete subtype');
        })
    }

    const deleteKitchenType = (kitchen_id) => {
        axios
        .delete(`http://localhost:4000/admin/deleteKitchenType/${kitchen_id}`)
        .then((res) => {
            console.log(res.data, 'respuesta del delete');
            setResetUser(!resetUser);
        })
        .catch((err) => {
            console.log(err, 'error del delete kitchen');
        })
    }

    

    const clickOption = (n) =>{
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
    <div className='features-container'>
        <h1>Edición de características</h1>

        <div className='botonera-opciones'>
            <button onClick={()=>clickOption(3)}
                    className={showFeatures && "gray"}> Características</button>
            <button onClick={()=>clickOption(2)}
                    className={showHousesType && "gray"}> Tipos</button>
            <button onClick={()=>clickOption(4)}
                    className={showHousesSubtype && "gray"}> Subtipos</button>
            <button onClick={()=>clickOption(1)}
                    className={showKitchen && "gray"}> Cocina</button>
        </div>


        {showKitchen && 
        <div className='editar-opciones-container'>
            <div className='añadir-opcion'>
                <span class="material-symbols-outlined" onClick={()=>setShow(!show)}>
                add_circle  
                </span>            
                {show && 
                <>
                <input
                id='input-a-borrar-cocina'
                type='text'
                placeholder='Tipo de cocina'
                name='kitchen_name'
                value={kitchenType.kitchen_name}
                onChange={handleChangeKitchen}
                />
                <button onClick={createKitchenType}>Añadir</button>
                <p className='m-0'>{message4}</p>
                </>
                }
            </div>
            
           {kitchenDB?.map((elem, index)=>{
            return(
               <div className='container-mapeo' key={index}>
                    <span className='p-1'>{elem.kitchen_name}</span>
                    <span className={elem.kitchen_id === 1 ? 'esconder material-symbols-outlined icono' : 'material-symbols-outlined icono'} onClick={()=> deleteKitchenType(elem.kitchen_id)}>
                    delete
                    </span>         
                </div> 
            )
            })}
        </div>
        }
    
        {showHousesType &&
        <div className='editar-opciones-container'>
            <div className='añadir-opcion'>
                <span class="material-symbols-outlined" onClick={()=>setShow(!show)}>
                add_circle  
                </span>  
                {show && 
                <>
                <input
                id='input-a-borrar-tipo'
                type='text'
                placeholder='Tipo de propiedad'
                name='type_name'
                value={propertyType.type_name}
                onChange={handleChangePropertyType}
                />
                <button onClick={createPropertyType}>Añadir</button>
                <p className='m-0'>{message2}</p>            
                </>
                }
            </div>
            { typesDb?.map((elem, index)=>{
                return(
                    <div className='container-mapeo' key={index}>
                        <span>{elem.type_name}</span>
                        {/* <span onClick={()=> deletePropertyType(elem.type_id)} class="material-symbols-outlined icono">
                        delete
                        </span> */}
                        <span className={elem.type_id <=4 ? 'esconder material-symbols-outlined icono' : 'material-symbols-outlined icono'} onClick={()=> deletePropertyType(elem.type_id)}>
                    delete
                    </span> 
                    </div>
                )
            })
            }
        </div>
        }

        {showFeatures  && 
            <div className='editar-opciones-container'> 
                <div className='añadir-opcion'>
                <span class="material-symbols-outlined" onClick={()=>setShow(!show)}>
                add_circle  
                </span> 
           
                {show && 
                <>
                <input
                id='input-a-borrar-features'
                type='text'
                placeholder='Caracterícticas'
                name='feature_name'
                value={features.feature_name}
                onChange={handleChangeFeatures}
                />
                <button onClick={createFeatures}>Añadir</button>
                <p className='m-0'>{message1}</p>   
                </>
                }
            </div>
            
                {
            featuresDB?.map((elem, index)=>{
                return(
                    <div className='container-mapeo' key={index}>
                        <span>{elem.feature_name} </span>
                        <span onClick={()=> deleteFeature(elem.feature_id)} class="material-symbols-outlined icono">
                        delete
                        </span>
                    </div>
                    
                )
            })}
            </div>
        }

        {showHousesSubtype && 
       <div className='editar-opciones-container'> 
            <div className='añadir-opcion'>
                <span class="material-symbols-outlined" onClick={()=>setShow(!show)}>
                add_circle  
                </span> 
                {show && 
                <>
                <select className='select-subtype' name='type_id' onChange={handleSelectSubtype}>
                <option>Tipo</option>
                     {typesDb.map((type, index) =>{
                        return(
                            <option value={type.type_id}>{type.type_name}</option>
                        )
                     })}

                </select>
                <input
                id='input-a-borrar-subtipo'
                type='text'
                placeholder='Subtipo'
                name='subtype_name'
                value={propertySubType.subtype_name}
                onChange={handleSelectSubtype}
                />
                <button onClick={createPropertySubtype}>Añadir</button> 
                <p className='m-0'>{message3}</p>              
                </>          
                }
            </div>

            {
        subTypesDB?.map((elem, index)=>{
            return(
                <div className='container-mapeo' key={index}>
                    <span>Tipo {elem.subtype_type_id} /  {elem.subtype_name}
                    </span>
                    <span class="material-symbols-outlined icono" onClick={() =>deletePropertySubType(elem.subtype_id)}>
                        delete
                    </span>
                </div>
            )
        })}
        </div>
        }

    </div>
  )
}

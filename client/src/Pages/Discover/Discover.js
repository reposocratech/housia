import React, { useContext, useEffect, useState } from 'react';
import axios from "axios";

import './Discover.scss';
import { Col, Container, Form, InputGroup,  Modal, Row } from 'react-bootstrap';
import jwtDecode from 'jwt-decode';
import { localStorageUser } from '../../Utils/localStorage/localStorageUser';





export const Discover = () => {

    //ESTADOS DE MANIPULACION U OBTENCION DE DATOS
    const [discover, setDiscover] = useState([]);
    const [typeInDB, setTypeInDB] = useState([]);
    const [subTypeInDB, setSubTypeInDB] = useState([]);
    const [kitchenInDB, setKitchenInDB] = useState([]);
    const [showSubtype, setShowSubtype] = useState(false)
    const [provinceInDb, setProvinceInDb] = useState([]);
    const [cityInDb, setCityInDb] = useState([]);
    const [showCities, setShowCities] = useState(false);
    const [featuresInDB, setFeaturesInDB] = useState([]);
    const [showFeatures, setShowFeatures] = useState(false);
    const [propertiesWithFeatures, setPropertiesWithFeatures] = useState([]);
    const [featuresSelected, setFeaturesSelected] = useState([]);
    const [propertiesWithFeaturesSelect, setPropertiesWithFeaturesSelect] = useState([]);
    const [favOption, setFavOption] = useState(false)
    const [favInDB, setFavInDB] = useState([])
    const [userId, setUserId] = useState()
    const [smShow, setSmShow] = useState(false)


    ///////////token para comprobar si el usuario es
    //estados de filtros
    //PRECIO
    const [priceFilterMin, setPriceFilterMin] = useState(0);
    const [priceFilterMax, setPriceFilterMax] = useState(999999999)
    // METROS TOTALES
    const [totalMetersFilterMin, setTotalMetersFilterMin] = useState(0)
    const [totalMetersFilterMax, setTotalMetersFilterMax] = useState(999999999)
    //METROS CONSTRUIDOS
    const [builtMetersFilterMin, setBuiltMetersFilterMin] = useState(0);
    const [builtMetersFilterMax, setBuiltMetersFilterMax] = useState(999999999)
    //HABITACIONES
    const [filterRooms, setFilterRooms] = useState(0);
    //BAÑOS
    const [filterBaths, setFilterBaths] = useState(0);
    //GARAJES
    const [filterGarage, setFilterGarage] = useState(0);
    //TIPOS DE ACTIVOS
    const [filterType, setFilterType] = useState(-1);
    //SUBTIPOS DE ACTIVOS
    const [filterSubtype, setFilterSubtype] = useState(-1);
    //TIPOS DE COCINA
    const [filterKitchen, setFilterKitchen] = useState(-1);
    //Province
    const [filterProvince, setFilterProvince] = useState(-1);
    //Ciudades
    const [filterCity, setFilterCity] = useState(-1);
    //NUEVO O USADO
    const [filterIsNew, setFilterIsNew] = useState(-1);

   
    useEffect(() => {
        
        
        const token = localStorageUser();
        if(token){

            let userId = jwtDecode(token).user.id;

            setUserId(userId)
            axios
            .get(`http://localhost:4000/users/getFavs/${userId}`)
            .then((res)=>{
                setFavInDB(res.data.result)
            })
            .catch((error)=>{
                console.log(error)
            })

            setFavOption(true)
        } else {
            setFavOption(false)
        }


        
        //Activos en venta
        axios
        .get(`http://localhost:4000/property/discover`)


        // .get(`http://localhost:4000/property/discover`) esta a acabar siendo la buena


        .then((res) => {

            setDiscover(res.data);
            
           
        })
        .catch((err) => {
            console.log(err);
        });

        //los tipos de activos
        axios
        .get('http://localhost:4000/property/allTypes')
        .then((resType)=>{
            setTypeInDB(resType.data);
            
        })
        .catch((error)=>{
            console.log(error)
        });

        //los tipos de cocina
        axios
        .get('http://localhost:4000/property/allKitchens')
        .then((resKitchen)=>{
            setKitchenInDB(resKitchen.data)
        })
        .catch((error)=>{
            console.log(error)
        })

        //las provincias
        axios
        .get('http://localhost:4000/property/allProvinces')
        .then((resP)=>{
            setProvinceInDb(resP.data)
        })
         .catch((error)=>{
            console.log(error)
        })

        //los features
        axios
        .get('http://localhost:4000/property/allFeatures')
        .then((resFeatures)=>{
            setFeaturesInDB(resFeatures.data)
        })
        .catch((error)=>{
            console.log(error)
        })


    }, [])



        const addToFavs = (property_id) =>{
            console.log(property_id, "PROPERTY ID");
            console.log(favInDB);
            if(favInDB.length === 0){
                axios
                .post(`http://localhost:4000/users/postFav/${userId}/${property_id}`)
                .then((res)=>{
                console.log(res);
                })
                .catch((error)=>{
                console.log(error)
                })
            } else{

                   let flag= favInDB.filter(elem => Number(elem.property_id) === property_id);
                    
                if(flag.length !== favInDB.length){
                    setSmShow(true)
                } else {
                    axios
                    .post(`http://localhost:4000/users/postFav/${userId}/${property_id}`)
                    .then((res)=>{
                    console.log(res);
                    })
                    .catch((error)=>{
                    console.log(error)
                    })
                 }

            }

        }


    const cleanFilters = () =>{
        handleBothFilterBuiltMeters(0);
        handleBothFilterPrice(0);
        handleBothFilterTotalMeters(0);
        handleNumOfRooms(0);
        handleNumOfBath(0);
        handleNumOfGarage(0);
        setSubTypeInDB([]);
        setShowSubtype(false);
        setFilterKitchen(-1);
        setFilterType(-1);
        setFilterSubtype(-1);
        setFilterProvince(-1);
        setShowCities(false)
        setFilterCity(-1);
        setCityInDb([])
        setShowFeatures(false);
        setPropertiesWithFeatures([])
        setFeaturesSelected([])
        setFilterIsNew(-1);
        setPropertiesWithFeaturesSelect([])
    }

    const handleIsNew = (seleccion) =>{
        setFilterIsNew(seleccion);
    } 

    const handleNumOfGarage = (NumOfGarage)=>{
        setFilterGarage(NumOfGarage)

    }

    const handleNumOfRooms = (NumOfRooms)=>{
        setFilterRooms(NumOfRooms);
        
    }
    const handleNumOfBath = (NumOfBaths)=>{
        setFilterBaths(NumOfBaths)
    }
    
    const handleBothFilterPrice =(option)=>{
        switch(option){
            case 0:
                setPriceFilterMin(0);
                setPriceFilterMax(999999999);
                break;
            case 1:
                setPriceFilterMin(100000);
                setPriceFilterMax(300000);
                break;
            case 2:
                setPriceFilterMin(300000);
                setPriceFilterMax(500000);
                break;
            case 3:
                setPriceFilterMin(500000);
                setPriceFilterMax(999999999);
                break;

        }
    }

    const handleBothFilterTotalMeters =(option)=>{
        switch(option){
            case 0:
                setTotalMetersFilterMin(0);
                setTotalMetersFilterMax(999999999);
                break;
            case 1:
                setTotalMetersFilterMin(100);
                setTotalMetersFilterMax(300);
                break;
            case 2:
                setTotalMetersFilterMin(300);
                setTotalMetersFilterMax(1000);
                break;
            case 3:
                setTotalMetersFilterMin(1001);
                setTotalMetersFilterMax(999999999);
                break;

        }
    }

    const handleBothFilterBuiltMeters =(option)=>{
        switch(option){
            case 0:
                setBuiltMetersFilterMin(0);
                setBuiltMetersFilterMax(999999999);
                break;
            case 1:
                setBuiltMetersFilterMin(30);
                setBuiltMetersFilterMax(100);
                break;
            case 2:
                setBuiltMetersFilterMin(100);
                setBuiltMetersFilterMax(300);
                break;
            case 3:
                setBuiltMetersFilterMin(301);
                setBuiltMetersFilterMax(999999999);
                break;

        }
    }

    const selectTypeIdFilter =(e)=>{
        console.log(e.target.value, "evento de type");
        if(Number(e.target.value) === -1){
            setSubTypeInDB([])
            setShowSubtype(false)
            setFilterType(-1)
            setFilterSubtype(-1)
        } else{
            axios
        .get(`http://localhost:4000/property/allSubTypes/${e.target.value}`)

        .then((resSubType)=>{
            setSubTypeInDB(resSubType.data);
        })

        .catch((errorSubtype)=>{
            console.log(errorSubtype)
        })
        setShowSubtype(true)
        setFilterType(e.target.value)
        }
    }

    const selectSubtypeIdFilter =(e)=>{
        if(Number(e.target.value) === -1){
            setFilterSubtype(-1)
        } else {
            setFilterType(e.target.value)
        }

    }
    
    const SelectKitchenFilter =(e)=>{
        if(Number(e.target.value) === -1){
            setFilterKitchen(-1)
        } else {
            console.log(e.target.value, "VALUE COCINA")
            setFilterKitchen(e.target.value)
        }
    }

    const selectProvinceIdFilter =(e)=>{
        if(Number(e.target.value) === -1){
            setFilterProvince(-1)
            setCityInDb([])
            setShowCities(false)
            setFilterCity(-1)
            
        } else {

        axios
            .get(`http://localhost:4000/property/allCities/${e.target.value}`)
            .then((resCity)=>{
                setCityInDb(resCity.data)
            })
            .catch((error)=>{
                console.log(error)
            })
            setShowCities(true);
            setFilterProvince(e.target.value)
        }
    }

    const selectCityFilter =(e)=>{
        if(Number(e.target.value) === -1){
            setFilterCity(-1)
        } else {
            setFilterCity(e.target.value)
        }

    }

    const openFeaturesDisplay =()=>{
        if(showFeatures === false){
            setShowFeatures(true);

            axios
            .get('http://localhost:4000/property/discover/allpropertywithfeature')
            .then((result)=>{
                setPropertiesWithFeatures(result.data)
            })
            .catch((error)=>{
                console.log(error)
            })
        } else {
            setShowFeatures(false);
            setPropertiesWithFeatures([])
        }
    }

    const handleFeaturesSelected =(featureId)=>{
        if(featuresSelected.includes(featureId)=== false){
            let prueba = [...featuresSelected, featureId];

            setFeaturesSelected([...featuresSelected, featureId]);
            setPropertiesWithFeaturesSelect(bucleParaFiltrarPropiedadesKTienenLosFeatures(prueba, propertiesWithFeatures));
        }
        else{
            let prueba = featuresSelected.filter(elem => elem !== featureId);
            setFeaturesSelected(featuresSelected.filter(elem => elem !== featureId));
            setPropertiesWithFeaturesSelect( bucleParaFiltrarPropiedadesKTienenLosFeatures(prueba, propertiesWithFeatures));
        }
    }


    
    const bucleParaFiltrarPropiedadesKTienenLosFeatures =(featuresSelected, propertiesWithFeatures)=>{

        
        let restantes = [];
        for(let i = 0; i< propertiesWithFeatures.length; i++){
            
        if(i === propertiesWithFeatures.length){
          
        }
            for(let j = 0; j< featuresSelected.length; j++){
                
            
                if(featuresSelected[j] === propertiesWithFeatures[i].feature_id){
                     restantes = [...restantes, propertiesWithFeatures[i].property_id]
                    }
                }  
            }
            

        let doll = -1;
        let resultadoFinal = []
       
            //para poder filtrar aquellos que si tengan caracteristicas y ver si tienen todas la necesarias o no
        for(let i = 0; i< restantes.length; i++){
            doll = restantes[i];
          
            //usamos prueba para extraer el primer index del activo a comprobar
           let prueba = restantes.findIndex(elem => elem === doll)
            
            
           //no quiero meter por duplicado entradas, cuando entra una vez se prohibe la entrada
            if(resultadoFinal.includes(doll) === false){
                
               
                // si la distancia entre las entradas es igual al numero de extras seleccionados, significa que los tiene todos. 
                if((restantes.lastIndexOf(doll)+1) - prueba === featuresSelected.length){
                    
                    
                    resultadoFinal = [...resultadoFinal, doll]

                    }
                }

            }
           restantes = resultadoFinal;
            return restantes
        }

        
    

    // console.log(typeInDB, "estos son los tipos");
    // console.log(subTypeInDB, "los subtipos al seleccionar tipos");
    console.log(discover, "esto es el arrays de casas originales");
    // console.log(kitchenInDB, "estas son las cocinas de DB");
    // console.log(provinceInDb, "Estas son las provincias");
    // console.log(featuresInDB, "las features");
    // console.log(propertiesWithFeatures, "los 48");
    console.log(featuresSelected, "BOTONES PULSADOS");
    console.log(propertiesWithFeaturesSelect, "COINCIDENCIAS");

    


    //filtros aplicandose
    //filtros de precio del activo-------------------------------------
    let filterList = discover.filter(elem => elem.purchase_buy_price >= priceFilterMin && elem.purchase_buy_price <= priceFilterMax);

    //filtro de metros totales----------------------------------------
    filterList = filterList.filter(elem => elem.property_total_meters >= totalMetersFilterMin && elem.property_total_meters <= totalMetersFilterMax);


    //filtro de metros construidos--------------------------
    filterList = filterList.filter(elem => elem.property_built_meters >= builtMetersFilterMin && elem.property_built_meters <= builtMetersFilterMax)

    //filtro de habitaciones----------------------------
    filterList = filterList.filter(elem => elem.property_rooms >= filterRooms);
    //filtro de baños-------------------------------
    filterList = filterList.filter(elem => elem.property_bathrooms >= filterBaths);
    //filtro de garaje-------------------------
    filterList = filterList.filter(elem => elem.property_garage >= filterGarage);


    //filtro de cocina-------------------------------------------------
    if(filterKitchen !== -1){
        filterList = filterList.filter(elem => elem.property_kitchen_id === Number(filterKitchen))
    }
    
    
    // filtro de tipo de activo---------------------------------------------
    if(filterType !== -1){
        filterList = filterList.filter(elem => elem.type_id === Number(filterType));
    }

    //filtro de Subtipo del activo---------------------------------------
        if(filterSubtype !== -1){
            filterList = filterList.filter(elem => elem.subtype_id === Number(filterSubtype));
        }

    //filtro de la PROVINCIA del activo--------------------------------
        if(filterProvince !== -1){
            filterList = filterList.filter(elem => elem.province_id === Number(filterProvince))
        }

    //filtro de la CIUDAD del activo-----------------------------
    if(filterCity !== -1){
        filterList = filterList.filter(elem => elem.city_id === Number(filterCity))
    }
    //filtro de si es nuevo o segunda mano
    if(filterIsNew !== -1){
        filterList = filterList.filter(elem => elem.purchase_is_new === Number(filterIsNew))
    }
    
    //FILTRO PARA FEATURES 
    if(propertiesWithFeaturesSelect.length > 0){

        let contenedor = [];
        let caja = [];
    propertiesWithFeaturesSelect.map((elem)=>{
       
        if(caja[0] !== undefined){
             contenedor = [...contenedor, caja[0]];
        
        }
       
        return(
           caja = filterList.filter(casa => casa.property_id === elem)
        ) 
         
    })
    filterList = contenedor;
    } 
       
    console.log(filterList, "hola")

  return (

    <Container fluid className='portafolio-container'>
         <h1>Descubre</h1>
    <div className='discover'>
       
        <div className='filters'>
        <h4 className='mb-3'>Filtrar <img className='filterImg' src='/images/icons/filter.png'/></h4>
        <div>
            <button className='mb-3 clearButton' onClick={cleanFilters}>Limpiar Filtros</button>
        </div>

        <div>
        

        <h5>Metros construidos Min: {builtMetersFilterMin===0? "Sin filtro": builtMetersFilterMin}</h5>
        <div className='buttons'>
        <button onClick={()=>handleBothFilterBuiltMeters(0)}>Sin filtro</button>
        <button onClick={()=>handleBothFilterBuiltMeters(1)}>30 - 100 m²</button>
        <button onClick={()=>handleBothFilterBuiltMeters(2)}>100 - 300 m²</button>
        <button onClick={()=>handleBothFilterBuiltMeters(3)}>+ 300 m²</button>
        </div>

        <hr/>
        <h5>Metros totales minimos: {totalMetersFilterMin===0? "Sin filtro": totalMetersFilterMin}</h5>
        <div className='buttons'>
        <button onClick={()=>handleBothFilterTotalMeters(0)}>Sin filtro</button>
        <button onClick={()=>handleBothFilterTotalMeters(1)}>100 - 300 m²</button>
        <button onClick={()=>handleBothFilterTotalMeters(2)}>300 - 1000 m²</button>
        <button onClick={()=>handleBothFilterTotalMeters(3)}>+ 1000 m²</button>
        </div>

        <hr/> 
        <h5>Valor mínimo: {priceFilterMin===0? "Sin filtro": priceFilterMin}</h5>
        <div className='buttons'>
        <button onClick={()=>handleBothFilterPrice(0)}>Todas</button>
        <button onClick={()=>handleBothFilterPrice(1)}> 100k - 300k </button>
        <button onClick={()=>handleBothFilterPrice(2)}> 300k - 500k </button>
        <button onClick={()=>handleBothFilterPrice(3)}>+ 500k </button>
        </div>
        
        <hr/> 
        <h5>Nº de habitaciones: {filterRooms===0? "Sin filtro": filterRooms }</h5>
        <div className='buttons'>
        <button onClick={()=>handleNumOfRooms(0)}> Sin filtro</button>
        <button onClick={()=>handleNumOfRooms(2)}> 2 o más</button>
        <button onClick={()=>handleNumOfRooms(3)}> 3 o más</button>
        <button onClick={()=>handleNumOfRooms(4)}> 4 o más</button>
        </div>

        <hr/> 
        <h5>Nº de baños: {filterBaths===0? "Sin filtro": filterBaths }</h5>
        <div className='buttons'>
        <button onClick={()=>handleNumOfBath(0)}> Sin filtro</button>
        <button onClick={()=>handleNumOfBath(2)}> 2 o más</button>
        <button onClick={()=>handleNumOfBath(3)}> 3 o más</button>
        <button onClick={()=>handleNumOfBath(4)}> 4 o más</button>
        </div>

        <hr/> 

       
        

        <h5>Plazas de aparcamiento : {filterGarage===0? "Sin filtro": filterGarage }</h5>
        <div className='buttons'>
        <button onClick={()=>handleNumOfGarage(0)}> Sin filtro</button>
        <button onClick={()=>handleNumOfGarage(1)}> 1 o más</button>
        <button onClick={()=>handleNumOfGarage(2)}> 2 o más</button>
        </div>

        <hr/>
        <h5>Estado del Activo: {filterIsNew=== -1? "Sin filtro": filterIsNew ===0? "Segunda mano": "Nuevo"}</h5>
        <div className='buttons'>
        <button onClick={()=>handleIsNew(-1)}> Sin Filtro</button>
        <button onClick={()=>handleIsNew(1)}> Nueva</button>
        <button onClick={()=>handleIsNew(0)}> Usada</button>
        </div>
        
        <hr/>
       
        <button className='featuresButton' onClick={openFeaturesDisplay}>{!showFeatures? "Mostrar caracteristicas adicionales": "Ocultar caracteriscas adicionales"}</button>
       
        <hr/>
       
       {showFeatures &&
       <>
       <h5>Extras del activo</h5>
        {featuresInDB.map((feature, index)=>{
            return(
                <div key={index} className='checkbox-container'>
                <input 
                    type="checkbox" 
                    classname="checkbox" 
                    id={`checkbox-${feature.feature_name}`} 
                    onClick={()=>handleFeaturesSelected(feature.feature_id)}
                     
                />

                <label 
                    for={`checkbox-${feature.feature_name}`} 
                    className="label">{feature.feature_name}
                </label>
            </div> 

            )
        })}
       </>
       } 
        
        <hr/>
        <h5>Tipos de cocina</h5>
        <select className='clearButton' onChange={SelectKitchenFilter}>
            <option value={-1}>Sin filtro</option>
            {kitchenInDB?.map((kitchen, index)=>{
                return(
                    <option 
                    key={index} 
                    value={kitchen.kitchen_id}>
                        {kitchen.kitchen_name}
                    </option>
                )
            })}
        </select>

        <hr/>
        <h5>Tipos de Activo</h5>
        <select className='clearButton' onChange={selectTypeIdFilter}>
            <option value={-1}>Sin filtro</option>
            {typeInDB?.map((type, index)=>{
                return(
                    <option 
                    value={type.type_id}
                    key={index}
                    >
                        {type.type_name}</option>
                )
            })}
        </select>

        { showSubtype &&
         <select className='clearButton' onChange={selectSubtypeIdFilter}>
            <option value={-1}>Sin filtro</option>
            {subTypeInDB?.map((subtype, index)=>{
                return(
                    <option 
                    key={index}
                    value={subtype.subtype_id}
                    >{subtype.subtype_name}
                    </option>
                )
            })}
         </select>

        }

        <hr/>
        <h5>Filtrar por provincia</h5>
        <select className='clearButton' onChange={selectProvinceIdFilter}>
            <option value={-1}>Sin filtro</option>
            {provinceInDb?.map((province, index)=>{
                return(
                    <option
                    key={index}
                    value={province.province_id}
                    >{province.province_name}</option>
                )
            })}
        </select>
            { showCities &&
                <select onChange={selectCityFilter}>
                    <option value={-1}>Sin filtro</option>
                    {cityInDb.map((city, index)=>{
                        return(
                            <option
                            key={index}
                            value={city.city_id}
                            >{city.city_name}</option>
                        )
                    }) }
                </select>
            
            }
        </div>
        </div>


        <Row className='properties'>
        <Col className='card'>
        {filterList?.map((property, i) => {
            return(
                <div className='cardProperty' key={i} style={{border:"2px solid red"}}>
                     <Modal
                        size="sm"
                        show={smShow}
                        onHide={() => setSmShow(false)}
                        aria-labelledby="example-modal-sizes-title-sm"
                    >
                    <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">
                    Accion repetida.
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Esta propiedad ya esta en su lista de Favoritos. (para acceder a sus favoritos despliege desde su foto las opciones)</Modal.Body>
                    </Modal>


                <img src={`/images/property/${property?.image_title}`} alt=""></img>
                <div className='d-flex flex-column'>
                <h5>{property?.property_name}</h5> 
                <p>{property?.city_name} , {property?.province_name}</p>
                </div>
                                                   

                
                
                <p>{Math.floor(property?.purchase_buy_price * 1.14)}</p>
                {favOption && <button onClick={()=>addToFavs(property?.property_id)}>Añadir a Favoritos</button>}
                
                           
                <p  className='perTrans'>12%</p>                             
               
                </div>
                
            )
        })}
        </Col>
        </Row>
    </div>
    </Container>
  )
}

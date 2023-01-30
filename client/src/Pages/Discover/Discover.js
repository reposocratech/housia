import React, { useContext, useEffect, useState } from 'react';
import axios from "axios";
import { AppContext } from '../../Context/AppContext';


export const Discover = () => {

    //ESTADOS DE MANIPULACION U OBTENCION DE DATOS
    const [discover, setDiscover] = useState([]);
    const [fav, setFav] = useState(false);
    const [typeInDB, setTypeInDB] = useState([]);
    const [subTypeInDB, setSubTypeInDB] = useState([]);
    const [kitchenInDB, setKitchenInDB] = useState([]);
    const [showSubtype, setShowSubtype] = useState(false)
    const [provinceInDb, setProvinceInDb] = useState([]);
    const [cityInDb, setCityInDb] = useState([]);
    const [showCities, setShowCities] = useState(false);
    const [featuresInDB, setFeaturesInDB] = useState([])
    const [showFeatures, setShowFeatures] = useState(false)
    const [propertiesWithFeatures, setPropertiesWithFeatures] = useState([])
    const [featuresSelected, setFeaturesSelected] = useState([])
    const [propertiesWithFeaturesSelect, setPropertiesWithFeaturesSelect] = useState([])
    const {user} = useContext(AppContext);
    console.log(user.user_id, "USERRRRRRRRRRRR");
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


    
        const handleFav = (property_id) => {
        setFav(!fav);
        if(fav === false){
            axios
            .post(`http://localhost:4000/property/fav/${user?.user_id}/${property_id}`)
            .then((res) => {
                console.log("Insertado")
               
            })
            .catch((err) => {
                console.log(err);
            });
        }

        if(fav === true){
            axios
            .delete(`http://localhost:4000/property/unfav/${user?.user_id}/${property_id}`)
            .then((res) => {
                console.log("Eliminado")
            })
            .catch((err) => {
                console.log(err);
            });
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
        setFilterIsNew(-1);

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
            setFeaturesSelected([...featuresSelected, featureId]);
            setPropertiesWithFeaturesSelect(bucleParaFiltrarPropiedadesKTienenLosFeatures(featuresSelected, propertiesWithFeatures));
        }
        else{
            setFeaturesSelected(featuresSelected.filter(elem => elem !== featureId));
            setPropertiesWithFeaturesSelect( bucleParaFiltrarPropiedadesKTienenLosFeatures(featuresSelected, propertiesWithFeatures));
        }
    }


    //  const nuevoArrai = propertiesWithFeatures.filter(elem => elem.feature_id ===  )
    const bucleParaFiltrarPropiedadesKTienenLosFeatures =(featuresSelected, propertiesWithFeatures)=>{
        let restantes = []
        for(let i = 0; i< propertiesWithFeatures.length; i++){
            
            for(let j = 0; j< featuresSelected.length; j++){
                //  console.log(propertiesWithFeatures[i].feature_id, "la I", featuresSelected[j], "LA J");
                if(featuresSelected[j] === propertiesWithFeatures[i].feature_id){
                     restantes = [...restantes, propertiesWithFeatures[i]]
                    }   
                }
            }
            
            // setPropertiesWithFeaturesSelect(restantes)
            return restantes
        }

        let vacio = [];
        featuresSelected.forEach((extra)=>{
            return(
                vacio = propertiesWithFeatures.filter(elem => Number(elem.feature_id) === Number(extra))
            )
        })
        console.log(vacio, "prueba de vacio");
    

    // console.log(typeInDB, "estos son los tipos");
    // console.log(subTypeInDB, "los subtipos al seleccionar tipos");
    console.log(discover, "esto es el arrays de casas originales");
    // console.log(kitchenInDB, "estas son las cocinas de DB");
    // console.log(provinceInDb, "Estas son las provincias");
    // console.log(featuresInDB, "las features");
    // console.log(propertiesWithFeatures);
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
    


  return (
    <div>
        <h1>Descubre</h1>
        <h1>Filtros de busqueda</h1>
        <div>
            <button onClick={cleanFilters}>Limpiar Filtros</button>
        </div>

        <div>
        <h3>Metros construidos Min: {builtMetersFilterMin===0? "Sin filtro": builtMetersFilterMin}</h3>
        <button onClick={()=>handleBothFilterBuiltMeters(0)}>Sin limite en metros contruidos</button>
        <button onClick={()=>handleBothFilterBuiltMeters(1)}>entre 30 y 100 metros contruidos</button>
        <button onClick={()=>handleBothFilterBuiltMeters(2)}>entre 100 y 300 metros contruidos</button>
        <button onClick={()=>handleBothFilterBuiltMeters(3)}>mas de 300 metros contruidos</button>
        <hr/>
        <h3>Metros totales minimos: {totalMetersFilterMin===0? "Sin filtro": totalMetersFilterMin}</h3>
        <button onClick={()=>handleBothFilterTotalMeters(0)}>Sin limites en metros totales</button>
        <button onClick={()=>handleBothFilterTotalMeters(1)}>entre 100 y 300 metros totales</button>
        <button onClick={()=>handleBothFilterTotalMeters(2)}> entre 300 y 1000 metros totales</button>
        <button onClick={()=>handleBothFilterTotalMeters(3)}>mas de 1000 metros totales</button>
        <hr/> 
        <h3>valor minimo: {priceFilterMin===0? "Sin filtro": priceFilterMin}</h3>
        
        <button onClick={()=>handleBothFilterPrice(0)}>Todas la propiedades (precio) </button>
        <button onClick={()=>handleBothFilterPrice(1)}>entre 100k y 300k (precio) </button>
        <button onClick={()=>handleBothFilterPrice(2)}>entre 300k y 500k (precio) </button>
        <button onClick={()=>handleBothFilterPrice(3)}>mayor a 500k (precio) </button>
        
        <hr/> 
        <h3>valor numero de habitaciones minimas: {filterRooms===0? "Sin filtro": filterRooms }</h3>
        <button onClick={()=>handleNumOfRooms(0)}> Sin filtro</button>
        <button onClick={()=>handleNumOfRooms(2)}> 2 o mas</button>
        <button onClick={()=>handleNumOfRooms(3)}> 3 o mas</button>
        <button onClick={()=>handleNumOfRooms(4)}> 4 o mas</button>

        <hr/> 
        <h3>valor numero de baños de la propiedad: {filterBaths===0? "Sin filtro": filterBaths }</h3>
        <button onClick={()=>handleNumOfBath(0)}> Sin filtro</button>
        <button onClick={()=>handleNumOfBath(2)}> 2 o mas</button>
        <button onClick={()=>handleNumOfBath(3)}> 3 o mas</button>
        <button onClick={()=>handleNumOfBath(4)}> 4 o mas</button>

        <hr/> 
        <h3>Plazas de aparcamiento : {filterBaths===0? "Sin filtro": filterBaths }</h3>
        <button onClick={()=>handleNumOfGarage(0)}> Sin filtro</button>
        <button onClick={()=>handleNumOfGarage(1)}> 1 o mas</button>
        <button onClick={()=>handleNumOfGarage(2)}> 2 o mas</button>

        <hr/>
        <h3>Estado del Activo: {filterIsNew=== -1? "Sin filtro": filterIsNew ===0? "Segunda mano": "Nuevo"}</h3>
        <button onClick={()=>handleIsNew(-1)}> Sin Filtro</button>
        <button onClick={()=>handleIsNew(1)}> Buscar situacion : Nuevo</button>
        <button onClick={()=>handleIsNew(0)}> Buscar situacion : Segunda Mano</button>
        
        <hr/>
        <button onClick={openFeaturesDisplay}>{!showFeatures? "Mostrar caracteristicas adicionales": "Ocultar caracteriscas adicionales"}</button>
        <hr/>
       {showFeatures &&
       <>
       <h3>Extras del activo</h3>
        {featuresInDB.map((feature, index)=>{
            return(
               <button key={feature.feature_id} onClick={()=>handleFeaturesSelected(feature.feature_id)}>{feature.feature_name}</button>
            )
        })}
       </>
       } 
        
        <hr/>
        <h3>Tipos de cocina</h3>
        <select onChange={SelectKitchenFilter}>
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
        <h3>Tipos de Activo</h3>
        <select onChange={selectTypeIdFilter}>
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
         <select onChange={selectSubtypeIdFilter}>
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
        <h3>Filtrar por provincia</h3>
        <select onChange={selectProvinceIdFilter}>
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

        <div>
        {filterList?.map((property, i) => {
            return(
                <div key={i} style={{border:"2px solid red"}}>
                <img src={property?.image_title} alt=""></img>
                <h3>{property?.property_name}</h3>

                
               

                <p>nombre de la ciudad:{property?.city_name} /// (Spain)</p>

                <span onClick={()=>handleFav(property?.property_id)} style={{backgroundColor: fav ? "yellow" : "white", border: "1px solid black"}}>{fav ? "⭐" : "✰"}</span>
                <p>Provincia: {property?.province_name}</p>
                <p>Precio: {Math.floor(property?.purchase_buy_price * 1.14)}</p>
                <p>Año de construccion: {property?.property_built_year} </p>
                <p>Metros construidos: {property?.property_built_meters} </p>
                <p>Metros totales: {property?.property_total_meters} </p>
                <p>{property?.type_name} : {property?.subtype_name}</p>
                <p>Numero de habitaciones: {property?.property_rooms}</p>
                <p>Numero de baño/s: {property?.property_bathrooms}</p>
                <p>Tipo de Cocina Actual: {property?.kitchen_name}</p>
                <p>Plaza/s de aparcamiento: {property?.property_garage}</p>

                </div>
            )
        })}
        </div>
    </div>
  )
}

import React, {useEffect,  useState } from 'react';
import axios from "axios";
import './Discover.scss';
import { Col, Container, Modal, Row, Button, Accordion } from 'react-bootstrap';
import jwtDecode from 'jwt-decode';
import { localStorageUser } from '../../Utils/localStorage/localStorageUser';
import { ModalInfoDiscover } from '../../Components/ModalInfoDiscoverOneProperty/ModalInfoDiscover';
import { ModalFavRepeat } from './ModalFavRepeat';

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
    const [show, setShow] = useState(false)
    const [showModalInfoDiscover, setShowModalInfoDiscover] = useState(false)
    const [infoOneProperty, setInfoOneProperty] = useState({})

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
            let userType = jwtDecode(token).user.type;

            setUserId(userId)
            axios
            .get(`http://localhost:4000/users/getFavs/${userId}`)
            .then((res)=>{
                setFavInDB(res.data)
            })
            .catch((error)=>{
                console.log(error)
            })

            setFavOption(false)
            if(userType === 2){
                setFavOption(true)
            }

           
        } else {
            setFavOption(false)
        }
        
        //Activos en venta
        axios
        .get(`http://localhost:4000/property/discover`)
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

        const addToFavs = (propertyId) =>{
           
            console.log(favInDB, "lo que traigo ya en la lista");
            if(favInDB.length === 0){
                axios
                .post(`http://localhost:4000/users/postFav/${userId}/${propertyId}`)
                .then((res)=>{
                console.log(res);
                })
                .catch((error)=>{
                console.log(error)

                let doll = {
                    property_id: propertyId
                }
               setFavInDB([...favInDB, doll]);
                })

                let doll = {
                    property_id: propertyId
                }
                setFavInDB([...favInDB, doll]);
                
            } else{

                let flag = [];
                favInDB.map((elem)=>{
                    if(Number(elem.property_id) !== Number(propertyId)){
                        flag.push(elem)
                    }
                })
                 
                if(flag.length !== favInDB.length){
                    setShow(!show)
                } else {

                    let doll = {
                        property_id: propertyId
                    }
                   setFavInDB([...favInDB, doll]);
                   
                    axios
                    .post(`http://localhost:4000/users/postFav/${userId}/${propertyId}`)
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
            default: break;
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
            default: break;
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
        
        const handleModalInfo = (propertyInfo) =>{

        setInfoOneProperty(propertyInfo);
        setShowModalInfoDiscover(true);
       }


    // console.log(typeInDB, "estos son los tipos");
    // console.log(subTypeInDB, "los subtipos al seleccionar tipos");
    /* console.log(discover, "esto es el arrays de casas originales"); */
    // console.log(kitchenInDB, "estas son las cocinas de DB");
    // console.log(provinceInDb, "Estas son las provincias");
    // console.log(featuresInDB, "las features");
    // console.log(propertiesWithFeatures, "los 48");
    // console.log(featuresSelected, "BOTONES PULSADOS");
    // console.log(propertiesWithFeaturesSelect, "COINCIDENCIAS");

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
    filterList = filterList.filter(elem => elem.address_city_id
            === Number(filterCity))
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

  return (

    <>
    <Container fluid className='portafolio-container'>

         <h1>DESCUBRE</h1>

    <div className='discover'>

        <div className='filters'>
        <h4 className='mb-3'>Filtrar <img className='filterImg' src='/images/icons/filter.png' alt='icon_filter'/></h4>
        <Row>
        <Col className='botonLimpiar' xs={12} md={8} lg={8}>
            <button className='col-12 mb-3 clearButton' onClick={cleanFilters}>Limpiar Filtros</button>
        </Col>
        </Row>

        <div>
           
        <Accordion className='estilosAcordeon'>

      <Accordion.Item eventKey="0">

        <Accordion.Header>Metros construidos Min: {builtMetersFilterMin===0? "Sin filtro": builtMetersFilterMin}</Accordion.Header>
        <Accordion.Body>
        <Row className='buttons'>
            <Col className="metro" xs={6} md={6} lg={6}>
            <button onClick={()=>handleBothFilterBuiltMeters(0)}>Sin filtro</button>
            </Col>
            <Col className="metro" xs={6} md={6} lg={6}>
            <button onClick={()=>handleBothFilterBuiltMeters(1)}>30 - 100 m²</button>
            </Col>
        </Row>

        <Row className=' buttons'>                     
         

            <Col className="metro" xs={6} md={6} lg={6}>
            <button onClick={()=>handleBothFilterBuiltMeters(2)}>100 - 300 m²</button>
            </Col>

            <Col className="metro" xs={6} md={6} lg={6}>
            <button onClick={()=>handleBothFilterBuiltMeters(3)}>+ 300 m²</button>
            </Col>
        
        </Row>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Metros totales minimos: {totalMetersFilterMin===0? "Sin filtro": totalMetersFilterMin}</Accordion.Header>
        <Accordion.Body>
        <Row className=' buttons'>
            <Col className="metro" xs={6} md={6} lg={6}>
            <button onClick={()=>handleBothFilterTotalMeters(0)}>Sin filtro</button>
            </Col>
            <Col className="metro" xs={6} md={6} lg={6}>
            <button onClick={()=>handleBothFilterTotalMeters(1)}>100 - 300 m²</button>
            </Col>
        </Row>

        <Row className=' buttons'>
           
            <Col className="metro" xs={6} md={6} lg={6}>
            <button onClick={()=>handleBothFilterTotalMeters(2)}>300 - 1000 m²</button>
            </Col>
            <Col className="metro" xs={6} md={6} lg={6}>
            <button onClick={()=>handleBothFilterTotalMeters(3)}>+ 1000 m²</button>
            </Col>
        </Row>

        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>Valor mínimo: {priceFilterMin===0? "Sin filtro": priceFilterMin}</Accordion.Header>
        <Accordion.Body>
        <Row className=' buttons'>
            <Col className="metro" xs={6} md={6} lg={6}>
            <button onClick={()=>handleBothFilterPrice(0)}>Todas</button>
            </Col>
            <Col className="metro" xs={6} md={6} lg={6}>
            <button onClick={()=>handleBothFilterPrice(1)}> 100k - 300k </button>
            </Col>
        </Row>

        <Row className=' buttons'>
           
            <Col className="metro" xs={6} md={6} lg={6}>
            <button onClick={()=>handleBothFilterPrice(2)}> 300k - 500k </button>
            </Col>
            <Col className="metro" xs={6} md={6} lg={6}>
            <button onClick={()=>handleBothFilterPrice(3)}>+ 500k </button>
            </Col>
        </Row>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="3">
        <Accordion.Header>Nº de habitaciones: {filterRooms===0? "Sin filtro": filterRooms }</Accordion.Header>
        <Accordion.Body>
        <Row className=' buttons'>
            <Col className="metro" xs={6} md={6} lg={6}>
            <button onClick={()=>handleNumOfRooms(0)}> Sin filtro</button>
            </Col>
            <Col className="metro" xs={6} md={6} lg={6}>
            <button onClick={()=>handleNumOfRooms(2)}> 2 o más</button>
            </Col>
       </Row>

       <Row className=' buttons'>
           
            <Col className="metro" xs={6} md={6} lg={6}>
            <button onClick={()=>handleNumOfRooms(3)}> 3 o más</button>
            </Col>
            <Col className="metro" xs={6} md={6} lg={6}>
            <button onClick={()=>handleNumOfRooms(4)}> 4 o más</button>
            </Col>
        </Row>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="4">
        <Accordion.Header>Nº de baños: {filterBaths===0? "Sin filtro": filterBaths }</Accordion.Header>
        <Accordion.Body>
        <Row className='buttons'>
            <Col className="metro" xs={6} md={6} lg={6}>
            <button onClick={()=>handleNumOfBath(0)}> Sin filtro</button>
            </Col>
            <Col className="metro" xs={6} md={6} lg={6}>
            <button onClick={()=>handleNumOfBath(2)}> 2 o más</button>
            </Col>
        </Row>

        <Row className='buttons'>
           
            <Col className="metro" xs={6} md={6} lg={6}>
            <button onClick={()=>handleNumOfBath(3)}> 3 o más</button>
            </Col>
            <Col className="metro" xs={6} md={6} lg={6}>
            <button onClick={()=>handleNumOfBath(4)}> 4 o más</button>
            </Col>
        </Row>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="5">
        <Accordion.Header>Plazas de aparcamiento : {filterGarage===0? "Sin filtro": filterGarage }</Accordion.Header>
        <Accordion.Body>
        <Row className='buttons'>
            <Col className="metro" xs={6} md={6} lg={6}>
            <button onClick={()=>handleNumOfGarage(0)}> Sin filtro</button>
            </Col>
       </Row>

       <Row className='buttons'>
            <Col className="metro" xs={6} md={6} lg={6}>
            <button onClick={()=>handleNumOfGarage(1)}> 1 o más</button>
            </Col>
            <Col className="metro" xs={6} md={6} lg={6}>
            <button onClick={()=>handleNumOfGarage(2)}> 2 o más</button>
            </Col>
           
       </Row>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="6">
        <Accordion.Header>Estado del Activo: {filterIsNew=== -1? "Sin filtro": filterIsNew ===0? "Usada": "Nuevo"}</Accordion.Header>
        <Accordion.Body>
        <Row className='buttons'>
            <Col className="metro" xs={6} md={6} lg={6}>
            <button onClick={()=>handleIsNew(-1)}> Sin Filtro</button>
            </Col>
        </Row>

        <Row className='buttons'>
            <Col className="metro" xs={6} md={6} lg={6}>
            <button onClick={()=>handleIsNew(1)}> Nueva</button>
            </Col>
            <Col className="metro" xs={6} md={6} lg={6}>
            <button onClick={()=>handleIsNew(0)}> Usada</button>
            </Col>
           
        </Row>
        </Accordion.Body>
      </Accordion.Item>
            
    </Accordion>
       
       <Row >
        <Col className='botonExtras' xs={12} md={8} lg={8}>
        <button className='featuresButton' onClick={openFeaturesDisplay}>{!showFeatures? "Mostrar extras": "Ocultar extras"}</button>
        </Col>
      
       
       </Row>
       

       <Row>           

       {showFeatures &&
       <>
       
        {featuresInDB.map((feature, index)=>{
            return(
                <Col key={index} className='extras'xs={6} md={6} lg={6}>
                <input 
                    type="checkbox" 

                    classname="extra" 

                    id={`checkbox-${feature.feature_name}`} 
                    onClick={()=>handleFeaturesSelected(feature.feature_id)}
                     
                />

                <label 
                    for={`checkbox-${feature.feature_name}`} 
                    className="label">{feature.feature_name}
                </label>

            </Col> 

            )
        })}
       </>
       } 

       </Row> 

      
        <h5>Tipos de cocina</h5>
        <Row className='buttons'>
            <Col className="cocina" xs={12} md={8} lg={6}>
            <select className='selectButton' onChange={SelectKitchenFilter}>
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
            </Col>
        </Row>

        <h5>Tipos de Activo</h5>
        <Row className='buttons'>
            <Col className="" xs={12} md={8} lg={6}>
            <select className='selectButton' onChange={selectTypeIdFilter}>
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
            </Col>
            <Col className="" xs={12} md={8} lg={6}>
                { showSubtype &&
                <select className='selectButton' onChange={selectSubtypeIdFilter}>
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
            </Col>
        </Row>

        <h5>Filtrar por provincia</h5>
        <Row className='buttons'>
            <Col className="" xs={12} md={8} lg={6}>
            <select className='selectButton' onChange={selectProvinceIdFilter}>
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
            </Col>
            <Col className="" xs={12} md={8} lg={6}>
            { showCities &&
                <select className='selectButton' onChange={selectCityFilter}>
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
            </Col>
        </Row>

        </div>
        </div>

        <Row className='properties'>
       
        {filterList?.map((property, i) => {
            return(
                <Col className='tarjeta'xs={12} md={6} lg={4}>
                    <div className='cardProperty' key={i}>

                        <div className='styleCard'>
                            <div className='parteTransparente'>

                               <p onClick={() => handleModalInfo(property)} className='perTrans'>INFO</p>
                                
                        {favOption &&
                        <div className='botonFavoritos'>
                            <button className='estrella' onClick={()=>addToFavs(property?.property_id)}> <img src='/images/icons/favoritos.png'/></button>

                        </div>}
                        </div>
                        <img src={`/images/property/${property?.image_title}`} alt=""></img>
                    </div>   
                
                    {<Row className='m-0'>
                        <Col className='datosPropiedad alinear'>
                            <h5>{property?.property_name}</h5> 
                            <div className='d-flex'>
                                <img src='/images/icons/location.png' alt='localizacion'/>
                                <p>{property?.city_name} , {property?.province_name}</p>
                            </div>
                        </Col>
                        <Col className='datosPropiedad alineado'>
                            <p>Precio</p>
                            <p className='color'>{Math.floor(property?.purchase_buy_price * 1.14)} €</p>
                        </Col>
                    </Row>}
                    </div>
                </Col>
            )
        })}
        
        </Row>
    </div>
    </Container>
    <ModalInfoDiscover
        showModalInfoDiscover = {showModalInfoDiscover}
        setShowModalInfoDiscover = {setShowModalInfoDiscover}
        infoOneProperty = {infoOneProperty}
        setInfoOneProperty= {setInfoOneProperty}
    />

    {show && <ModalFavRepeat show={show} setShow={setShow}/>}

    </>
  )
}

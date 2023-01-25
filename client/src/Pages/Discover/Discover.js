import React, { useEffect, useState } from 'react';
import axios from "axios";

export const Discover = () => {
    const [discover, setDiscover] = useState([]);
    const [priceFilter, setPriceFilter] = useState(0);
    const [totalMetersFilter, setTotalMetersFilter] = useState(0)
    const [builtMetersFilter, setBuiltMetersFilter] = useState(0)
    

    useEffect(() => {
        axios
        .get(`http://localhost:4000/property/descubre`)
        // .get(`http://localhost:4000/property/discover`) esta a acabar siendo la buena
        .then((res) => {

            setDiscover(res.data);
            
           
        })
        .catch((err) => {
            console.log(err);
        });

        
    }, [])


    const handleFilterPrice = (e) =>{
        setPriceFilter(e.target.value)
    }

    const handleFilterTotalMeters = (e) =>{
        setTotalMetersFilter(e.target.value)
    }

    const handleFilterBuiltMeters = (e)=>{
        setBuiltMetersFilter(e.target.value)
    }



    console.log(discover, "esto es el arrays de casas originales");

    //filtros aplicandose
    let filterList = discover.filter(elem => elem.purchase_buy_price >= priceFilter);

    filterList = filterList.filter(elem => elem.property_total_meters >= totalMetersFilter);

    filterList = filterList.filter(elem => elem.property_built_meters >= builtMetersFilter)


  return (
    <div>
        <h1>Descubre</h1>
        <h1>Filtros de busqueda</h1>

        <div>
        <h3>Metros construidos: {builtMetersFilter}</h3>
        <input min={0} max={1100} type="range" defaultValue={0} onChange={handleFilterBuiltMeters}/>
        <hr/>
        <h3>Metros totales: {totalMetersFilter}</h3>
        <input min={0} max={1100} type='range' defaultValue={0} onChange={handleFilterTotalMeters}></input>
        <hr/> 
        <h3>valor: {priceFilter}</h3>
        <input min={0} max={1000000} type='range' defaultValue={0} onChange={handleFilterPrice}>
        </input>
        

        </div>

        <div>
        {filterList?.map((property, i) => {
            return(
                <div key={i} style={{border:"2px solid red"}}>
                <img src={property?.image_title} alt=""></img>
                <h3>{property?.property_name}</h3>
                <p>nombre de la ciudad:{property?.city_name} /// (Spain)</p>
                <p>Precio: {property?.purchase_buy_price}</p>
                <p>Año de construccion: {property?.property_built_year} </p>
                <p>Metros construidos: {property?.property_built_meters} </p>
                <p>Metros totales: {property?.property_total_meters} </p>
                </div>
            )
        })}
        </div>
    </div>
  )
}

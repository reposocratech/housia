import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AppContext } from '../../Context/AppContext';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form' 

export const AddProperty3 = () => {
    const [province, setProvince] = useState();
    const [city, setCity] = useState();
    const [provinceId, setProvinceId] = useState(1);
    const [cityId, setCityId] = useState(1);
    const {property, setProperty, typeId, subTypeId } = useContext(AppContext);
    const navigate = useNavigate();

    const { register, formState:{errors}, handleSubmit } = useForm();
    
    /* console.log(property);
    console.log(typeId, 'type id');
    console.log(subTypeId, 'subtype id'); */

    // const handleChange = (e) => {
    //     const {name, value} = e.target;
    //     setProperty({...property, [name]:value})
    // }

    useEffect(() => {
        axios
        .get("http://localhost:4000/property/allProvinces")
        .then((res) => {
           setProvince(res.data)
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);

    useEffect(() => {
        axios
        .get(`http://localhost:4000/property/allCities/${provinceId}`)
        .then((res) => {
           setCity(res.data)
        })
        .catch((err) => {
            console.log(err);
        });
    }, [provinceId]);

    const onSubmit = (data) => {
        console.log(data);
        
        axios
        .put(`http://localhost:4000/property/addPropertyAddress/${property?.property_id}/${provinceId}/${cityId}`, data)
        .then((res) => {
            navigate("/addProperty4")
           
        })
        .catch((err) => {
            console.log(err);
        });
    }
       
    const handleProvinceId = (e) => {
        setProvinceId(e.target.value);
    }

    const handleCityId = (e) => {
        setCityId(e.target.value);
    }

  return (
    <div>
     <h2>Añadir Propiedad</h2>
     <h3>Direccion</h3>

    <form onSubmit={handleSubmit(onSubmit)}>
        <p>Calle</p>
        <input 
            placeholder='Calle'
            autoComplete='off'
            type="text"
            // value= {property?.address_street_name}
            name="address_street_name"
            // onChange={handleChange}
            {...register('address_street_name', {
                required: {value: true, message:'Campo obligatorio'}
              })}
        />
        {errors.address_street_name && 
            <div className='text-danger'>
              {errors.address_street_name.message}
            </div>
          }
        <br/>
        <p>Numero</p>
        <input 
            placeholder='0'
            autoComplete='off'
            type="number"
            // value= {property?.address_street_number}
            name="address_street_number"
            // onChange={handleChange}
            {...register('address_street_number', {
                required: {value: true, message:'Campo obligatorio'}
              })}
        />
        {errors.address_street_number && 
            <div className='text-danger'>
              {errors.address_street_number.message}
            </div>
          }
        <br/>
        <p>Provincia</p>
        <select 
            name='address_province_id'
            {...register('address_province_id', {
                required: {value: true, message:'Campo obligatorio'}
              })}
            
            onChange={handleProvinceId}>
            <option value=''>Provincia</option>
            {province?.map ((provincia, i)=>{
            return(
                <option value={provincia.province_id} key={i}>{provincia?.province_name}</option>
            )
            })}
        </select>
        {errors.address_province_id && 
            <div className='text-danger'>
              {errors.address_province_id.message}
            </div>
        }
        <br/>
        <p>Codigo postal</p>
        <input 
            placeholder='Codigo postal'
            autoComplete='off'
            type="text"
            // value= {property?.address_postal_code}
            name="address_postal_code"
            // onChange={handleChange}
            {...register('address_postal_code', {
                required: {value: true, message:'Campo obligatorio'}
              })}
        />
        {errors.address_postal_code && 
            <div className='text-danger'>
              {errors.address_postal_code.message}
            </div>
          }
        <br/>
        <p>Ciudad</p>
        <select 
            name='address_city_id'
            {...register('address_city_id',{
                required: {value: true, message:'Campo obligatorio'}
              })}
            onChange={handleCityId}
            >
            <option value=''>Ciudad</option>
        {city?.map ((ciudad, i)=>{
            return(
                <option value={ciudad.city_id} key={i}>{ciudad?.city_name}</option>
            )
        })}
        </select>
        {errors.address_city_id && 
            <div className='text-danger'>
              {errors.address_city_id.message}
            </div>
          }
        <br/>
        {typeId != 4 && <>
          <p>Bloque</p>
        <input 
            placeholder='Bloque'
            autoComplete='off'
            type="text"
            // value= {property?.address_block}
            name="address_block"
            // onChange={handleChange}
            {...register('address_block')}
        />
        <br/>
        <p>Portal</p>
        <input
            placeholder='Portal'
            autoComplete='off'
            type="text"
            // value= {property?.address_gate}
            name="address_gate"
            // onChange={handleChange}
            {...register('address_gate')}
        />
        <br/>
        <p>Escalera</p>
        <input
            placeholder='Escalera'
            autoComplete='off'
            type="text"
            // value= {property?.address_stair}
            name="address_stair"
            // onChange={handleChange}
            {...register('address_stair')}
        />
        <br/>
        <p>Planta</p>
        <input
            placeholder='Planta'
            autoComplete='off'
            type="text"
            // value= {property?.address_floor}
            name="address_floor"
            // onChange={handleChange}
            {...register('address_floor')}
        />
        <br/>
        <p>Puerta</p>
        <input
            placeholder='Puerta'
            autoComplete='off'
            type="text"
            // value= {property?.address_door}
            name="address_door"
            // onChange={handleChange}
            {...register('address_door')}
        />
        <br/>
        </>}
        
     <button onClick={handleSubmit}>Siguiente</button>
     </form>
    </div>
  )
}

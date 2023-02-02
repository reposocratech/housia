import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AppContext } from '../../Context/AppContext';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Container} from 'react-bootstrap';
import "./AddProperty3.scss";
export const AddProperty3 = () => {
    const [province, setProvince] = useState();
    const [city, setCity] = useState();
    const [provinceId, setProvinceId] = useState(1);
    const [cityId, setCityId] = useState(1);
    const {property, typeId} = useContext(AppContext);
    const navigate = useNavigate();

    const { register, formState:{errors}, handleSubmit } = useForm();
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

    /* console.log(typeId, 'tipo en form3'); */

  return (
    <div className='padreeAdd3'>
     <h2>Añadir Propiedad</h2>
     <div className='alturaCont3'>
        <span>3/5</span>
        </div>
     <h3>Dirección</h3>
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container fluid className='padreee3Add'>
        <div className='row rowAdd3'>
          <div className='col-12 col-lg-6 priColAdd3'>
        <p>Calle</p>
        
        <input 
            placeholder='Calle'
            autoComplete='off'
            type="text"       
            name="address_street_name"    
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
        <div className='displayAdd3'>
        <div>
        <p>Numero</p>
        <input 
        className='numeroAdd3'
            placeholder='0'
            autoComplete='off'
            type="number"
            name="address_street_number"
            {...register('address_street_number', {
                required: {value: true, message:'Campo obligatorio'},
                maxLength: {value: 5, message: 'El número no puede tener más de 5 dígitos'},
                min: {value: 0, message: 'Número mayor a'}
              })}
        />
        
        {errors.address_street_number && 
            <div className='text-danger'>
              {errors.address_street_number.message}
            </div>
          }
          </div>
        <br/>
        <div>
        <p>Provincia</p>
        <select 
        className='provinciaAdd3'
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
        </div>
        </div>
        <p>Codigo postal</p>
        <input 
            placeholder='Codigo postal'
            autoComplete='off'
            type="text"
            name="address_postal_code"
            {...register('address_postal_code', {
                required: {value: true, message:'Campo obligatorio'},
                maxLength: {value: 5, message: 'El código postal debe tener 5 dígitos'},
                minLength: {value: 5, message: 'El código postal debe tener 5 dígitos'}
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
          </div>
        <div className='col-12 col-lg-6 segColAdd3'>
          
        {Number(typeId) !== 4 && <>
        <div >
        <input 
            placeholder='Bloque'
            autoComplete='off'
            className='bloque'
            type="text"
            name="address_block"
            {...register('address_block', {
              maxLength: {value: 3, message: 'Bloque máximo 3 dígitos'}
            })}
        />
        {errors.address_block && 
            <div className='text-danger'>
              {errors.address_block.message}
            </div>
          }
        <br/>
        </div>
        <div>
 
        <input
            placeholder='Portal'
            autoComplete='off'
            type="text"
            name="address_gate"
            {...register('address_gate', {
              maxLength: {value: 3, message: 'Portal máximo 3 dígitos'}
            })}
        />
        {errors.address_gate && 
            <div className='text-danger'>
              {errors.address_gate.message}
            </div>
          }
        <br/>
        </div>
        <div>

        <input
            placeholder='Escalera'
            autoComplete='off'
            type="text"
            name="address_stair"
            {...register('address_stair', {
              maxLength: {value: 3, message: 'Escalera máximo 3 dígitos'}
            })}
        />
        {errors.address_stair && 
            <div className='text-danger'>
              {errors.address_stair.message}
            </div>
          }
        <br/>
        </div>
        <div>

        <input
            placeholder='Planta'
            autoComplete='off'
            type="text"
            name="address_floor"
            {...register('address_floor', {
              min: {value: 0, message: 'Número mayor a 0'},
              max: {value: 1000, message: 'Número menor que 1000'}
            })}
        />
        {errors.address_floor && 
            <div className='text-danger'>
              {errors.address_floor.message}
            </div>
          }
        <br/>
        </div>
        <br/>
<div>
        <input
            placeholder='Puerta'
            autoComplete='off'
            type="text"
            className='puertaaAdd3'
            name="address_door"
            {...register('address_door', {
              maxLength: {value: 3, message: 'Puerta máximo 3 dígitos'}
            })}
        />
        {errors.address_door && 
            <div className='text-danger'>
              {errors.address_door.message}
            </div>
          }
        <br/>
        </div>
        </>}
        </div>
     <button onClick={handleSubmit}>Siguiente</button>
  
     
     </div>
     </Container>
     </form>
    </div>
  )
}

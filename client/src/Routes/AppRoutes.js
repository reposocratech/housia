import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import { Home } from '../Pages/UserDashboard/Home/Home'
import { Login } from '../Pages/Auth/Login/Login'
import { Register } from '../Pages/Auth/Register/Register'
import { NavBarUser } from '../Components/NavbarUser/NavBarUser'
import { Portafolio } from '../Pages/UserDashboard/Portafolio/Portafolio'
import { Resumen } from '../Pages/UserDashboard/Resumen/Resumen'
import { User } from '../Pages/UserDashboard/User/User'
import { AddPropertyForm1 } from '../Components/AddPropertyForm/AddPropertyForm1'
import { AddProperty2 } from '../Components/AddPropertyForm/AddProperty2'
import { AddProperty3 } from '../Components/AddPropertyForm/AddProperty3'
import { TestField } from '../Components/TestField/TestField'
import { AddProperty4 } from '../Components/AddPropertyForm/AddProperty4'


export const AppRoutes = () => {
  return (
    <div>
        <BrowserRouter>
        <NavBarUser/>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/login' element={<Login/>}/>

                <Route path='/user/portafolio' element={<Portafolio/>}/>
                <Route path='/user/resumen' element={<Resumen/>}/>
                <Route path='/user/perfil' element={<User/>}/>

                <Route path='/addProperty' element={<AddPropertyForm1/>}/>
                <Route path='/addProperty2' element={<AddProperty2/>}/>
                <Route path='/addProperty3' element={<AddProperty3/>}/>
                <Route path='/addProperty4' element={<AddProperty4/>}/>
                <Route path='/testField' element={<TestField/>}/>

            </Routes>
        </BrowserRouter>
    </div>
  )
}

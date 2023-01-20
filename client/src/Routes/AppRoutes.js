import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import { Home } from '../Pages/UserDashboard/Home/Home'
import { Login } from '../Pages/Auth/Login/Login'
import { Register } from '../Pages/Auth/Register/Register'
import { NavBarUser } from '../Components/NavbarUser/NavBarUser'
import { AddPropertyForm1 } from '../Components/AddPropertyForm/AddPropertyForm1'
import { AddProperty2 } from '../Components/AddPropertyForm/AddProperty2'
import { AddProperty3 } from '../Components/AddPropertyForm/AddProperty3'

export const AppRoutes = () => {
  return (
    <div>
        <BrowserRouter>
        <NavBarUser/>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/addProperty' element={<AddPropertyForm1/>}/>
                <Route path='/addProperty2' element={<AddProperty2/>}/>
                <Route path='/addProperty3' element={<AddProperty3/>}/>
            </Routes>
        </BrowserRouter>
    </div>
  )
}

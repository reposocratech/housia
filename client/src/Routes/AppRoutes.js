import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import { Home } from '../Pages/UserDashboard/Home/Home'
import { Login } from '../Pages/Auth/Login/Login'
import { Register } from '../Pages/Auth/Register/Register'
import { NavBarUser } from '../Components/NavbarUser/NavBarUser'
import { Portafolio } from '../Pages/UserDashboard/Portafolio/Portafolio'

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
            </Routes>
        </BrowserRouter>
    </div>
  )
}

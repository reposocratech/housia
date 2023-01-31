import React, {useContext} from 'react'
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
import { EditUser } from '../Pages/UserDashboard/User/EditUser'
import { AdminHome } from '../Pages/Admin/AdminHome/AdminHome'
import { AdminAllProperties } from '../Pages/Admin/AdminAllProperties/AdminAllProperties'
import { AddPropertyImage } from '../Components/AddPropertyForm/AddPropertyImage'
import { AdminCustomFeatures } from '../Pages/Admin/AdminCustomCaracteristicas/AdminCustomFeatures'
import { PropertyDetails } from '../Pages/property/PropertyDetails/PropertyDetails'
import { Discover } from '../Pages/Discover/Discover'
import { AddEconomicFeatures } from '../Components/AddEconomicFeatures/AddEconomicFeatures'
import { EditEconomicFeatures } from '../Components/EditEconomicFeatures/EditEconomicFeatures'
import { SummaryInversionUser } from '../Pages/property/SummaryInversionUser'
import { EditPropertyForm } from '../Components/EditPropertyForm/EditPropertyForm'

import { AppContext } from '../Context/AppContext'
import { NavBarLogin } from '../Components/NavbarUser/NavBarLogin'

export const AppRoutes = () => {
  const {user, isLogged} = useContext(AppContext);
  
  return (
    <div>
        <BrowserRouter>
        {isLogged && <NavBarUser/>}
        {!isLogged && <NavBarLogin/>}
        
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/login' element={<Login/>}/>

                <Route path='/user/portafolio' element={<Portafolio/>}/>
                
                <Route path='/user/resumen' element={<Resumen/>}/>
                <Route path='/user/perfil' element={<User/>}/>
                <Route path='/user/editUser' element={<EditUser/>}/>
                <Route path='/user/summaryInversion' element={<SummaryInversionUser/>}/>

                <Route path='/propertyDetails/:property_id' element={<PropertyDetails/>}/>
                <Route path='/addProperty' element={<AddPropertyForm1/>}/>
                <Route path='/addProperty2' element={<AddProperty2/>}/>
                <Route path='/addProperty3' element={<AddProperty3/>}/>
                <Route path='/addProperty4' element={<AddProperty4/>}/>
                <Route path='/testField' element={<TestField/>}/>
                <Route path='/addPropertyImage' element={<AddPropertyImage/>}/> 

                <Route path='/discover' element={<Discover/>}/> 

                <Route path='/addEconomicFeatures' element={<AddEconomicFeatures/>}/> 
                <Route path='/editEconomicFeatures/:property_id' element={<EditEconomicFeatures/>}/>
                <Route path='/editProperty/:property_id/:property_subtype_id' element={<EditPropertyForm/>} />

                <Route path='/admin' element={<AdminHome/>}/>
                <Route path='/admin/allproperties' element={<AdminAllProperties/>}/>
                <Route path='/admin/customFeaturesElem' element={<AdminCustomFeatures/>}/>

            </Routes>
        </BrowserRouter>
    </div>
  )
}

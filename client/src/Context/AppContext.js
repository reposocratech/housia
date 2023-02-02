import React, { useState, useEffect, createContext } from 'react'
import axios from 'axios';
import { localStorageUser } from '../Utils/localStorage/localStorageUser';
import jwtDecode from 'jwt-decode';

export const AppContext = createContext();



export const AppProvider = (props) => {
    const [user, setUser] = useState([]);
    const [property, setProperty] = useState({});
    const [resetUser, setResetUser] = useState(false);
    const [userProperties, setUserProperties] = useState();
    const [isLogged, setIsLogged] = useState(false);
    const [subTypeId, setSubTypeId] = useState(-1);
    const [typeId, setTypeId] = useState(-1);
    const token = localStorageUser(); 
    const [propertyDetails, setPropertyDetails] = useState([]);

useEffect(() => {
    const token = localStorageUser();
    if(token){
        let id = jwtDecode(token).user.id;
        setIsLogged(true);

    axios
    .get(`http://localhost:4000/users/${id}`)
    .then((res)=> {

        // console.log(res.data);
        setUser(res.data.resultUser[0]);
        setUserProperties(res.data.resultProperty);
    })
    .catch((error) => {
        console.log('este es el error', error);
    })
    }
}, [isLogged, resetUser])

    return (
        <AppContext.Provider value={{
                user,
                property,
                setProperty, 
                setUser, 
                userProperties, 
                setUserProperties,
                isLogged, 
                setIsLogged,
                resetUser,
                setResetUser,
                typeId,
                setTypeId,
                subTypeId, 
                setSubTypeId,
                token,
                propertyDetails,
                setPropertyDetails
                }}>
            {props.children}
        </AppContext.Provider>
      )
}



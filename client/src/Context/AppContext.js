import React, { useState, useEffect, createContext } from 'react'
import axios from 'axios';
import { localStorageUser } from '../Utils/localStorage/localStorageUser';
import jwtDecode from 'jwt-decode';

export const AppContext = createContext();

export const AppProvider = (props) => {
    const [user, setUser] = useState({});
    const [userProperties, setUserProperties] = useState();
    const [isLogged, setIsLogged] = useState(false);
    const token = localStorageUser(); 
    

    useEffect(() => {
        const token = localStorageUser();
        if(token){
            let id = jwtDecode(token).user.id;
            
        
        axios
        .get(`http://localhost:4000/users/${id}`)
        .then((res)=> {

            setUser(res.data.resultUser[0]);
            setUserProperties(res.data.resultProperty);
        })
        .catch((error) => {
            console.log('este es el error', error);
        })
        }
    }, [])
    

    return (
        <AppContext.Provider value={{
                user, 
                setUser, 
                isLogged, 
                setIsLogged,
                token
                }}>
            {props.children}
        </AppContext.Provider>
      )
}



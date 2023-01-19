import React, { useState, useEffect, createContext } from 'react'
import axios from 'axios';
import jwtDecode from 'jwt-decode';

export const AppContext = createContext();

export const AppProvider = (props) => {
    const [user, setUser] = useState({});
    const [userProperties, setUserProperties] = useState();
    const [isLogged, setIsLogged] = useState(false);
}

//a borrar

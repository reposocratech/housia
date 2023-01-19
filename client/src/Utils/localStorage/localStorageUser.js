export const localStorageUser = () => {
    const token = window.localStorage.getItem('token');
    return token;
}

export const saveLocalStorageUser = (item) => {
    window.localStorage.setItem('token', item);
    return true;
}

export const delLocalStorageUser = () => {
    window.localStorage.removeItem('token');
}
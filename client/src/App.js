import './App.css';
import { AddPropertyForm1 } from './Components/AddPropertyForm/AddPropertyForm1';
import { AppProvider } from './Context/AppContext';
import { Login } from './Pages/Auth/Login/Login';
import { Register } from './Pages/Auth/Register/Register';
import { EditUser } from './Pages/User/EditUser';



function App() {

  return (
    <>
    <AppProvider>
      <Login/>
      <Register/>
      <EditUser/>
      <AddPropertyForm1/>
    </AppProvider>
    </>

  );
}

export default App;

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AppRoutes } from './Routes/AppRoutes';
import { AppProvider } from './Context/AppContext';

function App() {
  return (
    <div className='App'>
      <AppProvider>
          <AppRoutes/>
      </AppProvider>
    </div>
  );
}

export default App;

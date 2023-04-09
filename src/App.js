
import './App.scss';
import CustomRoutes from './pages/Routes';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import AuthContextProvider from './context/AuthContext';


function App() {
  return (
    <>
      <AuthContextProvider>
        <CustomRoutes />
      </AuthContextProvider>
    </>
  );
}

export default App;

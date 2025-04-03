import { Navigate } from 'react-router-dom'; 
import { AuthProvider } from "../context/AuthContext"
// ---------------------------------------------------------------------- 
import HomePage from '../pages/HomePage';  
import LoginPage from '../pages/LoginPage';  
import RegisterPage from '../pages/RegisterPage';   
import Page404 from '../pages/Page404';   
import ProtectedRoute from './components/ProtectedRoute';
// ----------------------------------------------------------------------


export const routes  = [  
    {
        path: '',
        element: ( 
          <AuthProvider>
            <ProtectedRoute>
                <HomePage /> 
            </ProtectedRoute>
          </AuthProvider>
        ),
    }, 

    {
      path: '/',
      element: ( 
        <AuthProvider>
          <ProtectedRoute>
              <HomePage /> 
          </ProtectedRoute>
        </AuthProvider>
        ),
    }, 
    {
      path: 'login',
      element: ( 
        <AuthProvider>      
          <LoginPage /> 
        </AuthProvider>
      ),
    },
    {
      path: 'register',
      element: ( 
        <AuthProvider>          
          <RegisterPage /> 
        </AuthProvider>
      ),
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    }
  ]; 
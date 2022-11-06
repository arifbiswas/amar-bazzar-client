import React from 'react';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthProvider } from '../../AuthContext/AuthContext';

const PrivateRoute = ({children}) => {
   const {user,loading} = useContext(AuthProvider)
   if(loading){
    return <progress className="progress w-56"></progress>
   }
   if(user?.email){
       return children
    }
    return <Navigate to='/login' />
};

export default PrivateRoute;
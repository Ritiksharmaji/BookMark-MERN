import { Route} from 'react-router-dom'
import Cookie from 'js-cookie'
import { Navigate } from 'react-router-dom';

const ProtectedRoute = props => {
  const token = Cookie.get('jwt_token')
  if (token === undefined) {
    return <Navigate to="/login" />
  }
  return <Route {...props} />
}

export default ProtectedRoute

// import React from 'react';


// const ProtectedRoute = ({ children }) => {
//   const isAuthenticated = !!localStorage.getItem('authToken'); // Example: Replace this with your authentication logic.

//   return isAuthenticated ? children : <Navigate to="/login" />;
// };

// export default ProtectedRoute;

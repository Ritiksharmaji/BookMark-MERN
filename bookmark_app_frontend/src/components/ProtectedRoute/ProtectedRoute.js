// import { Route} from 'react-router-dom'
// import Cookie from 'js-cookie'
// import { Navigate } from 'react-router-dom';

// const ProtectedRoute = props => {
//   const token = Cookie.get('jwt_token')
//   if (token === undefined) {
//     return <Navigate to="/login" />
//   }
//   return <Route {...props} />
// }

// export default ProtectedRoute
import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ children }) => {
    const token = Cookies.get('jwt_token');

    if (!token) {
        // If no JWT token, redirect to login page
        return <Navigate to="/login" />;
    }

    // If the token exists, render the children (protected components)
    return children;
};

export default ProtectedRoute;

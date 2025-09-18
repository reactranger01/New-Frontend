import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { isLoggedIn } from '@/utils/apiHandlers';

function PrivateRoute({ children }) {
  const auth = isLoggedIn();
  return auth ? <>{children}</> : <Navigate to={'/'} replace />;
}
PrivateRoute.propTypes = {
  children: PropTypes.node,
};
export default PrivateRoute;

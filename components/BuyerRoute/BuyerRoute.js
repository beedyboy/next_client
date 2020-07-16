import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Utility from '../../services/Storage'; 

const BuyerRoute = props => {
  const { layout: Layout, component: Component, ...rest } = props;

  
  return (
    <Route
      {...rest}
      render={matchProps => (
        Utility.get('token')
        ?
        <Layout  {...matchProps}>
          <Component/>
        </Layout>
         :

         <Redirect to={{ pathname: '/sign-in', state: { from: props.location } }} />
      
      )}
    />
  );
};
 


BuyerRoute.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string
};

export default BuyerRoute;
